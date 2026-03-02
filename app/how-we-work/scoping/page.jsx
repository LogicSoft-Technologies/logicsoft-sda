"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { Target, FileSearch, Users, ShieldCheck } from "lucide-react";

export default function ScopingPage() {
  return (
    <HowWeWorkPage
      index={1}
      title="Project Scoping"
      description="Precise scoping is the foundation of every successful software engagement. We eliminate ambiguity before it becomes expensive — mapping requirements, boundaries, and deliverables with surgical precision."
      steps={[
        { title: "Discovery Workshop", body: "We run structured sessions with your key stakeholders to surface business goals, technical constraints, and user needs. No assumptions — everything is captured in writing." },
        { title: "Requirements Documentation", body: "Every functional and non-functional requirement is documented in a format your team can review, challenge, and sign off. Ambiguity is the enemy of good software." },
        { title: "Scope Boundary Definition", body: "We draw a clear line around what is in scope and — critically — what is explicitly out of scope. This single document prevents the majority of project disputes." },
        { title: "Stakeholder Sign-Off", body: "Before a single line of code is written, we obtain written confirmation from all decision-makers that the scope reflects agreed intent." },
      ]}
      principles={[
        { icon: Target,      title: "Goal-first thinking",  body: "We start with the business outcome, not the feature list. Every requirement traces back to a measurable goal." },
        { icon: FileSearch,  title: "Written over verbal",   body: "All agreed scope is documented. Verbal agreements are a liability. Written scope is an asset." },
        { icon: Users,       title: "All voices heard",      body: "We run inclusive discovery — operations, compliance, and end users all have a seat at the table." },
        { icon: ShieldCheck, title: "Change-ready baseline", body: "Our scope documents are versioned. When requirements evolve, we track what changed, why, and the impact." },
      ]}
      outcomes={[
        "Elimination of scope creep through explicit boundary documentation",
        "Shared understanding across business, technical, and executive teams",
        "Accurate cost and timeline estimates grounded in real requirements",
        "Reduced rework — the most expensive phase of any software project",
        "A baseline document used throughout delivery to resolve disputes",
      ]}
      quote={{ text: "The cost of fixing a requirements error found during design is 5× the cost of finding it during requirements.", source: "Software Engineering Institute, Carnegie Mellon" }}
    />
  );
}