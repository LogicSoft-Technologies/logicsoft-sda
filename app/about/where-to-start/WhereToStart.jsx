"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, MessageSquare, FileSearch,
  Users, Rocket, LifeBuoy, ChevronDown,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const ENGAGEMENT_TYPES = [
  {
    id: "new-product",
    label: "I have an idea / new product",
    icon: Rocket,
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    headline: "Start with a Discovery Session.",
    desc: "You have a vision but haven't translated it into technical requirements yet. We'll help you define scope, validate assumptions, estimate costs, and build the foundation for a successful product.",
    steps: [
      { num: "01", title: "Free Discovery Call", desc: "30-minute session to understand your idea, goals, and constraints." },
      { num: "02", title: "Scoping Workshop", desc: "We map full requirements, user journeys, and technical scope with your team." },
      { num: "03", title: "Proposal & Estimate", desc: "A transparent project proposal with phased delivery plan and cost breakdown." },
      { num: "04", title: "Kickoff", desc: "Team assembly, sprint planning, and environment setup — delivery starts immediately." },
    ],
    cta: { label: "Book a discovery call", href: "/contact" },
    timeline: "Proposal delivered within 5–7 business days",
  },
  {
    id: "existing-system",
    label: "I have an existing system to improve",
    icon: FileSearch,
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    headline: "Start with a Technical Audit.",
    desc: "Your system is live but suffering from performance issues, technical debt, scalability limits, or security gaps. We audit, diagnose, and propose a structured modernisation roadmap.",
    steps: [
      { num: "01", title: "Intake Assessment", desc: "We collect access, documentation, and pain points from your team." },
      { num: "02", title: "Technical Audit", desc: "Architecture review, code quality analysis, security scan, and performance baseline." },
      { num: "03", title: "Findings Report", desc: "Prioritised list of issues, risk ratings, and recommended remediation actions." },
      { num: "04", title: "Modernisation Roadmap", desc: "Phased plan to resolve issues while keeping your system live throughout." },
    ],
    cta: { label: "Request a technical audit", href: "/contact" },
    timeline: "Audit report delivered within 10–14 business days",
  },
  {
    id: "team-extension",
    label: "I need engineers to join my team",
    icon: Users,
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    headline: "Start with a Team Fit Call.",
    desc: "Your in-house team needs specialist engineers — frontend, backend, mobile, DevOps, or security. We provide fully embedded, senior-level engineers who operate to your processes and standards.",
    steps: [
      { num: "01", title: "Role Definition", desc: "We clarify skills, seniority, stack, and time zone requirements with you." },
      { num: "02", title: "Candidate Shortlist", desc: "We present 2–3 vetted candidates within 5 business days." },
      { num: "03", title: "Technical Interview", desc: "You interview and select. No pressure, no quota." },
      { num: "04", title: "Onboarding", desc: "Engineer integrates into your workflow, tools, and sprint within days." },
    ],
    cta: { label: "Discuss team extension", href: "/contact" },
    timeline: "First candidate within 5 business days",
  },
  {
    id: "support",
    label: "I need ongoing support & maintenance",
    icon: LifeBuoy,
    accentColor: "#d97706",
    accentBg: "#fff7ed",
    headline: "Start with a Support Scope Review.",
    desc: "Your product is live and you need reliable L1–L3 support, incident management, performance monitoring, and continuous improvement without building an in-house ops team.",
    steps: [
      { num: "01", title: "System Handover", desc: "We review your codebase, infrastructure, and current incident history." },
      { num: "02", title: "SLA Definition", desc: "We agree response times, escalation paths, and coverage hours." },
      { num: "03", title: "Monitoring Setup", desc: "We instrument your system with observability tooling if not already in place." },
      { num: "04", title: "Support Activation", desc: "Dedicated support team goes live. First incident handled within agreed SLA." },
    ],
    cta: { label: "Explore support plans", href: "/contact" },
    timeline: "Support activation within 5 business days",
  },
];

