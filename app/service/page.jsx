"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, ChevronRight, CheckCircle2,
  Layers, Globe, Cpu, GitBranch, Wrench,
  Shield, Zap, Users, FileText,
  BarChart3, ChevronDown, Quote,
  Monitor, Smartphone, Server,
  Code2, Cloud, Database, BarChart, Settings,
} from "lucide-react";

const NAV_SERVICES = [
  {
    category: "Web Development",
    icon: Monitor,
    accent: "#1f6fb2",
    bg: "#eff6ff",
    tagline: "Scalable, accessible web applications from frontend to backend — built for performance and longevity.",
    links: [
      {
        label: "Frontend Development",
        href:  "/services/web-development/frontend",
        desc:  "React, Next.js, and Vue — pixel-perfect, performant, accessible UI engineering.",
      },
      {
        label: "Backend Development",
        href:  "/services/web-development/backend",
        desc:  "Node.js, Python, Go — APIs, databases, and server-side logic built to scale.",
      },
      {
        label: "Full Stack",
        href:  "/services/web-development/full-stack",
        desc:  "End-to-end delivery from database schema to browser interaction.",
      },
    ],
  },
  {
    category: "Mobile Apps",
    icon: Smartphone,
    accent: "#0d9488",
    bg: "#f0fdfa",
    tagline: "Native and cross-platform mobile apps engineered for performance, reliability, and app store success.",
    links: [
      {
        label: "iOS Development",
        href:  "/services/mobile-apps/ios",
        desc:  "Swift and SwiftUI for the full Apple hardware and software ecosystem.",
      },
      {
        label: "Android Apps",
        href:  "/services/mobile-apps/android",
        desc:  "Kotlin-first Android engineering for all device form factors.",
      },
      {
        label: "Cross Platform",
        href:  "/services/mobile-apps/cross-platform",
        desc:  "React Native and Flutter — one codebase, two production-ready apps.",
      },
    ],
  },
  {
    category: "Security",
    icon: Shield,
    accent: "#dc2626",
    bg: "#fff1f2",
    tagline: "Offensive testing, continuous monitoring, compliance programmes, and secure-by-design engineering.",
    links: [
      {
        label: "Cyber Security",
        href:  "/services/security/cyber-security",
        desc:  "Full-spectrum security practice — offensive testing and defensive architecture.",
      },
      {
        label: "Compliance Services",
        href:  "/services/security/compliance",
        desc:  "ISO 27001, NDPR, GDPR, PCI DSS — certification and readiness end-to-end.",
      },
      {
        label: "Security Testing",
        href:  "/services/security/security-testing",
        desc:  "SAST, DAST, SCA and manual code-level vulnerability analysis in your SDLC.",
      },
      {
        label: "Penetration Testing",
        href:  "/services/security/penetration-testing",
        desc:  "Authorised simulated attacks on web, mobile, API, and network surfaces.",
      },
      {
        label: "SIEM Services",
        href:  "/services/security/siem-services",
        desc:  "24/7 real-time threat detection, log correlation, and automated alerting.",
      },
    ],
  },
  {
    category: "Other Services",
    icon: Server,
    accent: "#7c3aed",
    bg: "#f5f3ff",
    tagline: "Cloud infrastructure, data intelligence, DevOps pipelines, and strategic technology consulting.",
    links: [
      {
        label: "DevOps",
        href:  "/services/other-services/devops",
        desc:  "CI/CD pipelines, Kubernetes, and infrastructure automation at scale.",
      },
      {
        label: "Cloud Engineering",
        href:  "/services/other-services/cloud-engineering",
        desc:  "AWS, Azure, GCP — cloud-native architecture, migration, and optimisation.",
      },
      {
        label: "Data Analytics",
        href:  "/services/other-services/data-analytics",
        desc:  "Data pipelines, BI dashboards, and ML infrastructure for data-driven decisions.",
      },
      {
        label: "Consultation",
        href:  "/services/other-services/consultation",
        desc:  "Vendor-neutral technology strategy and senior advisory for complex decisions.",
      },
      {
        label: "Cost Optimization",
        href:  "/services/other-services/cost-optimization",
        desc:  "Cloud spend analysis, right-sizing, and FinOps programmes.",
      },
    ],
  },
];

