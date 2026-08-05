import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "./systemPrompt.js";

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

let client;
function getClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set");
  }
  if (!client) client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  return client;
}

function toGroqMessages(contextMessages) {
  return [
    { role: "system", content: SYSTEM_PROMPT },
    ...contextMessages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
  ];
}

export async function groqChat(contextMessages) {
  const groq = getClient();
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: toGroqMessages(contextMessages),
  });

  const text = completion?.choices?.[0]?.message?.content;
  if (!text || !text.trim()) throw new Error("Empty response from Groq");
  return text.trim();
}

export async function groqHealthCheck() {
  if (!process.env.GROQ_API_KEY) {
    return { ok: false, reason: "GROQ_API_KEY is not set" };
  }
  try {
    await groqChat([{ role: "user", content: "ping" }]);
    return { ok: true, model: MODEL };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}