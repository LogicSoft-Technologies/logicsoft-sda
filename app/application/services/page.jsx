"use client";
// app/application/services/page.jsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicePageLayout, { Label } from "@/components/ServicePageLayout";

const ITEMS = [
  { href: "/application/management",    icon: "📊", title: "Application Management",    body: "Day-to-day operation, monitoring, and performance management of your applications." },
  { href: "/application/modernization", icon: "♻️", title: "Application Modernisation",  body: "Migrate, re-platform, and re-architect legacy systems without disrupting operations." },
  { href: "/application/integration",   icon: "🔗", title: "Application Integration",    body: "Connect systems, SaaS tools, and data sources into a coherent, reliable platform." },
  { href: "/application/security",      icon: "🔐", title: "Application Security",       body: "Secure every layer — code review, penetration testing, and runtime protection." },
  { href: "/application/development",   icon: "⚙️", title: "Application Development",    body: "Web, mobile, and enterprise applications built to your exact requirements." },
  { href: "/application/testing",       icon: "🧪", title: "Application Testing",        body: "Functional, performance, security, and usability testing at every stage." },
  { href: "/application/support",       icon: "🛡️", title: "Maintenance & Support",      body: "SLA-backed support, monitoring, and continuous improvement post go-live." },
  { href: "/application/cloud",         icon: "☁️", title: "Cloud Application Development", body: "Cloud-native applications on AWS, Azure, or GCP." },
];

export default function ApplicationServicesPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[["Application Services", null]]}
      eyebrow="Application Services"
      title="Application Services"
      subtitle="We build, test, secure, manage, migrate, and optimise applications to ensure high availability, peak performance, and optimal total cost of ownership."
      stats={[
        { value: "98%", label: "SLA compliance" },
        { value: "300+", label: "Applications managed" },
        { value: "24/7", label: "Monitoring available" },
      ]}
      ctaTitle="Discuss your application needs"
      ctaSub="Free 30-minute consultation with a LogicSoft application specialist."
    >
      <Label>All application services</Label>
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