"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, CheckCircle2,
  GitBranch, Search, PenTool, Code2,
  TestTube, Rocket, LifeBuoy, RefreshCw,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const PHASES = [
  {
    id: "discovery",
    num: "01",
    icon: Search,
    label: "Discovery & Analysis",
    duration: "1–2 weeks",
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    headline: "We understand before we build.",
    desc: "Every project starts with deep discovery. We map your business goals, user needs, technical constraints, and regulatory requirements before proposing any solution. This phase eliminates the most expensive problems: misaligned requirements.",
    activities: [
      "Stakeholder interviews and business goal mapping",
      "Current system audit (for existing products)",
      "User journey and persona definition",
      "Technical constraint and integration assessment",
      "Regulatory and compliance requirement capture",
      "Risk identification and mitigation pre-planning",
    ],
    outputs: ["Validated requirements document", "User journey maps", "Technical feasibility report", "Risk register"],
  },
  {
    id: "architecture",
    num: "02",
    icon: GitBranch,
    label: "Architecture & Planning",
    duration: "1–2 weeks",
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    headline: "Design the foundation. Prevent structural debt.",
    desc: "Before UI mockups or code, we define the technical architecture. System design decisions made here determine scalability, security posture, and maintenance cost for years. We document every architectural decision with its rationale.",
    activities: [
      "System architecture design and documentation",
      "Technology stack selection and justification",
      "Data model and API contract design",
      "Security architecture and threat modelling",
      "Infrastructure and deployment strategy",
      "Sprint planning and milestone definition",
    ],
    outputs: ["Architecture Decision Records (ADRs)", "Data model diagrams", "API contracts", "Sprint plan and project roadmap"],
  },
  {
    id: "design",
    num: "03",
    icon: PenTool,
    label: "UI/UX Design",
    duration: "1–3 weeks",
    accentColor: "#db2777",
    accentBg: "#fdf2f8",
    headline: "Design with purpose. Not decoration.",
    desc: "Design is a product function, not a cosmetic layer. We create interaction models, information architecture, and visual systems that serve users — validated with real feedback before a single component is built.",
    activities: [
      "Information architecture and navigation design",
      "Wireframes and low-fidelity prototypes",
      "Design system creation (components, tokens, patterns)",
      "High-fidelity UI design to brand guidelines",
      "Interactive prototype for stakeholder review",
      "Accessibility and WCAG 2.1 compliance review",
    ],
    outputs: ["Figma design system", "Interactive prototype", "Component library", "Accessibility audit report"],
  },
  {
    id: "development",
    num: "04",
    icon: Code2,
    label: "Agile Development",
    duration: "4–20+ weeks",
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    headline: "Build in sprints. Deliver continuously.",
    desc: "Development runs in 2-week sprints with working software delivered at each checkpoint. You see progress every two weeks — not a 6-month black box. Code is reviewed, tested, and deployed continuously.",
    activities: [
      "2-week sprint cycles with defined deliverables",
      "Code review on every pull request (no exceptions)",
      "Continuous integration with automated test suites",
      "Sprint demos and stakeholder reviews",
      "Technical documentation maintained in parallel",
      "Security scanning integrated into CI/CD pipeline",
    ],
    outputs: ["Working software every sprint", "Test coverage reports", "Technical documentation", "Deployment to staging environments"],
  },
  {
    id: "qa",
    num: "05",
    icon: TestTube,
    label: "Quality Assurance",
    duration: "Ongoing throughout",
    accentColor: "#d97706",
    accentBg: "#fff7ed",
    headline: "Quality is built in — not bolted on.",
    desc: "We follow a shift-left testing strategy: testing starts at requirements, not after build. Automated tests, manual exploratory testing, performance benchmarking, and security testing run continuously — not as a final gate.",
    activities: [
      "Unit and integration test automation",
      "End-to-end test suites for critical user journeys",
      "Performance and load testing against defined SLAs",
      "Security vulnerability scanning (OWASP Top 10)",
      "Accessibility testing (WCAG 2.1 AA)",
      "Cross-browser and cross-device compatibility testing",
    ],
    outputs: ["Automated test suites", "Performance test reports", "Security scan reports", "UAT sign-off documentation"],
  },
  {
    id: "deployment",
    num: "06",
    icon: Rocket,
    label: "Deployment & Launch",
    duration: "1–2 weeks",
    accentColor: "#0891b2",
    accentBg: "#ecfeff",
    headline: "Launch without drama.",
    desc: "Production deployments are planned, rehearsed, and executed with zero-downtime strategies. We establish monitoring, alerting, and rollback procedures before go-live — so launch day is boring, not stressful.",
    activities: [
      "Production environment hardening and security review",
      "Zero-downtime deployment strategy execution",
      "Monitoring and alerting setup (Prometheus, Grafana, etc.)",
      "Performance baseline establishment",
      "Data migration with validation and rollback plan",
      "Go-live support with dedicated incident response",
    ],
    outputs: ["Production deployment", "Monitoring dashboards", "Runbooks and operations documentation", "Handover documentation"],
  },
  {
    id: "support",
    num: "07",
    icon: LifeBuoy,
    label: "Post-Launch Support",
    duration: "Ongoing",
    accentColor: "#374151",
    accentBg: "#f9fafb",
    headline: "We stay accountable after delivery.",
    desc: "The relationship doesn't end at launch. We provide tiered support, ongoing performance monitoring, security patching, and continuous improvement — evolving the product as your users and business grow.",
    activities: [
      "L1–L3 incident response within agreed SLAs",
      "Performance monitoring and proactive optimisation",
      "Security patching and vulnerability remediation",
      "Feature evolution and product roadmap execution",
      "Regular architecture reviews and technical debt management",
      "Monthly performance and health reporting",
    ],
    outputs: ["Incident reports", "Monthly health reports", "Security audit logs", "Continuous product releases"],
  },
];

