import { sendConversationSummary } from "../services/mailer.js";
import { geminiChat, FALLBACK_REPLY } from "../services/geminiClient.js";

function formatDuration(ms) {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export default function chatSocketHandler(io) {
  io.on("connection", (socket) => {
    console.log(`[Chat] Client connected: ${socket.id}`);

    const history = [];
    const sessionStart = Date.now();
    let sessionId = null;

    socket.on("user_message", async (data) => {
      const userText = data?.text?.trim();
      if (!userText) return;

      if (data.sessionId) sessionId = data.sessionId;

      const contextMessages = [
        ...history.map((h) => ({
          role: h.role === "model" ? "assistant" : "user",
          content: h.parts[0].text,
        })),
        { role: "user", content: userText },
      ];

      history.push({ role: "user", parts: [{ text: userText }] });
      socket.emit("typing", { typing: true });

      try {
        const reply = await geminiChat(contextMessages);
        history.push({ role: "model", parts: [{ text: reply }] });
        socket.emit("typing", { typing: false });
        socket.emit("ai_reply", { text: reply });
      } catch (err) {
        console.error("[Chat Socket] Gemini error:", err.message);
        socket.emit("typing", { typing: false });
        socket.emit("ai_reply", { text: FALLBACK_REPLY });
      }
    });

    socket.on("disconnect", () => {
      console.log(`[Chat] Client disconnected: ${socket.id}`);

      if (history.length > 2 && sessionId) {
        const duration = formatDuration(Date.now() - sessionStart);
        const messages = history.map((m) => ({
          role: m.role === "model" ? "assistant" : "user",
          content: m.parts[0].text,
        }));

        sendConversationSummary({ sessionId, messages, duration }).catch((err) =>
          console.error("[Summary Email Error]", err.message)
        );
      }
    });
  });
}