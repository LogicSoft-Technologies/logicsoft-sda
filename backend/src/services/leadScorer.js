// src/services/leadScorer.js

const SIGNALS = {
  budget:     { patterns: [/budget/i, /\$[\d,]+/i, /how much/i, /cost/i, /price/i, /pricing/i, /afford/i], score: 20, label: "Budget mentioned" },
  timeline:   { patterns: [/timeline/i, /deadline/i, /asap/i, /urgently/i, /next month/i, /this month/i, /weeks/i, /launch/i], score: 15, label: "Timeline mentioned" },
  company:    { patterns: [/company/i, /business/i, /startup/i, /enterprise/i, /our team/i, /we need/i, /we are/i, /our app/i], score: 15, label: "Company context" },
  quote:      { patterns: [/quote/i, /proposal/i, /estimate/i, /get started/i, /hire/i, /work with/i, /engage/i], score: 25, label: "Quote requested" },
  service:    { patterns: [/web app/i, /mobile app/i, /cybersecurity/i, /cloud/i, /devops/i, /data/i, /dashboard/i, /api/i, /backend/i, /frontend/i], score: 10, label: "Specific service mentioned" },
  contact:    { patterns: [/email/i, /call me/i, /phone/i, /reach me/i, /contact/i, /follow up/i], score: 15, label: "Contact intent" },
};

export function scoreConversation(messages) {
  const userText = messages
    .filter(m => m.role === "user")
    .map(m => m.content)
    .join(" ");

  const detectedSignals = [];
  let score = 0;

  for (const [key, signal] of Object.entries(SIGNALS)) {
    const matched = signal.patterns.some(p => p.test(userText));
    if (matched) {
      score += signal.score;
      detectedSignals.push(signal.label);
    }
  }

  return {
    score: Math.min(score, 100),
    signals: detectedSignals,
    isHotLead: score >= 70,
    isWarmLead: score >= 40 && score < 70,
  };
}