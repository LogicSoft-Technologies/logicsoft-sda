// src/routes/chat.js
import express from "express";
import OpenAI from "openai";
import ChatSession from "../models/ChatSession.js";
import Staff from "../models/Staff.js";

const router = express.Router();

let openai;
function getOpenAI() {
  if (!openai) openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openai;
}

const SYSTEM_PROMPT = `You are the LogicSoft Technologies AI assistant — a professional, concise support agent for a premium enterprise software and technology company based in Nigeria.

COMPANY OVERVIEW:
LogicSoft Technologies is an enterprise technology partner delivering:
- Web Development (Frontend, Backend, Full Stack)
- Mobile Apps (iOS, Android, Cross-Platform)
- Cybersecurity (Pen Testing, SIEM, Compliance, Security Testing)
- Cloud Engineering (AWS, Azure, GCP — migration, IaC, FinOps, multi-cloud)
- Data Analytics (pipelines, BI dashboards, ML, real-time streaming)
- DevOps Engineering
- Technology Consultation (strategy, architecture review, product discovery)
- Cost Optimisation

KEY FACTS:
- 12+ years in business
- 300+ projects delivered
- Clients across Africa, Europe, and the Middle East
- All engagements are fixed-scope, clearly priced
- Free introductory consultation available
- Contact: contact@logicsoft.com | +234 9012 688 861
- Website: logicsofttechnologies.com

YOUR ROLE:
1. Answer questions about LogicSoft services accurately and professionally
2. Qualify leads: understand what the user is building, their timeline, and budget range
3. If the user wants a quote, collect: project type, scope (brief description), timeline, and company name — then tell them the team will follow up within 1 business day
4. If the user wants to speak to a human, recommend the WhatsApp option in the chat widget
5. Never make up pricing — say pricing is project-specific and a free consultation is the best first step

TONE:
- Professional, confident, warm
- Concise (keep responses under 120 words unless genuinely needed)
- No excessive emojis — you represent a premium enterprise firm
- Never say "As an AI language model"`;

const ipWindows = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const WINDOW = 60_000; // 1 minute
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

router.post("/message", async (req, res) => {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ error: "Too many messages — please slow down." });
  }

  const { sessionId, message, pageUrl } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }
  if (message.trim().length > 2000) {
    return res.status(400).json({ error: "Message too long (max 2000 chars)" });
  }

  try {
   
    let session = await ChatSession.findOne({ sessionId });

    if (!session) {
      session = await ChatSession.create({
        sessionId,
        pageUrl: pageUrl || null,
        messages: [],
        metadata: {
          userAgent: req.headers["user-agent"] || null,
          ip,
        },
      });
    }

    session.messages.push({ role: "user", content: message.trim() });

    const contextMessages = session.messages.slice(-16).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const completion = await getOpenAI().chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...contextMessages],
      max_tokens: 300,
      temperature: 0.65,
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      "I'm having trouble responding right now. Please try again or reach our team on WhatsApp.";

    session.messages.push({ role: "assistant", content: reply });
    await session.save();

    return res.json({ success: true, sessionId, reply });
  } catch (err) {
    console.error("[Chat /message] Error:", err.message);

    return res.status(200).json({
      success: true,
      sessionId,
      reply:
        "I'm having trouble responding right now. Please try again or reach our team on WhatsApp.",
    });
  }
});

router.get("/staff", async (req, res) => {
  try {
    const staffList = await Staff.find({ showInWidget: true })
      .sort({ order: 1 })
      .limit(3)
      .select(
        "name role whatsappNumber whatsappGreeting avatarInitials avatarColor isOnline workingHours"
      );

    // WAT = UTC+1
    const nowUTC = new Date();
    const watHour = (nowUTC.getUTCHours() + 1) % 24;

    const result = staffList.map((s) => {
      const obj = s.toObject();
      obj.isAvailableNow =
        s.isOnline &&
        watHour >= s.workingHours.start &&
        watHour < s.workingHours.end;
      return obj;
    });

    return res.json({ success: true, staff: result });
  } catch (err) {
    console.error("[Chat /staff] Error:", err.message);
    return res.status(500).json({ success: false, staff: [] });
  }
});

router.post("/transfer", async (req, res) => {
  const { sessionId, staffName } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    await ChatSession.findOneAndUpdate(
      { sessionId },
      {
        status: "transferred_whatsapp",
        transferredTo: staffName || null,
      }
    );
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

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const completion = await getOpenAI().chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      max_tokens: 300,
      temperature: 0.65,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    return res.json({ reply });
  } catch (err) {
    console.error("[Chat /] Error:", err.message);
    return res.status(500).json({
      reply:
        "I'm having trouble responding right now. Please try again or reach our team on WhatsApp.",
    });
  }
});

export default router;