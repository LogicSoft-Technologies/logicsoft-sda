import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Modernization",
  description:
    "Application modernization services from LogicSoft Technologies - migrating legacy systems to modern, scalable architectures.",
  path: "/application/modernization",
});

// app/application/modernization/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function ApplicationModernisationPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", "/application/services"], ["Application Modernisation"]]}
      eyebrow="Application Services"
      title="Application Modernisation"
      subtitle="We migrate, re-platform, and re-architect legacy systems — reducing technical debt, lowering operational cost, and unlocking new capabilities without disrupting your operations."
      stats={[
        { value: "50+", label: "Modernisation projects completed" },
        { value: "0", label: "Target production incidents during migration" },
        { value: "40%", label: "Average reduction in maintenance cost" },
      ]}
      ctaTitle="Assess your modernisation options"
      ctaSub="We'll map your legacy landscape and produce a risk-ranked modernisation roadmap — free."
    >
      <Label>Modernisation approaches</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔄" title="Replatforming" body="Move your application to a modern runtime or cloud platform with minimal code changes — fast wins, reduced infrastructure cost." />
        <CapCard icon="♻️" title="Refactoring" body="Restructure internal code quality — eliminate duplication, decouple modules, improve test coverage — without changing behaviour." />
        <CapCard icon="🏗️" title="Re-architecture" body="Decompose a monolith into services, migrate to cloud-native patterns, and introduce modern data storage strategies." />
        <CapCard icon="🔁" title="Data Migration" body="Schema migration, ETL pipelines, data validation, and zero-downtime cutover strategies for databases of any size." />
        <CapCard icon="🖥️" title="UI Modernisation" body="Replace outdated frontends (jQuery, ASP.NET WebForms, legacy JSP) with modern React or Vue applications." />
        <CapCard icon="🧪" title="Strangler Fig Pattern" body="Incrementally replace legacy components without a big-bang rewrite — reducing risk and maintaining continuity." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our modernisation approach</Label>
          <div className="space-y-6">
            <Step n="01" title="Legacy assessment" body="We map your current architecture, identify risk areas, and quantify technical debt before recommending an approach." />
            <Step n="02" title="Modernisation roadmap" body="A phased plan with clear milestones, risk mitigations, and business value at each stage." />
            <Step n="03" title="Parallel build & test" body="New components built and tested alongside the legacy system — no big-bang cutovers." />
            <Step n="04" title="Incremental cutover" body="Feature-by-feature or service-by-service transition with rollback capability at every stage." />
          </div>
        </div>
        <div>
          <Label>What we guarantee</Label>
          <CheckList items={[
            "No production downtime during migration — zero tolerance",
            "Functional parity validated before any cutover",
            "All data migrated with integrity verification",
            "Performance benchmarks met or exceeded",
            "Full documentation of the new architecture",
            "Team knowledge transfer before engagement closes",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}