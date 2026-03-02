"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, ArrowRight, CheckCircle2,
  Users, Star, BookOpen, Award, TrendingUp,
  Target, Cpu, Globe,
} from "lucide-react";
import { FaUserGraduate } from "react-icons/fa";

const RESPONSIBILITIES = [
  {
    icon: Star, title: "Engineering Excellence",
    body: "We maintain benchmark performance standards for every engineering role. Developers are assessed against objective criteria — not seniority alone. Performance below benchmark triggers a structured improvement programme.",
  },
  {
    icon: BookOpen, title: "Continuous Training",
    body: "A rolling curriculum of technical and domain training keeps every team member current. Training is mandatory, tracked, and linked to engagement assignments. Skills gaps are identified before they affect projects.",
  },
  {
    icon: Award, title: "Certification Programmes",
    body: "We fund and manage certification across cloud platforms, security frameworks, DevOps practices, and domain-specific qualifications — ensuring credentials are maintained and relevant.",
  },
  {
    icon: Target, title: "Skills Matching",
    body: "Project assignments are driven by verified skill profiles, not availability alone. The CoE maintains a live skills matrix across the entire team, enabling precise matching of expertise to engagement requirements.",
  },
  {
    icon: Globe, title: "Domain & Industry Knowledge",
    body: "Technical skill without domain knowledge produces generic solutions. The CoE ensures engineers working in FinTech, healthcare, logistics, and other regulated industries understand the sectoral context — regulations, challenges, and user expectations.",
  },
  {
    icon: TrendingUp, title: "Talent Pipeline",
    body: "We maintain a development pipeline for high-potential junior and mid-level engineers — structured mentorship, stretch assignments, and progression frameworks that grow the next generation of senior talent.",
  },
];

const ROLES_COVERED = [
  { role: "Software Engineers",    levels: ["Junior", "Mid", "Senior", "Principal"], color: "#1d4ed8" },
  { role: "QA & Test Engineers",   levels: ["Automation", "Performance", "Security"], color: "#7c3aed" },
  { role: "DevOps Engineers",      levels: ["Platform", "SRE", "Cloud"], color: "#059669" },
  { role: "Business Analysts",     levels: ["Systems", "Data", "Domain"], color: "#d97706" },
  { role: "Technical Architects",  levels: ["Solution", "Enterprise", "Security"], color: "#0891b2" },
  { role: "Data Professionals",    levels: ["Engineering", "Science", "Analytics"], color: "#dc2626" },
];

const STANDARDS = [
  { metric: "Code review pass rate",         target: "> 90% first submission", desc: "Engineers are assessed on code quality before review, not just after." },
  { metric: "Test coverage",                 target: "> 80% across all modules", desc: "Coverage standards are enforced at CI/CD, not left to individual discipline." },
  { metric: "On-time sprint delivery",       target: "> 85% of committed items", desc: "Velocity predictability is a performance indicator for every developer." },
  { metric: "Training hours per quarter",    target: "16 hours minimum", desc: "Mandatory learning prevents skill stagnation without disrupting project velocity." },
];

export default function CompetencyCOEPage() {
  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg,#050c18 0%,#0a1e38 45%,#0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#059669 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#059669]/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/how-we-work/project-management" className="hover:text-white/60 transition-colors">How We Work</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">Competency CoE</span>
          </nav>
          <div className="py-16 lg:py-20 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#059669]/40 bg-[#059669]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#6ee7b7] uppercase tracking-[0.18em] font-mono">Core Force · Competency CoE</span>
              </div>
              <h1 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.06] mb-6">
                Technology &<br />
                <span className="text-[#34d399]">Competency CoE</span>
              </h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[580px]">
                Our Technology & Competency CoE ensures every professional on your project performs above market average, bringing appropriate skills and deep industry knowledge. A core team of senior experts continuously trains, coaches, and certifies engineers across every discipline.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              className="grid grid-cols-2 gap-2 min-w-[240px]">
              {[
                { val: "400+", label: "Engineers in network"   },
                { val: "6",    label: "Disciplines covered"    },
                { val: "16hr", label: "Training per quarter"   },
                { val: "100%", label: "Certified placements"   },
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
            <p className="text-[10.5px] font-bold text-[#059669] uppercase tracking-[0.16em] mb-2">What we do</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">The CoE's mandate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESPONSIBILITIES.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group border border-[#e8eef6] p-7 hover:border-[#059669]/30 hover:shadow-sm transition-all">
                <div className="w-10 h-10 flex items-center justify-center bg-[#d1fae5] mb-5">
                  <r.icon className="w-5 h-5 text-[#059669]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#059669] transition-colors">{r.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES COVERED ── */}
      <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#059669] uppercase tracking-[0.16em] mb-2">Disciplines</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">Roles covered by the CoE</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES_COVERED.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white border border-[#e8eef6] p-6 hover:shadow-sm transition-all"
                style={{ borderTop: `3px solid ${r.color}` }}>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-3">{r.role}</h3>
                <div className="flex flex-wrap gap-2">
                  {r.levels.map((level) => (
                    <span key={level} className="text-[11px] font-semibold px-2.5 py-1 border"
                      style={{ color: r.color, borderColor: r.color + "30", background: r.color + "0d" }}>
                      {level}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE STANDARDS + OUTCOMES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#059669] uppercase tracking-[0.16em] mb-3">Performance standards</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-6">What above-market performance looks like</h2>
              <div className="space-y-4">
                {STANDARDS.map((s, i) => (
                  <div key={i} className="border border-[#e8eef6] p-5 hover:border-[#059669]/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[13.5px] font-bold text-[#1f3a5f]">{s.metric}</p>
                      <span className="text-[11px] font-bold text-[#059669] bg-[#d1fae5] border border-[#a7f3d0] px-2.5 py-1 shrink-0 ml-3">{s.target}</span>
                    </div>
                    <p className="text-[12.5px] text-gray-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#059669] uppercase tracking-[0.16em] mb-3">What you get</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-6">Outcomes of competency-led staffing</h2>
              <ul className="space-y-4">
                {[
                  "Engineers placed based on verified skills — not just availability",
                  "Domain knowledge matched to your industry's specific challenges",
                  "Consistent performance standards across the entire team",
                  "Skills gaps proactively addressed before they affect delivery",
                  "Certified professionals across cloud, security, and DevOps practices",
                  "A talent pipeline that grows with your programme over time",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
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
              { title: "Architecture & Solutions CoE", subtitle: "Strategic, Risk-Aware Design", href: "/how-we-work/architecture-coe", color: "#7c3aed" },
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
            <h2 className="text-[24px] font-serif text-white mb-2">Want above-market engineering talent?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">Every LogicSoft placement is vetted, certified, and continuously developed by the Competency CoE.</p>
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