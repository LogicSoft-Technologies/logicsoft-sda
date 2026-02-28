// src/sockets/chatSocket.js
import OpenAI from "openai";

let openai;
function getOpenAI() {
  if (!openai) openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openai;
}

const SYSTEM_PROMPT = `You are the LogicSoft Technologies AI assistant — a professional, concise support agent for a premium enterprise software and technology company based in Nigeria.

COMPANY OVERVIEW:
LogicSoft Technologies delivers: Web Development, Mobile Apps, Cybersecurity (Pen Testing, SIEM, Compliance), Cloud Engineering (AWS/Azure/GCP), Data Analytics, DevOps, Technology Consultation, and Cost Optimisation.

KEY FACTS:
- 12+ years, 300+ projects, clients across Africa, Europe & the Middle East
- Fixed-scope engagements, clearly priced
- Free introductory consultation
- Contact: contact@logicsoft.com | +234 9012 688 861

ROLE:
1. Answer questions about services accurately and professionally
2. Qualify leads: project type, scope, timeline, company name
3. For quotes: collect details, confirm team follows up within 1 business day
4. For human requests: recommend WhatsApp option
5. Never fabricate pricing

TONE: Professional, warm, concise (under 120 words unless necessary). No "As an AI language model".`;

export default function chatSocketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`[Chat] Client connected: ${socket.id}`);

    const history = [];

    socket.on("user_message", async (data) => {
      const userText = data?.text?.trim();
      if (!userText) return;

      // Store in local history
      history.push({ role: "user", content: userText });

      // Emit typing indicator to client
      socket.emit("typing", { typing: true });

      try {
        const messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...history.slice(-12), 
        ];

        const completion = await getOpenAI().chat.completions.create({
          model: "gpt-4o-mini",
          messages,
          max_tokens: 300,
          temperature: 0.65,
          stream: false,
        });

        const reply = completion.choices[0]?.message?.content?.trim();
        history.push({ role: "assistant", content: reply });

        socket.emit("typing", { typing: false });
        socket.emit("ai_reply", { text: reply });
      } catch (err) {
        console.error("[Chat Socket] OpenAI error:", err.message);
        socket.emit("typing", { typing: false });
        socket.emit("ai_reply", {
          text: "I'm having trouble responding right now. Please try again or reach our team on WhatsApp.",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`[Chat] Client disconnected: ${socket.id}`);
    });
  });
}