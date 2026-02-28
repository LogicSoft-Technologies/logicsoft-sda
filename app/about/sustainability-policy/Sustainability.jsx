"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Server, Users, BookOpen, Globe, Zap, Heart, ShieldCheck } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    num: "01",
    icon: Server,
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    title: "Green Infrastructure",
    headline: "We choose cloud partners with verified carbon commitments.",
    desc: "Every infrastructure recommendation we make considers energy efficiency. We prioritise AWS, Azure, and GCP regions powered by renewable energy, right-size compute to eliminate idle resource waste, and enforce auto-scaling so servers aren't running at full capacity for no reason.",
    commitments: [
      "Prefer renewable-energy cloud regions by default",
      "Right-size infrastructure to eliminate idle compute waste",
      "Auto-scaling policies on every production deployment",
      "Monthly infrastructure audits to remove unused resources",
    ],
  },
  {
    num: "02",
    icon: BookOpen,
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    title: "Efficient Code Practice",
    headline: "Lean code is sustainable code.",
    desc: "Inefficient software wastes energy at scale. We write performant, optimised code as a default standard — not a performance afterthought. Fewer database queries, smarter caching strategies, and lighter payloads mean less compute, less energy, and better products.",
    commitments: [
      "Performance benchmarking on every production release",
      "Query optimisation reviews as part of code review checklist",
      "CDN-first asset delivery to minimise origin server load",
      "Bundle size tracking and optimisation for frontend projects",
    ],
  },
  {
    num: "03",
    icon: Users,
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    title: "People & Community",
    headline: "We invest in the engineers of tomorrow.",
    desc: "Sustainable technology requires a sustainable talent pipeline. We run mentorship programmes for young Nigerian engineers, partner with universities across West Africa on internship pipelines, and maintain a culture where engineers grow — not burn out.",
    commitments: [
      "Structured mentorship for junior engineers in every team",
      "University partnership internship pipeline programme",
      "Annual learning budget for every full-time engineer",
      "Zero-crunch culture — overtime is a failure of planning, not a solution",
    ],
  },
  {
    num: "04",
    icon: Globe,
    accentColor: "#d97706",
    accentBg: "#fff7ed",
    title: "Accessible Technology",
    headline: "We build for everyone — not just well-connected users.",
    desc: "Sustainable digital products work on low-bandwidth connections, older devices, and assistive technologies. We engineer for WCAG 2.1 AA accessibility and test on real-world network conditions representative of our markets in Africa and the Middle East.",
    commitments: [
      "WCAG 2.1 AA accessibility compliance on all client products",
      "Performance testing on 3G and low-bandwidth network profiles",
      "Offline-first architecture consideration for relevant use cases",
      "Screen reader and assistive technology compatibility testing",
    ],
  },
  {
    num: "05",
    icon: ShieldCheck,
    accentColor: "#0891b2",
    accentBg: "#ecfeff",
    title: "Ethical Engineering",
    headline: "We don't build products that cause harm.",
    desc: "We maintain a clear policy on what we will and won't build. We decline projects that involve dark patterns, exploitative data practices, surveillance infrastructure, or technology designed to marginalise vulnerable populations. This is non-negotiable.",
    commitments: [
      "Documented ethics review for every new engagement",
      "Data minimisation by default — collect only what's necessary",
      "No dark pattern UI/UX — ever",
      "GDPR and NDPR data privacy compliance as a baseline",
    ],
  },
  {
    num: "06",
    icon: Heart,
    accentColor: "#dc2626",
    accentBg: "#fff1f2",
    title: "Long-term Thinking",
    headline: "We build to last — not to lock in.",
    desc: "Sustainable software doesn't create dependency. We use open standards, transfer full IP, write documentation that lets any competent engineer maintain our work, and design systems that can evolve without requiring us to be in the room.",
    commitments: [
      "Full IP transfer to clients on project completion",
      "Open standards over proprietary lock-in where possible",
      "Documentation complete enough for any competent engineer to maintain",
      "Architecture reviews designed for 5-year horizons, not 12-month cycles",
    ],
  },
];

