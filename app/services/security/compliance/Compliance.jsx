"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Award, Clock, Users, ShieldCheck, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";

// ── Design: corporate compliance gravitas. Navy + legal-gold #d97706.
//    Certificate-like borders, structured framework tables, formal document aesthetic.
//    Feels like the compliance department inside a bank — serious, thorough, trustworthy.

const FRAMEWORKS = [
  {
    id: "iso27001",
    name: "ISO 27001",
    subtitle: "Information Security Management",
    accent: "#1f6fb2",
    accentBg: "#eaf4ff",
    scope: "All industries",
    duration: "6–12 months",
    desc: "The international standard for information security management systems (ISMS). We guide you through gap analysis, risk treatment, policy development, and certification audit preparation.",
    deliverables: ["Gap analysis report","Risk register & treatment plan","Full ISMS policy suite (40+ documents)","Internal audit and management review","Certification body liaison"],
    available: true,
  },
  {
    id: "ndpr",
    name: "NDPR",
    subtitle: "Nigeria Data Protection Regulation",
    accent: "#059669",
    accentBg: "#ecfdf5",
    scope: "Nigerian operations",
    duration: "4–8 weeks",
    desc: "Full compliance programme for the Nigeria Data Protection Regulation data audit, privacy notices, consent frameworks, DPO appointment support, and NITDA audit readiness.",
    deliverables: ["Data inventory and flow mapping","Privacy policy and notices","Consent management framework","NITDA annual audit report support","Data breach response plan"],
    available: true,
  },
  {
    id: "gdpr",
    name: "GDPR",
    subtitle: "General Data Protection Regulation",
    accent: "#2563eb",
    accentBg: "#eff6ff",
    scope: "EU data subjects",
    duration: "6–10 weeks",
    desc: "For organisations processing EU resident data. Data mapping, DPIA, Records of Processing Activities (RoPA), DPA agreements, and breach notification procedures.",
    deliverables: ["Data mapping and RoPA","DPIA templates and process","DPA/SCCs with third parties","Privacy notices and cookie policy","72-hour breach notification workflow"],
    available: true,
  },
  {
    id: "pcidss",
    name: "PCI DSS v4.0",
    subtitle: "Payment Card Industry Data Security",
    accent: "#d97706",
    accentBg: "#fffbeb",
    scope: "Card payment processing",
    duration: "8–16 weeks",
    desc: "For organisations that store, process, or transmit cardholder data. SAQ completion, network segmentation review, penetration test coordination, and QSA engagement support.",
    deliverables: ["SAQ completion and submission","Cardholder data environment scoping","Network segmentation review","ASV scan coordination","QSA readiness preparation"],
    available: true,
  },
  {
    id: "hipaa",
    name: "HIPAA",
    subtitle: "Health Insurance Portability & Accountability",
    accent: "#7c3aed",
    accentBg: "#f5f3ff",
    scope: "Healthcare / health data",
    duration: "6–12 weeks",
    desc: "HIPAA Security Rule, Privacy Rule, and Breach Notification Rule compliance for healthcare software, health data processors, and covered entities operating internationally.",
    deliverables: ["Risk analysis and management","Technical safeguards review","BAA review and templates","Workforce training programme","Incident response procedures"],
    available: true,
  },
  {
    id: "soc2",
    name: "SOC 2 Type II",
    subtitle: "Service Organisation Control",
    accent: "#0891b2",
    accentBg: "#ecfeff",
    scope: "SaaS / cloud providers",
    duration: "3–6 months observation",
    desc: "Trust Services Criteria readiness for SaaS companies that need to demonstrate security, availability, and confidentiality to enterprise clients. Readiness assessment through audit support.",
    deliverables: ["TSC gap assessment","Control design and implementation","Evidence collection framework","Auditor liaison support","Remediation tracking"],
    available: true,
  },
];

const PROCESS_STEPS = [
  { num:"01", title:"Initial Scoping Call",        desc:"We identify which frameworks apply to your business, the scope of assessment, and outline a realistic programme timeline."           },
  { num:"02", title:"Gap Analysis",                desc:"A thorough review of your current controls, policies, and practices against the target framework requirements."                   },
  { num:"03", title:"Remediation Programme",       desc:"Prioritised, practical remediation tasks assigned to your team with our consultants supporting implementation at every step."  },
  { num:"04", title:"Documentation Suite",         desc:"Full policy, procedure, and evidence documentation developed and reviewed. Written to be maintained not abandoned post-audit."  },
  { num:"05", title:"Internal Audit",              desc:"A rehearsal audit using the same criteria the certifying body will use. Gaps closed before the real assessment."                  },
  { num:"06", title:"Certification / Attestation", desc:"Audit body or QSA engagement managed. We attend, respond to queries, and coordinate until your certificate is issued."            },
];

