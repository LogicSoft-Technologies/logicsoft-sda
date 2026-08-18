"use client";
// app/software-development/custom/page.jsx
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function CustomSoftwarePage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Software Development", "/software-development/services"], ["Custom Software"]]}
      eyebrow="Software Development"
      title="Custom Software Development"
      subtitle="Purpose-built software engineered for your specific workflows, integrations, and scale requirements — not adapted from a generic template."
      stats={[
        { value: "300+", label: "Custom solutions delivered" },
        { value: "98%", label: "On-time delivery rate" },
        { value: "12+", label: "Years building enterprise software" },
      ]}
      ctaTitle="Describe what you're building"
      ctaSub="We'll scope it, price it, and propose a delivery timeline — free of charge."
    >
      <Label>What we build</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🏢" title="Enterprise Platforms" body="Internal tools, ERP extensions, workflow automation, and operational dashboards built for high-volume enterprise use." />
        <CapCard icon="📱" title="Web & Mobile Apps" body="Full-stack web applications and native or cross-platform mobile apps engineered for performance and reliability." />
        <CapCard icon="🔗" title="Integration Layers" body="APIs, middleware, and event-driven systems that connect your SaaS tools, databases, and third-party platforms." />
        <CapCard icon="🤖" title="AI-Enhanced Software" body="Intelligent features — recommendation engines, document processing, predictive analytics — embedded into your product." />
        <CapCard icon="🏪" title="B2B SaaS Products" body="Multi-tenant SaaS platforms with billing, user management, and the scalable infrastructure to grow alongside your customers." />
        <CapCard icon="⚡" title="Real-time Systems" body="Event-driven architectures and live-update interfaces for trading, logistics, operations, and monitoring use cases." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our delivery process</Label>
          <div className="space-y-6">
            <Step n="01" title="Requirements & scoping" body="Structured discovery workshops to document functional requirements, technical constraints, and success criteria." />
            <Step n="02" title="Architecture design" body="We design the data model, API surface, infrastructure, and security model before writing production code." />
            <Step n="03" title="Iterative development" body="Two-week sprints with working software delivered at each milestone — always in a staging environment you can test." />
            <Step n="04" title="QA & security review" body="Automated and manual testing, penetration testing, and performance benchmarking before every release." />
            <Step n="05" title="Deployment & handover" body="Production deployment with full documentation, runbooks, and a knowledge transfer session for your team." />
          </div>
        </div>
        <div>
          <Label>Our engineering standards</Label>
          <CheckList items={[
            "Fixed-scope, fixed-price engagements with clear deliverables",
            "Full source code ownership transferred to you",
            "Comprehensive API documentation and architecture diagrams",
            "Test coverage above 80% for all critical paths",
            "OWASP Top 10 compliance on every web application",
            "12-month post-launch support SLA available",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}