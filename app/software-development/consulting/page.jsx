import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Consulting",
  description:
    "Software development consulting from LogicSoft Technologies, providing strategic guidance on architecture and technical decisions.",
  path: "/software-development/consulting",
});

// app/software-development/consulting/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList, fadeUp } from "@/components/ServicePageLayout";
import { motion } from "framer-motion";

export default function SoftwareConsultingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Software Development", "/software-development/services"], ["Consulting"]]}
      eyebrow="Software Development"
      title="Software Consulting"
      subtitle="Expert guidance on architecture decisions, technology selection, and engineering best practices — so your team builds the right thing, the right way, from the start."
      stats={[
        { value: "12+", label: "Years of advisory experience" },
        { value: "300+", label: "Projects shaped" },
        { value: "40+", label: "Enterprise clients advised" },
      ]}
      ctaTitle="Get expert guidance on your next project"
      ctaSub="Book a free 60-minute consultation with a LogicSoft principal engineer."
    >
      {/* Capabilities */}
      <Label>What we advise on</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🏗️" title="Architecture Review" body="We assess your current architecture for scalability, resilience, and cost efficiency — and deliver a prioritised improvement roadmap." />
        <CapCard icon="🔬" title="Technology Selection" body="Unbiased evaluation of frameworks, cloud platforms, databases, and vendors to match your context, not industry fashion." />
        <CapCard icon="⚙️" title="Engineering Process Audit" body="We review your CI/CD pipeline, code review practices, and deployment cadence to remove bottlenecks slowing delivery." />
        <CapCard icon="🔐" title="Security Posture Review" body="Early identification of vulnerabilities in design — before they become expensive production incidents." />
        <CapCard icon="💰" title="Cost Optimisation" body="Infrastructure and licensing analysis to reduce cloud spend and eliminate waste without sacrificing performance." />
        <CapCard icon="🗺️" title="Product Discovery" body="Structured workshops to define MVP scope, user flows, and technical requirements before a single line of code is written." />
      </div>

      <Divider />

      {/* Engagement model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
        <div>
          <Label>How an engagement works</Label>
          <div className="space-y-6">
            <Step n="01" title="Discovery call" body="We understand your context, constraints, and goals in a structured 60-minute session." />
            <Step n="02" title="Assessment" body="Our engineers audit your codebase, infrastructure, and processes — typically over 1–2 weeks." />
            <Step n="03" title="Findings report" body="A clear, prioritised document detailing risks, opportunities, and recommended actions." />
            <Step n="04" title="Advisory retainer (optional)" body="Ongoing access to a LogicSoft principal for quarterly reviews and ad-hoc guidance." />
          </div>
        </div>
        <div>
          <Label>What you receive</Label>
          <CheckList items={[
            "Written architecture assessment with risk ratings",
            "Technology selection matrix with rationale",
            "Prioritised engineering backlog recommendations",
            "Security findings and remediation plan",
            "30-day follow-up review call",
            "Executive summary for leadership presentation",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}