import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Software Testing",
  description:
    "Software testing services from LogicSoft Technologies, covering functional, performance, security, and usability testing.",
  path: "/software-testing",
});

// app/software-testing/page.jsx  — Testing & QA index
"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicePageLayout, { Label } from "@/components/ServicePageLayout";

const ITEMS = [
  { href: "/qa/outsourcing",      icon: "🏢", title: "QA Outsourcing",       body: "Full transfer of QA ownership — dedicated team embedded in your delivery cycle." },
  { href: "/qa/consulting",       icon: "🔍", title: "QA Consulting",        body: "Test strategy, toolchain selection, and quality engineering process improvement." },
  { href: "/testing/functional",  icon: "✅", title: "Functional Testing",   body: "Every feature verified against acceptance criteria — manual and automated." },
  { href: "/testing/usability",   icon: "👤", title: "Usability Testing",    body: "Real-user sessions that expose UX friction before your product reaches market." },
  { href: "/testing/performance", icon: "⚡", title: "Performance Testing",  body: "Load, stress, and endurance testing to validate behaviour under peak demand." },
  { href: "/testing/automation",  icon: "🤖", title: "Test Automation",      body: "CI/CD-integrated automation suites that give confidence on every build." },
  { href: "/testing/security",    icon: "🔐", title: "Security Testing",     body: "SAST, DAST, and dependency scanning to catch vulnerabilities before production." },
  { href: "/testing/penetration", icon: "🎯", title: "Penetration Testing",  body: "Authorised, controlled attacks to find and demonstrate real exploitable vulnerabilities." },
];

export default function SoftwareTestingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Testing & QA", null]]}
      eyebrow="Testing & QA"
      title="Testing & QA Services"
      subtitle="Full-range quality assurance across mobile, web, and desktop — catching issues before they reach production and protecting your reputation with every release."
      stats={[
        { value: "95%", label: "Defect detection before production" },
        { value: "Zero", label: "Critical defect policy in production" },
        { value: "80%+", label: "Automation coverage target" },
      ]}
      ctaTitle="Strengthen your quality engineering"
      ctaSub="Free QA maturity assessment benchmarked against industry best practice."
    >
      <Label>All testing & QA services</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="group block border border-[#e8eef6] bg-white p-6 hover:border-[#1f6fb2]/40 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-[14.5px] font-semibold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors">{item.title}</p>
                <p className="text-[13px] text-gray-500 leading-relaxed">{item.body}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1f6fb2] transition-colors shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </ServicePageLayout>
  );
}