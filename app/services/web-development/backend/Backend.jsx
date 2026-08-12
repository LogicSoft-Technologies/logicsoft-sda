"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Server, Database, Shield, GitBranch, Cpu, Cloud } from "lucide-react";

// ── Design language: server room / terminal / pipeline aesthetic
// ── Accent: emerald green #10b981 — the colour of live terminal output
// ── Signature: animated terminal block in hero, pipeline flow steps

const STACK = [
  { name: "Node.js",    tag: "Runtime",     color: "#68a063", bg: "#0a1a0e" },
  { name: "Python",     tag: "Runtime",     color: "#f7c948", bg: "#1a1600" },
  { name: "PostgreSQL", tag: "Database",    color: "#336791", bg: "#080d1a" },
  { name: "MongoDB",    tag: "Database",    color: "#47a248", bg: "#080f0a" },
  { name: "Redis",      tag: "Cache",       color: "#dc382d", bg: "#1a0606" },
  { name: "GraphQL",    tag: "API layer",   color: "#e535ab", bg: "#1a0013" },
  { name: "Docker",     tag: "Container",   color: "#0db7ed", bg: "#001824" },
  { name: "Kubernetes", tag: "Orchestration",color: "#326ce5", bg: "#00041a" },
];

const CAPABILITIES = [
  {
    num: "01",
    icon: Server,
    title: "REST & GraphQL API Development",
    desc: "Well-documented, versioned, and performant APIs built to the standards your frontend and mobile teams expect. OpenAPI specifications, rate limiting, and auth handled correctly.",
    tags: ["REST", "GraphQL", "OpenAPI 3.0", "JWT", "OAuth2"],
  },
  {
    num: "02",
    icon: Database,
    title: "Database Architecture & Optimisation",
    desc: "Schema design, query optimisation, indexing strategies, and migration planning for both relational (PostgreSQL, MySQL) and non-relational (MongoDB, Redis) systems.",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Query planning", "Migrations"],
  },
  {
    num: "03",
    icon: GitBranch,
    title: "Microservices & Event-Driven Architecture",
    desc: "Domain-driven decomposition of monoliths into independently deployable services. Event buses, message queues, and service mesh configuration designed for operational simplicity.",
    tags: ["Kafka", "RabbitMQ", "gRPC", "Domain-Driven Design"],
  },
  {
    num: "04",
    icon: Shield,
    title: "Security-First Engineering",
    desc: "OWASP Top 10 addressed at the architecture layer, not patched in later. Input validation, parameterised queries, secrets management, and dependency scanning on every build.",
    tags: ["OWASP Top 10", "SAST", "Secrets rotation", "Vault"],
  },
  {
    num: "05",
    icon: Cloud,
    title: "Cloud Infrastructure & Serverless",
    desc: "AWS, Azure, and GCP deployments designed for scale and cost efficiency. Serverless functions for event-driven workloads. Infrastructure-as-code with Terraform and Pulumi.",
    tags: ["AWS", "Azure", "GCP", "Terraform", "Lambda", "Cloud Run"],
  },
  {
    num: "06",
    icon: Cpu,
    title: "Performance & Scalability Engineering",
    desc: "Load testing against production-representative workloads before go-live. Horizontal scaling strategies, connection pooling, caching layers, and CDN integration.",
    tags: ["k6", "Artillery", "Connection pooling", "Cache layers"],
  },
];

const PROCESS = [
  { step: "01", title: "Domain Modelling",       desc: "We map your business domain into data models, service boundaries, and API contracts before writing code."               },
  { step: "02", title: "Architecture Review",    desc: "Technology choices, database design, and infrastructure architecture reviewed and documented as ADRs."                  },
  { step: "03", title: "TDD Delivery",           desc: "Test-Driven Development as standard. Unit, integration, and contract tests written alongside every feature."            },
  { step: "04", title: "CI/CD & Observability",  desc: "Automated pipelines, structured logging, distributed tracing, and alerting configured before production launch."        },
];

