// app/application/support/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ApplicationSupportPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Maintenance & Support"]]}
      eyebrow="Application Services"
      title="Application Maintenance & Support"
      subtitle="Structured, SLA-backed support that keeps your applications healthy, secure, and improving — without the overhead of a full in-house operations team."
      stats={[
        { value: "99.9%", label: "Uptime SLA available" },
        { value: "<2hr", label: "Critical response time" },
        { value: "30-day", label: "Minimum contract term" },
      ]}
      ctaTitle="Set up a support structure"
      ctaSub="We'll design a maintenance plan that matches your criticality and budget."
    >
      <Label>What's covered</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🐛" title="Bug Fixes" body="Prioritised resolution of functional defects — critical issues addressed within agreed SLA windows." />
        <CapCard icon="🔒" title="Security Updates" body="Dependency patching, vulnerability remediation, and security advisory monitoring." />
        <CapCard icon="📈" title="Performance Tuning" body="Query optimisation, caching improvements, and infrastructure right-sizing based on usage patterns." />
        <CapCard icon="♻️" title="Minor Enhancements" body="Feature updates, UI improvements, and configuration changes — included in monthly support hours." />
        <CapCard icon="👀" title="Proactive Monitoring" body="Uptime, error rate, and performance monitoring with alerting before users notice degradation." />
        <CapCard icon="📋" title="Compliance Maintenance" body="Ongoing GDPR, PCI-DSS, and ISO 27001 hygiene — keeping certifications current." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Support tiers</Label>
          <div className="space-y-6">
            <Step n="01" title="Standard (Business hours)" body="8-hour SLA on critical issues. Bug fixes and minor updates. Monthly health report." />
            <Step n="02" title="Priority (Extended hours)" body="4-hour SLA on critical issues. Proactive monitoring. Quarterly optimisation review." />
            <Step n="03" title="Enterprise (24/7)" body="1-hour SLA on critical issues. Dedicated on-call engineer. Named account manager. Incident post-mortems." />
          </div>
        </div>
        <div>
          <Label>Included in all tiers</Label>
          <CheckList items={[
            "Named support engineer familiar with your codebase",
            "Dedicated support channel (Slack or email)",
            "Monthly SLA compliance report",
            "Security vulnerability scanning and patching",
            "Documented runbooks for all operational tasks",
            "Annual architecture review",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}