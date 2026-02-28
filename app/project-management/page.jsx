// app/project-management/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ProjectManagementConsultingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["Project Management Consulting"]]}
      eyebrow="IT Consulting"
      title="Project Management Consulting"
      subtitle="Expert programme and project management for complex technology initiatives — keeping scope, schedule, budget, and stakeholders aligned from initiation to closure."
      stats={[
        { value: "98%", label: "On-time project delivery rate" },
        { value: "100+", label: "Technology projects managed" },
        { value: "PMP", label: "Certified practitioners" },
      ]}
      ctaTitle="Get your project on track"
      ctaSub="Whether starting fresh or rescuing a troubled programme — we can help."
    >
      <Label>PM consulting services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🗓️" title="Project Planning" body="Scope definition, WBS, resource planning, dependency mapping, and realistic scheduling." />
        <CapCard icon="⚠️" title="Risk Management" body="Systematic identification, assessment, and mitigation planning for project and programme risks." />
        <CapCard icon="👥" title="Stakeholder Management" body="Communication plans, escalation frameworks, and reporting cadences that keep everyone aligned." />
        <CapCard icon="🔄" title="Agile & Scrum Coaching" body="Agile transformation support, sprint facilitation, and velocity improvement for engineering teams." />
        <CapCard icon="🚑" title="Project Recovery" body="Independent assessment of troubled projects — identifying root causes and a recovery plan." />
        <CapCard icon="📋" title="PMO Setup" body="Design and implementation of a project management office: governance, tooling, and reporting standards." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our engagement approach</Label>
          <div className="space-y-6">
            <Step n="01" title="Current state review" body="We assess your project health — scope, schedule, risks, and team dynamics." />
            <Step n="02" title="Governance design" body="Decision rights, escalation paths, and reporting cadences established for the programme." />
            <Step n="03" title="Embedded management" body="Our PM works inside your project, not as an external auditor." />
            <Step n="04" title="Knowledge transfer" body="Your team leaves with documented PM processes and the capability to run future programmes independently." />
          </div>
        </div>
        <div>
          <Label>Our standards</Label>
          <CheckList items={[
            "PMBOK and PRINCE2 methodologies available",
            "Agile and hybrid delivery models",
            "Weekly status reporting as standard",
            "Independent health checks available at any stage",
            "Budget tracking with earned value analysis",
            "Lessons-learned documentation at project closure",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}