import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Functional",
  description:
    "Functional testing services from LogicSoft Technologies, verifying software behaves correctly against business requirements.",
  path: "/testing/functional",
});

// app/testing/functional/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function FunctionalTestingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["Functional Testing"]]}
      eyebrow="Testing & QA"
      title="Functional Testing"
      subtitle="Systematic verification that every feature, workflow, and user journey behaves exactly as specified — across browsers, devices, and edge cases."
      stats={[
        { value: "95%", label: "Defect detection rate" },
        { value: "Zero", label: "Critical defects in production policy" },
        { value: "Manual + automated", label: "Dual-track approach" },
      ]}
      ctaTitle="Get your application functionally tested"
      ctaSub="We'll scope a testing engagement around your release schedule."
    >
      <Label>Functional testing coverage</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="✅" title="Feature Testing" body="Verify each feature against acceptance criteria — including edge cases, boundary conditions, and error states." />
        <CapCard icon="🔄" title="Regression Testing" body="Ensure new changes don't break existing functionality — automated suite run on every build." />
        <CapCard icon="🔗" title="Integration Testing" body="Validate end-to-end workflows across system boundaries, APIs, and third-party integrations." />
        <CapCard icon="📱" title="Cross-Platform Testing" body="Browser matrix (Chrome, Firefox, Safari, Edge) and device matrix (iOS, Android, desktop) coverage." />
        <CapCard icon="♿" title="Accessibility Testing" body="WCAG 2.1 AA compliance testing — screen reader compatibility and keyboard navigation." />
        <CapCard icon="🗄️" title="Database Testing" body="Data integrity, constraint validation, and CRUD operation verification at the database layer." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Testing process</Label>
          <div className="space-y-6">
            <Step n="01" title="Test case design" body="We derive test cases from requirements, user stories, and acceptance criteria — with traceability." />
            <Step n="02" title="Environment setup" body="Test environment configuration, test data preparation, and baseline state documented." />
            <Step n="03" title="Test execution" body="Structured test runs with defect logging, severity classification, and retesting of fixes." />
            <Step n="04" title="Sign-off report" body="Test summary with pass/fail metrics, outstanding defects, and go/no-go recommendation." />
          </div>
        </div>
        <div>
          <Label>Deliverables</Label>
          <CheckList items={[
            "Test plan and test case documentation",
            "Traceability matrix linking tests to requirements",
            "Defect report with screenshots and reproduction steps",
            "Test execution summary report",
            "Reusable test case library for future regression",
            "Go/no-go release recommendation",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}