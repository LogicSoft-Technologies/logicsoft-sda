"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers2, Combine, RefreshCw, BarChart3, Users, ShieldCheck } from "lucide-react";

// ── Design language: two-worlds converging — browser meets server
// ── Accent: cyan #0891b2 — the bridge between front and back
// ── Signature: split hero with browser left / terminal right divided by diagonal

const STACK_LAYERS = [
  {
    side: "UI",
    label: "Presentation Layer",
    color: "#f59e0b",
    darkBg: "#1a1200",
    items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Storybook"],
  },
  {
    side: "API",
    label: "Application Layer",
    color: "#0891b2",
    darkBg: "#001218",
    items: ["Node.js / Express", "GraphQL / REST", "JWT / OAuth2", "Business logic", "Validation"],
  },
  {
    side: "DB",
    label: "Data Layer",
    color: "#10b981",
    darkBg: "#001408",
    items: ["PostgreSQL", "MongoDB", "Redis cache", "Migrations", "Backups"],
  },
  {
    side: "OPS",
    label: "Infrastructure Layer",
    color: "#818cf8",
    darkBg: "#06001a",
    items: ["Docker / K8s", "AWS / GCP", "CI/CD pipeline", "Monitoring", "Auto-scaling"],
  },
];

const CAPABILITIES = [
  {
    num: "01",
    icon: Layers2,
    title: "End-to-End Product Delivery",
    desc: "One team owns the entire stack. No coordination overhead between frontend and backend contractors, no integration surprises late in the project. We ship complete, working products.",
    tags: ["Full lifecycle", "Single team", "Integrated delivery"],
  },
  {
    num: "02",
    icon: Combine,
    title: "Architecture That Fits Your Scale",
    desc: "Monolith for early-stage. Modular monolith as you grow. Microservices when the business genuinely needs them. We match architecture to business reality — not the latest conference talk.",
    tags: ["Monolith", "Modular architecture", "Microservices", "Domain-Driven Design"],
  },
  {
    num: "03",
    icon: RefreshCw,
    title: "Continuous Delivery Pipeline",
    desc: "From day one, we establish CI/CD. Code is tested, built, and deployed automatically. Releases happen multiple times a week, not once a quarter. No manual deployment steps in production.",
    tags: ["GitHub Actions", "Docker", "Zero-downtime deploy", "Blue-green"],
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Security Across Every Layer",
    desc: "Security isn't a backend concern or a frontend concern — it's a full-stack responsibility. Input validation at the edge, JWT at the API, RLS at the database. Defence in depth.",
    tags: ["OWASP", "CSP headers", "RLS", "Secrets management"],
  },
  {
    num: "05",
    icon: BarChart3,
    title: "Observability & Monitoring",
    desc: "You can't improve what you can't see. We instrument every application with structured logging, distributed tracing, and performance monitoring before handing anything to production.",
    tags: ["Prometheus", "Grafana", "Sentry", "OpenTelemetry"],
  },
  {
    num: "06",
    icon: Users,
    title: "Team Continuity & Knowledge Transfer",
    desc: "We document our systems so your team can maintain them without us in the room. Architecture Decision Records, API documentation, runbooks, and onboarding guides — always up to date.",
    tags: ["ADRs", "API docs", "Runbooks", "Full IP transfer"],
  },
];

const ENGAGEMENTS = [
  {
    title: "Greenfield product",
    desc: "You have an idea. We take it from discovery through architecture, design, development, and launch. One team. One accountable relationship.",
    timeframe: "8–24 weeks",
    accentColor: "#0891b2",
    accentBg: "#ecfeff",
  },
  {
    title: "MVP acceleration",
    desc: "You need to validate fast without cutting corners on quality. We scope the minimum viable product, build it lean, and ship it — then evolve it based on real user feedback.",
    timeframe: "4–10 weeks",
    accentColor: "#f59e0b",
    accentBg: "#fffbeb",
  },
  {
    title: "Legacy modernisation",
    desc: "Your existing system needs to be rebuilt or significantly upgraded. We audit, plan the migration, and execute it — while keeping the lights on throughout.",
    timeframe: "12–36 weeks",
    accentColor: "#10b981",
    accentBg: "#ecfdf5",
  },
];

const PROCESS = [
  { step: "01", title: "Discovery & Scoping",      desc: "Requirements, architecture, and technology choices agreed and documented before sprint 1."           },
  { step: "02", title: "Foundation Sprint",         desc: "CI/CD pipeline, auth, data models, and component library established in week one."                  },
  { step: "03", title: "Feature Sprints",           desc: "2-week cycles delivering working software. Full-stack features — UI through API through database."   },
  { step: "04", title: "Launch & Handover",         desc: "Production deployment, monitoring, documentation, and knowledge transfer completed before close."    },
];

