"use client";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import { Users, Star, BarChart2, RefreshCw } from "lucide-react";

export default function ResourcesPage() {
  return (
    <HowWeWorkPage
      index={2}
      title="Resource Planning"
      description="The right team composition is as important as the right technology. We build right-sized, skill-matched teams — and maintain them throughout the engagement with zero disruption to delivery."
      steps={[
        { title: "Role Identification", body: "Based on agreed scope, we identify every role needed — frontend, backend, QA, DevOps, architecture, and management — with explicit seniority requirements." },
        { title: "Candidate Matching", body: "We match candidates against technical and domain requirements. For specialised roles we draw from a vetted network of 400+ senior engineers across Africa, Europe, and the Middle East." },
        { title: "Team Composition", body: "We balance seniority, specialisation, and team dynamics. An overloaded senior team is as inefficient as an under-skilled one. Right-sizing is a discipline." },
        { title: "Onboarding & Continuity", body: "Every team member is onboarded to your codebase, tooling, and processes before contributing. We maintain a shadow bench to cover attrition without delivery impact." },
      ]}
      principles={[
        { icon: Users,     title: "Right-sized teams",     body: "We resist the temptation to over-staff. Small, focused teams outperform large, diffuse ones in software delivery." },
        { icon: Star,      title: "Seniority balance",     body: "We pair senior engineers with strong mid-level contributors. Pure senior teams are cost-inefficient; pure junior teams create risk." },
        { icon: BarChart2, title: "Capacity transparency", body: "You see who is working on your project, at what capacity, and at what cost. No black boxes." },
        { icon: RefreshCw, title: "Continuity planning",   body: "People leave. We plan for it. Shadow benching and knowledge documentation mean attrition never stops delivery." },
      ]}
      outcomes={[
        "Right-sized team matched to scope — no bloat, no gaps",
        "Transparent capacity allocation with named team members",
        "Attrition-resilient structure with maintained delivery continuity",
        "Domain-matched seniority reducing architecture and quality risk",
        "Faster onboarding through structured knowledge transfer protocols",
      ]}
      quote={{ text: "Adding manpower to a late software project makes it later.", source: "Fred Brooks, The Mythical Man-Month" }}
    />
  );
}