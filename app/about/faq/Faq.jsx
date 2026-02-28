"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Search, X } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  // Services
  {
    id: 1, category: "Services",
    q: "What software development services does Logicsoft offer?",
    a: "We offer full-stack web development, native and cross-platform mobile development, cloud engineering, DevOps and CI/CD pipeline implementation, cybersecurity services (penetration testing, SIEM, compliance), data analytics platforms, and long-term support retainers. We cover the entire software development lifecycle — from discovery and architecture to deployment and post-launch support.",
    related: ["/services", "/about/software-approach"],
  },
  {
    id: 2, category: "Services",
    q: "Do you build mobile apps?",
    a: "Yes. We build iOS apps in Swift/SwiftUI, Android apps in Kotlin, and cross-platform apps using React Native and Flutter. We advise on the right approach based on your target audience, performance requirements, and budget. Cross-platform is cost-effective for most use cases; native is recommended when you need deep OS integration or maximum performance.",
    related: ["/services/mobile-apps"],
  },
  {
    id: 3, category: "Services",
    q: "Do you offer cybersecurity services?",
    a: "Yes. Our security practice covers penetration testing (web, mobile, network, API), SIEM implementation and management, compliance consulting (ISO 27001, NDPR, GDPR, PCI DSS, HIPAA), vulnerability assessment, security architecture review, and security testing integrated into development projects. We have a dedicated security team separate from our development teams.",
    related: ["/services/security/cyber-security"],
  },
  {
    id: 4, category: "Services",
    q: "Can you work with our existing in-house team?",
    a: "Absolutely. Team extension is one of our most common engagement types. We embed senior engineers into your existing workflow, using your tools, processes, and communication channels. We don't require you to change how you work — we adapt to you.",
    related: ["/about/where-to-start"],
  },

  // Process & Methodology
  {
    id: 5, category: "Process",
    q: "How do you manage projects?",
    a: "We use Agile delivery with 2-week sprints. Every sprint starts with planning, ends with a demo and retrospective, and produces working, deployable software. You receive weekly progress reports, have access to our project management tools, and can attend sprint ceremonies. We maintain a risk register, change log, and decision record throughout.",
    related: ["/about/software-approach", "/how-we-work/project-management"],
  },
  {
    id: 6, category: "Process",
    q: "What happens during the discovery phase?",
    a: "Discovery is a structured 1–2 week engagement where we deeply understand your business goals, existing systems, user needs, technical constraints, and regulatory requirements. We produce a validated requirements document, user journey maps, technical feasibility assessment, and a risk register. This phase prevents the most expensive problem in software: building the wrong thing.",
    related: ["/about/software-approach"],
  },
  {
    id: 7, category: "Process",
    q: "How do you handle changing requirements mid-project?",
    a: "Under our T&M model, scope changes are handled at sprint boundaries — you simply re-prioritise the backlog. Under Fixed Price, changes go through a formal change control process: we assess impact, provide a revised estimate, and get written approval before proceeding. We document every scope change. Nothing is implemented without a record.",
    related: ["/about/price-models", "/how-we-work/change-requests"],
  },
  {
    id: 8, category: "Process",
    q: "Do you write documentation?",
    a: "Yes — always. We maintain Architecture Decision Records (ADRs), API documentation, infrastructure runbooks, deployment guides, and code-level documentation as part of every project. Documentation is not an optional deliverable; it's a project requirement. We will not hand over a system without comprehensive documentation.",
    related: ["/how-we-work/reporting"],
  },

  // Pricing & Contracts
  {
    id: 9, category: "Pricing",
    q: "What pricing models do you offer?",
    a: "We offer four engagement models: Fixed Price (agreed scope, agreed cost), Time & Materials (flexible scope, billed on actual hours), Dedicated Team (a full embedded engineering team), and Support Retainer (monthly hours block for ongoing maintenance). Hybrid models are also available — for example, Fixed Price Phase 1 followed by T&M for ongoing development.",
    related: ["/about/price-models"],
  },
  {
    id: 10, category: "Pricing",
    q: "Do you provide cost estimates before starting?",
    a: "Yes. Every project starts with a proposal that includes a detailed cost breakdown, phased milestones, team composition, and delivery timeline. For Fixed Price engagements, this is a firm quote. For T&M engagements, we provide a budget range based on estimated effort. There are no hidden fees — our rate cards are provided upfront.",
    related: ["/about/price-models", "/how-we-work/estimate"],
  },
  {
    id: 11, category: "Pricing",
    q: "Is there a minimum project size?",
    a: "For Fixed Price and T&M projects, our minimum engagement is typically 4 weeks. For Dedicated Team engagements, we recommend a minimum 3-month commitment to make onboarding worthwhile. For Support Retainers, minimum commitment is 3 months. We can accommodate smaller one-off projects on a case-by-case basis.",
    related: ["/about/price-models"],
  },
  {
    id: 12, category: "Pricing",
    q: "Do you sign NDAs?",
    a: "Yes, always. We sign a mutual NDA before any substantive project discussion that involves proprietary information, business strategy, or technical IP. We also sign IP assignment agreements at the start of every project, confirming that all deliverables belong to you on completion.",
    related: [],
  },

  // Quality & Security
  {
    id: 13, category: "Quality",
    q: "How do you ensure software quality?",
    a: "We follow a shift-left testing strategy: testing starts at requirements, not after the build. We implement automated unit, integration, and end-to-end tests. Code review is mandatory on every pull request — no exception. CI/CD pipelines include automated security scanning, performance benchmarking, and test suite execution. We don't merge code that breaks tests.",
    related: ["/about/quality", "/about/software-approach"],
  },
  {
    id: 14, category: "Quality",
    q: "What security standards do you build to?",
    a: "We engineer against OWASP Top 10 as a baseline on every web and mobile project. For regulated industries, we build to PCI DSS, HIPAA, ISO 27001, NDPR, GDPR, and sector-specific standards as applicable. Security architecture reviews and threat modelling are part of our Phase 2 architecture process, not an afterthought.",
    related: ["/services/security/cyber-security"],
  },
  {
    id: 15, category: "Quality",
    q: "Do you test for accessibility?",
    a: "Yes. WCAG 2.1 AA compliance is a default requirement on all client-facing products. We test with screen readers, keyboard navigation, colour contrast tools, and on low-bandwidth network profiles representative of our African and MENA markets. Accessibility is not optional — it's an engineering requirement.",
    related: ["/about/sustainability-policy"],
  },

  // Delivery & Support
  {
    id: 16, category: "Delivery",
    q: "How quickly can you start a project?",
    a: "For most engagements, we can begin within 1–2 weeks of proposal acceptance. Team extension engagements — where we embed engineers into your existing team — can begin in as little as 5 business days. The timeline depends on team composition requirements and any specific onboarding your systems require.",
    related: ["/about/where-to-start"],
  },
  {
    id: 17, category: "Delivery",
    q: "Who owns the code and IP?",
    a: "You do — fully and permanently. All source code, design assets, documentation, and any other deliverables are transferred to you on project completion. We sign IP assignment agreements before work starts. We do not retain any licence, usage rights, or claims over anything we build for you.",
    related: ["/about/sustainability-policy"],
  },
  {
    id: 18, category: "Delivery",
    q: "What happens after my project launches?",
    a: "We offer structured post-launch support via our Support Retainer model: a fixed monthly hours block covering incident management (L1–L3), performance monitoring, security patching, and continuous improvement. We also offer a standard 30-day stabilisation period after every Fixed Price project launch at no additional cost.",
    related: ["/about/price-models"],
  },
  {
    id: 19, category: "Delivery",
    q: "Can you maintain software that another company built?",
    a: "Yes. We regularly take over maintenance of systems built by other vendors. We begin with a Technical Audit — a structured review of the codebase, architecture, infrastructure, and documentation — to establish a baseline. We then propose a stabilisation plan before committing to ongoing maintenance.",
    related: ["/about/where-to-start"],
  },

  // Company
  {
    id: 20, category: "Company",
    q: "Where is Logicsoft based?",
    a: "We are headquartered in Lagos, Nigeria, with delivery capacity across West Africa, East Africa, the Middle East, and Europe. Our engineering teams work in overlapping time zones covering GMT+0 to GMT+4, enabling real-time collaboration with clients across Africa, the UK, and the UAE.",
    related: ["/about/location"],
  },
  {
    id: 21, category: "Company",
    q: "Do you work with startups or only enterprises?",
    a: "Both. We have dedicated pathways for early-stage startups (lean scoping, phased budgets, MVP-first approach) and enterprise clients (governance, compliance, multi-team delivery, regulatory reporting). Our most common client profile is a Series A–C funded startup or a mid-market enterprise in a regulated industry.",
    related: ["/about/where-to-start"],
  },
  {
    id: 22, category: "Company",
    q: "Can I see examples of your previous work?",
    a: "Yes. Our portfolio includes case studies across FinTech, Healthcare, E-Commerce, Logistics, and Public Sector. Some clients have requested confidentiality on project details, but we can share relevant case studies under NDA. Visit our Portfolio page or speak to our team for domain-specific examples.",
    related: ["/portfolio"],
  },
];