const PRINCIPLES = [
  { num: "01", title: "Documentation-driven", desc: "Every architectural decision is recorded. Every API is documented. Every process is written down. Knowledge doesn't live in people's heads." },
  { num: "02", title: "Security by design", desc: "Security is addressed at architecture, not patched in after the fact. Threat modelling, code scanning, and penetration testing are built into our delivery process." },
  { num: "03", title: "Automated everything", desc: "Testing, deployments, code quality checks, and security scans are all automated. Human review is reserved for decisions that require human judgment." },
  { num: "04", title: "Transparent communication", desc: "Weekly progress reports. Sprint demos every two weeks. No surprises. If something is delayed or at risk, you hear about it from us first." },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SoftwareApproach() {
  const [activePhase, setActivePhase] = useState("discovery");
  const phase = PHASES.find((p) => p.id === activePhase);
  const PhaseIcon = phase.icon;

  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Software Development Approach — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Software Approach</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">How we build software</p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                A Process Built for<br className="hidden lg:block" />
                <span className="text-[#1f6fb2]">Predictable Outcomes.</span>
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[640px]">
                Most software projects fail not because of bad engineers — but because of poor process.
                Our delivery methodology eliminates the ambiguity, rework, and communication failures
                that cause projects to overrun, underdeliver, or collapse entirely.
              </p>
            </div>
            <div className="shrink-0 grid grid-cols-2 gap-3">
              {[
                { value: "7",    label: "Delivery phases"     },
                { value: "2wk",  label: "Sprint cadence"      },
                { value: "100%", label: "Code reviewed"       },
                { value: "0",    label: "Black-box delivery"  },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 px-5 py-4 min-w-[130px]">
                  <p className="text-[32px] font-light text-[#1f3a5f] leading-none mb-1">{s.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phase navigator */}
      <div className="bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">The delivery lifecycle</p>

          {/* Phase tabs — horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
            {PHASES.map((p) => {
              const PIcon = p.icon;
              const isActive = activePhase === p.id;
              return (
                <button key={p.id} onClick={() => setActivePhase(p.id)}
                  className={`relative shrink-0 flex items-center gap-2.5 px-5 py-3.5 border transition-all duration-200 ${isActive ? "bg-white border-[#1f6fb2] shadow-sm" : "bg-white/60 border-gray-200 hover:bg-white hover:border-gray-300"}`}
                >
                  {isActive && <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: p.accentColor }} />}
                  <span className="text-[10px] font-mono text-gray-300">{p.num}</span>
                  <PIcon className="w-3.5 h-3.5" style={{ color: isActive ? p.accentColor : "#9ca3af" }} />
                  <span className={`text-[13px] font-semibold whitespace-nowrap ${isActive ? "text-[#1f3a5f]" : "text-gray-500"}`}>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Phase detail */}
          <AnimatePresence mode="wait">
            <motion.div key={activePhase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="bg-white border border-gray-200 shadow-sm">
              <div className="grid lg:grid-cols-[1fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center" style={{ background: phase.accentBg }}>
                      <PhaseIcon className="w-5 h-5" style={{ color: phase.accentColor }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">Phase {phase.num} · {phase.duration}</p>
                      <h3 className="text-[20px] font-serif font-bold text-[#1f3a5f]">{phase.label}</h3>
                    </div>
                  </div>
                  <div className="w-8 h-[2px] mb-5" style={{ background: phase.accentColor }} />
                  <p className="text-[13px] font-bold italic text-gray-600 mb-4 leading-snug">"{phase.headline}"</p>
                  <p className="text-[14px] text-gray-500 leading-[1.9] mb-7">{phase.desc}</p>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Key outputs</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.outputs.map((o) => (
                        <span key={o} className="text-[11.5px] font-medium px-3 py-1.5 border" style={{ background: phase.accentBg, color: phase.accentColor, borderColor: phase.accentBg }}>
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-7 pb-3 border-b border-gray-100">Activities in this phase</p>
                  <ul className="space-y-4">
                    {phase.activities.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-[13.5px] text-gray-600">
                        <span className="shrink-0 w-5 h-5 flex items-center justify-center mt-0.5" style={{ background: phase.accentBg }}>
                          <span className="text-[9px] font-bold font-mono" style={{ color: phase.accentColor }}>{String(i + 1).padStart(2, "0")}</span>
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Principles */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Engineering principles</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-0 leading-tight">The non-negotiables in every engagement.</h3>
          <div className="w-full h-px bg-gray-200 mt-10 mb-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.num} className={["group relative px-8 py-9 border-b border-gray-200 hover:bg-[#f7fbff] transition-colors duration-200", i % 2 !== 0 ? "sm:border-l lg:border-l-0" : "", i % 4 !== 0 ? "lg:border-l" : ""].join(" ")}>
                <span className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#1f6fb2] to-[#6db3f2]" />
                <span className="block text-[10px] font-mono text-gray-300 mb-5 tracking-[0.2em]">{p.num}</span>
                <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors">{p.title}</h4>
                <div className="w-6 h-[2px] bg-[#1f6fb2] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">Start a conversation</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">See how our process applies to your specific project.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free 30-minute call with one of our architects. We'll walk through how our delivery approach maps to your requirements.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Book a call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/price-models" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              View pricing models
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}