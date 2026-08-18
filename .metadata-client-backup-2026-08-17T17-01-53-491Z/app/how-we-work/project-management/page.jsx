import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Project Management",
  description:
    "How LogicSoft Technologies manages enterprise software projects end to end, from scoping through delivery.",
  path: "/how-we-work/project-management",
});

// app/how-we-work/project-management/page.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";

const DISCIPLINES = [
  {
    n: "01", title: "Scoping",           href: "/how-we-work/scoping",
    desc: "Complete requirements mapping, scope boundary definition, and stakeholder sign-off before a single line of code is written.",
  },
  {
    n: "02", title: "Resource Planning", href: "/how-we-work/resources",
    desc: "Right-sized team composition, seniority balancing, candidate matching, and continuity planning for zero attrition disruption.",
  },
  {
    n: "03", title: "Cost Estimation",   href: "/how-we-work/estimate",
    desc: "Bottom-up estimates calibrated against 300+ projects. Every line item explained. No hidden padding.",
  },
  {
    n: "04", title: "Risk Management",   href: "/how-we-work/risk-management",
    desc: "Quantified risk registers, mitigation ownership, and continuous monitoring converting unknowns into managed variables.",
  },
  {
    n: "05", title: "Change Management", href: "/how-we-work/change-requests",
    desc: "Controlled change logging, impact assessment, and approval workflows — scope changes are never invisible or uncosted.",
  },
  {
    n: "06", title: "Success Measurement", href: "/how-we-work/success-measurement",
    desc: "Agreed KPIs defined before delivery begins. Outcome-focused metrics, not vanity activity counts.",
  },
  {
    n: "07", title: "Project Reporting",   href: "/how-we-work/reporting",
    desc: "Sprint reports, monthly steering packs, quality metrics, and closure reports — scheduled, written, and audience-appropriate.",
  },
  {
    n: "08", title: "Collaboration",       href: "/how-we-work/collaboration",
    desc: "Structured communication protocols, async-first culture, unified tooling, and deliberate timezone management.",
  },
];

const STATS = [
  { val: "8",    label: "Management disciplines" },
  { val: "300+", label: "Projects governed"      },
  { val: "12+",  label: "Years of practice"      },
  { val: "98%",  label: "On-time delivery rate"  },
];

export default function ProjectManagementPage() {
  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg,#050c18 0%,#0a1e38 45%,#0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#1f6fb2 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#1f6fb2]/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">How We Work</span>
          </nav>

          <div className="py-16 lg:py-20 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Full Methodology</span>
              </div>
              <h1 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.06] mb-6">
                Project Management<br />
                <span className="text-[#1f6fb2]">Done Properly</span>
              </h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[580px]">
                Every LogicSoft engagement is governed end-to-end by eight interconnected management disciplines. Not selected depending on project size — all eight, every time.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              className="grid grid-cols-2 gap-2 min-w-[260px]">
              {STATS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.07 }}
                  className="border border-white/8 bg-white/[0.03] px-5 py-4">
                  <p className="text-[28px] font-light text-white leading-none mb-1">{s.val}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-white py-16 border-b border-[#e8eef6]">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">Why methodology matters</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-5">
                The difference between delivery and just shipping
              </h2>
              <p className="text-[14.5px] text-gray-500 leading-[1.9] mb-5">
                Most software projects fail not because of bad code — but because of unclear requirements, poor risk management, uncontrolled scope changes, and insufficient reporting. These are management failures, not engineering failures.
              </p>
              <p className="text-[14.5px] text-gray-500 leading-[1.9]">
                Our eight-discipline framework was built from lessons learned across 300+ projects. Each discipline exists because, at some point in our history, its absence caused a problem. We don't teach methodology — we live it.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {[
                { stat: "70%",   desc: "of software projects fail due to poor requirements management" },
                { stat: "£133B", desc: "lost annually in the UK alone to failed IT projects" },
                { stat: "52%",   desc: "of projects experience scope creep without formal change control" },
                { stat: "3×",    desc: "more likely to succeed with structured project governance in place" },
              ].map((item, i) => (
                <div key={i} className="border border-[#e8eef6] bg-[#f8fafc] p-5">
                  <p className="text-[32px] font-light text-[#1f6fb2] leading-none mb-2">{item.stat}</p>
                  <p className="text-[12px] text-gray-500 leading-snug">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8 DISCIPLINES GRID ── */}
      <section className="bg-[#f5f8fc] py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">The framework</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">Eight disciplines. Every project.</h2>
          </div>

          <div className="w-full h-px bg-[#e8eef6] mb-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {DISCIPLINES.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={[
                  "group relative px-8 py-9 border-b border-[#e8eef6] bg-white hover:bg-[#f0f7ff] transition-colors duration-200",
                  i % 2 !== 0 ? "sm:border-l border-[#e8eef6]" : "",
                  i % 4 !== 0 ? "lg:border-l border-[#e8eef6]" : "",
                  i % 4 === 0 ? "lg:border-l-0" : "",
                ].join(" ")}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1f6fb2] to-[#60a8dc] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="block text-[10px] font-mono text-gray-300 tracking-[0.2em] mb-5">{item.n}</span>
                <h3 className="text-[16px] font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors">
                  {item.title}
                </h3>
                <div className="w-6 h-[2px] bg-[#1f6fb2] mb-4 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                <p className="text-[13.5px] text-gray-500 leading-[1.85] mb-5">{item.desc}</p>
                <Link href={item.href}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1f6fb2] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="w-full h-px bg-[#e8eef6]" />
        </div>
      </section>

      {/* ── HOW IT ALL CONNECTS ── */}
      <section className="bg-white py-20 border-b border-[#e8eef6]">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">Integrated framework</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f] mb-4">These disciplines don't operate in isolation</h2>
            <p className="text-[14.5px] text-gray-500 leading-[1.9]">
              Scoping feeds estimation. Estimation informs resource planning. Risk management shapes change control. Reporting ties everything together. Each discipline reinforces the others — removing one weakens all.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { phase: "Initiation", disciplines: ["Scoping", "Resource Planning", "Cost Estimation"], color: "#1f6fb2", desc: "The decisions made in the first two weeks determine 80% of project outcomes. We invest heavily here." },
              { phase: "Execution",  disciplines: ["Risk Management", "Change Management", "Collaboration"], color: "#7c3aed", desc: "Controlled delivery against the agreed baseline. Every deviation is caught, costed, and decided." },
              { phase: "Governance", disciplines: ["Success Measurement", "Project Reporting"], color: "#059669", desc: "Continuous visibility for all stakeholders. KPIs tracked, trends surfaced, decisions informed." },
            ].map((phase, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border border-[#e8eef6] p-7" style={{ borderTop: `3px solid ${phase.color}` }}>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-3" style={{ color: phase.color }}>{phase.phase}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {phase.disciplines.map((d) => (
                    <span key={d} className="text-[11px] font-semibold text-[#1f3a5f] border border-[#e8eef6] bg-[#f8fafc] px-2.5 py-1">{d}</span>
                  ))}
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg,#07111f 0%,#0d2448 60%,#0a1830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle,#1f6fb2 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.16em] mb-3 font-mono">All eight disciplines · Every project</p>
            <h2 className="text-[28px] font-serif text-white mb-2">Experience managed delivery firsthand.</h2>
            <p className="text-[14px] text-white/45 max-w-lg leading-relaxed">Start with a free scoping session. We'll walk you through how our framework applies to your specific project.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all">
              See our portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
