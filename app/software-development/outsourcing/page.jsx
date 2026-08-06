import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Outsourcing",
  description:
    "Software development outsourcing from LogicSoft Technologies, giving you dedicated engineering teams without the overhead of hiring.",
  path: "/software-development/outsourcing",
});

// app/software-development/outsourcing/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function SoftwareOutsourcingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Software Development", "/software-development/services"], ["Outsourcing"]]}
      eyebrow="Software Development"
      title="Software Outsourcing"
      subtitle="Delegate your software development to a trusted partner — and focus your internal team on strategy, product decisions, and customer relationships."
      stats={[
        { value: "40+", label: "Active outsourcing partnerships" },
        { value: "60%", label: "Average cost saving vs. in-house hiring" },
        { value: "48hr", label: "Typical team onboarding time" },
      ]}
      ctaTitle="Explore our outsourcing models"
      ctaSub="Flexible engagement structures to match your budget and workload."
    >
      <Label>Outsourcing models</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🎯" title="Project-Based" body="Fixed scope, fixed timeline, fixed price. We deliver a defined outcome and hand it over. Best for well-scoped initiatives." />
        <CapCard icon="🔄" title="Dedicated Team" body="A full engineering squad works exclusively on your product — developers, QA, and a project manager embedded in your workflow." />
        <CapCard icon="📈" title="On-Demand Capacity" body="Flexible resource allocation that scales with sprint demand. No headcount risk, no notice periods." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>How we work with your team</Label>
          <div className="space-y-6">
            <Step n="01" title="Alignment workshop" body="We learn your codebase, tools, branching strategy, and communication preferences before we write a single line." />
            <Step n="02" title="Team assembly" body="Engineers matched to your stack and domain — typically onboarded within 48 hours of contract signature." />
            <Step n="03" title="Integrated delivery" body="We work inside your Jira, GitHub, and Slack. Daily standups, sprint reviews, and regular demos." />
            <Step n="04" title="Transparent reporting" body="Weekly progress reports, velocity tracking, and escalation paths if anything drifts from plan." />
          </div>
        </div>
        <div>
          <Label>What's included</Label>
          <CheckList items={[
            "Vetted senior and mid-level engineers",
            "Dedicated project manager and technical lead",
            "Full integration with your existing tools and processes",
            "Code reviews and quality gates on every PR",
            "IP and NDA protection as standard",
            "Month-to-month contracts with 30-day notice period",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}