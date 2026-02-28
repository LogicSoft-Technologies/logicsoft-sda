"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, ChevronDown,
  Clock, DollarSign, RefreshCw, Users, Shield, Zap,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const MODELS = [
  {
    id: "fixed-price",
    name: "Fixed Price",
    icon: DollarSign,
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    tag: "Best for well-scoped projects",
    headline: "Agreed scope. Agreed cost. No surprises.",
    desc: "You define what you need, we define the cost and timeline. All deliverables, milestones, and acceptance criteria are documented before a single line of code is written. Ideal when requirements are stable and the project is bounded.",
    bestFor: [
      "MVP and prototype development",
      "Defined feature sets with clear acceptance criteria",
      "Short-to-medium duration projects (4–20 weeks)",
      "Clients who need a firm budget commitment",
      "Compliance or regulatory deadline-driven projects",
    ],
    notFor: ["Projects with evolving or undefined requirements", "Long-term product development"],
    process: [
      { step: "01", title: "Requirements lock", desc: "Full scope, wireframes, and acceptance criteria agreed and signed off." },
      { step: "02", title: "Phased milestones", desc: "Delivery broken into 2–4 week milestone checkpoints with defined outputs." },
      { step: "03", title: "Change control", desc: "Any scope changes are assessed, priced, and approved separately before implementation." },
      { step: "04", title: "Final acceptance", desc: "Formal sign-off against agreed criteria before final payment and delivery." },
    ],
    featured: false,
  },
  {
    id: "time-materials",
    name: "Time & Materials",
    icon: Clock,
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    tag: "Best for evolving products",
    headline: "Pay for what's built. Adjust as you go.",
    desc: "You're charged for actual hours worked at agreed rates. The scope can evolve as your product understanding deepens. You retain full control over priorities and can redirect effort at any sprint boundary.",
    bestFor: [
      "Products with emerging or changing requirements",
      "Long-term product development partnerships",
      "Startups moving fast with iterative discovery",
      "Complex enterprise systems where scope cannot be fixed upfront",
      "Clients who want to stay in control of priorities",
    ],
    notFor: ["Fixed-budget projects requiring a hard cost ceiling", "Simple, fully-specified one-off builds"],
    process: [
      { step: "01", title: "Rate card agreed", desc: "Hourly or daily rates for each role locked in writing before engagement starts." },
      { step: "02", title: "Sprint planning", desc: "Work planned in 2-week sprints. You set priorities at the start of each sprint." },
      { step: "03", title: "Transparent reporting", desc: "Weekly timesheets and progress reports. No hours logged without deliverable context." },
      { step: "04", title: "Monthly invoicing", desc: "Invoiced monthly based on actual hours. No estimates, no approximations." },
    ],
    featured: true,
  },
  {
    id: "dedicated-team",
    name: "Dedicated Team",
    icon: Users,
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    tag: "Best for long-term scale",
    headline: "Your extended engineering team. Fully embedded.",
    desc: "A dedicated team of engineers, QA specialists, and architects assigned exclusively to your product. They operate in your tools, follow your processes, and become indistinguishable from your in-house team — at a fraction of the cost.",
    bestFor: [
      "Products requiring continuous development and evolution",
      "Companies scaling their engineering capacity rapidly",
      "Businesses without in-house technical leadership",
      "Organisations needing a complete outsourced tech team",
      "Long-term digital transformation programmes",
    ],
    notFor: ["Short one-off projects under 3 months", "Highly specialised single-skill needs (use team extension instead)"],
    process: [
      { step: "01", title: "Team composition", desc: "We build your team: frontend, backend, mobile, QA, DevOps, and PM as needed." },
      { step: "02", title: "Onboarding sprint", desc: "Team is onboarded to your systems, codebase, and product vision in week one." },
      { step: "03", title: "Steady-state delivery", desc: "Team operates in 2-week sprints. Regular syncs with your leadership." },
      { step: "04", title: "Scaling up or down", desc: "Team size adjusted as product needs change — no fixed headcount lock-in." },
    ],
    featured: false,
  },
  {
    id: "retainer",
    name: "Support Retainer",
    icon: RefreshCw,
    accentColor: "#d97706",
    accentBg: "#fff7ed",
    tag: "Best for post-launch products",
    headline: "Guaranteed capacity. Predictable cost.",
    desc: "A monthly retainer securing a fixed block of engineering hours for ongoing support, maintenance, performance optimisation, security patching, and feature evolution. No per-ticket pricing, no surprises.",
    bestFor: [
      "Live products needing ongoing maintenance and improvement",
      "Applications requiring SLA-backed incident response",
      "Products that need continuous security and performance monitoring",
      "Businesses wanting a technical partner without full-time headcount",
      "Systems requiring regulatory compliance maintenance",
    ],
    notFor: ["New product development from scratch", "Large feature builds (handled as separate engagements)"],
    process: [
      { step: "01", title: "System audit", desc: "We review your codebase, infrastructure, and incident history before committing." },
      { step: "02", title: "SLA definition", desc: "Response times, escalation paths, and coverage hours agreed in writing." },
      { step: "03", title: "Monthly hours block", desc: "Fixed hours secured each month. Unused hours roll forward by agreement." },
      { step: "04", title: "Monthly reporting", desc: "End-of-month report: hours used, incidents handled, improvements delivered." },
    ],
    featured: false,
  },
];

