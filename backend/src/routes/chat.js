import express from "express";
import prisma from "../config/prisma.js";
import { sendLeadNotification } from "../services/mailer.js";
import { scoreConversation } from "../services/leadScorer.js";
import { geminiChat, geminiHealthCheck, FALLBACK_REPLY } from "../services/geminiClient.js";
import { groqHealthCheck } from "../services/groqClient.js";

const router = express.Router();

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

const notifiedSessions = new Set();

const FAREWELL_PATTERN = /goodbye|see you|take care|pleasure speaking|best of luck|have a great|talk soon|until next|farewell|that will be all|that's all for now/i;
const USER_FAREWELL_PATTERN = /^(thank you|thanks|bye|goodbye|see you|see ya|take care|that's all|that will be all|cheers|later|good day|have a good).{0,40}$/i;

function stripFarewellContext(msgs) {
  let lastFarewellIdx = -1;
  msgs.forEach((m, i) => {
    if (m.role === "assistant" && FAREWELL_PATTERN.test(m.content)) {
      lastFarewellIdx = i;
    }
  });
  if (lastFarewellIdx !== -1 && lastFarewellIdx < msgs.length - 1) {
    return msgs.slice(lastFarewellIdx + 1);
  }
  return msgs;
}

router.get("/health", async (req, res) => {
  const [dbOk, gemini, groq] = await Promise.all([
    prisma.$queryRaw`SELECT 1`.then(() => true).catch(() => false),
    geminiHealthCheck(),
    groqHealthCheck(),
  ]);
  const ok = dbOk && (gemini.ok || groq.ok);
  return res.status(ok ? 200 : 503).json({ ok, database: dbOk, gemini, groq });
});

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
        createdAt: { gte: new Date(Date.now() - 30 * 60 * 1000) },
      },
      orderBy: { createdAt: "asc" },
      take: 8,
    });

    const rawMessages = recentMessages.map((m) => ({ role: m.role, content: m.content }));

    const isCurrentFarewell = USER_FAREWELL_PATTERN.test(message.trim());
    const contextMessages = isCurrentFarewell ? rawMessages : stripFarewellContext(rawMessages);

    let reply;
    try {
      reply = await geminiChat(contextMessages);
    } catch (aiErr) {
      console.error("[Chat /message] Gemini error:", aiErr.message);
      reply = FALLBACK_REPLY;
    }

    await prisma.chatMessage.create({
      data: { sessionId, role: "assistant", content: reply },
    });

    let leadScore = null;
    try {
      const { score, signals, isHotLead, isWarmLead } = scoreConversation(contextMessages);
      leadScore = score;
      if ((isHotLead || isWarmLead) && !notifiedSessions.has(sessionId)) {
        notifiedSessions.add(sessionId);
        sendLeadNotification({ sessionId, messages: contextMessages, score, signals }).catch((err) =>
          console.error("[Lead Notification Error]", err.message)
        );
      }
    } catch (scoreErr) {
      console.error("[Lead Scoring Error]", scoreErr.message);
    }

    return res.json({ success: true, sessionId, reply, leadScore });
  } catch (err) {
    console.error("[Chat /message] Error:", err.message);
    return res.status(200).json({
      success: true,
      sessionId,
      reply: FALLBACK_REPLY,
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
    return res.status(500).json({ reply: FALLBACK_REPLY });
  }
});

export default router;