// ── Split hero visual ─────────────────────────────────────────────────────────
function SplitPreview() {
  return (
    <div className="w-full max-w-[560px] border border-white/10 overflow-hidden shadow-2xl shadow-cyan-500/10">
      {/* Header */}
      <div className="bg-[#0f1624] border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] font-mono text-white/30">full-stack · logicsoft</span>
        <div className="w-16" />
      </div>

      {/* Split body */}
      <div className="grid grid-cols-2 min-h-[280px]">
        {/* Left — Browser / UI */}
        <div className="bg-[#0f1220] border-r border-white/10 p-4">
          <div className="text-[9px] font-mono text-amber-400/60 mb-3 uppercase tracking-widest">UI Layer</div>
          {/* Fake file tree */}
          <div className="space-y-1.5 mb-4">
            {["components/", "  Button.tsx", "  Card.tsx", "  Modal.tsx", "pages/", "  index.tsx", "  dashboard.tsx"].map((line) => (
              <div key={line} className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono" style={{ color: line.startsWith("  ") ? "#f59e0b80" : "#f59e0b" }}>{line}</span>
              </div>
            ))}
          </div>
          {/* Fake component preview */}
          <div className="border border-amber-400/15 bg-amber-400/5 p-2.5 rounded-sm">
            <div className="w-3/4 h-2 bg-amber-400/30 rounded-sm mb-1.5" />
            <div className="flex gap-1.5 mb-1.5">
              <div className="w-1/2 h-1.5 bg-white/10 rounded-sm" />
              <div className="w-1/3 h-1.5 bg-white/10 rounded-sm" />
            </div>
            <div className="w-16 h-5 bg-amber-400/40 rounded-sm" />
          </div>
        </div>

        {/* Right — Terminal / API */}
        <div className="bg-[#070f07] p-4">
          <div className="text-[9px] font-mono text-emerald-400/60 mb-3 uppercase tracking-widest">API Layer</div>
          <div className="space-y-1 font-mono text-[10px]">
            {[
              { t: "GET  /api/v1/users",    c: "#60a5fa" },
              { t: "● 200 OK  12ms",        c: "#10b981" },
              { t: "POST /api/v1/orders",   c: "#60a5fa" },
              { t: "● 201 Created  28ms",   c: "#10b981" },
              { t: "GET  /api/v1/stats",    c: "#60a5fa" },
              { t: "● 200 OK  8ms",         c: "#10b981" },
            ].map((l, i) => (
              <div key={i} style={{ color: l.c }}>{l.t}</div>
            ))}
          </div>
          <div className="mt-4 border border-emerald-500/20 bg-emerald-500/5 p-2.5 rounded-sm">
            <div className="text-[9px] font-mono text-emerald-400/60 mb-1.5">DB QUERY</div>
            <div className="text-[10px] font-mono text-emerald-300/70">SELECT * FROM orders</div>
            <div className="text-[10px] font-mono text-emerald-300/70">WHERE status = 'pending'</div>
            <div className="text-[9px] font-mono text-emerald-400/40 mt-1.5">→ 847 rows · 4ms</div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="bg-[#0891b2] px-4 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-white">FULL STACK · CONNECTED</span>
        <span className="text-[10px] font-mono text-white/70">Build #247 · All checks passed ✓</span>
      </div>
    </div>
  );
}

