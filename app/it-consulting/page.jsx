import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "It Consulting",
  description:
    "IT consulting services from LogicSoft Technologies - strategic technology advisory for enterprise organisations.",
  path: "/it-consulting",
});

// app/it-consulting/page.jsx
"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicePageLayout, { Label } from "@/components/ServicePageLayout";

const ITEMS = [
  { href: "/digital-transformation",     icon: "🔄", title: "Digital Transformation",          body: "Systematic modernisation of people, processes, and technology." },
  { href: "/project-management",         icon: "🗓️", title: "Project Management Consulting",   body: "Expert programme and project management for complex technology initiatives." },
  { href: "/it-consulting/crisis",       icon: "🚨", title: "Crisis Management",                body: "Rapid response for production outages, security breaches, and programme failures." },
  { href: "/itsm",                       icon: "📋", title: "IT Service Management",            body: "ITSM frameworks, service catalogues, and ITIL-aligned processes." },
  { href: "/it-consulting/solution",     icon: "🔍", title: "Solution Consulting",              body: "Vendor-neutral technology selection and solution architecture." },
  { href: "/it-consulting/platform",     icon: "🏗️", title: "Platform Consulting",             body: "Cloud, data, and developer platform strategy and implementation." },
  { href: "/it-consulting/enterprise",   icon: "🏢", title: "Enterprise IT Consulting",        body: "Strategic technology advisory at the C-suite level." },
  { href: "/it-consulting/training",     icon: "🎓", title: "User Training",                   body: "Role-specific technology training that drives real adoption." },
];

export default function ITConsultingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["IT Consulting", null]]}
      eyebrow="IT Consulting"
      title="IT Consulting"
      subtitle="Strategic technology advisory and hands-on consulting — helping organisations plan and execute effective IT strategies that support sustainable growth."
      stats={[
        { value: "40+", label: "Enterprise clients" },
        { value: "12+", label: "Years of advisory experience" },
        { value: "C-suite", label: "Engagement level" },
      ]}
      ctaTitle="Discuss your IT strategy"
      ctaSub="Free executive consultation with a LogicSoft principal consultant."
    >
      <Label>All IT consulting services</Label>
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