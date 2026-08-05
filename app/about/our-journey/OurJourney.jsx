"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Globe2, Code2 } from "lucide-react";

// ── Timeline data ─────────────────────────────────────────────────────────────
const MILESTONES = [
  {
    year: "2021",
    quarter: "Q3",
    title: "Founded in Lagos",
    desc: "SDA Logicsoft Technologies was incorporated in Lagos, Nigeria, by a group of engineers who believed African businesses deserved world-class software built locally, to global standards. The first office was a single room in Victoria Island with three workstations.",
    tags: ["Incorporation", "Lagos", "3 founders"],
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    highlight: false,
  },
  {
    year: "2022",
    quarter: "Q1",
    title: "First enterprise client",
    desc: "Secured our first enterprise engagement with a tier-2 Nigerian bank, delivering a customer onboarding automation platform. The project ran 2 weeks ahead of schedule and established our reputation for delivery discipline in the financial services sector.",
    tags: ["Banking", "First enterprise deal", "On-time delivery"],
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    highlight: false,
  },
  {
    year: "2023",
    quarter: "Q2",
    title: "10-person engineering team",
    desc: "Grew from 3 founders to a team of 10 full-time engineers. Introduced our first formal code review process, sprint cadence, and documentation standards the foundations of the delivery methodology still in use today.",
    tags: ["Team growth", "Process", "Engineering standards"],
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    highlight: false,
  },
  {
    year: "2025",
    quarter: "Q2",
    title: "Abuja & Edo offices opened",
    desc: "Expanded operations beyond Lagos with new offices in Abuja (serving public sector and government clients) and Edo (engineering hub). Total headcount reached 45 engineers across three locations.",
    tags: ["Expansion", "Abuja", "Edo", "45 engineers"],
    accentColor: "#0891b2",
    accentBg: "#ecfeff",
    highlight: false,
  },
  {
    year: "2026",
    quarter: "Q3",
    title: "First international client — London",
    desc: "Delivered a cross-border payments platform for a UK-based FinTech serving the African diaspora market. Our first engagement outside Nigeria validated our capacity for distributed, time-zone spanning delivery to international standards.",
    tags: ["UK", "FinTech", "International", "Cross-border payments"],
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    highlight: false,
  },
];

const COMPANY_STATS = [
  { value: "5+",  label: "Years in operation",    icon: Award    },
  { value: "100+", label: "Projects delivered",    icon: Code2    },
  { value: "85+",  label: "Engineers",             icon: Users    },
  { value: "30+",  label: "Industries served",     icon: Globe2   },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function OurJourney() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Our Journey — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Our Journey</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Est. 2021 · Lagos, Nigeria</p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                5 Years of Building<br className="hidden lg:block" />
                <span className="text-[#1f6fb2]">Software That Lasts.</span>
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[640px]">
                From three workstations in a Victoria Island office to 85+ engineers serving clients
                across Africa, Europe, and the Middle East. This is the unfiltered story of how
                Logicsoft Technologies was built, one delivered project at a time.
              </p>
            </div>
            <div className="shrink-0 grid grid-cols-2 gap-3">
              {COMPANY_STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white border border-gray-200 px-5 py-4 min-w-[140px]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#1f6fb2]" />
                    </div>
                    <p className="text-[32px] font-light text-[#1f3a5f] leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dark statement */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-12">
          <blockquote className="text-[19px] lg:text-[22px] font-serif font-normal text-white leading-[1.65] max-w-[820px]">
            "We didn't set out to build the biggest software company in Africa. We set out to build
            the most trustworthy one and to prove that a Nigerian engineering firm could deliver
            to the same standard as any team in London, Dubai, or Silicon Valley."
          </blockquote>
          <p className="text-[12px] text-white/40 mt-4">— Logicsoft Technologies Founding Principles, 2021</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Company timeline</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-14">
            Every milestone. Chronologically.
          </h3>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-blue-100 hidden md:block" />

            <div className="flex flex-col gap-6">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year + m.quarter}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group relative"
                >
                  <div className="flex gap-0 md:gap-8 items-start">

                    {/* Year label */}
                    <div className="hidden md:flex flex-col items-end shrink-0 w-[80px] pt-5">
                      <span className="text-[11px] font-bold text-[#1f3a5f]">{m.year}</span>
                      <span className="text-[10px] text-gray-400 font-mono">{m.quarter}</span>
                    </div>

                    {/* Dot */}
                    <div className="hidden md:flex shrink-0 items-center justify-center w-8 pt-5 relative z-10">
                      <div
                        className="w-3 h-3 rounded-full border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-125"
                        style={{ background: m.accentColor }}
                      />
                    </div>

                    {/* Card */}
                    <div className={`flex-1 bg-white border transition-all duration-200 group-hover:shadow-sm group-hover:border-gray-300 ${m.highlight ? "border-l-[3px]" : "border-gray-200"}`}
                      style={{ borderLeftColor: m.highlight ? m.accentColor : undefined }}
                    >
                      {/* Highlight label */}
                      {m.highlight && (
                        <div className="px-6 pt-3 pb-0">
                          <span className="text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-[3px]" style={{ background: m.accentBg, color: m.accentColor }}>
                            {m.highlightLabel}
                          </span>
                        </div>
                      )}

                      <div className="p-6">
                        {/* Mobile year */}
                        <div className="flex items-center gap-2 mb-2 md:hidden">
                          <span className="text-[11px] font-bold text-[#1f3a5f]">{m.year}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{m.quarter}</span>
                        </div>

                        <h4 className="text-[17px] font-serif font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors duration-200">
                          {m.title}
                        </h4>
                        <div className="w-8 h-[2px] mb-3 opacity-40 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" style={{ background: m.accentColor }} />
                        <p className="text-[14px] text-gray-500 leading-[1.85] mb-4">{m.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {m.tags.map((tag) => (
                            <span key={tag} className="text-[10.5px] font-semibold px-2.5 py-1" style={{ background: m.accentBg, color: m.accentColor }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What's next */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">What's next</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] leading-tight mb-5">
                The next chapter is being written now.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                We're expanding our engineering capacity in East Africa, deepening our presence in the UAE,
                and investing in AI-augmented development tooling that will let our engineers ship more
                reliable software, faster. The principles don't change. The ambition does.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: "East Africa expansion",       detail: "Engineering hub in Nairobi — 2025"                          },
                { label: "AI-augmented development",    detail: "Proprietary tooling for code review and test generation"     },
                { label: "MENA office",                 detail: "Permanent Dubai presence — Q2 2025"                         },
                { label: "100-engineer milestone",      detail: "On track for Q3 2025"                                       },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 border border-gray-100 bg-[#f9fafb] px-5 py-4">
                  <span className="text-[10px] font-mono text-gray-300 mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[14px] font-bold text-[#1f3a5f]">{item.label}</p>
                    <p className="text-[12.5px] text-gray-400">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">Be part of the story</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Let's build something together.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Every client relationship is a new chapter. Join the 100+ organisations who've trusted us to build their most important systems.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/founders-story" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Read the founder's story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}