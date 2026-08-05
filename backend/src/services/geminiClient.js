import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, FALLBACK_REPLY } from "./systemPrompt.js";
import { groqChat } from "./groqClient.js";

export { SYSTEM_PROMPT, FALLBACK_REPLY };

const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || "gemini-2.5-flash-lite";

let client;
function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  if (!client) client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return client;
}

function toHistory(contextMessages) {
  return contextMessages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

async function callGemini(model, history, message) {
  const ai = getClient();
  const chat = ai.chats.create({
    model,
    config: { systemInstruction: SYSTEM_PROMPT },
    history,
  });
  const response = await chat.sendMessage({ message });
  const text = response?.text;
  if (!text || !text.trim()) throw new Error(`Empty response from ${model}`);
  return text.trim();
}

export async function geminiChat(contextMessages) {
  const history = toHistory(contextMessages);
  const lastMessage = contextMessages[contextMessages.length - 1].content;
  const errors = [];

  try {
    return await callGemini(PRIMARY_MODEL, history, lastMessage);
  } catch (err) {
    errors.push(`${PRIMARY_MODEL}: ${err.message}`);
    console.error(`[Gemini] ${PRIMARY_MODEL} failed:`, err.message);
  }

  try {
    return await callGemini(FALLBACK_MODEL, history, lastMessage);
  } catch (err) {
    errors.push(`${FALLBACK_MODEL}: ${err.message}`);
    console.error(`[Gemini] ${FALLBACK_MODEL} failed:`, err.message);
  }

  try {
    console.warn("[AI] Both Gemini tiers failed — falling back to Groq");
    return await groqChat(contextMessages);
  } catch (err) {
    errors.push(`groq: ${err.message}`);
    console.error("[Groq] fallback failed:", err.message);
  }

  throw new Error(`All AI providers failed — ${errors.join(" | ")}`);
}

export async function geminiHealthCheck() {
  if (!process.env.GEMINI_API_KEY) {
    return { ok: false, reason: "GEMINI_API_KEY is not set" };
  }
  try {
    await callGemini(PRIMARY_MODEL, [], "ping");
    return { ok: true, model: PRIMARY_MODEL };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}