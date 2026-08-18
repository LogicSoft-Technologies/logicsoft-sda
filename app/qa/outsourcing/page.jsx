"use client";
// app/qa/outsourcing/page.jsx
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function QAOutsourcingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["QA Outsourcing"]]}
      eyebrow="Testing & QA"
      title="QA Outsourcing"
      subtitle="Full transfer of quality assurance ownership to LogicSoft — embedding a dedicated QA function that runs in parallel with your development team, not after it."
      stats={[
        { value: "95%", label: "Defect detection before production" },
        { value: "Zero", label: "Critical defect policy" },
        { value: "48hr", label: "Team onboarding time" },
      ]}
      ctaTitle="Outsource your QA function"
      ctaSub="We'll assess your testing needs and propose an engagement structure."
    >
      <Label>Outsourcing models</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🎯" title="Dedicated QA Team" body="A full QA squad — test leads, manual testers, and automation engineers — working exclusively on your product." />
        <CapCard icon="🔄" title="Embedded QA" body="QA engineers placed inside your existing development teams. Shift-left testing from requirements to release." />
        <CapCard icon="⚡" title="Release QA" body="Sprint-by-sprint testing engagements — activated for each release cycle, scaled to the work in scope." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>What our QA team does</Label>
          <div className="space-y-6">
            <Step n="01" title="Test strategy & planning" body="Risk-based test strategy, test case library, and toolchain selection at the start of each release." />
            <Step n="02" title="Functional testing" body="Manual and automated functional test execution against acceptance criteria." />
            <Step n="03" title="Regression testing" body="Automated regression suite run on every build — protecting against regressions from new features." />
            <Step n="04" title="Release sign-off" body="Go/no-go recommendation with defect severity analysis and documented test evidence." />
          </div>
        </div>
        <div>
          <Label>What's included</Label>
          <CheckList items={[
            "Dedicated test lead as your quality partner",
            "Full test case library maintained and versioned",
            "Automated regression suite in your CI/CD pipeline",
            "Defect management with priority and severity tracking",
            "Weekly quality reports with trend analysis",
            "Release readiness reports for each sprint",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}