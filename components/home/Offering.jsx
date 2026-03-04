"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    title: "Software Development",
    eyebrow: "Engineering",
    description: "We engineer reliable, scalable, and secure software solutions across platforms and devices helping organisations accelerate innovation, optimise operations, and deliver consistent digital experiences.",
    linksLeft: [
      ["Software Consulting",           "/software-development/consulting"  ],
      ["Custom Software Development",   "/software-development/custom"      ],
      ["Software Outsourcing",          "/software-development/outsourcing" ],
      ["Software Product Development",  "/software-development/product"     ],
    ],
    linksRight: [
      ["Team Augmentation",             "/software-development/staff-augmentation"],
      ["Cloud Application Development", "/application/cloud"                      ],
      ["Legacy Modernisation",          "/application/modernization"              ],
      ["Post-Launch Support",           "/software-development/support"           ],
    ],
    cta: "/software-development/services",
    stat: "300+ projects delivered",
  },
  {
    id: 2,
    title: "IT Consulting",
    eyebrow: "Strategy",
    description: "We help businesses plan and execute effective IT strategies — guiding digital transformation initiatives, modernising legacy systems, and integrating complex technologies to support sustainable growth.",
    linksLeft: [
      ["Digital Transformation",        "/digital-transformation" ],
      ["Project Management Consulting", "/project-management"     ],
      ["Crisis Management",             "/it-consulting/crisis"   ],
      ["IT Service Management",         "/itsm"                   ],
    ],
    linksRight: [
      ["Solution Consulting",           "/it-consulting/solution" ],
      ["Platform Consulting",           "/it-consulting/platform" ],
      ["Enterprise IT Consulting",      "/it-consulting/enterprise"],
      ["User Training",                 "/it-consulting/training" ],
    ],
    cta: "/it-consulting",
    stat: "40+ enterprise clients",
  },
  {
    id: 3,
    title: "Application Services",
    eyebrow: "Applications",
    description: "We build, test, secure, manage, migrate, and optimise applications to ensure high availability, peak performance, and optimal total cost of ownership across your entire application estate.",
    linksLeft: [
      ["Application Management",        "/application/management"   ],
      ["Application Modernisation",     "/application/modernization"],
      ["Application Integration",       "/application/integration"  ],
      ["Application Security",          "/application/security"     ],
    ],
    linksRight: [
      ["Application Development",       "/application/development"  ],
      ["Application Testing",           "/application/testing"      ],
      ["Maintenance & Support",         "/application/support"      ],
    ],
    cta: "/application/services",
    stat: "98% SLA compliance",
  },
  {
    id: 4,
    title: "Testing & QA",
    eyebrow: "Quality",
    description: "We deliver full-range QA and testing services that guarantee quality across mobile, web, and desktop applications — catching issues before they reach production and protecting your reputation.",
    linksLeft: [
      ["QA Outsourcing",                "/qa/outsourcing"      ],
      ["QA Consulting",                 "/qa/consulting"       ],
      ["Functional Testing",            "/testing/functional"  ],
      ["Usability Testing",             "/testing/usability"   ],
    ],
    linksRight: [
      ["Performance Testing",           "/testing/performance" ],
      ["Test Automation",               "/testing/automation"  ],
      ["Security Testing",              "/testing/security"    ],
      ["Penetration Testing",           "/testing/penetration" ],
    ],
    cta: "/software-testing",
    stat: "Zero critical defects policy",
  },
];

