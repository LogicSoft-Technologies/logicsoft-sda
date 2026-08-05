"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown,
  Landmark, Heart, ShoppingBag, Building2,
  Truck, Zap, GraduationCap, ShieldCheck,
  BarChart3, Factory, Plane, Wheat,
} from "lucide-react";

// ── Industry data ─────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: 1,
    slug: "banking-fintech",
    category: "Financial Services",
    name: "Banking & FinTech",
    icon: Landmark,
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    headline: "Core banking, payments, and digital finance at scale.",
    description:
      "We build core banking integrations, lending platforms, digital wallets, PCI DSS-compliant payment gateways, and regulatory reporting systems. From neobanks to tier-1 financial institutions — we speak the language of money.",
    services: ["Core Banking Integration", "Payment Gateway Development", "KYC & AML Systems", "Regulatory Reporting", "Digital Wallet Platforms"],
    stats: [{ value: "40+", label: "FinTech projects" }, { value: "PCI DSS", label: "Compliant" }],
    featured: true,
    caseStudy: { title: "Core Banking Integration Platform", client: "FirstTrust Bank", outcome: "40% faster processing" },
  },
  {
    id: 2,
    slug: "healthcare",
    category: "Healthcare",
    name: "Healthcare",
    icon: Heart,
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    headline: "HIPAA-aligned systems for modern healthcare networks.",
    description:
      "Electronic health records, patient management systems, telemedicine platforms, medical billing automation, and clinical data analytics — all engineered to meet HIPAA and local regulatory standards.",
    services: ["EHR & EMR Systems", "Telemedicine Platforms", "Medical Billing Automation", "Clinical Analytics", "Patient Portals"],
    stats: [{ value: "18mo", label: "Zero downtime" }, { value: "HIPAA", label: "Aligned" }],
    featured: true,
    caseStudy: { title: "Patient Management & EHR System", client: "HealthBridge Nigeria", outcome: "18 months zero downtime" },
  },
  {
    id: 3,
    slug: "ecommerce-retail",
    category: "Commerce",
    name: "E-Commerce & Retail",
    icon: ShoppingBag,
    accentColor: "#db2777",
    accentBg: "#fdf2f8",
    headline: "Multi-channel retail platforms built to convert and scale.",
    description:
      "From multi-vendor marketplaces to headless commerce storefronts — we build retail platforms with real-time inventory sync, dynamic pricing engines, logistics integrations, and omnichannel customer experiences.",
    services: ["Multi-Vendor Marketplaces", "Headless Commerce", "Inventory Management", "Loyalty & CRM Systems", "Logistics API Integration"],
    stats: [{ value: "40+", label: "Stores unified" }, { value: "3×", label: "Conversion lift" }],
    featured: true,
    caseStudy: { title: "Multi-Tenant E-Commerce Marketplace", client: "RetailChain West Africa", outcome: "40+ stores unified" },
  },
  {
    id: 4,
    slug: "real-estate",
    category: "Property",
    name: "Real Estate & PropTech",
    icon: Building2,
    accentColor: "#b45309",
    accentBg: "#fffbeb",
    headline: "Property platforms that close deals faster.",
    description:
      "Investment platforms, fractional ownership systems, property management portals, automated valuation models, and escrow integrations — purpose-built for the African and MENA property markets.",
    services: ["Property Investment Platforms", "Fractional Ownership Systems", "AVM & Valuation Tools", "Escrow Integration", "Tenant Management Portals"],
    stats: [{ value: "3×", label: "Listing conversion" }, { value: "5", label: "Markets served" }],
    featured: false,
    caseStudy: { title: "Real Estate Investment Platform", client: "Proptech Solutions", outcome: "3× listing conversion" },
  },
  {
    id: 5,
    slug: "logistics-transportation",
    category: "Operations",
    name: "Logistics & Transportation",
    icon: Truck,
    accentColor: "#d97706",
    accentBg: "#fff7ed",
    headline: "Fleet intelligence and supply chain visibility.",
    description:
      "End-to-end logistics platforms with GPS tracking, route optimisation, driver management, warehouse management systems, and ERP sync — engineered for multi-country operations.",
    services: ["Fleet Management Systems", "Route Optimisation", "Warehouse Management", "Last-Mile Delivery Apps", "ERP Integration"],
    stats: [{ value: "30%", label: "Efficiency gain" }, { value: "3", label: "Countries deployed" }],
    featured: false,
    caseStudy: { title: "Fleet & Logistics Management System", client: "Gulf Logistics Group", outcome: "30% efficiency gain" },
  },
  {
    id: 6,
    slug: "telecoms",
    category: "Technology",
    name: "Telecoms",
    icon: Zap,
    accentColor: "#0891b2",
    accentBg: "#ecfeff",
    headline: "Data platforms and BSS/OSS systems for telecom operators.",
    description:
      "Customer analytics, churn prediction models, billing systems, network performance dashboards, and self-service portals for telecom operators processing millions of daily transactions.",
    services: ["Customer Analytics Platforms", "Churn Prediction Models", "Billing & Revenue Systems", "Network Performance Dashboards", "Self-Service Portals"],
    stats: [{ value: "80%", label: "AWS cost reduction" }, { value: "10+", label: "Data sources integrated" }],
    featured: false,
    caseStudy: { title: "Telecom Customer Analytics Platform", client: "AfriTelco Ghana", outcome: "80% AWS cost reduction" },
  },
  {
    id: 7,
    slug: "education",
    category: "Education",
    name: "Education & EdTech",
    icon: GraduationCap,
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    headline: "Learning platforms that scale from classroom to continent.",
    description:
      "Learning management systems, student information platforms, adaptive learning engines, virtual classrooms, and institutional analytics — built for K-12, tertiary, and corporate training environments.",
    services: ["Learning Management Systems", "Student Information Platforms", "Adaptive Learning Engines", "Virtual Classrooms", "Institutional Analytics"],
    stats: [{ value: "50K+", label: "Learners served" }, { value: "99.9%", label: "Uptime SLA" }],
    featured: false,
    caseStudy: null,
  },
  {
    id: 8,
    slug: "government",
    category: "Public Sector",
    name: "Government & Public Sector",
    icon: ShieldCheck,
    accentColor: "#374151",
    accentBg: "#f9fafb",
    headline: "Citizen-facing digital services and e-government platforms.",
    description:
      "Digital identity systems, e-government portals, public service automation, revenue collection platforms, and compliance management systems — built to ISO 27001 and NDPR standards.",
    services: ["e-Government Portals", "Digital Identity Systems", "Revenue Collection Platforms", "Public Records Management", "Compliance & Audit Systems"],
    stats: [{ value: "ISO 27001", label: "Certified" }, { value: "NDPR", label: "Compliant" }],
    featured: false,
    caseStudy: null,
  },
  {
    id: 9,
    slug: "oil-gas",
    category: "Energy",
    name: "Oil, Gas & Energy",
    icon: BarChart3,
    accentColor: "#dc2626",
    accentBg: "#fff1f2",
    headline: "Operations technology and data platforms for energy companies.",
    description:
      "Asset management systems, SCADA integration layers, field operations apps, HSE compliance platforms, and enterprise reporting dashboards for upstream, midstream, and downstream operators.",
    services: ["Asset Management Systems", "SCADA Integration", "Field Operations Apps", "HSE Compliance Platforms", "Enterprise Reporting"],
    stats: [{ value: "Zero-trust", label: "Architecture" }, { value: "ISO 27001", label: "Engineered" }],
    featured: false,
    caseStudy: null,
  },
  {
    id: 10,
    slug: "manufacturing",
    category: "Operations",
    name: "Manufacturing",
    icon: Factory,
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    headline: "Smart factory systems and production intelligence.",
    description:
      "ERP implementations, production planning systems, quality management platforms, IoT sensor integration, and supply chain visibility tools for discrete and process manufacturers.",
    services: ["ERP Implementation", "Production Planning Systems", "Quality Management Platforms", "IoT Integration", "Supply Chain Visibility"],
    stats: [{ value: "25%", label: "OEE improvement" }, { value: "Real-time", label: "Production data" }],
    featured: false,
    caseStudy: null,
  },
  {
    id: 11,
    slug: "aviation-travel",
    category: "Travel",
    name: "Aviation & Travel",
    icon: Plane,
    accentColor: "#0369a1",
    accentBg: "#e0f2fe",
    headline: "Booking engines, ops systems, and passenger experience platforms.",
    description:
      "Flight booking engines, airline ops dashboards, crew management systems, loyalty programme platforms, and airport customer experience applications for carriers and travel companies.",
    services: ["Flight Booking Engines", "Crew Management Systems", "Loyalty Programme Platforms", "Ops Dashboards", "Airport Experience Apps"],
    stats: [{ value: "99.95%", label: "Booking uptime" }, { value: "24/7", label: "Ops support" }],
    featured: false,
    caseStudy: null,
  },
  {
    id: 12,
    slug: "agriculture",
    category: "Agriculture",
    name: "Agriculture & AgriTech",
    icon: Wheat,
    accentColor: "#16a34a",
    accentBg: "#f0fdf4",
    headline: "Digital platforms connecting farmers to markets and finance.",
    description:
      "Farm management systems, commodity trading platforms, supply chain traceability tools, agri-financing portals, and precision agriculture dashboards for smallholders and agribusinesses.",
    services: ["Farm Management Systems", "Commodity Trading Platforms", "Supply Chain Traceability", "Agri-Financing Portals", "Precision Agriculture Dashboards"],
    stats: [{ value: "12K+", label: "Farmers connected" }, { value: "6", label: "Value chain layers" }],
    featured: false,
    caseStudy: null,
  },
];

