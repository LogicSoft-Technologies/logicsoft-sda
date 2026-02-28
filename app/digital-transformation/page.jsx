// app/digital-transformation/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function DigitalTransformationPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["Digital Transformation"]]}
      eyebrow="IT Consulting"
      title="Digital Transformation"
      subtitle="We help organisations systematically modernise their people, processes, and technology — replacing manual effort with scalable digital capability that compounds over time."
      stats={[
        { value: "40+", label: "Transformation programmes delivered" },
        { value: "3–18", label: "Month programme duration" },
        { value: "55%", label: "Average operational efficiency gain" },
      ]}
      ctaTitle="Start your transformation journey"
      ctaSub="We'll assess your digital maturity and map a realistic transformation roadmap."
    >
      <Label>Transformation focus areas</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="⚙️" title="Process Digitalisation" body="Convert paper-based and manual processes into automated, auditable digital workflows." />
        <CapCard icon="📊" title="Data-Driven Operations" body="Build the data infrastructure, dashboards, and analytical capability to make decisions from evidence, not intuition." />
        <CapCard icon="☁️" title="Cloud Adoption" body="Migrate on-premise workloads to cloud platforms — reducing infrastructure cost and increasing operational agility." />
        <CapCard icon="🤝" title="Customer Experience" body="Replace fragmented customer journeys with unified digital touchpoints that drive satisfaction and retention." />
        <CapCard icon="🔐" title="Security & Compliance" body="Build enterprise-grade security posture as a foundation, not an afterthought." />
        <CapCard icon="👥" title="Change Management" body="Training, communication, and adoption programmes that make transformation stick with your people." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our transformation framework</Label>
          <div className="space-y-6">
            <Step n="01" title="Digital maturity assessment" body="We benchmark your current state against industry peers and identify the highest-value opportunities." />
            <Step n="02" title="Roadmap design" body="A sequenced programme with clear milestones, business cases, and success metrics for each initiative." />
            <Step n="03" title="Pilot & validate" body="Start with a bounded pilot — prove the value, learn the change dynamics, then scale." />
            <Step n="04" title="Scale & embed" body="Systematic rollout with change management support and measurement at each stage." />
          </div>
        </div>
        <div>
          <Label>What makes transformation succeed</Label>
          <CheckList items={[
            "Executive sponsorship secured before programme launch",
            "Business value quantified and tracked throughout",
            "User adoption measured, not assumed",
            "Technology decisions separated from vendor sales cycles",
            "Iterative delivery — not a 3-year big-bang programme",
            "Internal capability built, not dependency created",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}