export default function Offering() {
  const [activeId, setActiveId] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = SERVICES.find((s) => s.id === activeId) || SERVICES[0];

  const handleSelect = (id) => {
    setActiveId(id);
    setMobileOpen(false);
  };

  return (
    <section
      id="offering"
      aria-labelledby="offering-heading"
      className="py-12 sm:py-20 border-t border-blue-100"
      style={{ background: "linear-gradient(135deg, #eaf6ff 0%, #dff0ff 50%, #eef7ff 100%)" }}
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">

        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          What we offer
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4 mb-8 sm:mb-12">
          <h2
            id="offering-heading"
            className="text-[26px] sm:text-[32px] lg:text-[36px] font-serif text-[#1f3a5f]"
          >
            Explore Our Offering
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-gray-500 max-w-sm md:text-right leading-relaxed">
            Click a service to explore sub-services, capabilities, and how we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] border border-blue-100 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">

          {/* Mobile: dropdown selector */}
          <div className="lg:hidden border-b border-blue-100 bg-white/60">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1f6fb2] mb-0.5">
                  {active.eyebrow}
                </span>
                <span className="block text-[15px] font-semibold text-[#1f3a5f]">
                  {active.title}
                </span>
              </div>
              <ArrowUpRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-blue-50"
                >
                  {SERVICES.filter((s) => s.id !== activeId).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleSelect(service.id)}
                      className="w-full text-left px-5 py-3.5 border-b border-blue-50 last:border-b-0 hover:bg-white/80 transition-colors"
                    >
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-gray-400 mb-0.5">
                        {service.eyebrow}
                      </span>
                      <span className="block text-[14.5px] font-semibold text-gray-600">
                        {service.title}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop: sidebar tabs */}
          <aside className="hidden lg:block border-r border-blue-100 bg-white/60">
            {SERVICES.map((service) => {
              const isActive = activeId === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  aria-selected={isActive}
                  className={`group relative w-full text-left px-6 py-5 border-b border-blue-50 last:border-b-0 transition-all duration-200 ${
                    isActive
                      ? "bg-white border-l-[3px] border-l-[#1f6fb2]"
                      : "border-l-[3px] border-l-transparent hover:bg-white/80 hover:border-l-[#1f6fb2]/40"
                  }`}
                >
                  <span className={`block text-[10px] font-semibold uppercase tracking-[0.1em] mb-0.5 transition-colors duration-200 ${
                    isActive ? "text-[#1f6fb2]" : "text-gray-400 group-hover:text-[#1f6fb2]/60"
                  }`}>
                    {service.eyebrow}
                  </span>
                  <span className={`block text-[15px] font-semibold transition-colors duration-200 ${
                    isActive ? "text-[#1f3a5f]" : "text-gray-600 group-hover:text-[#1f3a5f]"
                  }`}>
                    {service.title}
                  </span>
                </button>
              );
            })}
          </aside>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22 }}
              className="p-5 sm:p-8 lg:p-10 bg-white"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5 sm:mb-6">
                <div>
                  <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.1em] mb-1">
                    {active.eyebrow}
                  </p>
                  <h3 className="text-[22px] sm:text-[26px] font-serif text-[#1f3a5f]">
                    {active.title}
                  </h3>
                </div>
                <span className="self-start shrink-0 text-[11px] font-semibold text-[#1f6fb2] border border-[#bfdbfe] bg-[#eff6ff] px-3 py-1.5 whitespace-nowrap">
                  {active.stat}
                </span>
              </div>

              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-[1.9] mb-6 sm:mb-8 max-w-2xl">
                {active.description}
              </p>

              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <p className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.1em] whitespace-nowrap">
                  Services included
                </p>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0 mb-6 sm:mb-8">
                <ul>
                  {active.linksLeft.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="group/link flex items-center justify-between py-2.5 border-b border-gray-100 text-[13.5px] sm:text-[14px] text-gray-600 hover:text-[#1f6fb2] transition-colors duration-150"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 bg-gray-300 group-hover/link:bg-[#1f6fb2] transition-colors duration-150 shrink-0" aria-hidden="true" />
                          {label}
                        </span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-150 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul>
                  {active.linksRight.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="group/link flex items-center justify-between py-2.5 border-b border-gray-100 text-[13.5px] sm:text-[14px] text-gray-600 hover:text-[#1f6fb2] transition-colors duration-150"
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 bg-gray-300 group-hover/link:bg-[#1f6fb2] transition-colors duration-150 shrink-0" aria-hidden="true" />
                          {label}
                        </span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-150 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                <p className="text-[12px] text-gray-400">
                  {active.linksLeft.length + active.linksRight.length} services in this practice
                </p>
                <Link
                  href={active.cta}
                  className="flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-[#1f6fb2] hover:bg-[#1f3a5f] transition-colors duration-200 self-start sm:self-auto"
                >
                  Explore {active.title} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}