const SERVICE = {
  breadcrumbs: [
    { label: "Services",                     href: "/services"                       },
    { label: "Software Development",         href: "/software-development/services"  },
    { label: "Custom Software Development",  href: null                              },
  ],
  eyebrow:      "Software Development",
  accentColor:  "#1f6fb2",
  title:        "Custom Software Development",
  tagline:      "Purpose-built software engineered for your exact workflows, integrations, and scale — not adapted from a generic template.",
  description:  "We design and build software that solves real operational problems. Every system we deliver is architected from scratch for your specific context — your data model, your integrations, your users, your growth trajectory. No off-the-shelf shortcuts.",

  stats: [
    { val: "300+", label: "Custom solutions delivered" },
    { val: "98%",  label: "On-time delivery rate"      },
    { val: "12+",  label: "Years of engineering"       },
    { val: "5★",   label: "Avg. client satisfaction"  },
  ],

  outcomes: [
    { icon: Zap,    title: "Faster time-to-value",    body: "Two-week sprints with working software at every milestone — not just at the end of the engagement." },
    { icon: Shield, title: "Built to last",            body: "Production-grade code with >80% test coverage, OWASP compliance, and architecture designed for your next 5 years." },
    { icon: Users,  title: "Full IP ownership",        body: "Complete source code, documentation, and architecture diagrams transferred to you at project close." },
    { icon: Globe,  title: "Integrates with anything", body: "RESTful and GraphQL APIs, event-driven connectors, and third-party integrations handled as first-class concerns." },
  ],

  capabilities: [
    { icon: Globe,     title: "Web Applications",           body: "Responsive, accessible, and SEO-ready web applications built with React, Next.js, or Vue frontends paired with Node.js, Python, or Go backends.", tags: ["React", "Next.js", "Node.js", "PostgreSQL"] },
    { icon: Cpu,       title: "Mobile Applications",        body: "Cross-platform mobile apps with React Native or Flutter, and native iOS/Android when platform-specific performance is required.", tags: ["React Native", "Flutter", "Swift", "Kotlin"] },
    { icon: Layers,    title: "Enterprise Platforms",       body: "Complex internal tools, ERP extensions, workflow automation engines, and B2B portals with multi-tenancy, RBAC, and audit trails.", tags: ["Microservices", "Event-driven", "RBAC", "Audit logs"] },
    { icon: BarChart3, title: "Data-Intensive Applications",body: "Dashboards, reporting platforms, and analytical applications built on top of your existing warehouse or a new one we design.", tags: ["BI dashboards", "ETL", "Data APIs", "Real-time"] },
    { icon: GitBranch, title: "API & Integration Layer",    body: "Purpose-built APIs, middleware, and event-driven connectors that join your existing systems, eliminating data silos.", tags: ["REST", "GraphQL", "Kafka", "Webhooks"] },
    { icon: Wrench,    title: "AI-Enhanced Software",       body: "LLM-powered features, document intelligence, recommendation engines, and predictive analytics embedded directly into your product.", tags: ["LLM integration", "Vector search", "Fine-tuning", "RAG"] },
  ],

  methodology: [
    { n: "01", title: "Discovery & Requirements", duration: "1–2 weeks",  body: "Structured workshops to define functional requirements, technical constraints, integration points, and success criteria. We produce a written specification before a line of production code is written.", deliverable: "Requirements specification document" },
    { n: "02", title: "Architecture & Design",    duration: "1–2 weeks",  body: "System architecture, data model, API surface, infrastructure design, and security model — documented and reviewed with your team before development begins.", deliverable: "Architecture blueprint + ERD" },
    { n: "03", title: "Iterative Development",    duration: "4–16 weeks", body: "Two-week sprints with a working, deployable build at the end of each. You test real software, not wireframes — priorities can be refined based on what you see.", deliverable: "Working software every 2 weeks" },
    { n: "04", title: "QA & Security Review",     duration: "1–2 weeks",  body: "Automated and manual testing, OWASP Top 10 validation, performance benchmarking, and load testing before every production release.", deliverable: "QA sign-off report + pentest summary" },
    { n: "05", title: "Deployment & Handover",    duration: "1 week",     body: "Production deployment with full CI/CD pipeline, monitoring setup, runbook documentation, and a structured knowledge transfer session for your team.", deliverable: "Deployed system + runbooks + docs" },
    { n: "06", title: "Post-Launch Support",      duration: "Ongoing",    body: "Optional SLA-backed support — bug fixes, dependency updates, performance monitoring, and a quarterly improvement review.", deliverable: "Monthly health reports + SLA" },
  ],

  deliverables: [
    "Complete source code with full commit history",
    "Architecture decision records (ADRs)",
    "API documentation (OpenAPI / Swagger)",
    "Infrastructure-as-code (Terraform or CDK)",
    "Automated test suite with >80% coverage on critical paths",
    "Deployment runbooks and operational documentation",
    "Security review report with all findings remediated",
    "Performance test results and baseline benchmarks",
    "30-day post-launch support and monitoring included",
    "12-month support SLA available on request",
  ],

  technologies: [
    { category: "Frontend",  items: ["React", "Next.js", "Vue", "TypeScript", "Tailwind CSS"] },
    { category: "Backend",   items: ["Node.js", "Python", "Go", "Java", "GraphQL"] },
    { category: "Mobile",    items: ["React Native", "Flutter", "Swift", "Kotlin"] },
    { category: "Database",  items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"] },
    { category: "Cloud",     items: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"] },
    { category: "AI / ML",   items: ["OpenAI", "LangChain", "HuggingFace", "Pinecone", "PyTorch"] },
  ],

  caseStudy: {
    tag: "Case Study",
    industry: "Logistics & Supply Chain",
    title: "From zero to 200,000 active users in 11 months — a pan-African logistics SaaS",
    challenge: "A logistics startup needed a full platform built from scratch: driver app, merchant portal, real-time tracking, route optimisation, and payment integration — all before a Series A close.",
    outcome: "We delivered the MVP in 14 weeks, the full platform in 11 months. The product onboarded 200,000 active users in its first year and the client raised their Series A round within 6 months of launch.",
    metrics: [
      { val: "11mo",     label: "Full platform delivered"          },
      { val: "200k",     label: "Active users at 12 months"        },
      { val: "Series A", label: "Raised within 6 months of launch" },
    ],
  },

  faqs: [
    { q: "How do you price custom software engagements?",    a: "We default to fixed-scope, fixed-price engagements — you know the cost before we write a line of code. For longer-running products where scope evolves, we offer a dedicated team model with a monthly retainer. We never bill time-and-materials for defined-scope work." },
    { q: "What happens if requirements change mid-project?", a: "We use a formal change control process: any scope change is scoped, priced, and approved before it enters development. This keeps budgets predictable while giving you the flexibility to evolve priorities." },
    { q: "Do you work with our existing development team?",  a: "Yes — many engagements involve our engineers working alongside your team. We adapt to your branching strategy, tools, and review process. We can also provide a standalone delivery squad that integrates into your Jira and Slack." },
    { q: "How long does a typical project take?",            a: "An MVP typically takes 8–14 weeks. A full-featured enterprise application is usually 16–32 weeks. Duration depends on scope, integration complexity, and the number of concurrent engineers." },
    { q: "What do you need from us to get started?",         a: "A 30-minute discovery call and whatever documentation you have — even a rough brief is enough. We'll guide you through the requirements process. You don't need a polished spec before engaging us." },
  ],
};


const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true        },
  transition:  { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

function FAQItem({ q, a, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8eef6]">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group">
        <span className="text-[14px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors leading-snug pt-0.5">
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-1">
          <ChevronDown className="w-4 h-4" style={{ color: accent }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}>
            <p className="text-[13.5px] text-gray-500 leading-[1.85] pb-6 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServicesNavigator({ currentHref }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = NAV_SERVICES[activeIdx];

  return (
    <section className="border-b border-[#e8eef6] py-16" style={{ background: "#f8fafd" }}>
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Section header ── */}
        <motion.div {...fadeUp()} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2 font-mono">
              All services
            </p>
            <h2 className="text-[28px] lg:text-[34px] font-serif text-[#1f3a5f] leading-tight">
              Everything LogicSoft offers
            </h2>
            <p className="text-[13.5px] text-gray-400 mt-2 max-w-md leading-relaxed">
              The same four service categories from our navigation — all links lead directly to their detail pages.
            </p>
          </div>
          <Link href="/services"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors whitespace-nowrap shrink-0">
            Full services overview <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.06)}
          className="grid grid-cols-1 lg:grid-cols-[240px_1fr] border border-[#e8eef6] overflow-hidden shadow-sm bg-white">

          {/* LEFT — category tab rail */}
          <div className="border-b lg:border-b-0 lg:border-r border-[#e8eef6] flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible">
            {NAV_SERVICES.map((cat, i) => {
              const isActive = activeIdx === i;
              return (
                <button key={cat.category} onClick={() => setActiveIdx(i)}
                  className={`flex-shrink-0 lg:flex-shrink text-left flex items-center gap-3 px-5 py-4
                    border-b-[3px] lg:border-b-0 lg:border-l-[3px] transition-all duration-150
                    ${isActive
                      ? "bg-white border-[#1f6fb2]"
                      : "border-transparent hover:bg-[#f5f9ff] hover:border-[#1f6fb2]/25"
                    }`}>
                  {/* Category icon */}
                  <div className={`w-8 h-8 flex items-center justify-center shrink-0 transition-all duration-150
                    ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"}`}
                    style={{
                      background: isActive ? cat.bg : "transparent",
                      border: `1px solid ${isActive ? cat.accent + "30" : "transparent"}`,
                    }}>
                    <cat.icon className="w-4 h-4" style={{ color: isActive ? cat.accent : "#6b7280" }} />
                  </div>

                  {/* Labels — hidden on mobile, shown on lg */}
                  <div className="hidden lg:block min-w-0">
                    <p className={`text-[13px] font-semibold leading-none transition-colors ${isActive ? "text-[#1f3a5f]" : "text-gray-500"}`}>
                      {cat.category}
                    </p>
                    <p className="text-[10.5px] text-gray-400 mt-1">
                      {cat.links.length} service{cat.links.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Mobile: just a dot indicator */}
                  <span className="lg:hidden text-[11px] font-semibold"
                    style={{ color: isActive ? cat.accent : "#9ca3af" }}>
                    {cat.category.split(" ")[0]}
                  </span>

                  {isActive && (
                    <ChevronRight className="hidden lg:block w-3.5 h-3.5 ml-auto shrink-0"
                      style={{ color: cat.accent }} />
                  )}
                </button>
              );
            })}

            <div className="hidden lg:block mt-auto px-5 py-4 border-t border-[#e8eef6]"
              style={{ background: `linear-gradient(135deg, ${active.bg}, #ffffff)` }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-1"
                style={{ color: active.accent }}>Browse all</p>
              <p className="text-[11.5px] text-gray-400 leading-snug mb-2.5">
                300+ projects · 30+ industries · since 2012
              </p>
              <Link href="/services"
                className="inline-flex items-center gap-1.5 text-[12px] font-bold transition-all duration-200 hover:gap-3"
                style={{ color: active.accent }}>
                Full catalogue <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* RIGHT — animated links panel */}
          <AnimatePresence mode="wait">
            <motion.div key={activeIdx}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col">

              <div className="px-8 py-5 border-b border-[#e8eef6] flex items-start gap-4"
                style={{ background: `linear-gradient(135deg, ${active.bg} 0%, #ffffff 70%)` }}>
                <div className="w-10 h-10 flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: active.bg, border: `1px solid ${active.accent}25` }}>
                  <active.icon className="w-5 h-5" style={{ color: active.accent }} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-1"
                    style={{ color: active.accent }}>
                    {active.category}
                  </p>
                  <p className="text-[13px] text-gray-500 leading-snug max-w-xl">{active.tagline}</p>
                </div>
              </div>

              {/* Link rows — one per service in this category */}
              <div className="flex-1 px-6 py-1 divide-y divide-[#f1f5f9]">
                {active.links.map((link, i) => {
                  const isCurrent = link.href === currentHref;

                  return (
                    <motion.div key={link.href}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}>

                      {isCurrent ? (
                        <div className="flex items-center justify-between py-4 px-3 gap-4"
                          style={{ background: `${active.accent}07` }}>
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full mt-[8px] shrink-0"
                              style={{ background: active.accent }} />
                            <div>
                              <p className="text-[14px] font-bold mb-0.5" style={{ color: active.accent }}>
                                {link.label}
                              </p>
                              <p className="text-[12.5px] text-gray-400 leading-snug">{link.desc}</p>
                            </div>
                          </div>
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 border whitespace-nowrap"
                            style={{
                              color: active.accent,
                              background: active.bg,
                              borderColor: `${active.accent}35`,
                            }}>
                            Current page
                          </span>
                        </div>
                      ) : (
                        /* ── Regular link ── */
                        <Link href={link.href}
                          className="group flex items-center justify-between py-4 px-3 gap-4 -mx-3 rounded transition-colors duration-150 hover:bg-[#f5f9ff]">
                          <div className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#dde3ea] group-hover:bg-[#1f6fb2] transition-colors duration-150 mt-[8px] shrink-0" />
                            <div>
                              <p className="text-[14px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors mb-0.5">
                                {link.label}
                              </p>
                              <p className="text-[12.5px] text-gray-400 leading-snug group-hover:text-gray-500 transition-colors">
                                {link.desc}
                              </p>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-[#e5eaf0] group-hover:text-[#1f6fb2] transition-colors shrink-0" />
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="px-8 py-4 border-t border-[#e8eef6] bg-[#fafbfd] flex items-center justify-between gap-4">
                <p className="text-[12px] text-gray-400">
                  <span className="font-semibold text-[#1f3a5f]">{active.links.length} services</span> in {active.category}
                </p>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2 text-[12.5px] font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: active.accent }}>
                  Enquire about {active.category} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Flat chip cloud — all 16 services for quick scanning ── */}
        <motion.div {...fadeUp(0.1)} className="mt-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-3 font-mono">
            Quick access — all services
          </p>
          <div className="flex flex-wrap gap-2">
            {NAV_SERVICES.flatMap((cat) =>
              cat.links.map((link) => {
                const isCurrent = link.href === currentHref;
                return isCurrent ? (
                  <span key={link.href}
                    className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-3 py-1.5 border"
                    style={{ color: cat.accent, background: cat.bg, borderColor: `${cat.accent}40` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.accent }} />
                    {link.label}
                  </span>
                ) : (
                  <Link key={link.href} href={link.href}
                    className="inline-flex items-center text-[11.5px] font-semibold text-gray-600 bg-white border border-[#e8eef6] px-3 py-1.5 hover:border-[#1f6fb2]/40 hover:text-[#1f6fb2] hover:bg-[#f0f7ff] transition-all duration-150">
                    {link.label}
                  </Link>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function ServiceDetailPage() {
  const { accentColor: accent } = SERVICE;
  const [activeStep, setActiveStep] = useState(0);

  const THIS_PAGE_HREF = "/services/web-development/full-stack";

  return (
    <div className="min-h-screen bg-white pt-[80px]">

      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg, #05101f 0%, #0a1e38 50%, #0d2448 100%)" }}>

        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#1f6fb2]/10 blur-[140px]" />
          <div className="absolute -bottom-16 right-0 w-[480px] h-[380px] rounded-full bg-[#0d3a6e]/20 blur-[120px]" />
        </div>
        <div className="absolute right-4 top-0 bottom-0 flex items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.018 }}>
          <span className="text-[320px] lg:text-[380px] font-serif text-white leading-none">01</span>
        </div>

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30 flex-wrap">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            {SERVICE.breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 shrink-0" />
                {crumb.href
                  ? <Link href={crumb.href} className="hover:text-white/60 transition-colors">{crumb.label}</Link>
                  : <span className="text-white/55 font-medium">{crumb.label}</span>}
              </span>
            ))}
          </nav>

          <div className="py-14 lg:py-20 grid lg:grid-cols-[1fr_300px] gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">{SERVICE.eyebrow}</span>
              </div>
              <h1 className="text-[40px] lg:text-[58px] font-serif text-white leading-[1.04] mb-5">{SERVICE.title}</h1>
              <p className="text-[16px] text-white/55 leading-[1.9] max-w-[580px] mb-4">{SERVICE.tagline}</p>
              <p className="text-[14px] text-white/35 leading-[1.85] max-w-[560px] mb-10">{SERVICE.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #7A2E00, #C45500 50%, #FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.35)" }}>
                  Start a free scoping call <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#methodology" onClick={(e) => { e.preventDefault(); document.getElementById("methodology")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[13.5px] font-semibold border border-white/20 text-white/65 hover:border-white/40 hover:text-white transition-all duration-200">
                  How we deliver
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-2">
              {SERVICE.stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="border border-white/8 bg-white/[0.03] px-4 py-5 text-center">
                  <p className="text-[28px] font-light text-white leading-none mb-1.5">{s.val}</p>
                  <p className="text-[9.5px] text-white/30 uppercase tracking-[0.12em] leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-b" style={{ borderColor: "#bfdbfe", background: "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%)" }}>
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#bfdbfe]">
            {SERVICE.outcomes.map((o, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="flex gap-4 px-6 py-7">
                <div className="w-9 h-9 flex items-center justify-center shrink-0"
                  style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
                  <o.icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1f3a5f] mb-1">{o.title}</p>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{o.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


      <section className="bg-white border-b border-[#e8eef6] py-16">
        <div className="max-w-[82rem] mx-auto px-6">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2 font-mono" style={{ color: accent }}>What we build</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight">Six categories of<br />custom software</h2>
              <p className="text-[13.5px] text-gray-400 max-w-xs md:text-right leading-relaxed">Every type available as a standalone build or part of a larger platform engagement.</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE.capabilities.map((cap, i) => (
              <motion.div key={cap.title} {...fadeUp(i * 0.06)}
                className="group relative border border-[#e8eef6] bg-white p-6 hover:border-[#bfdbfe] hover:shadow-md transition-all duration-200 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500" style={{ background: accent }} />
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: `${accent}12` }}>
                  <cap.icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-2.5 group-hover:text-[#1f6fb2] transition-colors">{cap.title}</h3>
                <p className="text-[13px] text-gray-500 leading-[1.8] mb-4">{cap.body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-0.5"
                      style={{ color: accent, background: `${accent}10`, border: `1px solid ${accent}25` }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="methodology" className="border-b border-[#e8eef6] py-16" style={{ background: "#f8fafd" }}>
        <div className="max-w-[82rem] mx-auto px-6">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2 font-mono" style={{ color: accent }}>Our methodology</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f]">How we deliver</h2>
              <p className="text-[13px] text-gray-400 max-w-xs md:text-right">Six phases. Complete transparency at every stage.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
            {/* Step selector — desktop */}
            <div className="hidden lg:flex flex-col">
              {SERVICE.methodology.map((step, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={`relative text-left px-4 py-4 border-l-[3px] transition-all duration-150 ${
                    activeStep === i ? "bg-white border-l-[#1f6fb2]" : "border-l-transparent hover:bg-white/70 hover:border-l-[#1f6fb2]/30"}`}>
                  <span className={`block text-[9.5px] font-bold font-mono mb-0.5 ${activeStep === i ? "text-[#1f6fb2]" : "text-gray-400"}`}>{step.n}</span>
                  <span className={`block text-[13px] font-semibold ${activeStep === i ? "text-[#1f3a5f]" : "text-gray-500"}`}>{step.title}</span>
                  <span className="block text-[10.5px] text-gray-400 mt-0.5">{step.duration}</span>
                </button>
              ))}
            </div>

            {/* Active step — desktop */}
            <AnimatePresence mode="wait">
              <motion.div key={activeStep} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}
                className="hidden lg:block bg-white border border-[#e8eef6] p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center text-white text-[13px] font-bold" style={{ background: accent }}>
                    {SERVICE.methodology[activeStep].n}
                  </div>
                  <div>
                    <p className="text-[18px] font-serif font-bold text-[#1f3a5f]">{SERVICE.methodology[activeStep].title}</p>
                    <p className="text-[11px] text-gray-400">{SERVICE.methodology[activeStep].duration}</p>
                  </div>
                </div>
                <p className="text-[14px] text-gray-600 leading-[1.9] mb-6 max-w-xl">{SERVICE.methodology[activeStep].body}</p>
                <div className="flex items-center gap-3 px-4 py-3 border" style={{ borderColor: `${accent}30`, background: `${accent}08` }}>
                  <FileText className="w-4 h-4 shrink-0" style={{ color: accent }} />
                  <p className="text-[12.5px] font-semibold" style={{ color: accent }}>Deliverable: {SERVICE.methodology[activeStep].deliverable}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile stacked */}
            <div className="lg:hidden space-y-3">
              {SERVICE.methodology.map((step, i) => (
                <motion.div key={i} {...fadeUp(i * 0.05)} className="bg-white border border-[#e8eef6] p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: accent }}>{step.n}</div>
                    <div>
                      <p className="text-[13.5px] font-bold text-[#1f3a5f]">{step.title}</p>
                      <p className="text-[10.5px] text-gray-400">{step.duration}</p>
                    </div>
                  </div>
                  <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3">{step.body}</p>
                  <div className="flex items-center gap-2 px-3 py-2 border" style={{ borderColor: `${accent}30`, background: `${accent}08` }}>
                    <FileText className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
                    <p className="text-[11.5px] font-semibold" style={{ color: accent }}>{step.deliverable}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-[#e8eef6] py-16">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div {...fadeUp()}>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2 font-mono" style={{ color: accent }}>What you receive</p>
              <h2 className="text-[26px] font-serif text-[#1f3a5f] mb-6">Every engagement includes</h2>
              <ul className="space-y-3">
                {SERVICE.deliverables.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accent }} />
                    <span className="text-[13.5px] text-gray-600 leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2 font-mono" style={{ color: accent }}>Technologies we work with</p>
              <h2 className="text-[26px] font-serif text-[#1f3a5f] mb-6">Modern, proven, right-sized</h2>
              <div className="space-y-4">
                {SERVICE.technologies.map((group, i) => (
                  <motion.div key={group.category} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[9.5px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>{group.category}</span>
                      <div className="flex-1 h-px bg-[#f1f5f9]" />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span key={tech} className="text-[11px] font-semibold px-2.5 py-1 border border-[#e8eef6] text-gray-600 bg-[#f8fafc] hover:border-[#1f6fb2]/30 hover:text-[#1f6fb2] hover:bg-[#eff6ff] transition-all duration-150 cursor-default">{tech}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b py-16"
        style={{ borderColor: "#bfdbfe", background: "linear-gradient(135deg, #eff6ff 0%, #e8f3ff 60%, #f5f9ff 100%)" }}>
        <div className="max-w-[82rem] mx-auto px-6">
          <motion.div {...fadeUp()} className="mb-8">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2 font-mono" style={{ color: accent }}>Proof of work</p>
            <h2 className="text-[26px] font-serif text-[#1f3a5f]">Featured engagement</h2>
          </motion.div>
          <motion.div {...fadeUp(0.05)} className="bg-white border border-[#bfdbfe] overflow-hidden">
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55)` }} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px]">
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#e8eef6]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 border"
                    style={{ color: accent, background: `${accent}10`, borderColor: `${accent}30` }}>{SERVICE.caseStudy.tag}</span>
                  <span className="text-[11px] text-gray-400">{SERVICE.caseStudy.industry}</span>
                </div>
                <h3 className="text-[22px] font-serif text-[#1f3a5f] mb-5 leading-snug">{SERVICE.caseStudy.title}</h3>
                <div className="mb-5">
                  <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-2">The challenge</p>
                  <p className="text-[13.5px] text-gray-600 leading-[1.85]">{SERVICE.caseStudy.challenge}</p>
                </div>
                <div className="mb-6">
                  <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-2">The outcome</p>
                  <p className="text-[13.5px] text-gray-600 leading-[1.85]">{SERVICE.caseStudy.outcome}</p>
                </div>
                <Link href="/portfolio" className="inline-flex items-center gap-2 text-[13px] font-bold transition-colors" style={{ color: accent }}>
                  Read the full case study <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-wider mb-5">Results</p>
                  <div className="space-y-5">
                    {SERVICE.caseStudy.metrics.map((m, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="border-l-[3px] pl-4" style={{ borderColor: accent }}>
                        <p className="text-[28px] font-light leading-none mb-1" style={{ color: accent }}>{m.val}</p>
                        <p className="text-[11.5px] text-gray-500">{m.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border" style={{ borderColor: `${accent}25`, background: `${accent}06` }}>
                  <Quote className="w-4 h-4 mb-2" style={{ color: accent }} />
                  <p className="text-[12.5px] text-gray-500 italic leading-relaxed mb-3">
                    "LogicSoft didn't just build what we asked for — they improved on it at every turn. The architecture decisions they made in month one are still serving us two years later."
                  </p>
                  <p className="text-[11px] font-bold text-[#1f3a5f]">Chief Technology Officer</p>
                  <p className="text-[10.5px] text-gray-400">Pan-African logistics platform</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b border-[#e8eef6] py-16">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-14">
            <motion.div {...fadeUp()}>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-3 font-mono" style={{ color: accent }}>Common questions</p>
              <h2 className="text-[26px] font-serif text-[#1f3a5f] mb-4 leading-snug">Before you reach out</h2>
              <p className="text-[13.5px] text-gray-500 leading-relaxed mb-6">Answers to what we hear most often. Still unsure? The scoping call is free.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[13px] font-bold transition-colors" style={{ color: accent }}>
                Ask us directly <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
            <motion.div {...fadeUp(0.1)}>
              {SERVICE.faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} accent={accent} />)}
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesNavigator currentHref={THIS_PAGE_HREF} />

      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #07111f 0%, #0d2448 65%, #0a1830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1f6fb2]/8 blur-[120px] pointer-events-none" />
        <div className="absolute -top-20 left-1/4 w-[400px] h-[300px] rounded-full bg-[#0d3a6e]/12 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/35 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Free · No commitment</span>
              </div>
              <h2 className="text-[32px] lg:text-[44px] font-serif text-white leading-tight mb-4">Ready to scope your project?</h2>
              <p className="text-[14.5px] text-white/45 leading-[1.9] max-w-lg">
                Tell us what you're building. A LogicSoft principal will review your brief and schedule a scoping call — at no cost, with no commitment.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-3 shrink-0">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[14px] font-bold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #7A2E00, #C45500 50%, #FF7A00)", boxShadow: "0 8px 28px rgba(196,85,0,0.4)" }}>
                Start a free scoping call <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/software-development/services"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[13.5px] font-semibold border border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all duration-200">
                Explore all software services
              </Link>
              <p className="text-center text-[11px] text-white/25 mt-1">Typical response within 24 business hours</p>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}