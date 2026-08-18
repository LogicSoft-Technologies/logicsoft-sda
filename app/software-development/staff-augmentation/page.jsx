"use client";
// app/software-development/staff-augmentation/page.jsx
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function StaffAugmentationPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Software Development", "/software-development/services"], ["Team Augmentation"]]}
      eyebrow="Software Development"
      title="Team Augmentation"
      subtitle="Extend your engineering team with senior LogicSoft engineers — embedded in your workflow, tools, and culture, without the overhead of permanent hiring."
      stats={[
        { value: "48hr", label: "Average onboarding time" },
        { value: "50+", label: "Engineers available across specialisms" },
        { value: "30-day", label: "Notice period — no lock-in" },
      ]}
      ctaTitle="Expand your team this week"
      ctaSub="Tell us the skills you need and we'll match you within 24 hours."
    >
      <Label>Roles we place</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="💻" title="Frontend Engineers" body="React, Next.js, Vue — pixel-perfect, accessible, and performant UI engineering." />
        <CapCard icon="⚙️" title="Backend Engineers" body="Node.js, Python, Go, Java — API design, database architecture, and service integration." />
        <CapCard icon="☁️" title="Cloud & DevOps Engineers" body="AWS, Azure, GCP, Kubernetes, Terraform — infrastructure that scales and stays available." />
        <CapCard icon="📱" title="Mobile Engineers" body="React Native, Flutter, Swift, Kotlin — cross-platform or native mobile expertise." />
        <CapCard icon="🔐" title="Security Engineers" body="Application security, pen testing, SIEM integration, and compliance readiness." />
        <CapCard icon="🧪" title="QA Engineers" body="Manual and automated testing, performance testing, and test strategy design." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>How augmentation works</Label>
          <div className="space-y-6">
            <Step n="01" title="Skills brief" body="You tell us exactly what you need — stack, seniority level, domain knowledge, timezone." />
            <Step n="02" title="Candidate matching" body="We surface 2–3 matched engineers within 24 hours. You interview and decide." />
            <Step n="03" title="Onboarding" body="The engineer joins your Slack, GitHub, and planning tools. Full integration, no friction." />
            <Step n="04" title="Ongoing oversight" body="A LogicSoft technical lead stays available for escalations and performance reviews." />
          </div>
        </div>
        <div>
          <Label>Why teams choose augmentation</Label>
          <CheckList items={[
            "No recruitment fees, job boards, or lengthy hiring cycles",
            "Senior engineers — not juniors padded by an agency",
            "You control priorities; we ensure quality and delivery",
            "Scale up or down each month with 30-day notice",
            "Full IP and confidentiality protection",
            "Optional: transition engineer to full-time hire",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}