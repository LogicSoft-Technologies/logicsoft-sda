import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Penetration",
  description:
    "Penetration testing services from LogicSoft Technologies, simulating real-world attacks to uncover security vulnerabilities.",
  path: "/testing/penetration",
});

// app/testing/penetration/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function PenetrationTestingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["Penetration Testing"]]}
      eyebrow="Testing & QA"
      title="Penetration Testing"
      subtitle="Authorised, controlled attacks on your systems — conducted by skilled security engineers to discover and demonstrate exploitable vulnerabilities before real attackers do."
      stats={[
        { value: "OWASP", label: "Methodology standard" },
        { value: "Ethical", label: "All engagements fully authorised" },
        { value: "Certificate", label: "Letter of attestation provided" },
      ]}
      ctaTitle="Schedule a penetration test"
      ctaSub="We'll scope your engagement and provide a fixed-price quotation."
    >
      <Label>Penetration testing scope options</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🌐" title="Web Application Pentest" body="Full OWASP Top 10 assessment of your web application — authenticated and unauthenticated attack paths." />
        <CapCard icon="📱" title="Mobile App Pentest" body="iOS and Android application testing — local storage, API communication, and binary analysis." />
        <CapCard icon="🔗" title="API Pentest" body="REST and GraphQL API security — authentication bypass, IDOR, injection, and business logic flaws." />
        <CapCard icon="🏢" title="Network Pentest" body="Internal and external network penetration testing — firewall bypass, lateral movement, and privilege escalation." />
        <CapCard icon="🎭" title="Social Engineering" body="Phishing campaigns and pretexting exercises — testing your human and process controls." />
        <CapCard icon="☁️" title="Cloud Security Review" body="AWS, Azure, and GCP configuration review — IAM misconfigurations, exposed storage, and security group analysis." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Pentest methodology</Label>
          <div className="space-y-6">
            <Step n="01" title="Pre-engagement" body="Scope agreement, rules of engagement, legal authorisation signed, and testing window confirmed." />
            <Step n="02" title="Reconnaissance" body="Passive and active information gathering — OSINT, DNS enumeration, and service discovery." />
            <Step n="03" title="Exploitation" body="Controlled exploitation of confirmed vulnerabilities to demonstrate real-world impact." />
            <Step n="04" title="Reporting & debrief" body="Detailed written report plus a live debrief session with your technical and management teams." />
          </div>
        </div>
        <div>
          <Label>What you receive</Label>
          <CheckList items={[
            "Formal letter of engagement and authorisation",
            "Executive summary with business risk narrative",
            "Technical findings with CVSSv3 severity scores",
            "Proof of concept for every exploited vulnerability",
            "Remediation guidance with priority ordering",
            "Re-test certification once fixes are applied",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}