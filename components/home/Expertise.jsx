"use client";

import React from "react";
import {
  Globe, Smartphone, ShoppingCart, Landmark, ShieldCheck,
  Cloud, Code2, LayoutDashboard, Server, Activity, ArrowUpRight,
} from "lucide-react";

const SECTIONS = [
  {
    label: "Web Solutions",
    eyebrow: "01",
    items: [
      { title: "E-Commerce Platforms",             icon: ShoppingCart,    iconColor: "#db2777", badgeBg: "#fce7f3", badgeBorder: "#fbcfe8" },
      { title: "Online Banking & FinTech Systems", icon: Landmark,        iconColor: "#1d4ed8", badgeBg: "#dbeafe", badgeBorder: "#bfdbfe" },
      { title: "Real Estate & Property Portals",   icon: Globe,           iconColor: "#b45309", badgeBg: "#fef3c7", badgeBorder: "#fde68a" },
      { title: "Crypto & Trading Platforms",       icon: Activity,        iconColor: "#7c3aed", badgeBg: "#ede9fe", badgeBorder: "#ddd6fe" },
      { title: "Corporate & Enterprise Websites",  icon: LayoutDashboard, iconColor: "#0891b2", badgeBg: "#cffafe", badgeBorder: "#a5f3fc" },
      { title: "Logistics & Supply Chain Systems", icon: Server,          iconColor: "#059669", badgeBg: "#d1fae5", badgeBorder: "#6ee7b7" },
      { title: "Legal & Professional Services",    icon: ShieldCheck,     iconColor: "#dc2626", badgeBg: "#fee2e2", badgeBorder: "#fecaca" },
      { title: "Custom Web Applications",          icon: Code2,           iconColor: "#475569", badgeBg: "#f1f5f9", badgeBorder: "#cbd5e1" },
    ],
  },
  {
    label: "Mobile App Development",
    eyebrow: "02",
    items: [
      { title: "iOS Native Applications",          icon: Smartphone,      iconColor: "#475569", badgeBg: "#f1f5f9", badgeBorder: "#cbd5e1" },
      { title: "Android Native Applications",      icon: Smartphone,      iconColor: "#059669", badgeBg: "#d1fae5", badgeBorder: "#6ee7b7" },
      { title: "Cross-Platform Mobile Apps",       icon: Globe,           iconColor: "#1d4ed8", badgeBg: "#dbeafe", badgeBorder: "#bfdbfe" },
      { title: "FinTech & Banking Mobile Apps",    icon: Landmark,        iconColor: "#7c3aed", badgeBg: "#ede9fe", badgeBorder: "#ddd6fe" },
      { title: "E-Commerce Mobile Apps",           icon: ShoppingCart,    iconColor: "#db2777", badgeBg: "#fce7f3", badgeBorder: "#fbcfe8" },
      { title: "Social, Media & Entertainment",    icon: Activity,        iconColor: "#d97706", badgeBg: "#fff7ed", badgeBorder: "#fed7aa" },
    ],
  },
  {
    label: "UI / UX Design",
    eyebrow: "03",
    items: [
      { title: "Product Interface Design",         icon: LayoutDashboard, iconColor: "#db2777", badgeBg: "#fce7f3", badgeBorder: "#fbcfe8" },
      { title: "UX Research & Wireframing",        icon: Code2,           iconColor: "#0891b2", badgeBg: "#cffafe", badgeBorder: "#a5f3fc" },
      { title: "Web & Mobile Prototyping",         icon: Smartphone,      iconColor: "#7c3aed", badgeBg: "#ede9fe", badgeBorder: "#ddd6fe" },
    ],
  },
  {
    label: "DevOps & Cloud Engineering",
    eyebrow: "04",
    items: [
      { title: "CI/CD Automation Pipelines",       icon: Activity,        iconColor: "#059669", badgeBg: "#d1fae5", badgeBorder: "#6ee7b7" },
      { title: "Cloud Migration & Architecture",   icon: Cloud,           iconColor: "#0891b2", badgeBg: "#cffafe", badgeBorder: "#a5f3fc" },
      { title: "Infrastructure as Code (IaC)",     icon: Server,          iconColor: "#475569", badgeBg: "#f1f5f9", badgeBorder: "#cbd5e1" },
      { title: "Containerization & Orchestration", icon: Code2,           iconColor: "#1d4ed8", badgeBg: "#dbeafe", badgeBorder: "#bfdbfe" },
      { title: "System Monitoring & Logging",      icon: Activity,        iconColor: "#b45309", badgeBg: "#fef3c7", badgeBorder: "#fde68a" },
      { title: "DevSecOps & Security Hardening",   icon: ShieldCheck,     iconColor: "#dc2626", badgeBg: "#fee2e2", badgeBorder: "#fecaca" },
      { title: "Cloud Cost Optimization (FinOps)", icon: Landmark,        iconColor: "#7c3aed", badgeBg: "#ede9fe", badgeBorder: "#ddd6fe" },
    ],
  },
];

function ServiceCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="group relative bg-white flex flex-col border border-gray-200 px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300 min-h-[120px] sm:min-h-[140px]">
      <span
        className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
        aria-hidden="true"
      />
      <ArrowUpRight
        className="absolute top-3 right-3 w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] text-gray-300 transition-all duration-300 group-hover:rotate-45 group-hover:text-[#1f6fb2]"
        aria-hidden="true"
      />
      <div
        className="mb-3 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border shrink-0"
        style={{ backgroundColor: item.badgeBg, borderColor: item.badgeBorder }}
      >
        <Icon size={16} style={{ color: item.iconColor }} aria-hidden="true" />
      </div>
      <p className="text-[12.5px] sm:text-[13.5px] font-semibold text-[#1f3a5f] leading-snug group-hover:text-[#1f6fb2] transition-colors duration-200 pr-4">
        {item.title}
      </p>
      <span
        className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
        aria-hidden="true"
      />
    </div>
  );
}

export default function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="py-12 sm:py-20 bg-[#f5f5f5] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">

        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          What we build
        </p>

        <h2
          id="expertise-heading"
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-serif text-[#1f3a5f] mb-4 sm:mb-5"
        >
          Our Core Services
        </h2>

        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-[1.85] sm:leading-[2] max-w-[1100px] mb-10 sm:mb-14">
          Logicsoft Technologies delivers enterprise grade digital products with a focus on
          scalability, security, performance optimization, and long-term business growth
          across web, mobile, cloud, and design ecosystems.
        </p>

        <div className="flex flex-col gap-10 sm:gap-14">
          {SECTIONS.map((section) => (
            <div key={section.label}>

              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-[11px] font-mono font-semibold text-gray-300">
                  {section.eyebrow}
                </span>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] whitespace-nowrap">
                  {section.label}
                </p>
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-[11px] text-gray-300 font-medium hidden sm:block">
                  {section.items.length} services
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
                {section.items.map((item, i) => (
                  <ServiceCard key={i} item={item} />
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}