const METRICS = [
  { value: "100%",   label: "IP transferred to clients",         icon: ShieldCheck },
  { value: "WCAG",   label: "AA accessibility on every product", icon: Users       },
  { value: "Zero",   label: "Crunch culture policy",             icon: Heart       },
  { value: "NDPR",   label: "Data privacy compliance baseline",  icon: Leaf        },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Sustainability() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Sustainability Policy — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Sustainability Policy</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#059669] uppercase tracking-[0.16em] mb-4 flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5" />
                Sustainability & responsibility
              </p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                Technology Built for the<br className="hidden lg:block" />
                <span className="text-[#059669]">Long Term.</span>
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[660px]">
                Sustainability isn't a PR section of our website. It's a set of concrete commitments
                that govern how we build software, how we treat our people, and what kinds of work
                we take on. These commitments are operational, not aspirational.
              </p>
            </div>

            {/* Metrics */}
            <div className="shrink-0 grid grid-cols-2 gap-3">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-white border border-gray-200 px-5 py-4 min-w-[140px]">
                  <p className="text-[28px] font-light text-[#1f3a5f] leading-none mb-1">{m.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Intro statement */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-12">
          <div className="max-w-[820px]">
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.16em] mb-4">Our position</p>
            <blockquote className="text-[20px] lg:text-[24px] font-serif font-normal text-white leading-[1.6]">
              "Software companies have an outsized impact on the world. The products we build shape
              how people work, communicate, access healthcare, manage money, and learn. That responsibility
              demands we think beyond the next sprint."
            </blockquote>
            <p className="text-[13px] text-white/40 mt-4">— Logicsoft Technologies, Engineering Principles v2.1</p>
          </div>
        </div>
      </div>

      {/* Six pillars */}
      <div className="bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Six pillars</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12 leading-tight">
            What our sustainability commitment actually means.
          </h3>

          <div className="flex flex-col gap-4">
            {PILLARS.map((pillar, i) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={pillar.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="bg-white border border-gray-200 group hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="grid lg:grid-cols-[280px_1fr_280px] divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

                    {/* Left — label */}
                    <div className="p-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 flex items-center justify-center" style={{ background: pillar.accentBg }}>
                            <PillarIcon className="w-4.5 h-4.5" style={{ color: pillar.accentColor }} />
                          </div>
                          <span className="text-[10px] font-mono text-gray-300 tracking-widest">{pillar.num}</span>
                        </div>
                        <h4 className="text-[18px] font-serif font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="text-[12px] font-semibold leading-snug" style={{ color: pillar.accentColor }}>
                          {pillar.headline}
                        </p>
                      </div>
                      <div className="w-8 h-[2px] mt-4 opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" style={{ background: pillar.accentColor }} />
                    </div>

                    {/* Middle — description */}
                    <div className="p-7">
                      <p className="text-[14px] text-gray-500 leading-[1.9]">{pillar.desc}</p>
                    </div>

                    {/* Right — commitments */}
                    <div className="p-7">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-4">Specific commitments</p>
                      <ul className="space-y-2.5">
                        {pillar.commitments.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-[12.5px] text-gray-500">
                            <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: pillar.accentColor }} />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* What we won't build */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
            <div>
              <p className="text-[11px] font-bold text-[#dc2626] uppercase tracking-[0.16em] mb-4">Our limits</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-5 leading-tight">
                What we will not build.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.85] mb-6">
                Declining work is a business cost we accept willingly when the alternative is contributing
                to harm. The following are categories of work we will not take on, regardless of budget
                or client profile.
              </p>
              <ul className="space-y-3">
                {[
                  "Surveillance, tracking, or behaviour monitoring systems targeting individuals without explicit consent",
                  "Dark pattern UI/UX designed to manipulate users into unwanted purchases or data disclosures",
                  "Systems designed to discriminate based on race, religion, gender, or socioeconomic status",
                  "Disinformation or synthetic content generation at scale",
                  "Products that exploit addiction mechanics (particularly targeting minors)",
                  "Infrastructure for cryptocurrency projects with no clear utility beyond speculation",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13.5px] text-gray-600">
                    <span className="shrink-0 w-4 h-4 bg-[#fff1f2] flex items-center justify-center mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold text-[#059669] uppercase tracking-[0.16em] mb-4">What we prioritise</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-5 leading-tight">
                Work that creates lasting value.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.85] mb-6">
                We actively seek out projects that use technology to solve real problems —
                especially in underserved markets and sectors where good software can change lives.
              </p>
              <ul className="space-y-3">
                {[
                  "Healthcare and medical systems that expand access to quality care",
                  "Financial inclusion products that reach unbanked and underbanked populations",
                  "Education platforms that make quality learning accessible beyond major cities",
                  "Agricultural technology that empowers smallholder farmers with market access",
                  "Government systems that make public services faster and more transparent",
                  "Climate and environmental monitoring infrastructure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[13.5px] text-gray-600">
                    <span className="shrink-0 w-4 h-4 bg-[#ecfdf5] flex items-center justify-center mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#6ee7b7] uppercase tracking-[0.15em] mb-3">Work with us</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Build something that lasts.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">
              If you're building a product that creates genuine value, we'd like to help build it with you.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/logicsoft" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              About Logicsoft
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}