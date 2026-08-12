"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Monitor, Zap, Accessibility, Smartphone, Code2, Layers } from "lucide-react";

// ── Design language: browser / screen / pixel aesthetic
// ── Accent: warm amber #f59e0b — warmth of rendered UI
// ── Signature element: browser chrome mockup in hero, viewport grid cards

const FRAMEWORKS = [
  { name: "React",       version: "18",   desc: "Component architecture",    color: "#61dafb", bg: "#0a0e1a" },
  { name: "Next.js",     version: "14",   desc: "SSR & static generation",   color: "#ffffff", bg: "#000000" },
  { name: "Vue",         version: "3",    desc: "Reactive UI framework",     color: "#42b883", bg: "#1a1a2e" },
  { name: "TypeScript",  version: "5",    desc: "Type-safe development",     color: "#3178c6", bg: "#0d1117" },
  { name: "Tailwind",    version: "3",    desc: "Utility-first CSS",         color: "#38bdf8", bg: "#0f172a" },
  { name: "Framer",      version: "11",   desc: "Production animations",     color: "#ff0050", bg: "#1a0010" },
];

const CAPABILITIES = [
  {
    num: "01",
    icon: Monitor,
    title: "Responsive Web Applications",
    desc: "Pixel-perfect interfaces that work flawlessly across every screen size. We build to a mobile-first strategy with desktop enhancements not the reverse.",
    tags: ["React", "Next.js", "Vue", "Responsive CSS"],
  },
  {
    num: "02",
    icon: Zap,
    title: "Performance Engineering",
    desc: "Core Web Vitals in the green. We optimise bundle sizes, implement code splitting, lazy load assets, and benchmark every release against performance SLAs.",
    tags: ["LCP", "CLS", "FID", "Bundle analysis"],
  },
  {
    num: "03",
    icon: Layers,
    title: "Design Systems & Component Libraries",
    desc: "Scalable, documented component libraries that maintain visual consistency across large products and multiple teams. Built to last, not to patch.",
    tags: ["Storybook", "Figma tokens", "Shadcn/UI", "Radix"],
  },
  {
    num: "04",
    icon: Accessibility,
    title: "Accessibility (WCAG 2.1 AA)",
    desc: "Accessible interfaces aren't optional. We build to WCAG 2.1 AA as a default standard keyboard navigation, screen reader compatibility, contrast ratios.",
    tags: ["WCAG 2.1", "ARIA", "axe-core", "Screen reader testing"],
  },
  {
    num: "05",
    icon: Smartphone,
    title: "Progressive Web Apps",
    desc: "PWAs that work offline, load instantly, and feel native on mobile without the overhead of an app store submission. Service workers, push notifications, install prompts.",
    tags: ["Service Workers", "Web Push", "IndexedDB", "Workbox"],
  },
  {
    num: "06",
    icon: Code2,
    title: "API Integration & State Management",
    desc: "Complex data flows handled cleanly. REST, GraphQL, WebSocket integrations wired to robust state management Redux, Zustand, TanStack Query.",
    tags: ["REST", "GraphQL", "WebSockets", "Zustand", "TanStack"],
  },
];

const PROCESS = [
  { step: "01", title: "UX Audit / Design Handoff",    desc: "We review Figma files, flag design-to-code concerns, and establish a component inventory before writing a line of code."    },
  { step: "02", title: "Component Architecture",        desc: "We architect the component hierarchy, define data flow, and establish naming conventions before sprint 1 begins."          },
  { step: "03", title: "Sprint-by-Sprint Delivery",     desc: "Working, reviewed, and tested components shipped every sprint. Demo every 2 weeks. No black-box development."            },
  { step: "04", title: "Performance & QA Gates",        desc: "Lighthouse CI, bundle size checks, cross-browser testing, and accessibility audits run automatically on every PR."       },
];

const STATS = [
  { value: "100+",  label: "Frontend projects delivered" },
  { value: "<2s",   label: "Target Time to Interactive"  },
  { value: "WCAG",  label: "2.1 AA on every product"     },
  { value: "100%",  label: "Code reviewed"               },
];

