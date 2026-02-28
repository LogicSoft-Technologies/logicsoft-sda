// app/application/development/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ApplicationDevelopmentPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Application Development"]]}
      eyebrow="Application Services"
      title="Application Development"
      subtitle="We build reliable, performant, and maintainable applications across web, mobile, and desktop platforms — designed for your users and engineered for your engineers."
      stats={[
        { value: "300+", label: "Applications built" },
        { value: "98%", label: "On-schedule delivery rate" },
        { value: "5★", label: "Average client satisfaction score" },
      ]}
      ctaTitle="Start your application build"
      ctaSub="Describe what you need and we'll scope it in a free 30-minute call."
    >
      <Label>Application types we build</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🌐" title="Web Applications" body="React, Next.js, and Vue frontends paired with Node.js, Python, or Go backends — scalable, accessible, and SEO-ready." />
        <CapCard icon="📱" title="Mobile Applications" body="React Native and Flutter for cross-platform; Swift and Kotlin for native iOS and Android." />
        <CapCard icon="🏢" title="Enterprise Applications" body="Complex workflow tools, ERP extensions, internal platforms, and B2B portals built for high-volume use." />
        <CapCard icon="🛒" title="eCommerce Platforms" body="Custom commerce experiences, headless Shopify, and B2B ordering systems that drive conversion." />
        <CapCard icon="📊" title="Data Applications" body="Dashboards, reporting tools, and analytical interfaces that make complex data accessible and actionable." />
        <CapCard icon="🤖" title="AI-Powered Applications" body="LLM integrations, intelligent search, recommendation engines, and document processing workflows." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our development approach</Label>
          <div className="space-y-6">
            <Step n="01" title="Requirements & UX" body="Clear functional specification and validated user flows before engineering begins." />
            <Step n="02" title="Architecture & data model" body="Designed for your current scale and your next 3 years of growth." />
            <Step n="03" title="Iterative build" body="Working software every two weeks. Continuous feedback reduces risk and improves outcome." />
            <Step n="04" title="Launch & sustain" body="Production deployment, monitoring, and structured support post go-live." />
          </div>
        </div>
        <div>
          <Label>Engineering standards</Label>
          <CheckList items={[
            "Component-based architecture for long-term maintainability",
            "Automated test suite with >80% coverage on critical paths",
            "Accessibility compliance (WCAG 2.1 AA) on all web builds",
            "Performance budget: <2s LCP on mobile, >90 Lighthouse score",
            "Full source code and IP transferred to client",
            "Documented handover with runbooks and architecture diagrams",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}