// ── Terminal block component ──────────────────────────────────────────────────
function TerminalBlock() {
  const lines = [
    { prefix: "$",    text: "npm run build:api",                               color: "text-green-400" },
    { prefix: ">",    text: "Building production bundle...",                   color: "text-white/50"  },
    { prefix: ">",    text: "Running security scan (OWASP)... ✓",             color: "text-white/50"  },
    { prefix: ">",    text: "Running test suite (847 tests)...",               color: "text-white/50"  },
    { prefix: "✓",    text: "All tests passed  0 failures",                   color: "text-green-400" },
    { prefix: ">",    text: "Building Docker image logicsoft/api:v3.2.1...",   color: "text-white/50"  },
    { prefix: "✓",    text: "Image built (128MB compressed)",                 color: "text-green-400" },
    { prefix: ">",    text: "Pushing to registry...",                          color: "text-white/50"  },
    { prefix: "✓",    text: "Deploying to production cluster",                color: "text-green-400" },
    { prefix: "✓",    text: "Health checks passing  /api/health 200 OK",      color: "text-emerald-300"},
    { prefix: "$",    text: "_",                                               color: "text-green-400", blink: true },
  ];

  return (
    <div className="w-full max-w-[560px] border border-green-500/20 overflow-hidden shadow-2xl shadow-green-500/10">
      {/* Terminal header */}
      <div className="bg-[#0a0f0a] border-b border-green-500/15 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[11px] font-mono text-green-500/60 ml-2">bash — logicsoft-api — 80×24</span>
        <div className="ml-auto flex gap-2">
          <div className="w-4 h-4 border border-green-500/20" />
          <div className="w-4 h-4 border border-green-500/20" />
        </div>
      </div>

      {/* Terminal body */}
      <div className="bg-[#080e08] px-5 py-5 font-mono text-[12.5px] space-y-1 min-h-[280px]">
        <div className="text-green-500/40 text-[11px] mb-3">Last login: Mon Feb 24 09:12:44 on ttys001</div>
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.18, duration: 0.15 }}
            className={`flex gap-2 ${l.color}`}
          >
            <span className="shrink-0 w-4 text-right">{l.prefix}</span>
            <span className={l.blink ? "border-r border-green-400 pr-0.5 animate-pulse" : ""}>{l.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Status bar */}
      <div className="bg-[#0a0f0a] border-t border-green-500/15 px-4 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-mono text-green-500/60">● CONNECTED  prod-cluster-01</span>
        <div className="flex gap-4">
          <span className="text-[10px] font-mono text-white/20">CPU: 12%</span>
          <span className="text-[10px] font-mono text-white/20">MEM: 2.1GB</span>
          <span className="text-[10px] font-mono text-green-400">p99: 84ms</span>
        </div>
      </div>
    </div>
  );
}

