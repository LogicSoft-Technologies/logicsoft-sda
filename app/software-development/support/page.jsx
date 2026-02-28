// app/software-development/support/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function PostLaunchSupportPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Software Development", "/software-development/services"], ["Post-Launch Support"]]}
      eyebrow="Software Development"
      title="Post-Launch Support"
      subtitle="Software doesn't stop needing attention after go-live. We provide structured support, monitoring, and continuous improvement to keep your systems running at peak."
      stats={[
        { value: "99.9%", label: "Uptime SLA available" },
        { value: "<2hr", label: "Critical incident response time" },
        { value: "24/7", label: "Monitoring for enterprise clients" },
      ]}
      ctaTitle="Protect your production systems"
      ctaSub="Let's define a support structure that matches your criticality and budget."
    >
      <Label>Support tiers</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🟢" title="Standard Support" body="Business-hours coverage. Bug fixes, minor enhancements, and quarterly performance reviews. Response within 8 hours." />
        <CapCard icon="🟡" title="Priority Support" body="Extended hours coverage with 4-hour SLA for critical issues. Monthly health reports and proactive monitoring." />
        <CapCard icon="🔴" title="Enterprise Support" body="24/7 coverage, dedicated on-call engineer, 1-hour SLA for P1 incidents, and a named account manager." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>What's covered</Label>
          <div className="space-y-6">
            <Step n="01" title="Incident response" body="Rapid triage, root cause analysis, and resolution — with a post-incident report for every P1 event." />
            <Step n="02" title="Proactive monitoring" body="Uptime, error rates, performance metrics, and security events monitored continuously." />
            <Step n="03" title="Patch management" body="Dependency updates, security patches, and infrastructure upgrades applied on a regular cadence." />
            <Step n="04" title="Continuous improvement" body="Quarterly roadmap of technical debt reduction, performance wins, and reliability improvements." />
          </div>
        </div>
        <div>
          <Label>What you get</Label>
          <CheckList items={[
            "Named support engineer who knows your codebase",
            "Dedicated Slack channel for support requests",
            "Monthly uptime and performance reports",
            "Documented runbooks for all common operational tasks",
            "Annual architecture review included",
            "Proactive alerting before users notice issues",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}