// ── Stack layer diagram ───────────────────────────────────────────────────────
function StackDiagram() {
  return (
    <div className="flex flex-col gap-1">
      {STACK_LAYERS.map((layer, i) => (
        <div key={layer.side}
          className="group flex items-stretch overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
        >
          {/* Side label */}
          <div className="shrink-0 w-14 flex items-center justify-center text-[11px] font-bold font-mono" style={{ background: layer.darkBg, color: layer.color }}>
            {layer.side}
          </div>
          {/* Layer name */}
          <div className="shrink-0 w-[180px] px-5 py-3 border-r border-gray-100 bg-[#f9fafb] flex items-center">
            <span className="text-[12px] font-bold text-[#1f3a5f]">{layer.label}</span>
          </div>
          {/* Tech items */}
          <div className="flex items-center flex-wrap gap-2 px-5 py-3 flex-1">
            {layer.items.map((item) => (
              <span key={item} className="text-[11px] font-semibold px-2.5 py-0.5 border" style={{ background: layer.darkBg + "18", color: layer.color, borderColor: layer.color + "30" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FullStack() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Full Stack Development — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/web-development" className="hover:text-[#1f6fb2] transition-colors">Web Development</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Full Stack Development</span>
        </nav>
      </div>

      {/* ── HERO — split dual aesthetic ── */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #040c18 0%, #071220 50%, #080e08 100%)" }}>

        {/* Cross-hatch texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(45deg, rgba(8,145,178,0.8) 1px, transparent 1px), linear-gradient(-45deg, rgba(8,145,178,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

        {/* Cyan glow centre */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-cyan-600/6 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_580px] gap-12 items-center">

            <div>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.16em]">Web Development</span>
              </div>

              <h2 className="text-[42px] lg:text-[56px] font-serif text-white leading-[1.06] mb-5">
                Full Stack<br />
                <span style={{ color: "#0891b2" }}>Development</span>
              </h2>

              <p className="text-[17px] text-white/65 leading-[1.9] max-w-[500px] mb-8">
                One team. Every layer. UI through database through infrastructure.
                We deliver complete, production-ready products with a single accountable
                engineering partner — no coordination overhead, no integration surprises.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { value: "4",    label: "Stack layers owned"       },
                  { value: "1",    label: "Accountable team"         },
                  { value: "2wk",  label: "Sprint cadence"           },
                  { value: "100%", label: "IP yours at completion"   },
                ].map((s) => (
                  <div key={s.label} className="border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
                    <p className="text-[22px] font-light text-cyan-400 leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all duration-200">
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  See our work
                </Link>
              </div>
            </div>

            {/* Split preview */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <SplitPreview />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STACK DIAGRAM ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.16em] mb-3">Technology stack</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">Every layer. Owned by one team.</h3>
          <StackDiagram />
        </div>
      </div>

      {/* ── ENGAGEMENT TYPES ── */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.16em] mb-4">Engagement types</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-10">Full stack for every starting point.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {ENGAGEMENTS.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 overflow-hidden"
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${e.accentColor}, ${e.accentColor}44)` }} />
                <div className="p-7">
                  <div className="inline-flex items-center gap-1.5 mb-4 text-[10px] font-bold uppercase tracking-[0.12em] px-2 py-1" style={{ background: e.accentBg, color: e.accentColor }}>
                    <span>{e.timeframe}</span>
                  </div>
                  <h4 className="text-[18px] font-serif font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors">{e.title}</h4>
                  <div className="w-7 h-[2px] mb-4 opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" style={{ background: e.accentColor }} />
                  <p className="text-[13.5px] text-gray-500 leading-[1.85]">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.16em] mb-4">What we deliver</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Six capabilities across the full stack.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                End-to-end ownership means every capability is designed to work together —
                no seams, no surprises, no blame between teams.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="group relative border border-gray-200 bg-white hover:border-cyan-200 hover:shadow-sm transition-all duration-200 overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-500 to-cyan-200" />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center bg-cyan-50 shrink-0">
                        <cap.icon className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-2 leading-snug group-hover:text-cyan-700 transition-colors duration-200">{cap.title}</h4>
                    <div className="w-6 h-[2px] bg-cyan-500 mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-cyan-50 text-cyan-700 border border-cyan-100">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.16em] mb-4">How we work</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Our full stack delivery process.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`group relative p-8 hover:bg-cyan-50 transition-colors duration-200 ${i < PROCESS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-500 to-cyan-200" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono text-cyan-600 bg-cyan-50 border border-cyan-100 px-2 py-0.5">{p.step}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 leading-snug">{p.title}</h4>
                <div className="w-5 h-[2px] bg-cyan-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Explore by specialty</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Frontend Development", href: "/services/web-development/frontend", desc: "React, Next.js, PWAs, design systems, WCAG 2.1 AA.", accent: "#f59e0b" },
              { title: "Backend Development",  href: "/services/web-development/backend",  desc: "APIs, databases, microservices, cloud infrastructure.", accent: "#10b981" },
            ].map((s) => (
              <Link key={s.title} href={s.href}
                className="group flex items-center justify-between gap-4 border border-gray-200 bg-[#f9fafb] hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 px-6 py-5"
              >
                <div>
                  <div className="w-2 h-2 rounded-full mb-2" style={{ background: s.accent }} />
                  <p className="text-[15px] font-bold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">{s.title}</p>
                  <p className="text-[12.5px] text-gray-400 mt-0.5">{s.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1f6fb2] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.15em] mb-3">Build with us</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">One team. Every layer. Zero handoff friction.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free discovery call. We'll scope your product and propose an architecture suited to your scale.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all duration-200">
              Start a project <ArrowRight className="w-4 h-4" />
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