const CATEGORIES = ["All", "Financial Services", "Healthcare", "Commerce", "Property", "Operations", "Technology", "Education", "Public Sector", "Energy", "Travel", "Agriculture"];

const STATS = [
  { value: "30+",  label: "Industries served"    },
  { value: "100+", label: "Projects delivered"   },
  { value: "5+",  label: "Years of experience"  },
  { value: "98%",  label: "Client retention rate"},
];

// ── Industry Card ─────────────────────────────────────────────────────────────
function IndustryCard({ industry, index }) {
  const Icon = industry.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Top accent line */}
      <span
        className="absolute top-0 left-0 h-[3px] w-0 transition-all duration-500 ease-out group-hover:w-full"
        style={{ background: `linear-gradient(90deg, ${industry.accentColor}, ${industry.accentColor}88)` }}
        aria-hidden="true"
      />

      {/* Featured badge */}
      {industry.featured && (
        <div className="absolute top-4 right-4 px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.12em] bg-[#1f3a5f] text-white">
          Featured
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">

        {/* Icon + category */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 flex items-center justify-center shrink-0 transition-colors duration-300"
            style={{ background: industry.accentBg }}
          >
            <Icon className="w-5 h-5" style={{ color: industry.accentColor }} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
            {industry.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-[18px] font-serif font-bold text-[#1f3a5f] mb-2 leading-snug group-hover:text-[#1f6fb2] transition-colors duration-200">
          {industry.name}
        </h3>

        {/* Headline */}
        <p className="text-[12.5px] font-semibold text-gray-500 mb-3 leading-snug">
          {industry.headline}
        </p>

        {/* Rule */}
        <div
          className="w-8 h-[2px] mb-4 opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-300"
          style={{ background: industry.accentColor }}
        />

        {/* Description */}
        <p className="text-[13px] text-gray-500 leading-[1.85] flex-1 mb-5">
          {industry.description}
        </p>

        {/* Services list */}
        <ul className="space-y-1.5 mb-6">
          {industry.services.slice(0, 4).map((s) => (
            <li key={s} className="flex items-center gap-2 text-[12px] text-gray-500">
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: industry.accentColor }}
              />
              {s}
            </li>
          ))}
          {industry.services.length > 4 && (
            <li className="text-[11px] text-gray-300 pl-3">
              +{industry.services.length - 4} more
            </li>
          )}
        </ul>

        {/* Stats row */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mb-5">
          {industry.stats.map((s) => (
            <div key={s.label}>
              <p className="text-[17px] font-light text-[#1f3a5f] leading-none">{s.value}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Case study callout */}
        {industry.caseStudy && (
          <div
            className="px-4 py-3 mb-5 border-l-[3px]"
            style={{ background: industry.accentBg, borderColor: industry.accentColor }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-0.5">Case study</p>
            <p className="text-[12px] font-semibold text-[#1f3a5f] leading-snug mb-0.5">{industry.caseStudy.title}</p>
            <p className="text-[11px] text-gray-400">{industry.caseStudy.client} · <span style={{ color: industry.accentColor }} className="font-semibold">↑ {industry.caseStudy.outcome}</span></p>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/industries/${industry.slug}`}
          className="inline-flex items-center gap-2 text-[12.5px] font-bold transition-all duration-200 group-hover:gap-3"
          style={{ color: industry.accentColor }}
        >
          Explore {industry.name} solutions
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function IndustriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen]     = useState(false);

  const filtered = useMemo(
    () => activeCategory === "All" ? INDUSTRIES : INDUSTRIES.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  const handleCategory = (cat) => { setActiveCategory(cat); setIsFilterOpen(false); };

  return (
    <div className="pt-[96px] bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff]">
      <h1 className="sr-only">Industries We Serve — Logicsoft Technologies</h1>

      {/* ── Breadcrumb ── */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">Home</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Industries</span>
        </nav>
      </div>

      {/* ── Hero Header ── */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.15em] mb-4">
                Industries we serve
              </p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                Deep Domain Expertise.<br className="hidden lg:block" />
                <span className="text-[#1f6fb2]">Sector-Specific</span> Engineering.
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[680px]">
                We don't just write code, we understand the compliance requirements, business workflows,
                and operational constraints of your industry. That's what separates a working product
                from a great one.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {STATS.map((s, i) => (
                <div key={i} className="bg-white border border-gray-200 px-5 py-4 min-w-[140px]">
                  <p className="text-[36px] font-light text-[#1f3a5f] leading-none mb-1">{s.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[64px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[82rem] mx-auto px-4">

          {/* Desktop */}
          <div className="hidden md:flex items-center overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const count = cat === "All" ? INDUSTRIES.length : INDUSTRIES.filter((i) => i.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`shrink-0 px-4 py-[18px] text-[12.5px] font-semibold border-b-[3px] transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? "border-[#1f6fb2] text-[#1f6fb2]"
                      : "border-transparent text-gray-500 hover:text-[#1f3a5f] hover:border-gray-300"
                  }`}
                >
                  {cat}
                  {cat !== "All" && <span className="ml-1.5 text-[10px] text-gray-300 font-normal">({count})</span>}
                </button>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="md:hidden py-3 relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 text-[13px] font-semibold text-[#1f3a5f] bg-white"
            >
              <span>{activeCategory === "All" ? "All industries" : activeCategory}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-30 max-h-[60vh] overflow-y-auto"
                >
                  {CATEGORIES.map((cat) => (
                    <button key={cat} onClick={() => handleCategory(cat)}
                      className={`w-full text-left px-5 py-3 text-[13px] border-b border-gray-100 last:border-0 transition-colors ${
                        activeCategory === cat ? "text-[#1f6fb2] bg-[#f0f6ff] font-semibold" : "text-gray-600 hover:bg-gray-50"
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

      {/* ── Main content ── */}
      <div className="max-w-[82rem] mx-auto px-4 py-14">

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-10">
          <p className="text-[12px] text-gray-400">
            Showing <span className="font-bold text-[#1f3a5f]">{filtered.length}</span> of{" "}
            <span className="font-bold text-[#1f3a5f]">{INDUSTRIES.length}</span> industries
            {activeCategory !== "All" && (
              <> — <span className="text-[#1f6fb2] font-semibold">{activeCategory}</span></>
            )}
          </p>
          {activeCategory !== "All" && (
            <button onClick={() => handleCategory("All")} className="text-[11.5px] text-gray-400 hover:text-[#1f6fb2] underline underline-offset-2 transition-colors">
              Clear filter
            </button>
          )}
          <div className="flex-1 h-px bg-blue-100" />
          <span className="text-[11px] text-gray-300 font-medium">{INDUSTRIES.length} total industries</span>
        </div>

        {/* Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((industry, index) => (
              <IndustryCard key={industry.id} industry={industry} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-24 text-center">
            <p className="text-[15px] text-gray-400 mb-4">No industries found in this category.</p>
            <button onClick={() => handleCategory("All")} className="text-[13px] font-semibold text-[#1f6fb2] hover:underline">View all industries</button>
          </div>
        )}
      </div>

      {/* ── Why our domain expertise matters ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.15em] mb-4">Why it matters</p>
              <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight max-w-[520px]">
                Industry knowledge is not optional. It is the product.
              </h3>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 border border-[#1f6fb2] text-[#1f6fb2] text-[13px] font-semibold px-7 py-3 hover:bg-[#1f6fb2] hover:text-white transition-all duration-200 self-start lg:self-auto"
            >
              Discuss your industry →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "Regulatory fluency",
                desc: "We know HIPAA, PCI DSS, NDPR, ISO 27001, and the sector-specific compliance frameworks your product must satisfy from day one.",
              },
              {
                num: "02",
                title: "Workflow-first design",
                desc: "Generic software fails because it ignores how your industry actually works. We map real workflows before writing a single line of code.",
              },
              {
                num: "03",
                title: "Domain-trained teams",
                desc: "We assign engineers with prior experience in your sector — not generalists who need three months to understand your business model.",
              },
              {
                num: "04",
                title: "Long-term partnership",
                desc: "We stay involved post-launch — evolving your product as your industry's technology landscape and regulatory environment shifts.",
              },
            ].map((p, i) => (
              <div
                key={p.num}
                className={[
                  "group px-8 py-8 border-t border-gray-200",
                  i % 4 !== 0 ? "lg:border-l" : "",
                  i % 2 !== 0 ? "sm:border-l lg:border-l-0" : "",
                  i % 4 !== 0 ? "lg:border-l" : "",
                  "hover:bg-[#f7fbff] transition-colors duration-200",
                ].join(" ")}
              >
                <span className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#1f6fb2] to-[#6db3f2]" />
                <span className="block text-[10px] font-mono text-gray-300 tracking-[0.2em] mb-4">{p.num}</span>
                <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors duration-200">{p.title}</h4>
                <div className="w-6 h-[2px] bg-[#1f6fb2] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-gray-200 mt-0" />
        </div>
      </div>

      {/* ── Compliance strip ── */}
      <div className="border-t border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.13em] mb-5">
            Regulatory standards we engineer against across industries
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "ISO 27001","SOC 2 Type II","HIPAA","PCI DSS","GDPR","NDPR",
              "OWASP Top 10","CIS Benchmarks","NIST CSF","ISO 9001","HL7 / FHIR","CBN Guidelines",
            ].map((s) => (
              <span key={s} className="text-[12px] font-medium text-gray-500 border border-gray-200 bg-white px-3 py-1.5 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-colors duration-150 cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="border-t border-gray-200 bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">
              Don't see your industry?
            </p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2 leading-snug">
              We've delivered in 30+ sectors. Let's talk about yours.
            </h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">
              If your industry isn't listed, it doesn't mean we haven't worked in it. Share your project
              and we'll tell you exactly what we've built in your space.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white
                bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                ring-1 ring-inset ring-white/30 transition-all duration-200"
            >
              Discuss my project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200"
            >
              See our work
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}