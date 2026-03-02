"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { AlertTriangle, Search, Shield, Activity } from "lucide-react";

export default function RiskManagementPage() {
  return (
    <HowWeWorkPage
      index={4}
      title="Risk Management"
      description="Risks don't disappear by being ignored. We surface them early, quantify their impact, and implement controls — converting unknown unknowns into managed variables before they become incidents."
      steps={[
        { title: "Risk Identification", body: "At project inception we run a structured risk workshop — technical, organisational, external, and delivery risks are catalogued and scored by probability and impact." },
        { title: "Risk Quantification", body: "Each risk is assigned a probability, an impact rating, and an expected monetary value. This moves risk from feeling to fact." },
        { title: "Mitigation Planning", body: "For every high and medium risk we define a mitigation action, an owner, and a deadline. Unowned risks are unmanaged risks." },
        { title: "Continuous Monitoring", body: "The risk register is reviewed at every sprint review and steering committee. New risks are added; resolved risks are closed. The register is never a one-time document." },
      ]}
      principles={[
        { icon: AlertTriangle, title: "Early identification",   body: "Risks found in planning cost 10× less to address than risks found in production. We invest heavily in early discovery." },
        { icon: Search,        title: "Quantified not qualitative", body: "High/Medium/Low is not enough. We assign numeric probability and impact scores to enable objective prioritisation." },
        { icon: Shield,        title: "Owned mitigations",     body: "Every mitigation has a named owner and a due date. Anonymous actions don't get done." },
        { icon: Activity,      title: "Living register",       body: "The risk register is updated continuously, not quarterly. Projects change; risk profiles change with them." },
      ]}
      outcomes={[
        "Structured risk register maintained throughout the project lifecycle",
        "Early warning system identifying threats before they impact delivery",
        "Quantified risk exposure enabling informed executive decision-making",
        "Explicit mitigation ownership with accountability tracking",
        "Significant reduction in late-stage surprises and emergency escalations",
      ]}
      quote={{ text: "Risk comes from not knowing what you're doing.", source: "Warren Buffett" }}
    />
  );
}