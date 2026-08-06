import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Testing",
  description:
    "Application testing services from LogicSoft Technologies, covering functional, performance, and security testing.",
  path: "/application/testing",
});

// app/application/testing/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ApplicationTestingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Application Testing"]]}
      eyebrow="Application Services"
      title="Application Testing"
      subtitle="Comprehensive testing across functional, performance, security, and usability dimensions — so applications reach production ready to handle real users at scale."
      stats={[
        { value: "95%", label: "Defect detection rate before go-live" },
        { value: "Zero", label: "Critical defect policy in production" },
        { value: "80%+", label: "Test automation target for all projects" },
      ]}
      ctaTitle="Get your application professionally tested"
      ctaSub="Embedded QA or standalone testing engagements available."
    >
      <Label>Testing services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="✅" title="Functional Testing" body="Verify that every feature behaves exactly as specified — manual and automated across browsers and devices." />
        <CapCard icon="⚡" title="Performance Testing" body="Load, stress, and endurance testing to validate behaviour under peak traffic conditions." />
        <CapCard icon="🔐" title="Security Testing" body="OWASP Top 10 validation, pen testing, and static analysis to identify exploitable vulnerabilities." />
        <CapCard icon="👤" title="Usability Testing" body="Real-user sessions with structured protocols to identify UX friction before launch." />
        <CapCard icon="🤖" title="Test Automation" body="Playwright, Cypress, Selenium, and Appium automation suites that run in your CI/CD pipeline." />
        <CapCard icon="📱" title="Cross-Platform Testing" body="Browser matrix, device matrix, and OS coverage testing to ensure consistent experiences." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Testing process</Label>
          <div className="space-y-6">
            <Step n="01" title="Test planning" body="Test strategy, scope definition, risk-based prioritisation, and toolchain selection." />
            <Step n="02" title="Test design" body="Test cases, automation scripts, and performance scenarios mapped to requirements." />
            <Step n="03" title="Execution & reporting" body="Test runs with real-time defect logging and daily progress reports during testing cycles." />
            <Step n="04" title="Sign-off" body="Go/no-go recommendation with defect severity analysis and risk acceptance guidance." />
          </div>
        </div>
        <div>
          <Label>Deliverables</Label>
          <CheckList items={[
            "Test strategy and test plan documentation",
            "Full test case library for future regression use",
            "Automated test suite committed to your repository",
            "Defect report with severity, reproduction steps, and screenshots",
            "Performance test results with baseline benchmarks",
            "Final QA sign-off report",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}