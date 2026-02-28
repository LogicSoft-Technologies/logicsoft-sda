// app/qa/consulting/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function QAConsultingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["QA Consulting"]]}
      eyebrow="Testing & QA"
      title="QA Consulting"
      subtitle="Expert guidance on test strategy, toolchain selection, automation architecture, and quality engineering processes — for teams that want to own their quality function better."
      stats={[
        { value: "50+", label: "QA assessments delivered" },
        { value: "80%+", label: "Target automation coverage" },
        { value: "QA maturity", label: "Framework-led approach" },
      ]}
      ctaTitle="Improve your quality engineering"
      ctaSub="Free QA maturity assessment — benchmarked against industry best practice."
    >
      <Label>QA consulting services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔍" title="QA Maturity Assessment" body="Benchmark your current testing practices, identify gaps, and receive a prioritised improvement roadmap." />
        <CapCard icon="🏗️" title="Test Strategy Design" body="Risk-based test strategy aligned to your product type, release cadence, and team structure." />
        <CapCard icon="🤖" title="Automation Architecture" body="Framework selection, tool evaluation, and automation pyramid design for your specific context." />
        <CapCard icon="📋" title="Process Improvement" body="Shift-left testing practices, definition of done criteria, and QA integration into CI/CD pipelines." />
        <CapCard icon="👥" title="Team Capability Building" body="Coaching, training, and mentoring for your QA engineers — building internal expertise permanently." />
        <CapCard icon="📊" title="Quality Metrics" body="KPI framework design — defect escape rate, test coverage, mean time to detect, and more." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Consulting engagement structure</Label>
          <div className="space-y-6">
            <Step n="01" title="Assessment (week 1–2)" body="We review your current testing practices, toolchain, and team capability." />
            <Step n="02" title="Findings & roadmap (week 3)" body="Prioritised recommendations and a 90-day improvement plan." />
            <Step n="03" title="Implementation support (weeks 4–12)" body="Hands-on support implementing the recommended changes alongside your team." />
            <Step n="04" title="Capability transfer" body="Your team left with the knowledge and tools to sustain improvements independently." />
          </div>
        </div>
        <div>
          <Label>Deliverables</Label>
          <CheckList items={[
            "QA maturity assessment report with scores",
            "Test strategy document for your product",
            "Automation framework recommendation with rationale",
            "90-day improvement roadmap",
            "QA metrics dashboard design",
            "Team training materials and coaching sessions",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}