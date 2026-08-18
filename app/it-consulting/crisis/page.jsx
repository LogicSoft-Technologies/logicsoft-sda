"use client";
// app/it-consulting/crisis/page.jsx
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function CrisisManagementPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["Crisis Management"]]}
      eyebrow="IT Consulting"
      title="IT Crisis Management"
      subtitle="Rapid response when technology failures, security breaches, or major project failures threaten your operations. We stabilise, investigate, and restore — fast."
      stats={[
        { value: "<4hr", label: "Initial response time" },
        { value: "24/7", label: "Crisis response availability" },
        { value: "100%", label: "Client operations restored" },
      ]}
      ctaTitle="Need immediate crisis support?"
      ctaSub="Contact us now — we respond within 4 hours, 24/7."
    >
      <Label>Crisis scenarios we handle</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔴" title="Production Outages" body="Major system failures, database corruption, and service unavailability — rapid diagnosis and restoration." />
        <CapCard icon="🔐" title="Security Breaches" body="Active incident response for ransomware, data breaches, and unauthorised access events." />
        <CapCard icon="💸" title="Failed Projects" body="Programme rescue — independent diagnosis, recovery planning, and stabilisation for troubled delivery." />
        <CapCard icon="📉" title="Data Loss Events" body="Emergency data recovery, backup restoration, and forensic analysis of data loss incidents." />
        <CapCard icon="⚡" title="Infrastructure Failures" body="Cloud region outages, network failures, and hardware incidents — failover and continuity support." />
        <CapCard icon="⚖️" title="Regulatory Events" body="Emergency compliance remediation and legal hold management following regulatory notifications." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our crisis response process</Label>
          <div className="space-y-6">
            <Step n="01" title="Immediate response (<4hrs)" body="Crisis lead assigned. Situation scoped. Command structure established. War room opened." />
            <Step n="02" title="Stabilisation (hours 4–24)" body="Contain the immediate damage. Restore critical services. Communicate with stakeholders." />
            <Step n="03" title="Investigation (days 1–7)" body="Root cause analysis. Impact assessment. Evidence preservation. Recovery roadmap produced." />
            <Step n="04" title="Recovery & hardening (week 2+)" body="Full restoration. Remediation of root cause. Process improvements to prevent recurrence." />
          </div>
        </div>
        <div>
          <Label>What to do right now</Label>
          <CheckList items={[
            "Call our crisis line — do not send email for active incidents",
            "Do not shut down affected systems before forensic capture",
            "Preserve logs and system state as-is",
            "Identify and brief your internal incident lead",
            "Notify your legal counsel if data is involved",
            "Begin a timeline log of events and actions taken",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}