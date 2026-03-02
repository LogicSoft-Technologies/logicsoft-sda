"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, ArrowRight, CheckCircle2,
  Target, BarChart2, AlertTriangle, GitMerge,
  Users, Shield, TrendingUp, Layers,
} from "lucide-react";
import { FaProjectDiagram } from "react-icons/fa";

const RESPONSIBILITIES = [
  {
    icon: Target, title: "Scope Ownership",
    body: "The PMO owns the scope baseline from kickoff to close. Every change is documented, costed, and approved before implementation. Scope creep is systematically prevented, not just discouraged.",
  },
  {
    icon: BarChart2, title: "Budget Control",
    body: "Real-time budget tracking against the approved baseline. Burn rate, forecast-to-completion, and variance analysis reported at every steering committee. No financial surprises.",
  },
  {
    icon: AlertTriangle, title: "Risk Management",
    body: "The PMO maintains a live risk register, ensures every risk has a named owner and mitigation plan, and escalates material risks to the right decision-makers before they become incidents.",
  },
  {
    icon: GitMerge, title: "Timeline Governance",
    body: "Milestone tracking, critical path analysis, and schedule variance management. When timelines are threatened, the PMO identifies the earliest signal and drives resolution.",
  },
  {
    icon: Users, title: "Stakeholder Alignment",
    body: "Regular steering committees, executive briefings, and cross-team coordination ensuring all parties are aligned on status, priorities, and decisions throughout delivery.",
  },
  {
    icon: TrendingUp, title: "Programme Management",
    body: "Where multiple projects run in parallel, delivery managers oversee the full programme — ensuring dependencies are managed, resources are optimised, and goals remain aligned.",
  },
];

const CERTIFICATIONS = ["PMP", "PRINCE2", "SAFe", "Scrum Master", "PMI-ACP", "ITIL"];

const METRICS = [
  { val: "300+", label: "Projects governed" },
  { val: "94%",  label: "On-time delivery"  },
  { val: "98%",  label: "On-budget delivery" },
  { val: "12+",  label: "Years of PMO practice" },
];

const APPROACH_STEPS = [
  { n: "01", title: "Kick-off & Baseline", body: "Every engagement begins with a formal kick-off. Scope, budget, timeline, team, and communication protocols are agreed, documented, and baselined before delivery begins." },
  { n: "02", title: "Sprint Governance",   body: "Bi-weekly sprint reviews with written reports. Velocity tracked. Blockers escalated within 24 hours. Nothing waits for the next scheduled meeting." },
  { n: "03", title: "Steering Committees", body: "Monthly executive steering with pre-distributed packs. Status, risks, changes, and forward look. Decisions made in the meeting, not two weeks after." },
  { n: "04", title: "Closure & Handover",  body: "Formal project closure with lessons learned, KPI assessment, and comprehensive handover documentation. The PMO doesn't disappear at go-live." },
];

export default function PMOPage() {
  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg,#050c18 0%,#0a1e38 45%,#0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#1f6fb2 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-[#1d4ed8]/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/how-we-work/project-management" className="hover:text-white/60 transition-colors">How We Work</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">PMO</span>
          </nav>
          <div className="py-16 lg:py-20 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1d4ed8]/40 bg-[#1d4ed8]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#93c5fd] uppercase tracking-[0.18em] font-mono">Core Force · Project Management Office</span>
              </div>
              <h1 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.06] mb-6">
                Project Management<br />
                <span className="text-[#60a5fa]">Office</span>
              </h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[580px]">
                The PMO applies lessons from hundreds of past projects to keep every initiative on track — even in complex, changing environments. Certified project managers take full ownership of scope, budget, timelines, and risks.
              </p>
            </motion.div>
            {/* Metrics */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              className="grid grid-cols-2 gap-2 min-w-[240px]">
              {METRICS.map((m, i) => (
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

      {/* ── WHAT THE PMO DOES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1d4ed8] uppercase tracking-[0.16em] mb-2">Responsibilities</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">What the PMO is accountable for</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESPONSIBILITIES.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group border border-[#e8eef6] p-7 hover:border-[#1d4ed8]/30 hover:shadow-sm transition-all">
                <div className="w-10 h-10 flex items-center justify-center bg-[#dbeafe] mb-5">
                  <r.icon className="w-5 h-5 text-[#1d4ed8]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1d4ed8] transition-colors">{r.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE OPERATE ── */}
      <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1d4ed8] uppercase tracking-[0.16em] mb-2">Our approach</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">How the PMO operates on your project</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#e8eef6] bg-white">
            {APPROACH_STEPS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`p-8 relative group hover:bg-[#f0f7ff] transition-colors ${i < 3 ? "border-r border-[#e8eef6]" : ""}`}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1d4ed8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="block text-[10px] font-mono text-gray-300 tracking-[0.2em] mb-4">{s.n}</span>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1d4ed8] transition-colors">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS + OUTCOMES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#1d4ed8] uppercase tracking-[0.16em] mb-3">What you get</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-6">Outcomes of PMO-governed delivery</h2>
              <ul className="space-y-4">
                {[
                  "Full scope, budget, and timeline ownership by a named PM",
                  "Proactive risk identification before threats become incidents",
                  "No budget surprises — variance reported at every sprint",
                  "Executive steering packs distributed 48hrs before every meeting",
                  "Programme-level coordination where multiple projects run in parallel",
                  "Formal closure documentation including lessons learned",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1d4ed8] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="border border-[#bfdbfe] bg-[#eff6ff] p-8 mb-6">
                <p className="text-[10.5px] font-bold text-[#1d4ed8] uppercase tracking-[0.16em] mb-3">PMO certifications</p>
                <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5">Our project managers hold certifications across the leading methodologies — applied pragmatically to match the needs of each engagement.</p>
                <div className="flex flex-wrap gap-2">
                  {CERTIFICATIONS.map((c) => (
                    <span key={c} className="text-[11px] font-bold border border-[#bfdbfe] text-[#1d4ed8] bg-white px-3 py-1.5">{c}</span>
                  ))}
                </div>
              </div>
              <div className="border border-[#e8eef6] bg-[#f8fafc] p-6">
                <Layers className="w-6 h-6 text-[#1d4ed8] mb-3" strokeWidth={1.5} />
                <p className="text-[13.5px] font-bold text-[#1f3a5f] mb-2">Methodology-agnostic</p>
                <p className="text-[13px] text-gray-500 leading-relaxed">We don't impose a single methodology. We apply the right framework — waterfall, agile, hybrid — based on your project's nature, risk profile, and team structure.</p>
              </div>
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
              { title: "Architecture & Solutions CoE", subtitle: "Strategic, Risk-Aware Design", href: "/how-we-work/architecture-coe", color: "#7c3aed", bg: "#ede9fe" },
              { title: "Technology & Competency CoE", subtitle: "People, Skills, Performance", href: "/how-we-work/competency-coe", color: "#059669", bg: "#d1fae5" },
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
            <h2 className="text-[24px] font-serif text-white mb-2">Want PMO governance on your project?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">Every LogicSoft engagement includes dedicated PMO oversight as standard — not as an add-on.</p>
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