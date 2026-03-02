"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, ArrowRight, BookOpen, Code2, Database,
  Shield, Cloud, Cpu, ExternalLink, Search,
} from "lucide-react";

const CATEGORIES = [
  {
    icon: Code2, color: "#1f6fb2", bg: "#eaf4ff", count: 24,
    title: "API Reference",
    desc: "Complete REST API documentation — endpoints, request/response schemas, authentication, and error codes.",
    links: ["Authentication & API keys", "Endpoints overview", "Request formatting", "Error handling", "Rate limits & pagination"],
  },
  {
    icon: Database, color: "#7c3aed", bg: "#f3f0ff", count: 12,
    title: "System Architecture",
    desc: "Architecture diagrams, data models, infrastructure topology, and service dependency maps.",
    links: ["System overview", "Data flow diagrams", "Database schema", "Service dependencies", "Infrastructure topology"],
  },
  {
    icon: Shield, color: "#dc2626", bg: "#fff1f2", count: 9,
    title: "Security & Compliance",
    desc: "Security controls, compliance documentation, access management, and audit trail specifications.",
    links: ["Security controls", "Access management", "Audit logging", "GDPR compliance", "NDPR compliance"],
  },
  {
    icon: Cloud, color: "#059669", bg: "#ecfdf5", count: 16,
    title: "Deployment & DevOps",
    desc: "Deployment procedures, CI/CD pipeline documentation, environment configuration, and infrastructure guides.",
    links: ["Deployment checklist", "CI/CD pipeline", "Environment config", "Rollback procedures", "Health monitoring"],
  },
  {
    icon: Cpu, color: "#d97706", bg: "#fffbeb", count: 11,
    title: "Integration Guides",
    desc: "Third-party integration guides, webhook documentation, and partner API configuration references.",
    links: ["Webhook configuration", "Third-party integrations", "OAuth setup", "Payment gateways", "Email providers"],
  },
  {
    icon: BookOpen, color: "#0891b2", bg: "#ecfeff", count: 18,
    title: "User Guides",
    desc: "End-user documentation, feature walkthroughs, administration guides, and onboarding materials.",
    links: ["Getting started", "Admin panel guide", "User management", "Feature walkthroughs", "FAQs"],
  },
];

const RECENT = [
  { title: "Authentication flow updated — OAuth 2.0 support added", date: "28 Feb 2026", category: "API Reference" },
  { title: "New deployment checklist for v3.x releases", date: "21 Feb 2026", category: "Deployment & DevOps" },
  { title: "NDPR compliance documentation added", date: "14 Feb 2026", category: "Security & Compliance" },
  { title: "Webhook payload schema reference updated", date: "7 Feb 2026", category: "Integration Guides" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg,#050c18 0%,#0a1e38 45%,#0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#1f6fb2 1px,transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/about/support" className="hover:text-white/60 transition-colors">Support</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">Documentation</span>
          </nav>

          <div className="py-16 lg:py-20 grid lg:grid-cols-[1fr_340px] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <BookOpen className="w-3 h-3 text-[#60a8dc]" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Technical Documentation</span>
              </div>
              <h1 className="text-[42px] lg:text-[56px] font-serif text-white leading-[1.06] mb-6">Documentation</h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[520px]">
                Technical references, API guides, architecture diagrams, and system documentation for all LogicSoft-built platforms and integrations.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                {[{ v: "90+", l: "Articles" }, { v: "6", l: "Categories" }, { v: "Weekly", l: "Updates" }].map((s) => (
                  <div key={s.l} className="border-l-2 border-[#1f6fb2]/40 pl-4">
                    <p className="text-[24px] font-light text-white leading-none">{s.v}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Search */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}>
              <div className="flex items-center gap-3 bg-white/[0.06] border border-white/15 px-4 py-3.5 mb-3">
                <Search className="w-4 h-4 text-white/30 shrink-0" />
                <span className="text-[13.5px] text-white/25">Search documentation…</span>
                <span className="ml-auto text-[10px] border border-white/15 text-white/25 px-1.5 py-0.5 font-mono">⌘K</span>
              </div>
              <p className="text-[11px] text-white/25 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {["API Auth", "Deployment", "Webhooks", "GDPR", "Database schema"].map((tag) => (
                  <span key={tag} className="text-[11px] font-semibold border border-white/15 text-white/35 px-2.5 py-1 cursor-pointer hover:border-white/30 hover:text-white/55 transition-colors">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Browse by category</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">Documentation library</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group border border-[#e8eef6] bg-white hover:border-[#1f6fb2]/40 hover:shadow-sm transition-all p-7 cursor-pointer">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ background: cat.bg }}>
                    <cat.icon className="w-5 h-5" style={{ color: cat.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-bold border px-2 py-0.5"
                    style={{ color: cat.color, borderColor: cat.color + "40", background: cat.bg }}>
                    {cat.count} articles
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors">{cat.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-5">{cat.desc}</p>
                <ul className="space-y-1.5 border-t border-[#f1f5f9] pt-4">
                  {cat.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="flex items-center justify-between text-[12.5px] text-gray-500 hover:text-[#1f6fb2] transition-colors group/link py-0.5">
                        <span>{link}</span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENTLY UPDATED ── */}
      <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-16">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_360px] gap-14">
            <div>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">Recently updated</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-8">Latest documentation changes</h2>
              <div className="space-y-3">
                {RECENT.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 bg-white border border-[#e8eef6] px-5 py-4 hover:border-[#1f6fb2]/30 transition-colors cursor-pointer group">
                    <div className="w-1 self-stretch bg-[#1f6fb2]/20 group-hover:bg-[#1f6fb2] transition-colors shrink-0 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors mb-1">{item.title}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10.5px] text-gray-400">{item.date}</span>
                        <span className="text-[10px] font-bold text-[#1f6fb2] bg-[#eaf4ff] px-2 py-0.5">{item.category}</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1f6fb2] transition-colors shrink-0 mt-0.5" />
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="border border-[#bfdbfe] bg-[#eff6ff] p-8 self-start">
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">Can't find what you need?</p>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
                Our support team can locate specific documentation, create missing guides, or schedule a technical walkthrough session.
              </p>
              <Link href="/about/support" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors">
                Contact support <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg,#07111f 0%,#0d2448 60%,#0a1830 100%)" }}>
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] font-serif text-white mb-2">Need a custom documentation package?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">All LogicSoft engagements include comprehensive technical handover documentation as standard.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white shrink-0 transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
            Start a conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}