// ── Browser chrome mockup ─────────────────────────────────────────────────────
function BrowserMockup() {
  return (
    <div className="w-full max-w-[560px] rounded-none border border-amber-200/20 overflow-hidden shadow-2xl shadow-amber-500/10">
      {/* Chrome bar */}
      <div className="bg-[#1e1e2e] border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 bg-[#2d2d3e] rounded-sm px-3 py-1 mx-2">
          <span className="text-[11px] text-white/40 font-mono">https://yourclient.com</span>
        </div>
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded bg-white/5" />
          <div className="w-5 h-5 rounded bg-white/5" />
        </div>
      </div>

      {/* Page content preview */}
      <div className="bg-[#0f0f1a] p-6 min-h-[260px]">
        {/* Fake nav */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-20 h-4 bg-amber-400/30 rounded-sm" />
          <div className="flex gap-3">
            {[1,2,3,4].map(i => <div key={i} className="w-10 h-2.5 bg-white/10 rounded-sm" />)}
          </div>
        </div>
        {/* Fake hero */}
        <div className="mb-6">
          <div className="w-3/4 h-6 bg-white/15 rounded-sm mb-2" />
          <div className="w-1/2 h-6 bg-amber-400/20 rounded-sm mb-4" />
          <div className="w-full h-2 bg-white/8 rounded-sm mb-1.5" />
          <div className="w-5/6 h-2 bg-white/8 rounded-sm mb-1.5" />
          <div className="w-4/6 h-2 bg-white/8 rounded-sm mb-6" />
          <div className="flex gap-3">
            <div className="w-28 h-9 bg-amber-400/40 rounded-sm" />
            <div className="w-24 h-9 border border-white/20 rounded-sm" />
          </div>
        </div>
        {/* Fake cards */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white/5 border border-white/10 p-3 rounded-sm">
              <div className="w-6 h-6 bg-amber-400/20 rounded-sm mb-2" />
              <div className="w-full h-2 bg-white/15 rounded-sm mb-1" />
              <div className="w-3/4 h-2 bg-white/8 rounded-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-[#1e1e2e] border-t border-white/10 px-4 py-1.5 flex items-center justify-between">
        <span className="text-[10px] font-mono text-green-400">● Compiled in 847ms</span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/30">LCP: 1.2s</span>
          <span className="text-[10px] font-mono text-white/30">CLS: 0.02</span>
          <span className="text-[10px] font-mono text-amber-400">FID: 18ms</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Frontend() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Frontend Development — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/web-development" className="hover:text-[#1f6fb2] transition-colors">Web Development</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Frontend Development</span>
        </nav>
      </div>

      {/* ── HERO — dark, browser aesthetic ── */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0a0e1a 0%, #0f1629 40%, #111827 100%)" }}>

        {/* Dot grid texture */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #f59e0b 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* Amber glow top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full bg-amber-500/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-blue-600/6 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_580px] gap-12 items-center">

            {/* Left */}
            <div>
              {/* Service tag */}
              <div className="inline-flex items-center gap-2 border border-amber-400/30 bg-amber-400/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-[0.16em]">Web Development</span>
              </div>

              <h2 className="text-[42px] lg:text-[56px] font-serif text-white leading-[1.06] mb-5">
                Frontend<br />
                <span style={{ color: "#f59e0b" }}>Development</span>
              </h2>

              <p className="text-[17px] text-white/65 leading-[1.9] max-w-[500px] mb-8">
                High-performance, accessible, and visually precise interfaces. We turn
                Figma files and product requirements into production React applications
                that score green on Core Web Vitals and delight the people who use them.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {STATS.map((s) => (
                  <div key={s.label} className="border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[22px] font-light text-white leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-amber-500 hover:bg-amber-400 transition-all duration-200">
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition-all duration-200">
                  See our work
                </Link>
              </div>
            </div>

            {/* Right — browser mockup */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <BrowserMockup />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── TECH STACK — dark code-card row ── */}
      <div className="bg-[#0d1117] border-b border-white/10">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] whitespace-nowrap">Core stack</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {FRAMEWORKS.map((f) => (
              <div key={f.name} className="group flex flex-col gap-2 border border-white/10 bg-white/3 hover:bg-white/8 hover:border-white/20 transition-all duration-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold" style={{ color: f.color }}>{f.name}</span>
                  <span className="text-[10px] font-mono text-white/20">v{f.version}</span>
                </div>
                <span className="text-[11px] text-white/40 leading-snug">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.16em] mb-4">What we deliver</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Six capabilities. One standard: production-ready.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                Whether you need a component library, a full SPA, or a performance-critical PWA
                our frontend engineers deliver to a single quality bar.
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
                  className="group relative border border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm transition-all duration-200 overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-amber-400 to-amber-200" />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center bg-amber-50 shrink-0">
                        <cap.icon className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-2 leading-snug group-hover:text-amber-600 transition-colors duration-200">{cap.title}</h4>
                    <div className="w-6 h-[2px] bg-amber-400 mb-3 opacity-30 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROCESS — alternating steps with code-line decoration ── */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.16em] mb-4">How we work</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Our frontend delivery process.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.step} className={`group relative p-8 hover:bg-amber-50 transition-colors duration-200 ${i < PROCESS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-amber-400 to-amber-200" />
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-[11px] font-bold font-mono text-amber-500 bg-amber-50 border border-amber-100 px-2 py-0.5">{p.step}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 leading-snug">{p.title}</h4>
                <div className="w-5 h-[2px] bg-amber-400 mb-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED SERVICES ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Also in Web Development</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Backend Development",  href: "/services/web-development/backend",    desc: "APIs, databases, microservices, cloud infrastructure.",    accent: "#10b981" },
              { title: "Full Stack Development",href: "/services/web-development/full-stack", desc: "End-to-end product delivery from UI to data layer.",        accent: "#0891b2" },
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
            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-[0.15em] mb-3">Let's build it</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Your next interface, built to last.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free 30-minute call. We'll review your requirements and tell you exactly how we'd approach your frontend.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-amber-500 hover:bg-amber-400 transition-all duration-200">
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