const WHY = [
  { icon: Award,      title: "Certified consultants",       desc: "ISO 27001 Lead Implementers, CISM, CISA, and GDPR-certified specialists across the team." },
  { icon: Clock,      title: "Realistic timelines",         desc: "We've seen what over-scoped programmes do to teams. Our plans are honest about effort and sequencing." },
  { icon: FileText,   title: "Audit-ready documentation",   desc: "Policies and procedures written to survive an audit not to fill a folder. Practical, maintained, and yours." },
  { icon: Users,      title: "Embedded, not remote",        desc: "Our consultants work alongside your team. You understand the programme; we don't just hand over a report." },
];

function FrameworkCard({ fw }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border transition-all duration-200 ${open ? "border-gray-300 shadow-sm" : "border-gray-200"} bg-white overflow-hidden`}>
      <button onClick={() => setOpen(!open)} className="w-full text-left">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center text-[11px] font-bold"
                style={{ background: fw.accentBg, color: fw.accent }}>{fw.id.toUpperCase().slice(0,3)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h4 className="text-[17px] font-bold text-[#1f3a5f]">{fw.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5" style={{ background:fw.accentBg, color:fw.accent }}>{fw.scope}</span>
                  <span className="text-[10px] font-semibold text-gray-400 border border-gray-200 px-2 py-0.5">{fw.duration}</span>
                </div>
                <p className="text-[12px] text-gray-400">{fw.subtitle}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      {open && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.2 }}
          className="border-t border-gray-100 px-6 py-5"
          style={{ borderLeftWidth:3, borderLeftColor: fw.accent }}>
          <p className="text-[13.5px] text-gray-500 leading-[1.85] mb-5">{fw.desc}</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Key deliverables</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {fw.deliverables.map(d => (
              <div key={d} className="flex items-start gap-2 text-[12.5px] text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color:fw.accent }} />
                {d}
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-[12.5px] font-bold px-5 py-2.5 text-white transition-all duration-200 hover:opacity-85"
              style={{ background:fw.accent }}>
              Enquire about {fw.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Compliance() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Compliance Consulting — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/security" className="hover:text-[#1f6fb2] transition-colors">Security</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Compliance</span>
        </nav>
      </div>

      {/* HERO — formal document aesthetic, navy gold */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background:"linear-gradient(150deg,#0c1220 0%,#0f1a2e 50%,#0a1018 100%)" }}>
        {/* Gold line decoration */}
        <div className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background:"linear-gradient(90deg, transparent, #d97706, #f59e0b, #d97706, transparent)" }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-amber-900/6 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-blue-900/6 blur-[100px]" />
        </div>
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(217,119,6,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.4) 1px, transparent 1px)", backgroundSize:"48px 48px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          {/* Certificate-style inner border */}
          <div className="absolute inset-6 border border-amber-700/10 pointer-events-none" />

          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-amber-600/30 bg-amber-600/8 px-3 py-1.5 mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-[0.16em]">Security Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                Compliance<br /><span style={{ color:"#d97706" }}>Consulting</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[520px] mb-8">
                ISO 27001, NDPR, GDPR, PCI DSS, HIPAA, and SOC 2 managed by certified specialists
                who have run these programmes before. Not templates handed over. Implementation delivered.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"6",     label:"Frameworks covered",    color:"#d97706" },
                  { val:"ISO",   label:"Lead Implementers",     color:"#60a5fa" },
                  { val:"CISM",  label:"Certified team",        color:"#34d399" },
                  { val:"100%",  label:"First-audit pass rate", color:"#d97706" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-85"
                  style={{ background:"#d97706" }}>
                  Discuss your compliance needs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Certificate visual */}
            <div className="hidden lg:block">
              <div className="border border-amber-700/30 bg-white/3 p-8 relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-amber-600/50" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-amber-600/50" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-amber-600/50" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-amber-600/50" />
                <div className="text-center mb-6">
                  <Award className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                  <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-[0.2em] mb-1">Certificate of Compliance</p>
                  <p className="text-[22px] font-serif text-white">ISO 27001:2022</p>
                </div>
                <div className="border-t border-amber-700/20 pt-5 space-y-3">
                  {["Information Security Management System","Scope: Software development and IT services","Certification Body: BSI Group","Issue date: 14 March 2023","Valid through: 13 March 2026"].map((l,i) => (
                    <p key={i} className={`text-center font-mono ${i===0?"text-[11px] text-amber-300/80":"text-[11px] text-white/35"}`}>{l}</p>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-amber-700/20 flex justify-center">
                  <div className="flex gap-1">
                    {Array.from({length:8}).map((_,i)=>(
                      <div key={i} className="w-4 h-1 bg-amber-700/30" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FRAMEWORKS */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.16em] mb-3">Frameworks we deliver</p>
          <div className="grid lg:grid-cols-[280px_1fr] gap-14 items-start">
            <div className="lg:sticky top-[120px]">
              <h3 className="text-[28px] lg:text-[34px] font-serif text-[#1f3a5f] leading-tight mb-5">Six frameworks. One programme partner.</h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">
                Click any framework to see our scope, deliverables, and typical timeline.
                Most organisations need more than one, we sequence them to maximise efficiency.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {FRAMEWORKS.map((fw, i) => (
                <motion.div key={fw.id} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.25, delay:i*0.06 }}>
                  <FrameworkCard fw={fw} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.16em] mb-3">How we work</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Six stages from gap to certificate.</h3>
          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-[19px] top-5 bottom-5 w-px bg-gray-200 hidden lg:block" />
            <div className="flex flex-col gap-5">
              {PROCESS_STEPS.map((s, i) => (
                <motion.div key={s.num} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                  className="group flex gap-6 items-start">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center border-2 border-gray-200 bg-white text-[11px] font-bold font-mono text-gray-400 relative z-10 group-hover:border-amber-400 group-hover:text-amber-600 transition-all duration-200">{s.num}</div>
                  <div className="flex-1 border border-gray-200 bg-[#fafafa] group-hover:bg-white group-hover:border-gray-300 group-hover:shadow-sm transition-all duration-200 px-6 py-5">
                    <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-1.5 group-hover:text-amber-700 transition-colors">{s.title}</h4>
                    <p className="text-[13px] text-gray-500 leading-[1.85]">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHY US */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.16em] mb-3">Why Logicsoft</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">Compliance done right.</h3>
          <div className="w-full h-px bg-gray-200 mb-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <div key={w.title} className={`group relative px-8 py-9 bg-white border-b border-gray-200 hover:bg-amber-50 transition-colors duration-200 ${i%2!==0?"sm:border-l lg:border-l-0":""} ${i%4!==0?"lg:border-l":""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-amber-500 to-amber-300" />
                <w.icon className="w-5 h-5 text-amber-500 mb-5" />
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-3 group-hover:text-amber-700 transition-colors">{w.title}</h4>
                <div className="w-5 h-[2px] bg-amber-500 mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      </div>

      {/* RELATED */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Related security services</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title:"Penetration Testing",  href:"/services/security/penetration-testing", accent:"#ef4444", desc:"Validate your controls work." },
              { title:"SIEM Services",         href:"/services/security/siem-services",        accent:"#f59e0b", desc:"Monitor for threats 24/7."   },
              { title:"Security Testing",      href:"/services/security/security-testing",     accent:"#0d9488", desc:"Secure your SDLC."             },
            ].map(s => (
              <Link key={s.title} href={s.href} className="group flex items-center justify-between gap-4 border border-gray-200 bg-[#f9fafb] hover:bg-white hover:shadow-sm transition-all duration-200 px-6 py-5">
                <div>
                  <div className="w-2 h-2 rounded-full mb-2" style={{ background:s.accent }} />
                  <p className="text-[14px] font-bold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">{s.title}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5">{s.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1f6fb2] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-amber-400 uppercase tracking-[0.15em] mb-3">Start your compliance programme</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">From gap analysis to certification, we manage it all.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free scoping call. We'll identify which frameworks apply, what you already have, and what a realistic timeline looks like.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-85" style={{ background:"#d97706" }}>
              Book scoping call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/security" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              All security services →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}