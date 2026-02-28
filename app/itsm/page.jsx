// app/itsm/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ITSMPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["IT Service Management"]]}
      eyebrow="IT Consulting"
      title="IT Service Management"
      subtitle="We design, implement, and optimise ITSM frameworks that make IT a strategic enabler — with clear service catalogues, efficient processes, and measurable outcomes."
      stats={[
        { value: "ITIL", label: "v4 certified practitioners" },
        { value: "40%", label: "Average incident resolution improvement" },
        { value: "20+", label: "ITSM implementations completed" },
      ]}
      ctaTitle="Modernise your IT service delivery"
      ctaSub="Free ITSM maturity assessment — benchmarked against ITIL best practices."
    >
      <Label>ITSM capabilities</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="📋" title="Service Catalogue Design" body="Define, document, and publish IT services with clear ownership, SLAs, and request processes." />
        <CapCard icon="🔄" title="Incident Management" body="Structured triage, escalation, and resolution processes that reduce MTTR and improve user experience." />
        <CapCard icon="🔧" title="Change Management" body="Change advisory board, change calendar, and risk assessment processes to prevent failed changes." />
        <CapCard icon="🔍" title="Problem Management" body="Proactive root cause analysis and known error management to eliminate recurring incidents." />
        <CapCard icon="📊" title="Service Level Management" body="SLA definition, monitoring, and reporting — holding IT accountable to commitments." />
        <CapCard icon="🏢" title="ITSM Tooling" body="ServiceNow, Jira Service Management, and Freshdesk implementation and optimisation." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Implementation approach</Label>
          <div className="space-y-6">
            <Step n="01" title="Maturity assessment" body="Baseline your current ITSM processes against ITIL v4 best practice." />
            <Step n="02" title="Process design" body="Right-sized processes for your organisation — not ITIL by-the-book for the sake of it." />
            <Step n="03" title="Tooling configuration" body="Your chosen ITSM platform configured to support the designed processes." />
            <Step n="04" title="Training & adoption" body="Role-specific training and a 90-day adoption programme to embed the new ways of working." />
          </div>
        </div>
        <div>
          <Label>Outcomes delivered</Label>
          <CheckList items={[
            "Published service catalogue with defined SLAs",
            "Documented incident, change, and problem processes",
            "ITSM tooling configured and live",
            "Team trained on new processes and tools",
            "KPI dashboard for ongoing service performance",
            "Monthly service review cadence established",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}