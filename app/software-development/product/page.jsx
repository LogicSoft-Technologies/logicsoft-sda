import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Product",
  description:
    "Product software development services from LogicSoft Technologies, taking your idea from concept to a market-ready application.",
  path: "/software-development/product",
});

// app/software-development/product/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function SoftwareProductPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Software Development", "/software-development/services"], ["Product Development"]]}
      eyebrow="Software Development"
      title="Software Product Development"
      subtitle="From validated idea to market-ready product. We partner with founders and product teams to design, build, and launch software products people actually use."
      stats={[
        { value: "80+", label: "Products launched" },
        { value: "3–12", label: "Weeks to first working version" },
        { value: "5", label: "Continents with active users" },
      ]}
      ctaTitle="Turn your product idea into reality"
      ctaSub="Let's scope your MVP and create a path to launch."
    >
      <Label>Product development phases</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🔍" title="Discovery & Validation" body="Market research, user interviews, competitive analysis, and problem-solution fit — before committing to development." />
        <CapCard icon="🎨" title="UX & Product Design" body="User journey mapping, wireframes, interactive prototypes, and design systems built for handoff to engineering." />
        <CapCard icon="⚙️" title="MVP Engineering" body="A lean, production-ready version of your product focused on the core value proposition — launched fast, iterated faster." />
        <CapCard icon="📊" title="Analytics & Instrumentation" body="Event tracking, funnel analytics, A/B testing infrastructure — so every decision is data-informed." />
        <CapCard icon="🚀" title="Growth Engineering" body="Performance optimisation, SEO infrastructure, referral mechanics, and integrations that compound user acquisition." />
        <CapCard icon="🔧" title="Post-Launch Evolution" body="Continuous iteration based on real user behaviour — shipping improvements every two weeks." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Our product development process</Label>
          <div className="space-y-6">
            <Step n="01" title="Product Discovery (2 weeks)" body="Define the problem, validate assumptions, and produce a product brief with clear success metrics." />
            <Step n="02" title="Design Sprint (2–3 weeks)" body="User flows, high-fidelity screens, and a tested prototype — stakeholder-approved before development begins." />
            <Step n="03" title="MVP Build (6–12 weeks)" body="Iterative sprints delivering working features. You see progress every two weeks, not at the end." />
            <Step n="04" title="Launch & Measure (ongoing)" body="Production deployment, monitoring setup, and a 90-day post-launch optimisation engagement." />
          </div>
        </div>
        <div>
          <Label>What differentiates our product builds</Label>
          <CheckList items={[
            "Product manager embedded in every engagement",
            "User testing at every design phase",
            "Built for extensibility — not just the MVP use case",
            "Full design system delivered with the product",
            "Analytics dashboard configured on day one of launch",
            "Post-launch support with guaranteed SLA",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}