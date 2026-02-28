"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Briefcase, Calendar } from "lucide-react";

const CATEGORIES = ["All", "Enterprise", "FinTech", "Healthcare", "E-Commerce", "UI/UX"];

const PROJECTS = [
  {
    id: 1,
    title: "Core Banking Integration Platform",
    client: "FirstTrust Bank",
    category: "FinTech",
    image: "/images/fintech.png",
    year: "2024",
    outcome: "40% faster processing",
    resultBg: "#dbeafe",
    resultText: "#1d4ed8",
    tags: ["Node.js", "AWS", "REST API"],
  },
  {
    id: 2,
    title: "Patient Management & EHR System",
    client: "HealthBridge Nigeria",
    category: "Healthcare",
    image: "/images/saas.png",
    year: "2024",
    outcome: "18 months zero downtime",
    resultBg: "#d1fae5",
    resultText: "#059669",
    tags: ["React", "Python", "HIPAA"],
  },
  {
    id: 3,
    title: "Real Estate Investment Platform",
    client: "Proptech Solutions",
    category: "Enterprise",
    image: "/images/real-estate.png",
    year: "2023",
    outcome: "3× listing conversion",
    resultBg: "#fef3c7",
    resultText: "#b45309",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    id: 4,
    title: "Multi-Tenant E-Commerce Marketplace",
    client: "RetailChain West Africa",
    category: "E-Commerce",
    image: "/images/e-commerce.png",
    year: "2023",
    outcome: "40+ stores unified",
    resultBg: "#fce7f3",
    resultText: "#db2777",
    tags: ["React", "Redis", "Elasticsearch"],
  },
  {
    id: 5,
    title: "Broker Trading Dashboard & Mobile App",
    client: "Finpay Africa",
    category: "FinTech",
    image: "/images/trading.png",
    year: "2024",
    outcome: "PCI compliant, day 1",
    resultBg: "#ede9fe",
    resultText: "#7c3aed",
    tags: ["React Native", "WebSockets", "PCI DSS"],
  },
  {
    id: 6,
    title: "Corporate Website & CMS Platform",
    client: "PetroNIG Limited",
    category: "UI/UX",
    image: "/images/real-estate.png",
    year: "2024",
    outcome: "200% organic traffic lift",
    resultBg: "#dcfce7",
    resultText: "#16a34a",
    tags: ["Next.js", "Sanity CMS", "SEO"],
  },
];

export default function SuccessStories() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? PROJECTS.slice(0, 6)
    : PROJECTS.filter((p) => p.category === active).slice(0, 6);

  return (
    <section
      id="success-stories"
      aria-labelledby="success-stories-heading"
      className="py-20 bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
              Our work
            </p>
            <h2
              id="success-stories-heading"
              className="text-[36px] font-serif text-[#1f3a5f] leading-tight"
            >
              Success Stories
            </h2>
            <p className="text-[16px] text-gray-600 leading-[1.85] max-w-[520px] mt-3">
              A selection of projects we've delivered across banking, healthcare,
              retail, and enterprise software.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-[13px] font-medium text-[#1f6fb2] hover:text-[#1f3a5f] border-b border-[#1f6fb2]/30 hover:border-[#1f3a5f]/40 pb-0.5 transition-all duration-200 self-start md:self-end whitespace-nowrap"
          >
            View full portfolio <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── Category pills ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`px-4 py-1.5 text-[12.5px] font-medium border transition-all duration-200 ${
                active === cat
                  ? "bg-[#1f6fb2] border-[#1f6fb2] text-white"
                  : "bg-white border-gray-200 text-gray-500 hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Project grid ── */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-white flex flex-col border border-gray-200 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
              >
                {/* Top slide-in line */}
                <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full z-10" aria-hidden="true" />

                {/* Image */}
                <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "58%" }}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Year chip */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/85 backdrop-blur-sm border border-gray-200 px-2 py-[3px] text-[10.5px] font-medium text-gray-500">
                    {project.year}
                  </div>
                  {/* Category chip */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.08em] bg-[#1f3a5f] text-white">
                    {project.category}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-semibold uppercase tracking-[0.05em] px-2 py-[2px] border border-gray-200 text-gray-400 bg-[#f9f9f9]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-[14px] font-semibold text-[#1f3a5f] leading-snug mb-2 group-hover:text-[#1f6fb2] transition-colors duration-200">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100">
                    {/* Client */}
                    <div className="flex items-center gap-1.5 text-[11.5px] text-gray-400 flex-1 min-w-0">
                      <Briefcase className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span className="truncate">{project.client}</span>
                    </div>

                    {/* Outcome badge */}
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.06em] px-2 py-[3px] border shrink-0"
                      style={{ backgroundColor: project.resultBg, borderColor: project.resultBg, color: project.resultText }}
                    >
                      ↑ {project.outcome}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/case-studies/${project.id}`}
                    aria-label={`View case study: ${project.title}`}
                    className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors duration-200"
                  >
                    View case study
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-45" aria-hidden="true" />
                  </Link>
                </div>

                {/* Bottom slide-in line */}
                <span className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full" aria-hidden="true" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Footer CTA ── */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13.5px] text-gray-500">
            Showing <span className="font-semibold text-[#1f3a5f]">{filtered.length}</span> of{" "}
            <span className="font-semibold text-[#1f3a5f]">300+</span> completed projects.
          </p>
          <Link
            href="/portfolio"
            className="flex items-center gap-2 px-6 py-2.5 text-[13.5px] font-medium border border-[#1f6fb2] text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white transition-all duration-200"
          >
            Browse full portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}