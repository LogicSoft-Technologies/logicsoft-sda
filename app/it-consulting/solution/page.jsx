import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Solution",
  description:
    "Solution consulting from LogicSoft Technologies, designing technology solutions aligned to specific business challenges.",
  path: "/it-consulting/solution",
});

// app/it-consulting/solution/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function SolutionConsultingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["Solution Consulting"]]}
      eyebrow="IT Consulting"
      title="Solution Consulting"
      subtitle="We help you select, design, and implement technology solutions to specific business problems — with vendor-neutral analysis and real implementation experience."
      stats={[
        { value: "Vendor-neutral", label: "No commission, no bias" },
        { value: "50+", label: "Solution assessments delivered" },
        { value: "£0", label: "Referral fees accepted" },
      ]}
      ctaTitle="Get an independent solution assessment"
      ctaSub="We'll evaluate your options and recommend what's right for your situation."
    >
      <Label>What solution consulting covers</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔍" title="Requirements Analysis" body="Structured elicitation of functional, non-functional, and integration requirements from stakeholders." />
        <CapCard icon="⚖️" title="Vendor Evaluation" body="Objective comparison of platform options against your requirements — not a vendor's capabilities brochure." />
        <CapCard icon="🏗️" title="Solution Architecture" body="Reference architecture design that fits your technology landscape and growth trajectory." />
        <CapCard icon="💰" title="TCO Analysis" body="Total cost of ownership modelling — including hidden implementation, integration, and training costs." />
        <CapCard icon="🛤️" title="Implementation Roadmap" body="Sequenced delivery plan with risk identification and mitigation strategies at each phase." />
        <CapCard icon="🤝" title="Implementation Support" body="Hands-on delivery support for the selected solution — from configuration through to go-live." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our consulting process</Label>
          <div className="space-y-6">
            <Step n="01" title="Problem definition" body="We start with the business problem, not the technology solution — and challenge assumptions early." />
            <Step n="02" title="Options analysis" body="We evaluate build vs buy, platform options, and integration complexity with structured scoring." />
            <Step n="03" title="Recommendation" body="A written recommendation with rationale, risk assessment, and implementation considerations." />
            <Step n="04" title="Delivery (optional)" body="We can implement the recommended solution — or support your team to do so." />
          </div>
        </div>
        <div>
          <Label>Why clients choose us for solution consulting</Label>
          <CheckList items={[
            "No vendor relationships that influence our advice",
            "Real implementation experience — not just theoretical frameworks",
            "Written deliverables, not just workshops",
            "Fixed-fee engagements with clear scope",
            "Available to support implementation after recommendation",
            "References available from similar solution assessments",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}