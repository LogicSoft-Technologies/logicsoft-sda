import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Services",
  description:
    "An overview of LogicSoft Technologies' software development services, from custom builds to staff augmentation.",
  path: "/software-development/services",
});

// app/software-development/services/page.jsx  — CTA landing / overview page
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ServicePageLayout, { Label, CapCard } from "@/components/ServicePageLayout";

const ITEMS = [
  { href: "/software-development/consulting",         icon: "🏗️", title: "Software Consulting",           body: "Architecture reviews, technology selection, and engineering process advisory." },
  { href: "/software-development/custom",             icon: "⚙️", title: "Custom Software Development",  body: "Purpose-built software engineered for your specific workflows and scale requirements." },
  { href: "/software-development/outsourcing",        icon: "🔄", title: "Software Outsourcing",          body: "Full delivery ownership — project-based, dedicated team, or on-demand capacity." },
  { href: "/software-development/product",            icon: "🚀", title: "Product Development",           body: "From validated idea to market-ready product. Discovery, design, build, and launch." },
  { href: "/software-development/staff-augmentation", icon: "👥", title: "Team Augmentation",             body: "Senior engineers embedded in your team, tools, and culture." },
  { href: "/application/cloud",                       icon: "☁️", title: "Cloud Application Development", body: "Cloud-native apps built for elasticity, reliability, and operational efficiency." },
  { href: "/application/modernization",               icon: "♻️", title: "Legacy Modernisation",          body: "Migrate, re-platform, or re-architect ageing systems without disrupting operations." },
  { href: "/software-development/support",            icon: "🛡️", title: "Post-Launch Support",           body: "Structured SLAs, 24/7 monitoring, and continuous improvement post go-live." },
];

export default function SoftwareDevelopmentServicesPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Software Development", null]]}
      eyebrow="Software Development"
      title="Software Development Services"
      subtitle="End-to-end software engineering capability — from strategy and architecture through to deployment, support, and continuous improvement."
      stats={[
        { value: "300+", label: "Projects delivered" },
        { value: "12+", label: "Years of engineering experience" },
        { value: "5", label: "Continents with active clients" },
      ]}
      ctaTitle="Not sure where to start?"
      ctaSub="Our principals will help you identify the right engagement model in a free 30-minute call."
    >
      <Label>All software development services</Label>
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