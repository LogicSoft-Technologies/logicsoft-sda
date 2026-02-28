// app/it-consulting/platform/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function PlatformConsultingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["Platform Consulting"]]}
      eyebrow="IT Consulting"
      title="Platform Consulting"
      subtitle="We advise on platform strategy, selection, and implementation — helping organisations build coherent technical platforms that support product development at scale."
      stats={[
        { value: "30+", label: "Platform strategies designed" },
        { value: "AWS · Azure · GCP", label: "Cloud platforms covered" },
        { value: "12+", label: "Years of platform experience" },
      ]}
      ctaTitle="Design your platform strategy"
      ctaSub="Free platform maturity assessment and strategy session."
    >
      <Label>Platform consulting areas</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="☁️" title="Cloud Platform Strategy" body="Multi-cloud or single-cloud strategy, platform selection, and landing zone design for enterprise cloud adoption." />
        <CapCard icon="🔧" title="Developer Platform (IDP)" body="Internal developer platform design — self-service infrastructure, golden paths, and developer experience tooling." />
        <CapCard icon="📊" title="Data Platform" body="Modern data architecture: lakehouse, data mesh, or data warehouse — aligned to your analytics maturity." />
        <CapCard icon="🔗" title="Integration Platform" body="iPaaS selection and implementation — Mulesoft, Azure Integration Services, AWS EventBridge." />
        <CapCard icon="🛡️" title="Security Platform" body="SIEM, SOAR, and endpoint protection platform strategy — unified security operations." />
        <CapCard icon="🤖" title="AI/ML Platform" body="Machine learning infrastructure, model serving, and MLOps platform design for organisations scaling AI." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Platform engagement model</Label>
          <div className="space-y-6">
            <Step n="01" title="Platform assessment" body="Evaluate current platform capability, identify gaps, and benchmark against industry reference architectures." />
            <Step n="02" title="Strategy definition" body="Target platform architecture with a sequenced roadmap and clear make-vs-buy decisions." />
            <Step n="03" title="Proof of concept" body="Validated prototype of the target platform before committing to full implementation." />
            <Step n="04" title="Implementation" body="Platform built by LogicSoft engineers with documentation and operational handover." />
          </div>
        </div>
        <div>
          <Label>Platform consulting deliverables</Label>
          <CheckList items={[
            "Platform maturity assessment report",
            "Target platform architecture diagram",
            "Make vs buy analysis with TCO modelling",
            "Implementation roadmap with phased milestones",
            "Risk register and mitigation strategies",
            "Proof-of-concept delivery if required",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}