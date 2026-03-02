"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, ArrowRight, CheckCircle2,
  Layers, GitBranch, Shield, Cpu, TrendingUp,
  RefreshCw, Eye, Box,
} from "lucide-react";
import { FaDraftingCompass } from "react-icons/fa";

const RESPONSIBILITIES = [
  {
    icon: Layers, title: "Architecture Standards",
    body: "We establish and enforce reusable architecture patterns across all engagements — ensuring consistency, reducing rework, and enabling engineers to build on proven foundations rather than reinventing solutions.",
  },
  {
    icon: Shield, title: "Risk-Aware Design",
    body: "Every architecture decision is evaluated against security, compliance, and operational risk. We identify structural vulnerabilities before systems are built, not after they're in production.",
  },
  {
    icon: GitBranch, title: "Technology Governance",
    body: "The Architecture CoE maintains our approved technology stack and evaluates new tools and frameworks. Adoption decisions are evidence-based and aligned with long-term maintainability.",
  },
  {
    icon: Eye, title: "Architecture Reviews",
    body: "Hands-on peer reviews at design phase, before major releases, and after significant incidents. Reviews are conducted by Principal Architects independent of the delivery team.",
  },
  {
    icon: TrendingUp, title: "Emerging Technology Tracking",
    body: "We systematically track the technology landscape — evaluating emerging tools, frameworks, and paradigms against the specific context of our clients' industries and system environments.",
  },
  {
    icon: RefreshCw, title: "Technical Debt Management",
    body: "Architecture decisions accumulate debt. We maintain a technical debt register, quantify the cost of carrying it, and ensure debt reduction is factored into roadmap planning — not deferred indefinitely.",
  },
];

const REVIEW_TYPES = [
  { name: "Inception Review",       when: "Before build begins",          focus: "Architecture fit, technology selection, scalability assumptions" },
  { name: "Milestone Review",       when: "At each major milestone",      focus: "Deviation from baseline, emerging risks, performance indicators" },
  { name: "Pre-Release Review",     when: "Before every major release",   focus: "Security posture, operational readiness, rollback viability" },
  { name: "Post-Incident Review",   when: "After every P1/P2 incident",   focus: "Root cause, architectural contribution, systemic remediation" },
];

const PRINCIPALS = [
  { title: "Principal Architect (Platform)",  exp: "18 years", specialisms: ["Cloud-native", "Microservices", "Event-driven architecture"] },
  { title: "Principal Architect (Security)",  exp: "16 years", specialisms: ["Zero-trust", "Compliance by design", "Threat modelling"] },
  { title: "Principal Architect (Data)",      exp: "14 years", specialisms: ["Data mesh", "Real-time analytics", "ML infrastructure"] },
];

export default function ArchitectureCOEPage() {
  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg,#050c18 0%,#0a1e38 45%,#0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#7c3aed 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/how-we-work/project-management" className="hover:text-white/60 transition-colors">How We Work</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">Architecture CoE</span>
          </nav>
          <div className="py-16 lg:py-20 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#7c3aed]/40 bg-[#7c3aed]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#c4b5fd] uppercase tracking-[0.18em] font-mono">Core Force · Architecture CoE</span>
              </div>
              <h1 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.06] mb-6">
                Architecture &<br />
                <span className="text-[#a78bfa]">Solutions CoE</span>
              </h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[580px]">
                Our Architecture and Solutions CoE sets and enforces the standards for scalable, secure, and cost-effective solutions. Led by Principal Architects with 15+ years of experience each, it ensures every system supports your goals, avoids costly rework, and stands up to change.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              className="grid grid-cols-2 gap-2 min-w-[240px]">
              {[
                { val: "3",   label: "Principal Architects" },
                { val: "15+", label: "Avg years experience"  },
                { val: "4",   label: "Review types"          },
                { val: "100%", label: "Projects reviewed"    },
              ].map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.07 }}
                  className="border border-white/8 bg-white/[0.03] px-5 py-4">
                  <p className="text-[28px] font-light text-white leading-none mb-1">{m.val}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] leading-snug">{m.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESPONSIBILITIES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#7c3aed] uppercase tracking-[0.16em] mb-2">What we do</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">The CoE's mandate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESPONSIBILITIES.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group border border-[#e8eef6] p-7 hover:border-[#7c3aed]/30 hover:shadow-sm transition-all">
                <div className="w-10 h-10 flex items-center justify-center bg-[#ede9fe] mb-5">
                  <r.icon className="w-5 h-5 text-[#7c3aed]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#7c3aed] transition-colors">{r.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEW TYPES ── */}
      <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#7c3aed] uppercase tracking-[0.16em] mb-2">Architecture reviews</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">Four review types — all mandatory</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REVIEW_TYPES.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#e8eef6] p-7 hover:border-[#7c3aed]/30 transition-all group">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] font-mono text-gray-300 tracking-[0.2em] mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-1 group-hover:text-[#7c3aed] transition-colors">{r.name}</h3>
                    <p className="text-[11.5px] font-semibold text-[#7c3aed] mb-3">{r.when}</p>
                    <p className="text-[13px] text-gray-500 leading-relaxed"><span className="font-semibold text-gray-600">Covers: </span>{r.focus}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPAL ARCHITECTS + OUTCOMES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#7c3aed] uppercase tracking-[0.16em] mb-3">The team</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-6">Led by Principal Architects</h2>
              <div className="space-y-4">
                {PRINCIPALS.map((p, i) => (
                  <div key={i} className="border border-[#e8eef6] p-5 hover:border-[#7c3aed]/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[14px] font-bold text-[#1f3a5f]">{p.title}</p>
                      <span className="text-[10.5px] font-bold text-[#7c3aed] bg-[#ede9fe] px-2.5 py-1">{p.exp} exp.</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.specialisms.map((s) => (
                        <span key={s} className="text-[11px] font-semibold border border-[#ddd6fe] text-[#7c3aed] bg-[#faf5ff] px-2.5 py-1">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#7c3aed] uppercase tracking-[0.16em] mb-3">What you get</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-6">Outcomes of CoE oversight</h2>
              <ul className="space-y-4">
                {[
                  "Architecture decisions made by senior principals, not junior engineers",
                  "Reusable patterns reducing build time and cost on similar problems",
                  "Security and compliance embedded at design phase, not retrofitted",
                  "Technology choices aligned with your long-term operational capability",
                  "Technical debt tracked, quantified, and included in roadmap planning",
                  "Post-incident reviews that prevent structural recurrence, not just fix symptoms",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#7c3aed] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OTHER CORE FORCES ── */}
      <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-14">
        <div className="max-w-[82rem] mx-auto px-6">
          <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">The other two core forces</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Project Management Office", subtitle: "Accountable Delivery", href: "/how-we-work/pmo", color: "#1d4ed8" },
              { title: "Technology & Competency CoE", subtitle: "People, Skills, Performance", href: "/how-we-work/competency-coe", color: "#059669" },
            ].map((force) => (
              <Link key={force.href} href={force.href}
                className="group border border-[#e8eef6] bg-white p-7 hover:border-[#1f6fb2]/30 hover:shadow-sm transition-all flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: force.color }}>{force.subtitle}</p>
                  <p className="text-[16px] font-bold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">{force.title}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#1f6fb2] group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg,#07111f 0%,#0d2448 60%,#0a1830 100%)" }}>
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] font-serif text-white mb-2">Want architecture-led delivery?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">Our Architecture CoE reviews every project before, during, and after delivery — as standard, not optional.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-we-work/project-management" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all">
              Full methodology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}