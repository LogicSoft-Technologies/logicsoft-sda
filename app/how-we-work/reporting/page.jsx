"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { FileText, Clock, Users, TrendingUp } from "lucide-react";

export default function ReportingPage() {
  return (
    <HowWeWorkPage
      index={7}
      title="Project Reporting"
      description="Reporting is not bureaucracy — it's visibility. Our reporting structure gives every stakeholder the information they need, at the frequency they need it, in the format they can act on."
      steps={[
        { title: "Sprint Reports", body: "At the close of every sprint we deliver a written report covering: completed work, velocity, blockers encountered, and planned next sprint. Delivered within 24 hours of sprint close." },
        { title: "Monthly Steering Reports", body: "Monthly executive reports covering: budget burn, milestone status, risk register summary, change log, and forward look. Designed for C-suite consumption." },
        { title: "Quality Reports", body: "Bi-weekly quality metrics including: defect rate, test coverage, code review velocity, and technical debt indicators. Delivered to your technical lead." },
        { title: "Project Closure Report", body: "At project close we deliver a comprehensive final report covering: delivery against scope, KPI achievement, lessons learned, and handover documentation." },
      ]}
      principles={[
        { icon: FileText,   title: "Written, not verbal",   body: "All reports are delivered in writing. Verbal updates have no audit trail and degrade with every re-telling." },
        { icon: Clock,      title: "Scheduled, not ad hoc", body: "Reports are delivered on predictable schedules. Stakeholders shouldn't need to chase for information." },
        { icon: Users,      title: "Audience-appropriate",  body: "Developers need technical detail. Executives need business impact. We write for the reader, not the reporter." },
        { icon: TrendingUp, title: "Trend-focused",         body: "A single data point is noise. Trends tell the story. Every report surfaces trend data, not just current state." },
      ]}
      outcomes={[
        "Complete written record of project progress from inception to close",
        "Predictable reporting cadence eliminating stakeholder anxiety",
        "Audience-segmented reports reducing noise for every stakeholder type",
        "Early warning capability through trend-based reporting",
        "Compliance-ready project documentation for regulated industries",
      ]}
      quote={{ text: "Transparency is not a weakness. Lack of transparency is.", source: "LogicSoft Engineering Principles" }}
    />
  );
}