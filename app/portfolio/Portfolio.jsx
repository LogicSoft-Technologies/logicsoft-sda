"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Briefcase, Users, Calendar, TrendingUp, ChevronDown } from "lucide-react";

// ── SEO Metadata (export for Next.js App Router) ──────────────────────────────
export const metadata = {
  title: "Portfolio & Case Studies | Logicsoft Technologies",
  description:
    "Browse Logicsoft Technologies' project portfolio — enterprise software, FinTech platforms, healthcare systems, e-commerce, and data engineering solutions across 30+ industries.",
  keywords: [
    "software development portfolio Nigeria",
    "enterprise software case studies",
    "FinTech development Lagos",
    "IT consulting portfolio",
    "Logicsoft Technologies projects",
  ],
  openGraph: {
    title: "Portfolio & Case Studies | Logicsoft Technologies",
    description: "Real projects. Real outcomes. Explore Logicsoft's case studies across banking, healthcare, retail, and more.",
    type: "website",
  },
};

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Enterprise Platforms",
  "FinTech & Banking",
  "Healthcare",
  "E-Commerce",
  "Data & Analytics",
  "Mobile Apps",
  "UI/UX & Design",
  "Infrastructure",
];

const PROJECTS = [
  {
    id: 1,
    title: "Core Banking Integration Platform",
    client: "FirstTrust Bank",
    category: "FinTech & Banking",
    image: "/images/fintech.png",
    year: "2024",
    duration: "8 months",
    outcome: "40% faster processing",
    tags: ["Node.js", "PostgreSQL", "AWS", "REST API"],
    description: "Full core banking API integration connecting 6 legacy systems into a single, real-time data layer — enabling instant cross-branch reconciliation and automated compliance reporting.",
    featured: true,
    resultBg: "#dbeafe",
    resultText: "#1d4ed8",
  },
  {
    id: 2,
    title: "Patient Management & EHR System",
    client: "HealthBridge Nigeria",
    category: "Healthcare",
    image: "/images/saas.png",
    year: "2024",
    duration: "6 months",
    outcome: "18 months zero downtime",
    tags: ["React", "Python", "HIPAA", "PostgreSQL"],
    description: "HIPAA-aligned electronic health records platform for a multi-branch hospital network — covering patient intake, scheduling, medical records, billing, and regulatory audit trails.",
    featured: true,
    resultBg: "#d1fae5",
    resultText: "#059669",
  },
  {
    id: 3,
    title: "Real Estate Investment Platform",
    client: "Proptech Solutions",
    category: "Enterprise Platforms",
    image: "/images/real-estate.png",
    year: "2023",
    duration: "5 months",
    outcome: "3× listing conversion",
    tags: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    description: "Full-stack property investment platform with fractional ownership, escrow integration, investor dashboards, and automated valuation models for Lagos and Abuja markets.",
    featured: true,
    resultBg: "#fef3c7",
    resultText: "#b45309",
  },
  {
    id: 4,
    title: "Multi-Tenant E-Commerce Marketplace",
    client: "RetailChain West Africa",
    category: "E-Commerce",
    image: "/images/e-commerce.png",
    year: "2023",
    duration: "7 months",
    outcome: "40+ stores unified",
    tags: ["React", "Node.js", "Redis", "Elasticsearch"],
    description: "Scalable multi-vendor marketplace with real-time inventory sync across 40+ physical stores, dynamic pricing engine, and integrated logistics partner API.",
    featured: false,
    resultBg: "#fce7f3",
    resultText: "#db2777",
  },
  {
    id: 5,
    title: "Telecom Customer Analytics Platform",
    client: "AfriTelco Ghana",
    category: "Data & Analytics",
    image: "/images/trading.png",
    year: "2023",
    duration: "4 months",
    outcome: "80% AWS cost reduction",
    tags: ["Apache Kafka", "AWS", "Python", "ROLAP"],
    description: "Multi-tenant big data platform processing 10+ telemetry sources with real-time churn prediction, customer behaviour analytics across 30+ dimensions, and automated reporting.",
    featured: false,
    resultBg: "#cffafe",
    resultText: "#0891b2",
  },
  {
    id: 6,
    title: "Broker Trading Dashboard & Mobile App",
    client: "Finpay Africa",
    category: "FinTech & Banking",
    image: "/images/fintech.png",
    year: "2024",
    duration: "3 months",
    outcome: "PCI compliant, day 1",
    tags: ["React Native", "Node.js", "WebSockets", "PCI DSS"],
    description: "Real-time broker trading platform with live market data feeds, portfolio analytics, KYC onboarding flow, and mobile app — PCI DSS compliant from launch.",
    featured: false,
    resultBg: "#ede9fe",
    resultText: "#7c3aed",
  },
  {
    id: 7,
    title: "Fleet & Logistics Management System",
    client: "Gulf Logistics Group",
    category: "Enterprise Platforms",
    image: "/images/saas.png",
    year: "2023",
    duration: "6 months",
    outcome: "30% efficiency gain",
    tags: ["Vue.js", "Python", "PostgreSQL", "Google Maps API"],
    description: "End-to-end fleet management integrating GPS tracking, driver management, maintenance scheduling, route optimisation, and ERP data sync across 3 countries.",
    featured: false,
    resultBg: "#fff7ed",
    resultText: "#d97706",
  },
  {
    id: 8,
    title: "Corporate Website & CMS Platform",
    client: "PetroNIG Limited",
    category: "UI/UX & Design",
    image: "/images/real-estate.png",
    year: "2024",
    duration: "2 months",
    outcome: "200% organic traffic lift",
    tags: ["Next.js", "Sanity CMS", "Tailwind CSS", "SEO"],
    description: "Enterprise corporate website with headless CMS, multilingual support, investor relations portal, and structured data SEO — designed to ISO brand guidelines.",
    featured: false,
    resultBg: "#dcfce7",
    resultText: "#16a34a",
  },
  {
    id: 9,
    title: "Cloud Infrastructure Migration",
    client: "NorthBank Holdings",
    category: "Infrastructure",
    image: "/images/trading.png",
    year: "2024",
    duration: "5 months",
    outcome: "Zero-trust architecture",
    tags: ["AWS", "Terraform", "Kubernetes", "ISO 27001"],
    description: "Full cloud infrastructure migration from legacy on-premise servers to AWS with zero-trust security model, Kubernetes orchestration, and ISO 27001 compliance.",
    featured: false,
    resultBg: "#fee2e2",
    resultText: "#dc2626",
  },
];