const COMPARISON = [
  { factor: "Scope flexibility",         fixedPrice: "Low",      timesMaterials: "High",    dedicatedTeam: "Very high", retainer: "Medium"  },
  { factor: "Budget predictability",     fixedPrice: "Very high",timesMaterials: "Medium",  dedicatedTeam: "Medium",    retainer: "High"    },
  { factor: "Client control",            fixedPrice: "Medium",   timesMaterials: "High",    dedicatedTeam: "Very high", retainer: "High"    },
  { factor: "Speed to start",            fixedPrice: "Medium",   timesMaterials: "Fast",    dedicatedTeam: "Medium",    retainer: "Fast"    },
  { factor: "Best project duration",     fixedPrice: "4–20 wks", timesMaterials: "Ongoing", dedicatedTeam: "6mo+",      retainer: "Monthly" },
  { factor: "Change management",         fixedPrice: "Formal",   timesMaterials: "Flexible",dedicatedTeam: "Flexible",  retainer: "Scoped"  },
];

const CELL_COLORS = {
  "Very high": { bg: "#ecfdf5", text: "#059669" },
  "High":      { bg: "#eaf4ff", text: "#1f6fb2" },
  "Medium":    { bg: "#f9fafb", text: "#6b7280" },
  "Low":       { bg: "#fff7ed", text: "#d97706" },
};