const PROCESS_PRINCIPLES = [
  {
    num: "01",
    title: "No long contracts to start",
    desc: "Every engagement begins with a scoped, bounded phase. You evaluate before committing to a long-term relationship.",
  },
  {
    num: "02",
    title: "Fixed-price or time & materials",
    desc: "We offer both models. Fixed-price for well-scoped projects; T&M for evolving requirements. Transparent in both cases.",
  },
  {
    num: "03",
    title: "Senior-led delivery",
    desc: "Every project is led by a senior engineer or architect. No bait-and-switch to junior teams after sign-off.",
  },
  {
    num: "04",
    title: "IP is always yours",
    desc: "All source code, designs, and deliverables are transferred to you on completion. No lock-in, no exceptions.",
  },
];

const FAQS = [
  {
    q: "How quickly can you start?",
    a: "For most projects we can begin within 1–2 weeks of proposal acceptance. Team extension engagements can begin in as little as 5 business days.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "Both. We have dedicated pathways for early-stage startups (lean scope, phased budgets) and enterprise clients (governance, compliance, multi-team delivery).",
  },
  {
    q: "What if I don't know exactly what I need?",
    a: "That's what the discovery call is for. You don't need a spec document to talk to us — just bring your business problem and we'll help translate it into a technical path forward.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, always. We sign mutual NDAs before any project discussion that involves proprietary information.",
  },
  {
    q: "What does a proposal include?",
    a: "A Logicsoft proposal includes: scope definition, technical approach, team composition, delivery timeline, phased milestones, cost breakdown, and risk register.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StepCard({ step, accentColor, accentBg }) {
  return (
    <div className="flex gap-4">
      <div
        className="shrink-0 w-9 h-9 flex items-center justify-center text-[11px] font-bold font-mono mt-0.5"
        style={{ background: accentBg, color: accentColor }}
      >
        {step.num}
      </div>
      <div>
        <p className="text-[14px] font-bold text-[#1f3a5f] mb-1 leading-snug">{step.title}</p>
        <p className="text-[13px] text-gray-500 leading-[1.8]">{step.desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-gray-200 last:border-0 ${open ? "" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-0 py-5 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-gray-300 tracking-widest shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[15px] font-semibold text-[#1f3a5f]">{item.q}</span>
        </div>
        <span className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-200 ${
          open ? "border-[#1f6fb2] bg-[#1f6fb2] text-white rotate-180" : "border-gray-200 text-gray-400"
        }`}>
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="text-[14px] text-gray-500 leading-[1.9] pb-5 pl-[2.25rem]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function WhereToStart() {
  const [activeType, setActiveType] = useState("new-product");
  const active = ENGAGEMENT_TYPES.find((e) => e.id === activeType);
  const Icon = active.icon;

  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Where to Start — Logicsoft Technologies</h1>

      {/* ── Breadcrumb ── */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors duration-200">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Where to Start</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">
                Getting started
              </p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                Not Sure Where to Begin?<br className="hidden lg:block" />
                <span className="text-[#1f6fb2]">We'll guide you.</span>
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[640px]">
                Whether you have a rough idea, an existing system that needs work, a team that needs
                engineers, or a product that needs support — there's a clear starting point for every situation.
                Pick yours below.
              </p>
            </div>

            {/* Trust signals */}
            <div className="shrink-0 flex flex-col gap-3">
              {[
                { icon: CheckCircle2, text: "Free discovery call — no obligation"    },
                { icon: CheckCircle2, text: "NDA signed before any discussion"       },
                { icon: CheckCircle2, text: "Proposal within 5–7 business days"      },
                { icon: CheckCircle2, text: "Senior engineers from day one"          },
                { icon: CheckCircle2, text: "IP ownership transfers to you fully"    },
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

      {/* ── Engagement selector ── */}
      <div className="bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">

          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">
            What describes your situation?
          </p>

          {/* Selector tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {ENGAGEMENT_TYPES.map((type) => {
              const TIcon = type.icon;
              const isActive = activeType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`relative flex items-start gap-3 p-5 text-left border transition-all duration-200 ${
                    isActive
                      ? "bg-white border-[#1f6fb2] shadow-md"
                      : "bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white"
                  }`}
                >
                  {/* Active top line */}
                  {isActive && (
                    <span
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${type.accentColor}, ${type.accentColor}66)` }}
                    />
                  )}
                  <div
                    className="shrink-0 w-9 h-9 flex items-center justify-center mt-0.5 transition-colors duration-200"
                    style={{ background: isActive ? type.accentBg : "#f3f4f6" }}
                  >
                    <TIcon
                      className="w-4.5 h-4.5"
                      style={{ color: isActive ? type.accentColor : "#9ca3af" }}
                    />
                  </div>
                  <span
                    className={`text-[13px] font-semibold leading-snug transition-colors duration-200 ${
                      isActive ? "text-[#1f3a5f]" : "text-gray-500"
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active engagement detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-gray-200 shadow-sm"
            >
              <div className="grid lg:grid-cols-[1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

                {/* Left — overview */}
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-10 h-10 flex items-center justify-center shrink-0"
                      style={{ background: active.accentBg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: active.accentColor }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Your path</p>
                      <h3 className="text-[20px] font-serif font-bold text-[#1f3a5f] leading-snug">
                        {active.headline}
                      </h3>
                    </div>
                  </div>

                  <div className="w-8 h-[2px] mb-5" style={{ background: active.accentColor }} />

                  <p className="text-[15px] text-gray-500 leading-[1.9] mb-8">
                    {active.desc}
                  </p>

                  {/* Timeline badge */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold mb-8"
                    style={{ background: active.accentBg, color: active.accentColor }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {active.timeline}
                  </div>

                  <div>
                    <Link
                      href={active.cta.href}
                      className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:gap-4"
                      style={{ background: active.accentColor }}
                    >
                      {active.cta.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right — steps */}
                <div className="p-8 lg:p-10">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-7 pb-3 border-b border-gray-100">
                    How it works — step by step
                  </p>
                  <div className="flex flex-col gap-6">
                    {active.steps.map((step) => (
                      <StepCard
                        key={step.num}
                        step={step}
                        accentColor={active.accentColor}
                        accentBg={active.accentBg}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Our principles ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-0">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">
                How we work
              </p>
              <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight">
                Principles that govern every engagement.
              </h3>
            </div>
            <Link
              href="/about/how-we-work"
              className="shrink-0 inline-flex items-center gap-2 border border-[#1f6fb2] text-[#1f6fb2] text-[13px] font-semibold px-7 py-3 hover:bg-[#1f6fb2] hover:text-white transition-all duration-200 self-start lg:self-auto"
            >
              Full methodology →
            </Link>
          </div>

          {/* Principles grid */}
          <div className="w-full h-px bg-gray-200 mt-10 mb-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_PRINCIPLES.map((p, i) => (
              <div
                key={p.num}
                className={[
                  "group relative px-8 py-9 border-b border-gray-200 hover:bg-[#f7fbff] transition-colors duration-200",
                  i % 2 !== 0 ? "sm:border-l lg:border-l-0" : "",
                  i % 4 !== 0 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <span className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#1f6fb2] to-[#6db3f2]" aria-hidden="true" />
                <span className="block text-[10px] font-mono text-gray-300 mb-5 tracking-[0.2em]">{p.num}</span>
                <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors duration-200">{p.title}</h4>
                <div className="w-6 h-[2px] bg-[#1f6fb2] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[380px_1fr] gap-16">

            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">
                Common questions
              </p>
              <h3 className="text-[28px] lg:text-[32px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Before you reach out, here's what most people ask.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.85] mb-8">
                Still have a question not covered here? Our team responds within 2 business hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#1f3a5f] px-7 py-3.5 hover:bg-[#1f6fb2] transition-all duration-200"
              >
                Ask us directly <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-gray-200 px-8 py-2">
              {FAQS.map((item, i) => (
                <FaqItem key={i} item={item} index={i} />
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Talk to a human CTA ── */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">
              Ready when you are
            </p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2 leading-snug">
              Start with a conversation. No commitment required.
            </h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">
              Book a free 30-minute call with one of our senior engineers or solution architects.
              We'll listen, ask the right questions, and tell you honestly what the best path forward looks like.
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
              Book a free call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about/price-models"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200"
            >
              View pricing models
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}