import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Usability",
  description:
    "Usability testing services from LogicSoft Technologies, ensuring your application is intuitive and easy to use.",
  path: "/testing/usability",
});

// app/testing/usability/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function UsabilityTestingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", "/software-testing"], ["Usability Testing"]]}
      eyebrow="Testing & QA"
      title="Usability Testing"
      subtitle="Structured sessions with real users that expose UX friction, navigation confusion, and task failure — before your product reaches the market."
      stats={[
        { value: "5 users", label: "Reveals 85% of UX issues" },
        { value: "Every sprint", label: "Recommended testing cadence" },
        { value: "Real users", label: "Not internal team assumptions" },
      ]}
      ctaTitle="Test your product with real users"
      ctaSub="We'll design and run a usability study tailored to your product and audience."
    >
      <Label>Usability testing services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="👤" title="Moderated Sessions" body="Facilitator-led sessions where participants complete tasks while thinking aloud — rich qualitative insight." />
        <CapCard icon="📊" title="Unmoderated Remote Testing" body="Participants complete tasks independently — scalable, faster, and broader demographic reach." />
        <CapCard icon="🗂️" title="Card Sorting" body="Understand how users mentally categorise content — for navigation design and information architecture." />
        <CapCard icon="🌲" title="Tree Testing" body="Validate navigation structure before any design work — find where users get lost in your IA." />
        <CapCard icon="🖱️" title="First Click Testing" body="Identify where users instinctively click for a given task — early signal of navigation clarity." />
        <CapCard icon="♿" title="Accessibility Usability" body="Testing with users who rely on assistive technology — screen readers, switch access, and keyboard navigation." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Study design process</Label>
          <div className="space-y-6">
            <Step n="01" title="Research objectives" body="Define what questions the study must answer — aligned to product decisions that need making." />
            <Step n="02" title="Participant recruitment" body="Recruit participants matching your target user profile — screened for relevance." />
            <Step n="03" title="Session facilitation" body="Moderated or unmoderated sessions run by experienced UX researchers." />
            <Step n="04" title="Analysis & recommendations" body="Synthesised findings with prioritised UX improvements and design recommendations." />
          </div>
        </div>
        <div>
          <Label>Report deliverables</Label>
          <CheckList items={[
            "Session recordings and transcripts (with consent)",
            "Task completion rates and time-on-task data",
            "Affinity map of observed pain points",
            "Severity-rated usability findings",
            "Prioritised UX improvement recommendations",
            "Executive summary for stakeholder presentation",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}