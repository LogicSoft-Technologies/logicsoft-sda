"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  FaLightbulb,
  FaCode,
  FaVials,
  FaHeadset,
  FaChartBar,
  FaShieldAlt,
  FaServer,
} from "react-icons/fa";

// ── Data ─────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: FaLightbulb,
    title: "IT Consulting",
    description:
      "Strategic technology advisory to align IT investments with measurable business outcomes and long-term digital roadmaps.",
    href: "/it-consulting",
    tag: "Strategy",
    stat: "200+ engagements",
    iconColor: "#b45309",
    badgeBg: "#fef3c7",
    badgeBorder: "#fde68a",
    featured: true,
  },
  {
    icon: FaCode,
    title: "Software Development",
    description:
      "End-to-end development of scalable web, mobile, and enterprise applications built on modern stacks.",
    href: "/software-development/services",
    tag: "Engineering",
    stat: "150+ products shipped",
    iconColor: "#1d4ed8",
    badgeBg: "#dbeafe",
    badgeBorder: "#bfdbfe",
    featured: true,
  },
  {
    icon: FaVials,
    title: "Testing and QA",
    description:
      "Rigorous quality assurance, automated regression testing, and performance benchmarking for confident releases.",
    href: "/services/testing-and-qa",
    tag: "Quality",
    stat: "99.4% defect catch rate",
    iconColor: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeBorder: "#ddd6fe",
    featured: false,
  },
  {
    icon: FaHeadset,
    title: "Help Desk Services",
    description:
      "24/7 technical support and ITIL-aligned service desk operations keeping your teams unblocked around the clock.",
    href: "/about/support",
    tag: "Support",
    stat: "< 2hr avg response",
    iconColor: "#0891b2",
    badgeBg: "#cffafe",
    badgeBorder: "#a5f3fc",
    featured: false,
  },
  {
    icon: FaChartBar,
    title: "Data Analytics",
    description:
      "Business intelligence, real-time data pipelines, and actionable insight delivery to drive informed decisions at scale.",
    href: "/services/other-services/data-analytics",
    tag: "Intelligence",
    stat: "80+ dashboards deployed",
    iconColor: "#059669",
    badgeBg: "#d1fae5",
    badgeBorder: "#6ee7b7",
    featured: false,
  },
  {
    icon: FaShieldAlt,
    title: "Cybersecurity Services",
    description:
      "Threat detection, penetration testing, compliance frameworks, and security hardening for enterprise systems.",
    href: "/services/security/cyber-security",
    tag: "Security",
    stat: "ISO 27001 aligned",
    iconColor: "#dc2626",
    badgeBg: "#fee2e2",
    badgeBorder: "#fecaca",
    featured: true,
  },
  {
    icon: FaServer,
    title: "Infrastructure Services",
    description:
      "Cloud architecture, CI/CD automation, and managed infrastructure engineered for high availability and cost efficiency.",
    href: "/services/infrastructure",
    tag: "Cloud & DevOps",
    stat: "99.9% uptime SLA",
    iconColor: "#475569",
    badgeBg: "#f1f5f9",
    badgeBorder: "#cbd5e1",
    featured: false,
  },
];

// ── Tag pill component ────────────────────────────────────────────────────────
const TagPill = ({ label }) => (
  <span className="inline-block px-2 py-[2px] text-[10.5px] font-semibold tracking-[0.07em] uppercase border border-gray-200 text-gray-400 bg-[#f9f9f9]">
    {label}
  </span>
);

// ── Stat badge ────────────────────────────────────────────────────────────────
const StatBadge = ({ value }) => (
  <span className="inline-block text-[11.5px] font-medium text-[#1f6fb2] mt-auto pt-3 border-t border-gray-100 w-full">
    {value}
  </span>
);

// ── Single card ───────────────────────────────────────────────────────────────
const ServiceCard = ({ service, large = false }) => {
  const Icon = service.icon;
  return (
    <Link
      href={service.href}
      aria-label={`Learn more about ${service.title}`}
      className={`
        group relative bg-white flex flex-col
        border border-gray-200
        overflow-hidden
        hover:border-[#1f6fb2] hover:shadow-lg
        transition-all duration-300
        ${large ? "px-8 pt-8 pb-7" : "px-6 pt-7 pb-6"}
      `}
    >
      {/* Corner arrow */}
      <ArrowUpRight
        className="absolute top-3 right-3 w-4 h-4 text-gray-300 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:text-[#1f6fb2]"
        aria-hidden="true"
      />

      {/* Icon badge + tag pill — same row */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 flex items-center justify-center border shrink-0"
          style={{ backgroundColor: service.badgeBg, borderColor: service.badgeBorder }}
        >
          <Icon size={22} style={{ color: service.iconColor }} aria-hidden="true" />
        </div>
        <TagPill label={service.tag} />
      </div>

      {/* Title */}
      <h3
        className={`font-semibold text-[#1f3a5f] leading-snug mb-2 group-hover:text-[#1f6fb2] transition-colors duration-200 font-sans
          ${large ? "text-[17px]" : "text-[15px]"}`}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[13.5px] text-gray-500 leading-[1.8] font-sans flex-1">
        {service.description}
      </p>

      {/* Stat */}
      <StatBadge value={service.stat} />

      {/* Bottom blue slide-in line */}
      <span
        className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
export default function ServiceMap() {
  const [showAll, setShowAll] = useState(false);

  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);
  const visibleRest = showAll ? rest : rest.slice(0, 4);

  return (
    <section
      id="service-map"
      aria-labelledby="service-map-heading"
      className="py-20 bg-white border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-6 gap-6 flex-wrap">
          <h2
            id="service-map-heading"
            className="text-[36px] font-serif text-[#1f3a5f]"
          >
            Our Service Map
          </h2>

          <Link
            href="/services"
            className="flex items-center gap-2 text-[13.5px] font-medium text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors duration-200 pb-1 border-b border-[#1f6fb2]/30 hover:border-[#1f3a5f]/30"
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="text-[17px] text-gray-700 leading-[2] mb-14 max-w-[1100px]">
          Logicsoft Technologies delivers a full spectrum of IT services — from
          strategic consulting and custom software engineering through to
          cybersecurity, cloud infrastructure, and round-the-clock support.
          Each practice is staffed by dedicated specialists with deep domain
          expertise.
        </p>

        {/* ── Featured row (3 large cards) ── */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-4">
            Core Practices
          </p>
          <div className="grid grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
            {featured.map((s, i) => (
              <ServiceCard key={i} service={s} large />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] whitespace-nowrap">
            Supporting Services
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* ── Supporting services grid ── */}
        <div className="grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {visibleRest.map((s, i) => (
            <ServiceCard key={i} service={s} />
          ))}
        </div>

        {/* ── Show more / less ── */}
        {rest.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll((p) => !p)}
              className="flex items-center gap-2 px-6 py-2.5 text-[13.5px] font-medium border border-[#1f6fb2] text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white transition-all duration-200"
            >
              {showAll ? "Show less" : "Show all services"}
              <ArrowRight
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}