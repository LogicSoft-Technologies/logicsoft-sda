"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { MessageSquare, Video, GitMerge, Globe } from "lucide-react";

export default function CollaborationPage() {
  return (
    <HowWeWorkPage
      index={8}
      title="Collaboration"
      description="Distributed teams succeed or fail on the quality of their collaboration infrastructure. We bring structured communication, the right tooling, and clear interaction models to every engagement."
      steps={[
        { title: "Communication Planning", body: "Before project start we agree communication protocols — which channels for what, response time expectations, escalation paths, and meeting cadences. Written and signed." },
        { title: "Tool Alignment", body: "We work in your tools or implement a shared stack. Jira, Linear, Notion, Slack, Teams — we adapt. Tool proliferation is minimised; integration is maximised." },
        { title: "Structured Ceremonies", body: "Daily standups, sprint planning, retrospectives, and steering committees run on schedule, with agendas, and with published minutes. No ceremony is ornamental." },
        { title: "Async-First Culture", body: "Time zones are a fact of global teams. We design for async-first collaboration — decisions documented in writing, updates in shared channels, not in inboxes." },
      ]}
      principles={[
        { icon: MessageSquare, title: "Async-first",         body: "We don't block decisions on meetings. Async communication scales across time zones without sacrificing quality." },
        { icon: Video,         title: "Structured sync",     body: "When we do meet, we meet with purpose. Agendas are published in advance; outcomes are documented within the hour." },
        { icon: GitMerge,      title: "Single source of truth", body: "One project management tool. One documentation source. One code repository. No information scattered across personal folders." },
        { icon: Globe,         title: "Timezone awareness",  body: "We plan cross-timezone collaboration deliberately — overlap windows, async handoffs, and clear coverage boundaries." },
      ]}
      outcomes={[
        "Structured communication protocols agreed before project commencement",
        "Unified tooling stack eliminating information fragmentation",
        "Reliable meeting cadence with published agendas and minutes",
        "Async-capable collaboration model supporting distributed teams",
        "Reduced coordination overhead freeing engineering time for delivery",
      ]}
      quote={{ text: "The single biggest problem in communication is the illusion that it has taken place.", source: "George Bernard Shaw" }}
    />
  );
}