const CATEGORIES = ["All", "Services", "Process", "Pricing", "Quality", "Delivery", "Company"];

// ── Sub-components ────────────────────────────────────────────────────────────
function FaqCard({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={`bg-white border transition-all duration-200 ${open ? "border-[#1f6fb2] shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
    >
      {/* Top accent */}
      {open && <div className="h-[3px] bg-gradient-to-r from-[#1f6fb2] to-[#6db3f2]" />}

      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <span className="shrink-0 text-[10px] font-mono text-gray-300 tracking-widest mt-1">
            {String(item.id).padStart(2, "0")}
          </span>
          <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${open ? "text-[#1f6fb2]" : "text-[#1f3a5f]"}`}>
            {item.q}
          </span>
        </div>
        <span className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-200 mt-0.5 ${open ? "border-[#1f6fb2] bg-[#1f6fb2] text-white rotate-180" : "border-gray-200 text-gray-400"}`}>
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-[3.5rem]">
              <div className="w-8 h-px bg-[#1f6fb2] mb-4" />
              <p className="text-[14px] text-gray-500 leading-[1.9] mb-4">{item.a}</p>
              {item.related.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wide mr-1 self-center">Related:</span>
                  {item.related.map((r) => (
                    <Link key={r} href={r} className="text-[11.5px] font-semibold text-[#1f6fb2] border border-[#1f6fb2]/30 bg-[#eaf4ff] px-2.5 py-1 hover:bg-[#1f6fb2] hover:text-white transition-all duration-150">
                      {r.split("/").filter(Boolean).join(" / ")} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let items = FAQ_ITEMS;
    if (activeCategory !== "All") items = items.filter((i) => i.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter((i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, query]);

  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Frequently Asked Questions — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">FAQ</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Got questions?</p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                Frequently Asked<br className="hidden lg:block" />
                <span className="text-[#1f6fb2]">Questions.</span>
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[580px]">
                {FAQ_ITEMS.length} questions answered across services, process, pricing, quality, delivery, and more.
                Can't find what you're looking for? Our team responds within 2 business hours.
              </p>
            </div>

            {/* Stats */}
            <div className="shrink-0 grid grid-cols-2 gap-3">
              {[
                { value: String(FAQ_ITEMS.length), label: "Questions answered"  },
                { value: "6",                      label: "Topic categories"    },
                { value: "2hr",                    label: "Response time"       },
                { value: "Free",                   label: "Discovery call"      },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 px-5 py-4 min-w-[130px]">
                  <p className="text-[30px] font-light text-[#1f3a5f] leading-none mb-1">{s.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="sticky top-[64px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[82rem] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">

            {/* Search */}
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full h-[54px] pl-10 pr-10 text-[13.5px] text-gray-700 placeholder:text-gray-400 bg-transparent outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const count = cat === "All" ? FAQ_ITEMS.length : FAQ_ITEMS.filter((i) => i.category === cat).length;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 h-[54px] text-[12.5px] font-semibold border-b-[3px] transition-all duration-200 whitespace-nowrap ${
                      activeCategory === cat
                        ? "border-[#1f6fb2] text-[#1f6fb2]"
                        : "border-transparent text-gray-500 hover:text-[#1f3a5f]"
                    }`}
                  >
                    {cat} <span className="text-[10px] text-gray-300 ml-0.5">({count})</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[82rem] mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12">

          {/* Sidebar — category stats */}
          <div className="hidden lg:block">
            <div className="sticky top-[140px]">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-5">Browse by topic</p>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => {
                  const count = cat === "All" ? FAQ_ITEMS.length : FAQ_ITEMS.filter((i) => i.category === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      className={`flex items-center justify-between px-4 py-3 text-left border transition-all duration-150 ${
                        isActive
                          ? "border-[#1f6fb2] bg-[#eaf4ff] text-[#1f6fb2]"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      <span className="text-[13.5px] font-semibold">{cat}</span>
                      <span className={`text-[11px] font-bold tabular-nums ${isActive ? "text-[#1f6fb2]" : "text-gray-300"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 border border-gray-200 bg-[#f9fafb] p-5">
                <p className="text-[12.5px] font-bold text-[#1f3a5f] mb-1.5">Still have questions?</p>
                <p className="text-[12px] text-gray-400 mb-4 leading-relaxed">Our team responds within 2 business hours.</p>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1f6fb2] hover:underline underline-offset-2">
                  Talk to us <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ list */}
          <div>
            {/* Meta */}
            <div className="flex items-center gap-3 mb-7">
              <p className="text-[12px] text-gray-400">
                Showing <span className="font-bold text-[#1f3a5f]">{filtered.length}</span> question{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && <> in <span className="text-[#1f6fb2] font-semibold">{activeCategory}</span></>}
                {query && <> matching <span className="text-[#1f6fb2] font-semibold">"{query}"</span></>}
              </p>
              {(activeCategory !== "All" || query) && (
                <button onClick={() => { setActiveCategory("All"); setQuery(""); }} className="text-[11.5px] text-gray-400 hover:text-[#1f6fb2] underline underline-offset-2">
                  Clear filters
                </button>
              )}
            </div>

            <motion.div layout className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <FaqCard key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <p className="text-[15px] text-gray-400 mb-2">No questions match your search.</p>
                <button onClick={() => { setActiveCategory("All"); setQuery(""); }} className="text-[13px] font-semibold text-[#1f6fb2] hover:underline">
                  Clear and browse all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-[82rem] mx-auto px-4 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-bold text-[#1f3a5f] mb-0.5">Your question isn't here?</p>
            <p className="text-[13px] text-gray-400">Book a free 30-minute call. No commitment, no sales pitch — just answers.</p>
          </div>
          <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 bg-[#1f3a5f] text-white text-[13px] font-bold px-7 py-3.5 hover:bg-[#1f6fb2] transition-all duration-200">
            Book a free call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Dark CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">Ready to start?</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Let's talk about your project.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">
              Every engagement starts with a free 30-minute discovery call. No obligation, no pressure — just a conversation about what you're building and whether we're the right team to help.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Book a free call <ArrowRight className="w-4 h-4" />
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