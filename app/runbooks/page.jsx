"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, ArrowRight, CheckCircle2, AlertTriangle,
  RefreshCw, Terminal, Server, Lock, Activity,
} from "lucide-react";

const CATEGORIES = [
  {
    icon: Server, color: "#1f6fb2", bg: "#eaf4ff", count: 8,
    title: "Deployment Runbooks",
    desc: "Step-by-step deployment procedures for staging and production environments.",
    items: [
      { title: "Standard production deployment", time: "~25 min", severity: "routine" },
      { title: "Hotfix deployment procedure", time: "~15 min", severity: "urgent" },
      { title: "Database migration runbook", time: "~45 min", severity: "planned" },
      { title: "Feature flag rollout", time: "~10 min", severity: "routine" },
    ],
  },
  {
    icon: AlertTriangle, color: "#dc2626", bg: "#fff1f2", count: 6,
    title: "Incident Response",
    desc: "Escalation procedures and response playbooks for production incidents.",
    items: [
      { title: "P1 production outage response", time: "Immediate", severity: "critical" },
      { title: "Database connection failure", time: "~5 min", severity: "critical" },
      { title: "Payment gateway failure", time: "~10 min", severity: "urgent" },
      { title: "Security breach protocol", time: "Immediate", severity: "critical" },
    ],
  },
  {
    icon: RefreshCw, color: "#059669", bg: "#ecfdf5", count: 10,
    title: "Maintenance Procedures",
    desc: "Scheduled maintenance tasks, database backups, and routine operational procedures.",
    items: [
      { title: "Weekly database backup verification", time: "~20 min", severity: "routine" },
      { title: "SSL certificate renewal", time: "~30 min", severity: "planned" },
      { title: "Log rotation and archival", time: "~15 min", severity: "routine" },
      { title: "Cache purge procedure", time: "~5 min", severity: "routine" },
    ],
  },
  {
    icon: Lock, color: "#7c3aed", bg: "#f3f0ff", count: 5,
    title: "Security Runbooks",
    desc: "Security incident response, access revocation, and audit procedures.",
    items: [
      { title: "Compromised credentials revocation", time: "~10 min", severity: "urgent" },
      { title: "DDoS mitigation procedure", time: "~15 min", severity: "critical" },
      { title: "Quarterly access review", time: "~60 min", severity: "planned" },
      { title: "Penetration test preparation", time: "~90 min", severity: "planned" },
    ],
  },
];

const SEV = {
  critical: { label: "Critical", bg: "#fff1f2", color: "#dc2626", border: "#fecaca" },
  urgent:   { label: "Urgent",   bg: "#fffbeb", color: "#d97706", border: "#fde68a" },
  planned:  { label: "Planned",  bg: "#eaf4ff", color: "#1f6fb2", border: "#bfdbfe" },
  routine:  { label: "Routine",  bg: "#f3f4f6", color: "#6b7280", border: "#e5e7eb" },
};

