"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Users, FileText, Map, Lightbulb,
  MessageSquare, CheckCircle2, ChevronRight, Clock
} from "lucide-react";

// ── Design: Warm editorial / premium consulting firm aesthetic.
//    Burgundy #b45309 with warm cream undertones. Whitepaper-like editorial layout.
//    Feels like a Partner's office, not a startup landing page.

const ENGAGEMENT_TYPES = [
  {
    icon: Map,
    title: "Technology Strategy",
    accent: "#b45309",
    bg: "#fffbeb",
    desc: "We work with your leadership team to build a multi-year technology roadmap aligned to your business strategy. Architecture decisions, platform choices, and build-vs-buy analysis made with full context.",
    includes: ["Technology audit and maturity assessment","Competitive landscape analysis","Multi-year roadmap with investment phasing","Platform selection and vendor evaluation","Board-ready technology strategy document"],
    ideal: "CEOs, CTOs, and Boards making technology investment decisions.",
  },
  {
    icon: FileText,
    title: "Architecture Review",
    accent: "#1f6fb2",
    bg: "#eaf4ff",
    desc: "An independent review of your existing or planned system architecture. We identify risks, scalability bottlenecks, security gaps, and cost inefficiencies — with clear, prioritised recommendations.",
    includes: ["Architecture documentation review","Non-functional requirements assessment","Risk register and technical debt analysis","Scalability and performance evaluation","Written findings with recommendations"],
    ideal: "Engineering leaders before major platform changes or scaling events.",
  },
  {
    icon: Users,
    title: "Team & Process Assessment",
    accent: "#b45309",
    bg: "#fffbeb",
    desc: "An honest assessment of your engineering organisation — skills gaps, delivery process bottlenecks, tooling mismatches, and culture. Actionable recommendations for a team that ships more and fights less.",
    includes: ["Engineering capability assessment","DORA metrics baseline measurement","Process and tooling review","Team structure recommendations","Hiring and development roadmap"],
    ideal: "VP Engineering and CPOs scaling or restructuring engineering teams.",
  },
  {
    icon: Lightbulb,
    title: "Product Discovery",
    accent: "#1f6fb2",
    bg: "#eaf4ff",
    desc: "Structured discovery for new product initiatives. Business case validation, user research synthesis, technical feasibility assessment, and a scoped MVP definition ready to go to engineering.",
    includes: ["Business case and opportunity sizing","User need validation","Technical feasibility assessment","MVP scope definition","Build plan with cost and time estimates"],
    ideal: "Product leaders and founders before committing to a build.",
  },
];

const ADVISORS = [
  {
    name: "Adewale Okonkwo",
    role: "CEO & Strategy Lead",
    expertise: ["Technology strategy","Digital transformation","Executive advisory"],
    bio: "Former Engineering Director at a Pan-African fintech. 14 years shaping technology decisions for growth-stage and enterprise organisations across Nigeria, UK, and UAE.",
  },
  {
    name: "Chukwuemeka Eze",
    role: "CTO & Architecture Lead",
    expertise: ["System architecture","Cloud migration","Engineering org design"],
    bio: "Architected platforms processing 2M+ daily transactions. Led engineering teams across 3 time zones. Known for translating complex technical trade-offs into decisions boards can act on.",
  },
  {
    name: "Ngozi Adeleke",
    role: "COO & Process Lead",
    expertise: ["Delivery process","DevOps transformation","Team structure"],
    bio: "DORA Elite-performer practitioner. Helped 12 engineering organisations move from quarterly releases to multiple deploys per day. Certified SAFe Program Consultant.",
  },
];

const HOW_IT_WORKS = [
  { num:"01", title:"Introductory call (free)",    desc:"30 minutes. No obligation. We learn about your situation and tell you honestly whether we can add value."           },
  { num:"02", title:"Scoping agreement",           desc:"We agree on objectives, deliverables, timeline, and fee. Fixed scope and fixed price — no billable-hour ambiguity." },
  { num:"03", title:"Discovery and research",      desc:"We interview stakeholders, review existing documentation, and study your environment before forming opinions."       },
  { num:"04", title:"Findings and recommendations",desc:"Written report delivered and presented. All recommendations prioritised with implementation effort estimates."        },
  { num:"05", title:"Optional: implementation",   desc:"Most engagements end here. Some clients ask us to implement — we only do so where our teams can genuinely add value." },
];

const PRINCIPLES = [
  "We decline engagements where we can't add material value.",
  "Every recommendation comes with an honest effort and cost estimate.",
  "We have no preferred vendors — our advice is always independent.",
  "We write everything down. No verbal-only briefings.",
  "We hold ourselves to the same standards we advise others to meet.",
  "If the right answer is to hire someone full-time, we'll say so.",
];