// ── Pipeline flow component ───────────────────────────────────────────────────
function PipelineFlow() {
  const nodes = [
    { label: "Client Request", sub: "HTTPS / gRPC",     color: "#60a5fa" },
    { label: "API Gateway",    sub: "Auth · Rate limit", color: "#10b981" },
    { label: "Service Layer",  sub: "Business logic",    color: "#10b981" },
    { label: "Data Layer",     sub: "DB · Cache · Queue",color: "#10b981" },
    { label: "Response",       sub: "JSON / Stream",     color: "#60a5fa" },
  ];

  return (
    <div className="flex items-center gap-0 overflow-x-auto pb-2">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center shrink-0">
            <div className="border border-gray-200 bg-white px-4 py-3 text-center min-w-[110px] group hover:border-emerald-300 transition-colors duration-200">
              <div className="w-1.5 h-1.5 rounded-full mx-auto mb-2" style={{ background: node.color }} />
              <p className="text-[12px] font-bold text-[#1f3a5f]">{node.label}</p>
              <p className="text-[10px] text-gray-400">{node.sub}</p>
            </div>
          </div>
          {i < nodes.length - 1 && (
            <div className="flex items-center shrink-0 mx-1">
              <div className="w-6 h-px bg-gray-300" />
              <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent" style={{ borderLeftColor: "#d1d5db" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Backend() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Backend Development — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/web-development" className="hover:text-[#1f6fb2] transition-colors">Web Development</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Backend Development</span>
        </nav>
      </div>

      {/* ── HERO — dark terminal aesthetic ── */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #030a03 0%, #050f05 40%, #0a0f0a 100%)" }}>

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Green glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-emerald-500/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-blue-700/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_580px] gap-12 items-center">

            <div>
              {/* Service tag */}
              <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.16em]">Web Development</span>
              </div>

              <h2 className="text-[42px] lg:text-[56px] font-serif text-white leading-[1.06] mb-5">
                Backend<br />
                <span style={{ color: "#10b981" }}>Development</span>
              </h2>

              <p className="text-[17px] text-white/65 leading-[1.9] max-w-[500px] mb-8">
                Scalable APIs, battle-tested database architecture, and production-grade
                infrastructure. We engineer the systems your product runs on invisible
                to users, unbreakable under load.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { value: "99.9%", label: "Uptime SLA" },
                  { value: "p99",   label: "< 100ms API response" },
                  { value: "OWASP", label: "Top 10 by default" },
                  { value: "TDD",   label: "Test-driven delivery" },
                ].map((s) => (
                  <div key={s.label} className="border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
                    <p className="text-[22px] font-light text-emerald-400 leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-200">
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  See our work
                </Link>
              </div>
            </div>

            {/* Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <TerminalBlock />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STACK GRID — dark pill grid ── */}
      <div className="bg-[#060a06] border-b border-white/8">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] whitespace-nowrap">Technology stack</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {STACK.map((s) => (
              <div key={s.name} className="group flex flex-col gap-1.5 border border-white/8 bg-white/2 hover:bg-white/6 hover:border-white/16 transition-all duration-200 p-3.5">
                <span className="text-[13.5px] font-bold" style={{ color: s.color }}>{s.name}</span>
                <span className="text-[10px] text-white/30">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── REQUEST PIPELINE ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.16em] mb-3">Architecture</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">How every request flows through our systems.</h3>
          <PipelineFlow />
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.16em] mb-4">What we build</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Six capabilities. One guarantee: it won't go down.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                Every backend system we deliver is designed for the load it will realistically face
                plus the load it might face when things go unexpectedly well.
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
                  className="group relative border border-gray-200 bg-white hover:border-emerald-200 hover:shadow-sm transition-all duration-200 overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-emerald-200" />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center bg-emerald-50 shrink-0">
                        <cap.icon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-2 leading-snug group-hover:text-emerald-700 transition-colors duration-200">{cap.title}</h4>
                    <div className="w-6 h-[2px] bg-emerald-500 mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100">{t}</span>
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
          <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.16em] mb-4">How we work</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Our backend delivery process.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`group relative p-8 hover:bg-emerald-50 transition-colors duration-200 ${i < PROCESS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-emerald-200" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5">{p.step}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 leading-snug">{p.title}</h4>
                <div className="w-5 h-[2px] bg-emerald-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Also in Web Development</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Frontend Development",  href: "/services/web-development/frontend",    desc: "React, Next.js, PWAs, design systems, WCAG 2.1 AA.", accent: "#f59e0b" },
              { title: "Full Stack Development", href: "/services/web-development/full-stack",  desc: "End-to-end product delivery from UI to infrastructure.", accent: "#0891b2" },
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
            <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.15em] mb-3">Let's build it</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">The engine room of your product, engineered properly.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free call with one of our backend architects. We'll review your requirements and propose the right stack.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-200">
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/web-development/full-stack" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              View full stack →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}