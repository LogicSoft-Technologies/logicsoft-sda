// app/testing/security/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function SecurityTestingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["Security Testing"]]}
      eyebrow="Testing & QA"
      title="Security Testing"
      subtitle="Systematic identification of vulnerabilities in your applications before attackers find them — through code analysis, dynamic scanning, and manual verification."
      stats={[
        { value: "OWASP Top 10", label: "Baseline for every engagement" },
        { value: "100+", label: "Security assessments conducted" },
        { value: "CVSSv3", label: "Severity scoring standard" },
      ]}
      ctaTitle="Get a security assessment"
      ctaSub="We'll scope a security testing engagement for your application surfaces."
    >
      <Label>Security testing techniques</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔍" title="Static Analysis (SAST)" body="Automated source code scanning for vulnerability patterns — SQL injection, XSS, insecure deserialization, and more." />
        <CapCard icon="⚡" title="Dynamic Analysis (DAST)" body="Live application scanning — finding vulnerabilities in a running application without access to source code." />
        <CapCard icon="📦" title="Dependency Scanning" body="Third-party library vulnerability scanning against CVE databases — finding risks in your supply chain." />
        <CapCard icon="🔐" title="Authentication Testing" body="OAuth flows, session management, token handling, MFA bypass, and privilege escalation testing." />
        <CapCard icon="🌐" title="API Security Testing" body="REST and GraphQL API security — authentication, authorisation, input validation, and rate limiting." />
        <CapCard icon="📋" title="Compliance Testing" body="GDPR, PCI-DSS, HIPAA, and ISO 27001 — control validation and gap analysis against standards." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Assessment process</Label>
          <div className="space-y-6">
            <Step n="01" title="Scope & rules of engagement" body="Target systems, testing windows, and exclusions agreed before any testing begins." />
            <Step n="02" title="Automated scanning" body="SAST, DAST, and dependency scanning to build the initial vulnerability inventory." />
            <Step n="03" title="Manual verification" body="Every automated finding manually verified to eliminate false positives before reporting." />
            <Step n="04" title="Report & remediation" body="Prioritised findings with reproduction steps, impact rating, and remediation guidance." />
          </div>
        </div>
        <div>
          <Label>Deliverables</Label>
          <CheckList items={[
            "Executive summary for leadership",
            "Technical findings with CVSSv3 scores",
            "Reproduction steps and screenshots",
            "Remediation guidance with effort estimates",
            "Re-test of all critical and high findings post-fix",
            "Compliance gap analysis where applicable",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}