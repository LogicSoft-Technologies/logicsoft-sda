import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Intergration",
  description:
    "Application integration services from LogicSoft Technologies - connecting systems, APIs, and data across your technology stack.",
  path: "/application/intergration",
});

// app/application/integration/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ApplicationIntegrationPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Application Integration"]]}
      eyebrow="Application Services"
      title="Application Integration"
      subtitle="We connect your systems, SaaS tools, data sources, and partners into a coherent, reliable platform — eliminating silos and enabling data to flow where it's needed."
      stats={[
        { value: "100+", label: "Integration patterns implemented" },
        { value: "99.95%", label: "Integration uptime SLA" },
        { value: "50+", label: "Third-party connectors built" },
      ]}
      ctaTitle="Map your integration landscape"
      ctaSub="We'll assess your systems and design the integration architecture in a free workshop."
    >
      <Label>Integration approaches</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔗" title="REST & GraphQL APIs" body="Design, build, and document internal and public-facing APIs with authentication, rate limiting, and versioning." />
        <CapCard icon="📨" title="Event-Driven Integration" body="Kafka, RabbitMQ, and AWS SQS/SNS patterns for resilient, decoupled inter-service communication." />
        <CapCard icon="🔄" title="ETL & Data Pipelines" body="Extract, transform, and load data between operational databases, data warehouses, and analytics platforms." />
        <CapCard icon="🤝" title="Third-Party Connectors" body="Salesforce, SAP, HubSpot, Stripe, and 50+ other platform integrations built and maintained." />
        <CapCard icon="🏢" title="Enterprise Service Bus" body="Centralised integration middleware for complex, multi-system enterprise environments." />
        <CapCard icon="🌐" title="B2B Integration" body="EDI, SFTP file exchange, and partner API integrations with full monitoring and alerting." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Integration delivery process</Label>
          <div className="space-y-6">
            <Step n="01" title="Integration mapping" body="We document every system, data flow, and integration point — existing and required." />
            <Step n="02" title="Architecture design" body="Select the right integration pattern (point-to-point, hub-and-spoke, event bus) for your context." />
            <Step n="03" title="Build & test" body="Integration built in isolation, tested against stubs, then tested end-to-end in staging." />
            <Step n="04" title="Production & monitoring" body="Live deployment with comprehensive monitoring, alerting, and dead-letter queue handling." />
          </div>
        </div>
        <div>
          <Label>What's included</Label>
          <CheckList items={[
            "Full integration architecture diagram",
            "API documentation (OpenAPI/Swagger)",
            "Error handling and retry logic built in",
            "Dead-letter queue and alerting for failed messages",
            "End-to-end integration testing suite",
            "Monitoring dashboard for every integration point",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}