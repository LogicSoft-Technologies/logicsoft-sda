"use client";
// app/it-consulting/enterprise/page.jsx

import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function EnterpriseITConsultingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["Enterprise IT Consulting"]]}
      eyebrow="IT Consulting"
      title="Enterprise IT Consulting"
      subtitle="Strategic technology advisory for large organisations — aligning IT investment to business outcomes, governing complex programmes, and building technology capability at scale."
      stats={[
        { value: "20+", label: "Enterprise clients served" },
        { value: "C-suite", label: "Engagement level" },
        { value: "Africa & EMEA", label: "Geographic coverage" },
      ]}
      ctaTitle="Engage our enterprise advisory team"
      ctaSub="Executive-level consultation on your technology strategy and investment."
    >
      <Label>Enterprise consulting services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🎯" title="IT Strategy" body="Technology strategy aligned to business objectives — investment priorities, capability roadmaps, and governance frameworks." />
        <CapCard icon="🏗️" title="Enterprise Architecture" body="Business, data, application, and technology architecture designed to reduce complexity and enable agility." />
        <CapCard icon="💼" title="Technology M&A Advisory" body="Technical due diligence, integration planning, and post-merger technology rationalisation." />
        <CapCard icon="📊" title="IT Portfolio Management" body="Investment rationalisation, project portfolio governance, and benefits realisation tracking." />
        <CapCard icon="👥" title="IT Operating Model" body="Design of the IT function — structure, roles, sourcing strategy, and ways of working." />
        <CapCard icon="🔐" title="Enterprise Risk & Compliance" body="Technology risk framework, regulatory compliance strategy, and board-level reporting." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Enterprise engagement structure</Label>
          <div className="space-y-6">
            <Step n="01" title="Executive alignment" body="C-suite session to understand strategic priorities and frame the technology agenda." />
            <Step n="02" title="Current state assessment" body="Comprehensive review of IT portfolio, architecture, organisation, and governance." />
            <Step n="03" title="Strategy development" body="Target state definition, investment roadmap, and business case development." />
            <Step n="04" title="Advisory retainer" body="Ongoing strategic advisory — quarterly reviews, ad-hoc guidance, and programme oversight." />
          </div>
        </div>
        <div>
          <Label>Why enterprise leaders choose LogicSoft</Label>
          <CheckList items={[
            "Access to principals with enterprise CTO/CIO experience",
            "Deep Africa and EMEA technology market knowledge",
            "Independent advice — no software vendor relationships",
            "Practical — recommendations grounded in delivery experience",
            "Confidential — full NDA coverage as standard",
            "Available for board presentation and investor briefings",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}