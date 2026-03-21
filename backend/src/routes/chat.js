// src/routes/chat.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../config/prisma.js";
import { sendLeadNotification } from "../services/mailer.js";
import { scoreConversation } from "../services/leadScorer.js";

const router = express.Router();

let genAI;
function getGenAI() {
  if (!genAI) genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI;
}

const SYSTEM_PROMPT = `You are Treasure, the official AI assistant for LogicSoft Technologies — an enterprise software and technology company headquartered in Nigeria, serving clients across Africa, Europe, and the Middle East.

COMPANY OVERVIEW:
LogicSoft Technologies delivers end-to-end digital transformation solutions including:
- Web Development (Frontend, Backend, Full Stack — React, Next.js, Node.js, and more)
- Mobile Applications (iOS, Android, Cross-Platform — React Native, Flutter)
- Cybersecurity (Penetration Testing, SIEM, Compliance Audits, Security Architecture)
- Cloud Engineering (AWS, Azure, GCP — migration, Infrastructure as Code, FinOps, multi-cloud strategy)
- Data Analytics & AI (data pipelines, BI dashboards, machine learning, real-time streaming)
- DevOps Engineering (CI/CD, containerisation, Kubernetes, monitoring)
- Technology Consultation (digital strategy, architecture review, product discovery, vendor selection)
- Cost Optimisation (cloud spend, tech stack rationalisation)

KEY FACTS:
- 5+ years in business
- 300+ enterprise projects delivered
- Fixed-scope engagements, clearly scoped and priced
- Free introductory consultation available for all prospects
- Contact: contact@logicsoft.com | +234 9012 688 861
- Website: logicsofttechnologies.com

YOUR ROLE:
1. Represent LogicSoft with the professionalism of a senior enterprise account executive
2. ALWAYS answer the user's question directly and fully before anything else
3. If a user asks about the company, a service, or any general topic — answer it thoroughly first
4. Only ask for lead details (project type, scope, timeline, company name) if the user EXPLICITLY asks for a quote, proposal, or pricing — never ask these questions unprompted
5. Never ask more than ONE question at a time
6. For human agent requests: direct them to the WhatsApp option in the chat widget
7. When the user asks about booking a consultation or scheduling a call, share this link: ${process.env.GOOGLE_CALENDAR_BOOKING_URL || "https://calendar.google.com/calendar/r"}
8. Never fabricate pricing — state that engagements are custom-scoped and a free consultation is the best starting point

CRITICAL CONVERSATION RULES:
- Answer first, qualify later — never lead with qualification questions
- If someone says "tell me about the company" — tell them about the company, do not ask what service they want
- If someone says "web development" — explain LogicSoft's web development capabilities in detail
- If someone says "cybersecurity" — explain the cybersecurity services in detail
- Only switch into lead qualification mode when the user says something like "I want a quote", "how much does it cost", "I want to hire you", "let's get started"
- Never repeat the same question twice
- If the user says goodbye, thank you, or farewell but then continues with a new question, treat the new question as a fresh topic — completely ignore the goodbye and answer the new question directly
- A farewell followed by a new question means the user is continuing the conversation — never reference the goodbye or wrap up the conversation again
- Never get stuck asking the same thing in a loop

CONVERSATION BEHAVIOUR:
- Always respond directly to what the user just asked
- Each response must address the user's current message specifically
- Do not summarise or repeat what you said in a previous turn
- If the user changes the subject, follow their lead immediately
- Never get stuck in a loop

HANDLING OFF-TOPIC OR UNRELATED QUESTIONS:
If a user asks something unrelated to technology or LogicSoft's services, respond politely but redirect professionally:
"That's a little outside my expertise — I'm here to help with anything related to LogicSoft's services or your technology needs. Is there something I can assist you with on that front?"

RESPONSE STANDARDS:
- Keep responses under 120 words unless the question genuinely requires more depth
- Use clear, structured language — avoid filler phrases and corporate clichés
- Never use excessive bullet points in casual responses
- Never begin with "Certainly!", "Of course!", "Great question!" or similar filler openers
- Never say "As an AI language model" or reference being an AI unless directly asked

TONE:
- Confident, warm, and commercially sharp
- You represent a premium enterprise firm — every response should reflect that standard
- Treat every user as a potential enterprise client`;

// Rate limiting
const ipWindows = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const WINDOW = 60_000;
  const MAX = 25;
  let rec = ipWindows.get(ip);
  if (!rec || now > rec.resetAt) rec = { count: 0, resetAt: now + WINDOW };
  rec.count++;
  ipWindows.set(ip, rec);
  return rec.count > MAX;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, rec] of ipWindows) {
    if (now > rec.resetAt) ipWindows.delete(ip);
  }
}, 300_000);

// Track notified sessions to avoid duplicate emails
const notifiedSessions = new Set();