export default function RunbooksPage() {
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
            <span className="text-white/55 font-medium">Runbooks</span>
          </nav>
          <div className="py-16 lg:py-20 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <Terminal className="w-3 h-3 text-[#60a8dc]" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Operational Runbooks</span>
              </div>
              <h1 className="text-[42px] lg:text-[56px] font-serif text-white leading-[1.06] mb-6">Runbooks</h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[560px]">
                Step-by-step operational playbooks for deployments, incident response, maintenance tasks, and security procedures — built for your systems by the engineers who built them.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                {[{ v: "29", l: "Total runbooks" }, { v: "24/7", l: "P1 coverage" }, { v: "< 2hr", l: "Critical response" }].map((s) => (
                  <div key={s.l} className="border-l-2 border-[#1f6fb2]/40 pl-4">
                    <p className="text-[24px] font-light text-white leading-none">{s.v}</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WARNING BAR ── */}
      <div className="bg-[#fffbeb] border-b border-[#fde68a]">
        <div className="max-w-[82rem] mx-auto px-6 py-4 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-[#d97706] shrink-0" />
          <p className="text-[13px] text-[#92400e]">
            <span className="font-bold">Before executing any runbook:</span> confirm you have the correct access permissions, notify your team lead, and ensure a rollback plan is in place.
          </p>
        </div>
      </div>

      {/* ── RUNBOOK CATEGORIES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Available runbooks</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">Operational playbooks by category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="border border-[#e8eef6] hover:border-[#1f6fb2]/30 hover:shadow-sm transition-all overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-[#e8eef6]" style={{ background: cat.bg }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 flex items-center justify-center bg-white/70">
                        <cat.icon className="w-4 h-4" style={{ color: cat.color }} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[16px] font-bold text-[#1f3a5f]">{cat.title}</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white/80" style={{ color: cat.color }}>{cat.count} runbooks</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{cat.desc}</p>
                </div>
                {/* Items */}
                <div className="divide-y divide-[#f1f5f9]">
                  {cat.items.map((item, j) => {
                    const sev = SEV[item.severity];
                    return (
                      <div key={j} className="flex items-center justify-between px-6 py-3.5 hover:bg-[#f8fafc] transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#1f6fb2] transition-colors shrink-0" />
                          <span className="text-[13px] text-gray-600 group-hover:text-[#1f3a5f] transition-colors">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 ml-4">
                          <span className="text-[11px] text-gray-400">{item.time}</span>
                          <span className="text-[9.5px] font-bold px-2 py-0.5 border"
                            style={{ color: sev.color, background: sev.bg, borderColor: sev.border }}>
                            {sev.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-16">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">How to use runbooks</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-5">Built for operators under pressure</h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                Every runbook is written for the moment when things go wrong — when time is short and clarity matters most. Our format is intentional: numbered steps, no ambiguity, expected outputs at each stage.
              </p>
              <ul className="space-y-3.5">
                {[
                  "Every step has a clear expected outcome — you know if it worked",
                  "Rollback instructions included for every destructive operation",
                  "Prerequisites listed at the top — no mid-procedure surprises",
                  "Estimated duration helps you communicate ETA to stakeholders",
                  "Escalation path defined if the runbook doesn't resolve the issue",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1f6fb2] shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            {/* Code preview */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-[#0d2448] p-8 font-mono">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-white/30">production-deploy.md</span>
              </div>
              <div className="space-y-1.5 text-[12px]">
                <p className="text-[#60a8dc] font-bold"># Production Deployment Runbook</p>
                <p className="text-white/40">**Duration**: ~25 min | **Severity**: Routine</p>
                <p className="text-white/40">**Prerequisites**: AWS access, staging green</p>
                <p className="text-white/20 mt-2">---</p>
                <p className="text-[#60a8dc] mt-2">## Step 1: Pre-flight checks</p>
                <p className="text-white/60">1. Confirm staging tests passing ✓</p>
                <p className="text-white/60">2. Notify #deployments channel</p>
                <p className="text-white/60">3. Create deployment ticket</p>
                <p className="text-[#60a8dc] mt-2">## Step 2: Deploy to production</p>
                <p className="text-white/60">1. Run: <span className="text-[#4ade80]">npm run deploy:prod</span></p>
                <p className="text-white/60">2. Monitor: <span className="text-[#4ade80]">watch -n5 ./health.sh</span></p>
                <p className="text-white/40 mt-2">**Expected**: HTTP 200, p99 &lt; 200ms</p>
                <p className="text-white/40">**Rollback**: <span className="text-[#f87171]">npm run deploy:rollback</span></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg,#07111f 0%,#0d2448 60%,#0a1830 100%)" }}>
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] font-serif text-white mb-2">Need a runbook for your system?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">All LogicSoft engagements include operational runbook creation as part of the delivery handover package.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
              Contact support <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all">
              Browse docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}