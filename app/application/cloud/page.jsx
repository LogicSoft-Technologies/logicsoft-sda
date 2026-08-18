"use client";
// app/application/cloud/page.jsx
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function CloudApplicationDevelopmentPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Cloud Application Development"]]}
      eyebrow="Application Services"
      title="Cloud Application Development"
      subtitle="We design and build cloud-native applications engineered for elastic scale, high availability, and total cost efficiency — on AWS, Azure, or GCP."
      stats={[
        { value: "AWS", label: "Advanced tier partner" },
        { value: "60%", label: "Average infra cost reduction post-migration" },
        { value: "99.99%", label: "Target uptime for cloud-native builds" },
      ]}
      ctaTitle="Build your next application in the cloud"
      ctaSub="Free cloud architecture consultation included with every engagement scoping call."
    >
      <Label>Cloud application capabilities</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🏗️" title="Cloud-Native Architecture" body="Microservices, event-driven systems, and serverless functions designed for the specific guarantees cloud infrastructure provides." />
        <CapCard icon="🐳" title="Containerisation & Orchestration" body="Docker and Kubernetes deployments with auto-scaling, rolling updates, and zero-downtime deploys." />
        <CapCard icon="⚡" title="Serverless Engineering" body="AWS Lambda, Azure Functions, and GCP Cloud Run — event-triggered compute with zero idle cost." />
        <CapCard icon="🔗" title="API & Integration Layer" body="RESTful and GraphQL APIs, message queues, and event buses that connect your cloud services reliably." />
        <CapCard icon="📊" title="Observability Stack" body="Distributed tracing, structured logging, and metrics dashboards so you understand exactly what's happening in production." />
        <CapCard icon="🔐" title="Cloud Security" body="IAM design, secret management, VPC architecture, and encryption at rest and in transit — built in from day one." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our cloud build process</Label>
          <div className="space-y-6">
            <Step n="01" title="Cloud readiness assessment" body="We evaluate your requirements against cloud service options and produce a reference architecture." />
            <Step n="02" title="Infrastructure design" body="VPC layout, IAM roles, data storage strategy, and cost modelling before any resource is provisioned." />
            <Step n="03" title="Application build" body="Iterative development with infrastructure-as-code (Terraform/CDK) from the first sprint." />
            <Step n="04" title="Performance & cost optimisation" body="Load testing, right-sizing, and Reserved Instance/Savings Plan analysis before go-live." />
          </div>
        </div>
        <div>
          <Label>Included in every cloud build</Label>
          <CheckList items={[
            "Full infrastructure-as-code (Terraform or CDK)",
            "CI/CD pipeline configured from day one",
            "Multi-environment setup (dev, staging, production)",
            "Cost budget alerts and monthly spend reports",
            "DR and backup strategy documented and tested",
            "Security review by a certified cloud practitioner",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}