const FAQS = [
  { q: "Can we switch models mid-project?", a: "Yes. We've transitioned clients from Fixed Price to T&M as projects evolved. The transition is governed by a simple amendment to the original agreement." },
  { q: "Do you offer hybrid models?", a: "Absolutely. A common pattern is Fixed Price for Phase 1 (MVP) followed by T&M or a Dedicated Team for Phase 2 onwards." },
  { q: "How are rates determined?", a: "Rates depend on role seniority, engagement type, and duration. We provide a full rate card during the proposal process. There are no hidden fees." },
  { q: "Is there a minimum engagement size?", a: "For Fixed Price and T&M projects, our minimum engagement is typically 4 weeks. Retainer engagements start at a 3-month minimum commitment." },
  { q: "What's included in a Dedicated Team?", a: "Roles are scoped to your needs — typically a mix of frontend, backend, QA, DevOps, and a technical lead or architect. You choose the composition." },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-gray-300 tracking-widest shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[15px] font-semibold text-[#1f3a5f]">{item.q}</span>
        </div>
        <span className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-200 ${open ? "border-[#1f6fb2] bg-[#1f6fb2] text-white rotate-180" : "border-gray-200 text-gray-400"}`}>
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-[14px] text-gray-500 leading-[1.9] pb-5 pl-[2.25rem]">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PricingModels() {
  const [active, setActive] = useState("time-materials");
  const activeModel = MODELS.find((m) => m.id === active);
  const Icon = activeModel.icon;

  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Pricing Models — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Pricing Models</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Pricing & engagement</p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                Transparent Pricing.<br className="hidden lg:block" />
                <span className="text-[#1f6fb2]">Right Model</span> for Every Project.
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[640px]">
                We don't have one pricing model because no two projects are the same. We offer four
                engagement structures — each suited to a different project type, risk profile, and
                client preference. All are fully transparent with no hidden fees.
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-3">
              {[
                { icon: Shield, text: "No hidden fees — ever"              },
                { icon: CheckCircle2, text: "Rate card provided upfront"   },
                { icon: CheckCircle2, text: "Switch models if needs change"},
                { icon: CheckCircle2, text: "Hybrid models available"      },
                { icon: Zap, text: "Proposal within 5–7 business days"     },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                  <t.icon className="w-4 h-4 text-[#1f6fb2] shrink-0" />
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Model selector */}
      <div className="bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Choose your model</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {MODELS.map((model) => {
              const MIcon = model.icon;
              const isActive = active === model.id;
              return (
                <button key={model.id} onClick={() => setActive(model.id)}
                  className={`relative flex flex-col gap-3 p-6 text-left border transition-all duration-200 ${isActive ? "bg-white border-[#1f6fb2] shadow-md" : "bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white"}`}
                >
                  {isActive && <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${model.accentColor}, ${model.accentColor}55)` }} />}
                  {model.featured && <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wide px-2 py-[2px] bg-[#1f3a5f] text-white">Most popular</span>}
                  <div className="w-9 h-9 flex items-center justify-center" style={{ background: isActive ? model.accentBg : "#f3f4f6" }}>
                    <MIcon className="w-4 h-4" style={{ color: isActive ? model.accentColor : "#9ca3af" }} />
                  </div>
                  <div>
                    <p className={`text-[16px] font-bold mb-1 transition-colors ${isActive ? "text-[#1f3a5f]" : "text-gray-600"}`}>{model.name}</p>
                    <p className="text-[11px] text-gray-400 font-medium">{model.tag}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active model detail */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="bg-white border border-gray-200 shadow-sm">
              <div className="grid lg:grid-cols-[1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

                {/* Left */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: activeModel.accentBg }}>
                      <Icon className="w-5 h-5" style={{ color: activeModel.accentColor }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Engagement model</p>
                      <h3 className="text-[22px] font-serif font-bold text-[#1f3a5f]">{activeModel.name}</h3>
                    </div>
                  </div>
                  <div className="w-8 h-[2px] mb-5" style={{ background: activeModel.accentColor }} />
                  <p className="text-[15px] text-gray-500 leading-[1.9] mb-7">{activeModel.desc}</p>

                  <div className="mb-7">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Best for</p>
                    <ul className="space-y-2">
                      {activeModel.bestFor.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[13px] text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: activeModel.accentColor }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Not ideal for</p>
                    <ul className="space-y-2">
                      {activeModel.notFor.map((n) => (
                        <li key={n} className="flex items-start gap-2 text-[13px] text-gray-400">
                          <span className="w-3.5 h-3.5 mt-1 shrink-0 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          </span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-90" style={{ background: activeModel.accentColor }}>
                    Request a proposal <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right — steps */}
                <div className="p-8 lg:p-10">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-7 pb-3 border-b border-gray-100">How this model works</p>
                  <div className="flex flex-col gap-7">
                    {activeModel.process.map((p) => (
                      <div key={p.step} className="flex gap-4">
                        <div className="shrink-0 w-9 h-9 flex items-center justify-center text-[11px] font-bold font-mono" style={{ background: activeModel.accentBg, color: activeModel.accentColor }}>
                          {p.step}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#1f3a5f] mb-1">{p.title}</p>
                          <p className="text-[13px] text-gray-500 leading-[1.8]">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Side by side</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-10">Model comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 pr-8 text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] w-[200px]">Factor</th>
                  {MODELS.map((m) => (
                    <th key={m.id} className="text-left py-4 px-4 text-[13px] font-bold text-[#1f3a5f]">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: m.accentColor }} />
                        {m.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.factor} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}>
                    <td className="py-3.5 pr-8 text-[13px] font-semibold text-gray-600">{row.factor}</td>
                    {[row.fixedPrice, row.timesMaterials, row.dedicatedTeam, row.retainer].map((val, j) => {
                      const style = CELL_COLORS[val] || {};
                      return (
                        <td key={j} className="py-3.5 px-4">
                          <span className="inline-block text-[11.5px] font-semibold px-2.5 py-1" style={{ background: style.bg || "#f3f4f6", color: style.text || "#6b7280" }}>
                            {val}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[360px_1fr] gap-16">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Pricing questions</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] leading-tight mb-5">Common questions about our pricing.</h3>
              <p className="text-[14px] text-gray-500 leading-[1.85] mb-8">Still unsure which model fits? Book a 20-minute call and we'll recommend the right structure for your project.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#1f3a5f] px-7 py-3.5 hover:bg-[#1f6fb2] transition-all duration-200">
                Talk to us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-white border border-gray-200 px-8 py-2">
              {FAQS.map((item, i) => <FaqItem key={i} item={item} index={i} />)}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">Get a proposal</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Tell us about your project. We'll recommend the right model.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">No commitment required. We'll assess your requirements and tell you which pricing model makes the most sense — and why.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Request a proposal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/where-to-start" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Where to start →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}