const FAREWELL_PATTERN = /goodbye|see you|take care|pleasure speaking|best of luck|have a great|talk soon|until next|farewell|that will be all|that's all for now/i;
const USER_FAREWELL_PATTERN = /^(thank you|thanks|bye|goodbye|see you|see ya|take care|that's all|that will be all|cheers|later|good day|have a good).{0,40}$/i;

function stripFarewellContext(msgs) {
  // Find the last assistant farewell message index
  let lastFarewellIdx = -1;
  msgs.forEach((m, i) => {
    if (m.role === "assistant" && FAREWELL_PATTERN.test(m.content)) {
      lastFarewellIdx = i;
    }
  });

  // If farewell found and there are messages after it, strip everything up to and including it
  if (lastFarewellIdx !== -1 && lastFarewellIdx < msgs.length - 1) {
    return msgs.slice(lastFarewellIdx + 1);
  }
  return msgs;
}

async function geminiChat(contextMessages) {
  const model = getGenAI().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_PROMPT,
  });

  const history = contextMessages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const lastMessage = contextMessages[contextMessages.length - 1].content;
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage);
  return result.response.text().trim();
}

// POST /api/chat/message
router.post("/message", async (req, res) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages — please slow down." });
  }

  const { sessionId, message, pageUrl } = req.body;

  if (!sessionId) return res.status(400).json({ error: "sessionId is required" });
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }
  if (message.trim().length > 2000) {
    return res.status(400).json({ error: "Message too long (max 2000 chars)" });
  }

  try {
    let session = await prisma.chatSession.findUnique({ where: { sessionId } });
    if (!session) {
      session = await prisma.chatSession.create({
        data: {
          sessionId,
          pageUrl: pageUrl || null,
          userAgent: req.headers["user-agent"] || null,
          ip,
        },
      });
    }

    await prisma.chatMessage.create({
      data: { sessionId, role: "user", content: message.trim() },
    });

    const recentMessages = await prisma.chatMessage.findMany({
      where: {
        sessionId,
        createdAt: {
          gte: new Date(Date.now() - 30 * 60 * 1000),
        },
      },
      orderBy: { createdAt: "asc" },
      take: 8,
    });

    const rawMessages = recentMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    // If the current message is NOT a farewell, strip any prior farewell context
    const isCurrentFarewell = USER_FAREWELL_PATTERN.test(message.trim());
    const contextMessages = isCurrentFarewell
      ? rawMessages
      : stripFarewellContext(rawMessages);

    const reply = await geminiChat(contextMessages);

    await prisma.chatMessage.create({
      data: { sessionId, role: "assistant", content: reply },
    });

    // Lead scoring
    const { score, signals, isHotLead, isWarmLead } = scoreConversation(contextMessages);
    const shouldNotify = (isHotLead || isWarmLead) && !notifiedSessions.has(sessionId);

    if (shouldNotify) {
      notifiedSessions.add(sessionId);
      sendLeadNotification({
        sessionId,
        messages: contextMessages,
        score,
        signals,
      }).catch((err) => console.error("[Lead Notification Error]", err.message));
    }

    return res.json({ success: true, sessionId, reply, leadScore: score });
  } catch (err) {
    console.error("[Chat /message] Error:", err.message);
    return res.status(200).json({
      success: true,
      sessionId,
      reply: "I'm having trouble responding right now. Please try again or reach our team on WhatsApp.",
    });
  }
});

router.get("/staff", async (req, res) => {
  try {
    const staffList = await prisma.staff.findMany({
      where: { showInWidget: true },
      orderBy: { order: "asc" },
      take: 3,
      select: {
        name: true,
        role: true,
        whatsappNumber: true,
        whatsappGreeting: true,
        avatarInitials: true,
        avatarColor: true,
        isOnline: true,
        workingHoursStart: true,
        workingHoursEnd: true,
      },
    });

    const watHour = (new Date().getUTCHours() + 1) % 24;
    const result = staffList.map((s) => ({
      ...s,
      workingHours: { start: s.workingHoursStart, end: s.workingHoursEnd },
      isAvailableNow: s.isOnline && watHour >= s.workingHoursStart && watHour < s.workingHoursEnd,
    }));

    return res.json({ success: true, staff: result });
  } catch (err) {
    console.error("[Chat /staff] Error:", err.message);
    return res.status(500).json({ success: false, staff: [] });
  }
});

router.post("/transfer", async (req, res) => {
  const { sessionId, staffName } = req.body;
  if (!sessionId) return res.status(400).json({ error: "sessionId is required" });

  try {
    await prisma.chatSession.update({
      where: { sessionId },
      data: { status: "transferred_whatsapp", transferredTo: staffName || null },
    });
  } catch (err) {
    console.error("[Chat /transfer] Error:", err.message);
  }

  return res.json({ success: true });
});

router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }

    const contextMessages = [
      ...history.slice(-10).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const reply = await geminiChat(contextMessages);
    return res.json({ reply });
  } catch (err) {
    console.error("[Chat /] Error:", err.message);
    return res.status(500).json({
      reply: "I'm having trouble responding right now. Please try again or reach our team on WhatsApp.",
    });
  }
});

export default router;