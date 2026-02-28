// app/testing/automation/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function TestAutomationPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["Test Automation"]]}
      eyebrow="Testing & QA"
      title="Test Automation"
      subtitle="We build fast, maintainable, and reliable automation suites that run in your CI/CD pipeline — giving your team continuous confidence in every build."
      stats={[
        { value: "80%+", label: "Automation coverage target" },
        { value: "5min", label: "Target smoke suite runtime" },
        { value: "Zero", label: "Flaky test tolerance policy" },
      ]}
      ctaTitle="Automate your test suite"
      ctaSub="We'll assess your automation readiness and design a framework that fits your stack."
    >
      <Label>Automation capabilities</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🌐" title="Web UI Automation" body="Playwright and Cypress automation for web applications — reliable, fast, and cross-browser." />
        <CapCard icon="📱" title="Mobile Automation" body="Appium, Detox, and XCUITest automation for iOS and Android — native and hybrid apps." />
        <CapCard icon="🔗" title="API Automation" body="REST and GraphQL API test suites in Playwright, Postman/Newman, or RestAssured." />
        <CapCard icon="🏗️" title="Framework Design" body="Custom automation framework architecture — page object model, data-driven, or BDD with Cucumber." />
        <CapCard icon="⚙️" title="CI/CD Integration" body="Tests wired into GitHub Actions, GitLab CI, Jenkins, or Azure DevOps — triggered on every PR." />
        <CapCard icon="📊" title="Reporting & Analytics" body="Allure, HTML report, or Slack notifications with test results, trends, and flakiness tracking." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Automation build process</Label>
          <div className="space-y-6">
            <Step n="01" title="Automation strategy" body="We define the automation pyramid, scope, toolchain, and maintenance approach upfront." />
            <Step n="02" title="Framework setup" body="Base framework built with patterns, utilities, and CI integration configured before any test is written." />
            <Step n="03" title="Test development" body="Highest-value test cases automated first — critical paths, smoke suite, and regression priorities." />
            <Step n="04" title="Handover & training" body="Your team trained to extend and maintain the suite — with documentation and runbook." />
          </div>
        </div>
        <div>
          <Label>Our automation standards</Label>
          <CheckList items={[
            "Zero flaky tests — retry logic and deterministic waits only",
            "Page Object Model for maintainable UI tests",
            "Parallel execution to keep suite runtime under 10 minutes",
            "All tests committed to your repository with full history",
            "CI/CD integration from day one — not bolted on at the end",
            "Monthly maintenance included for the first 6 months",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}