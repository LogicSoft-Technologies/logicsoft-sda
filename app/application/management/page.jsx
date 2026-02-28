// app/application/management/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ApplicationManagementPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Application Management"]]}
      eyebrow="Application Services"
      title="Application Management"
      subtitle="We take responsibility for the day-to-day operation, performance, and evolution of your applications — so your team can focus on building the future, not maintaining the present."
      stats={[
        { value: "99.9%", label: "Uptime SLA" },
        { value: "<2hr", label: "P1 incident response" },
        { value: "24/7", label: "Monitoring & alerting" },
      ]}
      ctaTitle="Hand off application management"
      ctaSub="We'll design a management structure around your criticality, budget, and team size."
    >
      <Label>Management scope</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="📊" title="Performance Monitoring" body="Real-time dashboards, latency tracking, error rate alerting, and database query analysis — always-on visibility." />
        <CapCard icon="🔒" title="Security Patching" body="Dependency vulnerability scanning, OS patches, and security updates applied on a structured cadence." />
        <CapCard icon="💾" title="Backup & Recovery" body="Automated backups, regular recovery drills, and documented RTO/RPO commitments." />
        <CapCard icon="📈" title="Capacity Management" body="Proactive scaling recommendations and infrastructure right-sizing based on usage trends." />
        <CapCard icon="🔧" title="Incident Management" body="Structured triage, root cause analysis, and post-incident reviews for every P1 and P2 event." />
        <CapCard icon="📋" title="Change Management" body="Controlled deployment process with change advisory, rollback procedures, and audit trail." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Onboarding your application</Label>
          <div className="space-y-6">
            <Step n="01" title="Application assessment" body="We document architecture, dependencies, known risks, and operational runbooks." />
            <Step n="02" title="Monitoring setup" body="Instrumentation, alerting thresholds, and escalation paths configured and tested." />
            <Step n="03" title="Handover period" body="2–4 weeks of joint operation before full management transfer." />
            <Step n="04" title="Ongoing management" body="Monthly reviews, quarterly optimisation reports, and a named account manager for your team." />
          </div>
        </div>
        <div>
          <Label>Reporting & transparency</Label>
          <CheckList items={[
            "Monthly SLA compliance report",
            "Incident log with root cause and resolution times",
            "Security vulnerability summary",
            "Capacity and cost trends",
            "Planned change schedule",
            "Quarterly strategic review with your leadership",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}