const STATS = [
  { value: "300+", label: "Projects delivered",  icon: Briefcase    },
  { value: "120+", label: "Enterprise clients",  icon: Users        },
  { value: "12+",  label: "Years of experience", icon: Calendar     },
  { value: "98%",  label: "Client retention",    icon: TrendingUp   },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative bg-white flex flex-col border border-gray-200 overflow-hidden hover:border-[#1f6fb2] hover:shadow-lg transition-all duration-300"
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {/* Top slide-in line */}
      <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full z-10" aria-hidden="true" />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-10 px-2 py-[3px] text-[10px] font-bold uppercase tracking-[0.1em] bg-[#1f3a5f] text-white">
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative w-full overflow-hidden bg-gray-100" style={{ paddingBottom: "56.25%" }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-600"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Year chip */}
        <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-sm border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-gray-500">
          {project.year}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold uppercase tracking-[0.06em] px-2 py-[2px] border border-gray-200 text-gray-400 bg-[#f9f9f9]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] font-semibold text-gray-300 px-1">+{project.tags.length - 3}</span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-[15px] font-semibold text-[#1f3a5f] leading-snug mb-2 group-hover:text-[#1f6fb2] transition-colors duration-200"
          itemProp="name"
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[12.5px] text-gray-500 leading-[1.85] flex-1 mb-4" itemProp="description">
          {project.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-[11.5px] text-gray-400">
            <Briefcase className="w-3 h-3" aria-hidden="true" />
            <span itemProp="creator">{project.client}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11.5px] text-gray-400">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {project.duration}
          </div>
        </div>

        {/* Outcome + CTA */}
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 border"
            style={{
              backgroundColor: project.resultBg,
              borderColor: project.resultBg,
              color: project.resultText,
            }}
          >
            ↑ {project.outcome}
          </span>

          <Link
            href={`/case-studies/${project.id}`}
            aria-label={`View case study: ${project.title}`}
            className="flex items-center gap-1.5 text-[12px] font-medium text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors duration-200"
          >
            View case study
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-45" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Bottom slide-in line */}
      <span className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full" aria-hidden="true" />
    </motion.article>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeCategory, setActiveCategory]   = useState("All");
  const [visibleCount,   setVisibleCount]      = useState(6);
  const [isFilterOpen,   setIsFilterOpen]      = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() =>
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(6);
    setIsFilterOpen(false);
  };

  return (
    <div className="pt-[96px] bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff]" itemScope itemType="https://schema.org/CollectionPage">

      {/* ── Hidden SEO title ── */}
      <h1 className="sr-only" itemProp="name">
        Portfolio & Case Studies — Logicsoft Technologies
      </h1>

      {/* ── Breadcrumb ── */}
      <div className="max-w-[82rem] mx-auto px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400 tracking-wide">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">Home</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Portfolio</span>
        </nav>
      </div>

      {/* ── Hero Header ── */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 py-14">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
                Case studies
              </p>
              <h2 className="text-[36px] lg:text-[48px] font-serif text-[#1f3a5f] leading-[1.12] mb-5">
                Our Project Portfolio
              </h2>
              <p className="text-[17px] text-gray-700 leading-[2] max-w-[720px]">
                From core banking integrations to healthcare platforms and analytics
                infrastructure — every project in our portfolio is a real outcome
                delivered for a real client. Browse by industry or technology.
              </p>
            </div>

            {/* Stats column */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 shrink-0">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white border border-gray-200 px-4 py-3 min-w-[120px]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3 h-3 text-[#1f6fb2]" aria-hidden="true" />
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.08em]">{s.label}</span>
                    </div>
                    <p className="text-[24px] font-light text-[#1f3a5f] leading-none">{s.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="sticky top-[64px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[82rem] mx-auto px-6">

          {/* Desktop filter */}
          <div className="hidden md:flex items-center gap-0 overflow-x-auto scrollbar-hide py-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                aria-pressed={activeCategory === cat}
                className={`shrink-0 px-4 py-4 text-[12.5px] font-medium border-b-[2px] transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "border-[#1f6fb2] text-[#1f6fb2]"
                    : "border-transparent text-gray-500 hover:text-[#1f3a5f] hover:border-gray-300"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-[10px] text-gray-300">
                    ({PROJECTS.filter((p) => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile filter dropdown */}
          <div className="md:hidden py-3 relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-200 text-[13px] font-medium text-[#1f3a5f] bg-white"
              aria-expanded={isFilterOpen}
            >
              <span>{activeCategory === "All" ? "All projects" : activeCategory}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-30 max-h-[60vh] overflow-y-auto"
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-4 py-3 text-[13px] border-b border-gray-100 last:border-0 transition-colors duration-150 ${
                        activeCategory === cat
                          ? "text-[#1f6fb2] bg-[#f0f6ff] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── Project grid ── */}
      <div className="max-w-[82rem] mx-auto px-6 py-14">

        {/* Result count */}
        <div className="flex items-center gap-4 mb-8">
          <p className="text-[12px] text-gray-400">
            Showing <span className="font-semibold text-[#1f3a5f]">{visible.length}</span> of{" "}
            <span className="font-semibold text-[#1f3a5f]">{filtered.length}</span> projects
            {activeCategory !== "All" && (
              <> in <span className="text-[#1f6fb2] font-semibold">{activeCategory}</span></>
            )}
          </p>
          {activeCategory !== "All" && (
            <button
              onClick={() => handleCategoryChange("All")}
              className="text-[11.5px] text-gray-400 hover:text-[#1f6fb2] underline underline-offset-2 transition-colors duration-150"
            >
              Clear filter
            </button>
          )}
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] text-gray-400 mb-3">No projects found in this category.</p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="text-[13px] font-medium text-[#1f6fb2] hover:underline"
            >
              View all projects
            </button>
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="flex items-center gap-2 px-8 py-3 text-[13.5px] font-medium border border-[#1f6fb2] text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white transition-all duration-200"
            >
              Load more projects
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ── Industries served strip ── */}
      <div className="border-t border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 py-12">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-5">
            Industries we've delivered in
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Banking & FinTech", "Healthcare", "Real Estate", "E-Commerce",
              "Telecoms", "Oil & Gas", "Logistics", "Insurance",
              "Manufacturing", "Education", "Government", "Retail",
            ].map((ind) => (
              <span
                key={ind}
                className="text-[12px] font-medium text-gray-500 border border-gray-200 bg-white px-3 py-1.5 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-colors duration-150 cursor-default"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="border-t border-gray-200 bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold text-[#60a5fa] uppercase tracking-[0.12em] mb-2">
              Start your project
            </p>
            <h3 className="text-[24px] font-serif font-normal text-white mb-1">
              Ready to add your project to this list?
            </h3>
            <p className="text-[14px] text-white/50 max-w-lg">
              Tell us about your initiative and we'll show you exactly how Logicsoft
              Technologies can deliver the outcome you need.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-7 py-3 text-[13.5px] font-semibold text-white
                bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                ring-1 ring-inset ring-white/30 transition-all duration-200"
            >
              Discuss my project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/case-studies"
              className="flex items-center gap-2 px-7 py-3 text-[13.5px] font-medium border border-white/30 text-white hover:bg-white/10 transition-all duration-200"
            >
              Full case studies
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}