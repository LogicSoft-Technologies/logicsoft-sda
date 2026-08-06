import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Training",
  description:
    "IT training services from LogicSoft Technologies, equipping teams with the skills to manage and scale their technology.",
  path: "/it-consulting/training",
});

// app/it-consulting/training/page.jsx
"use client";
import ServicePageLayout, { Label, Divider, CapCard, Step, CheckList } from "@/components/ServicePageLayout";

export default function UserTrainingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", "/it-consulting"], ["User Training"]]}
      eyebrow="IT Consulting"
      title="User Training"
      subtitle="Practical, role-specific technology training that drives real adoption — not generic slide decks. We design and deliver training that makes technology investments actually work."
      stats={[
        { value: "95%", label: "Post-training adoption rate" },
        { value: "500+", label: "Users trained across programmes" },
        { value: "Custom", label: "All training built for your context" },
      ]}
      ctaTitle="Design a training programme"
      ctaSub="We'll design and deliver training that matches your users, systems, and change context."
    >
      <Label>Training services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        <CapCard icon="🖥️" title="System Training" body="Role-specific training on new ERP, CRM, ITSM, or custom applications — practical and process-led." />
        <CapCard icon="🔐" title="Security Awareness" body="Phishing simulation, social engineering awareness, and data handling best practices for all staff." />
        <CapCard icon="☁️" title="Cloud Fundamentals" body="AWS, Azure, and GCP foundation training for technical and non-technical audiences." />
        <CapCard icon="⚙️" title="DevOps & Agile" body="Agile methodology, Scrum, and DevOps practices for development and product teams." />
        <CapCard icon="📊" title="Data Literacy" body="Dashboard interpretation, data hygiene, and analytical thinking for business teams." />
        <CapCard icon="🎓" title="Leadership Programmes" body="Technology leadership training for engineering managers, product owners, and IT directors." />
      </div>

      <Divider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Label>Training delivery formats</Label>
          <div className="space-y-6">
            <Step n="01" title="Instructor-led (in-person)" body="On-site sessions at your offices — hands-on, practical, and high-impact." />
            <Step n="02" title="Virtual instructor-led" body="Live online sessions with interactive exercises, screen sharing, and breakout groups." />
            <Step n="03" title="Self-paced e-learning" body="Custom LMS modules learners complete at their own pace — with progress tracking." />
            <Step n="04" title="Blended programmes" body="Combination of live sessions, e-learning, and job aids for sustained behaviour change." />
          </div>
        </div>
        <div>
          <Label>What's included</Label>
          <CheckList items={[
            "Custom training materials built for your systems",
            "Role-based training paths for different user groups",
            "Practical exercises using your real data and workflows",
            "Assessment and competency verification",
            "Training completion reporting and analytics",
            "Post-training support helpdesk for 30 days",
          ]} />
        </div>
      </div>
    </ServicePageLayout>
  );
}