// ── Engagement proposal visual ────────────────────────────────────────────────
function ProposalPreview() {
  return (
    <div className="w-full border border-amber-200/40 overflow-hidden shadow-xl shadow-amber-950/5 bg-white">
      {/* Document header */}
      <div className="border-b-2 border-amber-700/20 px-8 py-5 flex items-start justify-between"
        style={{ background:"linear-gradient(135deg,#fefce8 0%,#fffbf0 100%)" }}>
        <div>
          <p className="text-[9px] font-bold text-amber-700/60 uppercase tracking-[0.2em] mb-1 font-mono">CONFIDENTIAL · ENGAGEMENT PROPOSAL</p>
          <h4 className="text-[18px] font-serif font-bold text-[#1f3a5f]">Technology Strategy Review</h4>
          <p className="text-[12px] text-gray-500 mt-0.5">Prepared for: Okafor Group Holdings</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-mono">REF: LST-2024-089</p>
          <p className="text-[10px] text-gray-400 font-mono">26 Feb 2026</p>
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Objective */}
        <div>
          <p className="text-[9px] font-bold text-amber-700 uppercase tracking-[0.16em] mb-2 font-mono">01 — ENGAGEMENT OBJECTIVE</p>
          <p className="text-[12.5px] text-gray-600 leading-[1.9] border-l-2 border-amber-300 pl-4">
            To assess the current technology landscape, identify strategic risks and
            opportunities, and produce a board-ready 3-year technology roadmap with
            investment phasing recommendations.
          </p>
        </div>

        {/* Scope */}
        <div>
          <p className="text-[9px] font-bold text-amber-700 uppercase tracking-[0.16em] mb-2 font-mono">02 — SCOPE OF WORK</p>
          <div className="grid grid-cols-2 gap-1.5">
            {["Technology audit (5 systems)","Stakeholder interviews (8)","Architecture assessment","Vendor landscape review","Board presentation (1hr)","Written strategy report"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[11.5px] text-gray-600">
                <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <p className="text-[9px] font-bold text-amber-700 uppercase tracking-[0.16em] mb-2 font-mono">03 — TIMELINE</p>
          <div className="flex gap-0">
            {[
              { w:"Week 1–2", l:"Discovery" },
              { w:"Week 3",   l:"Analysis"  },
              { w:"Week 4",   l:"Report"    },
              { w:"Week 5",   l:"Debrief"   },
            ].map((t, i) => (
              <div key={i} className={`flex-1 border-t-2 border-amber-400 pt-2 px-1 ${i<3?"border-r border-r-amber-100":""}`}>
                <p className="text-[8px] text-amber-700 font-bold font-mono">{t.w}</p>
                <p className="text-[10px] text-gray-600">{t.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-100 px-8 py-3 flex items-center justify-between bg-amber-50/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-700/15 flex items-center justify-center">
            <span className="text-[9px] font-bold text-amber-700">LS</span>
          </div>
          <span className="text-[10px] font-bold text-gray-500">Logicsoft Technologies Limited</span>
        </div>
        <span className="text-[9px] font-mono text-gray-400">Page 1 of 8</span>
      </div>
    </div>
  );
}

export default function Consultation() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Technology Consultation — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/other-services" className="hover:text-[#1f6fb2] transition-colors">Other Services</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Consultation</span>
        </nav>
      </div>

      {/* HERO — warm editorial, cream-on-navy */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background:"linear-gradient(150deg,#0c0906 0%,#120c04 50%,#0c0906 100%)" }}>
        {/* Gold decoration line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background:"linear-gradient(90deg, transparent, #b45309, #d97706, #b45309, transparent)" }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-amber-900/8 blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-amber-950/10 blur-[100px]" />
        </div>
        {/* Fine linen texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage:"repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(180,83,9,0.4) 14px, rgba(180,83,9,0.4) 15px), repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(180,83,9,0.4) 14px, rgba(180,83,9,0.4) 15px)" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_500px] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-amber-700/30 bg-amber-700/8 px-3 py-1.5 mb-6">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-[0.16em]">Other Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                Technology<br /><span style={{ color:"#d97706" }}>Consultation</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                Independent technology strategy, architecture review, and product discovery — from
                advisors with decades of experience making these decisions, not just recommending
                that someone else does.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"14+", label:"Years of practice",         color:"#d97706" },
                  { val:"100+",label:"Engagements delivered",     color:"#fbbf24" },
                  { val:"Fixed",label:"Fee — no billable hours",  color:"#d97706" },
                  { val:"Free", label:"Introductory call",        color:"#fbbf24" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-85"
                  style={{ background:"#b45309" }}>
                  Book a free introductory call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }}>
              <ProposalPreview />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ENGAGEMENT TYPES */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.16em] mb-3">Types of engagement</p>
          <div className="grid lg:grid-cols-[280px_1fr] gap-14 items-start">
            <div className="lg:sticky top-[120px]">
              <h3 className="text-[28px] lg:text-[34px] font-serif text-[#1f3a5f] leading-tight mb-5">Four ways we work with you.</h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">
                Every engagement is scoped, fixed-fee, and time-bounded. You know exactly what you'll
                receive before you commit.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {ENGAGEMENT_TYPES.map((e, i) => (
                <motion.div key={e.title} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.25, delay:i*0.07 }}
                  className="group border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 overflow-hidden">
                  <div className="border-l-[3px] transition-all duration-200" style={{ borderLeftColor:e.accent }}>
                    <div className="grid lg:grid-cols-[1fr_260px] gap-0">
                      <div className="p-7 border-b lg:border-b-0 lg:border-r border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background:e.bg }}>
                            <e.icon className="w-4 h-4" style={{ color:e.accent }} />
                          </div>
                          <h4 className="text-[17px] font-serif font-bold text-[#1f3a5f] group-hover:transition-colors"
                            style={{ "--accent":e.accent }}>{e.title}</h4>
                        </div>
                        <p className="text-[13px] text-gray-500 leading-[1.85]">{e.desc}</p>
                        <p className="text-[11px] text-gray-400 mt-4 italic">{e.ideal}</p>
                      </div>
                      <div className="p-6 bg-gray-50">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Includes</p>
                        <ul className="space-y-2">
                          {e.includes.map(item => (
                            <li key={item} className="flex items-start gap-2 text-[12px] text-gray-600">
                              <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color:e.accent }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.16em] mb-3">How it works</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">Five steps from question to answer.</h3>
          <div className="flex flex-col gap-3">
            {HOW_IT_WORKS.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                className="group flex gap-6 items-start">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center border-2 border-gray-200 bg-white font-mono text-[11px] font-bold text-gray-400 group-hover:border-amber-500 group-hover:text-amber-600 transition-all duration-200">
                  {s.num}
                </div>
                <div className="flex-1 border border-gray-200 bg-white group-hover:bg-amber-50/50 group-hover:border-amber-200 transition-all duration-200 px-6 py-4">
                  <h4 className="text-[14.5px] font-bold text-[#1f3a5f] mb-1.5 group-hover:text-amber-800 transition-colors">{s.title}</h4>
                  <p className="text-[13px] text-gray-500 leading-[1.85]">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ADVISORS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.16em] mb-3">Your advisors</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">The people who will actually do the work.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {ADVISORS.map((a, i) => (
              <motion.div key={a.name} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.1 }}
                className="group border border-gray-200 bg-white hover:shadow-sm transition-all duration-200 overflow-hidden">
                <div className="h-[3px] w-full" style={{ background:"linear-gradient(90deg,#b45309,#d97706)" }} />
                <div className="p-7">
                  <div className="w-12 h-12 rounded-none bg-gradient-to-br from-amber-700/20 to-amber-900/20 flex items-center justify-center mb-4">
                    <span className="text-[14px] font-bold text-amber-700">{a.name.split(" ").map(n=>n[0]).join("")}</span>
                  </div>
                  <h4 className="text-[16px] font-serif font-bold text-[#1f3a5f] mb-0.5">{a.name}</h4>
                  <p className="text-[12px] font-semibold text-amber-700 mb-3">{a.role}</p>
                  <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{a.bio}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.expertise.map(e => (
                      <span key={e} className="text-[10px] font-semibold px-2 py-0.5 border border-amber-200 bg-amber-50 text-amber-700">{e}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* PRINCIPLES */}
      <div className="border-b border-amber-900/20" style={{ background:"linear-gradient(150deg,#0c0906 0%,#120c04 100%)" }}>
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.16em] mb-3">Our consulting principles</p>
          <h3 className="text-[28px] font-serif text-white mb-8">How we work — in plain language.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRINCIPLES.map((p, i) => (
              <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                viewport={{ once:true }} transition={{ duration:0.25, delay:i*0.07 }}
                className="flex items-start gap-3 border border-amber-900/20 bg-white/[0.02] hover:bg-white/[0.04] transition-colors px-5 py-4">
                <span className="text-[9px] font-bold font-mono text-amber-700 mt-0.5 shrink-0">{String(i+1).padStart(2,"0")}</span>
                <p className="text-[13px] text-white/55 leading-[1.85]">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-[0.15em] mb-3">Start with a conversation</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Book a free 30-minute introductory call.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">No pitch, no obligation. We'll understand your situation and tell you honestly whether we're the right people to help.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-85" style={{ background:"#b45309" }}>
              Book free call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/founders-story" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Meet the team →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}