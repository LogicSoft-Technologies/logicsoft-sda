// app/application/security/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ApplicationSecurityPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Application Security"]]}
      eyebrow="Application Services"
      title="Application Security"
      subtitle="We secure your applications at every layer — from code review and penetration testing to runtime protection and compliance validation."
      stats={[
        { value: "OWASP", label: "Top 10 compliance standard" },
        { value: "100+", label: "Security assessments conducted" },
        { value: "0", label: "Target post-remediation critical findings" },
      ]}
      ctaTitle="Get your application security assessed"
      ctaSub="Our security engineers will assess your attack surface and deliver a prioritised remediation plan."
    >
      <Label>Security services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔍" title="Security Code Review" body="Manual and automated review of source code for vulnerabilities — SQL injection, XSS, auth flaws, and insecure dependencies." />
        <CapCard icon="🎯" title="Penetration Testing" body="Simulated attacks on your web, mobile, and API surfaces. OWASP-aligned methodology with a detailed findings report." />
        <CapCard icon="🔐" title="Auth & Identity Review" body="OAuth flows, session management, token handling, and privilege escalation assessment." />
        <CapCard icon="🏗️" title="Secure Architecture Design" body="Threat modelling, trust boundary analysis, and secure-by-design principles applied from the blueprint stage." />
        <CapCard icon="📋" title="Compliance Validation" body="GDPR, ISO 27001, PCI-DSS, and SOC 2 readiness assessments with gap analysis and remediation roadmap." />
        <CapCard icon="🛡️" title="Runtime Protection" body="WAF configuration, DDoS mitigation, intrusion detection, and real-time security monitoring." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Assessment process</Label>
          <div className="space-y-6">
            <Step n="01" title="Scope definition" body="We agree the target surfaces, testing boundaries, and testing windows to avoid disrupting production." />
            <Step n="02" title="Reconnaissance & mapping" body="Passive and active enumeration of your attack surface before active testing begins." />
            <Step n="03" title="Exploitation & validation" body="Controlled exploitation of discovered vulnerabilities to prove impact and confirm severity." />
            <Step n="04" title="Report & remediation" body="Detailed findings report with CVSS scores, reproduction steps, and concrete remediation guidance." />
          </div>
        </div>
        <div>
          <Label>Report deliverables</Label>
          <CheckList items={[
            "Executive summary for non-technical leadership",
            "Technical findings with CVSS severity ratings",
            "Reproduction steps for every vulnerability",
            "Recommended remediation with effort estimates",
            "Re-test of all critical and high findings post-fix",
            "Compliance mapping where applicable",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}