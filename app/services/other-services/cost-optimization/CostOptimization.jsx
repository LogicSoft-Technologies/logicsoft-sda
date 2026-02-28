"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, TrendingDown, DollarSign, BarChart3,
  Cloud, Server, Code2, Cpu, CheckCircle2, ArrowUpRight
} from "lucide-react";

// ── Design: Financial savings dashboard aesthetic.
//    Forest green #059669 on near-black. Savings counters, before/after
//    cost comparison bars, ROI charts. Money feels tangible and real.

const DOMAINS = [
  {
    num:"01", icon:Cloud,
    title:"Cloud Cost Optimisation",
    accent:"#059669", bg:"#ecfdf5",
    desc:"Cloud bills grow fast and silently. We audit your AWS, GCP, or Azure spend — right-size over-provisioned resources, switch on Savings Plans and Reserved Instances, identify orphaned resources, and set budget guardrails.",
    savings:"Typical savings: 25–45% of cloud bill",
    tags:["FinOps","Reserved Instances","Savings Plans","Rightsizing","Waste elimination"],
  },
  {
    num:"02", icon:Server,
    title:"Infrastructure Efficiency",
    accent:"#0d9488", bg:"#f0fdfa",
    desc:"On-premise and hybrid infrastructure is often over-specced and under-utilised. We consolidate, virtualise, and eliminate redundant systems — reducing hardware, licensing, and operational costs together.",
    savings:"Typical savings: 20–35% infrastructure cost",
    tags:["Server consolidation","Virtualisation","Licensing optimisation","Storage tiering"],
  },
  {
    num:"03", icon:Code2,
    title:"Software Licence Rationalisation",
    accent:"#059669", bg:"#ecfdf5",
    desc:"SaaS sprawl is expensive and invisible. We inventory every software licence across your organisation, identify duplicates, unused seats, and better-value alternatives — then build a rationalisation roadmap.",
    savings:"Typical savings: 15–30% software spend",
    tags:["SaaS audit","Licence consolidation","Vendor negotiation","Shadow IT discovery"],
  },
  {
    num:"04", icon:Cpu,
    title:"Engineering Process Efficiency",
    accent:"#0d9488", bg:"#f0fdfa",
    desc:"Slow CI/CD, manual testing, poor test coverage, and technical debt cost engineering time — which costs money. We quantify the efficiency gap and design the improvements that pay for themselves.",
    savings:"Typical savings: 20–40% engineering time",
    tags:["CI/CD acceleration","Test automation","Technical debt","Developer productivity"],
  },
  {
    num:"05", icon:BarChart3,
    title:"Vendor & Contract Optimisation",
    accent:"#059669", bg:"#ecfdf5",
    desc:"Technology vendor contracts rarely favour the buyer by default. We review your existing agreements, benchmark against market rates, and support negotiation for better terms, SLAs, and pricing.",
    savings:"Typical savings: 10–25% vendor spend",
    tags:["Contract review","Benchmark analysis","Negotiation support","Vendor consolidation"],
  },
  {
    num:"06", icon:DollarSign,
    title:"FinOps Programme Establishment",
    accent:"#0d9488", bg:"#f0fdfa",
    desc:"A sustainable cost optimisation programme — not a one-time audit. We establish FinOps practices, tagging strategies, showback and chargeback models, and cost accountability across engineering teams.",
    savings:"Ongoing: 10–20% year-on-year improvement",
    tags:["FinOps culture","Cost visibility","Showback / chargeback","Budget alerting"],
  },
];

const PROCESS = [
  { num:"01", title:"Cost Discovery Audit",     desc:"Full inventory of cloud, software, infrastructure, and engineering spend. No cost estimate — just an honest baseline."                  },
  { num:"02", title:"Opportunity Mapping",      desc:"Every identified saving opportunity documented with effort, impact, and implementation risk. Prioritised by ROI."                         },
  { num:"03", title:"Optimisation Roadmap",     desc:"Sequenced implementation plan. Quick wins in the first 30 days. Structural improvements over 90 days. Sustainable model at 6 months."  },
  { num:"04", title:"Implementation & Tracking",desc:"We implement or support implementation of recommendations. Savings tracked against baseline. Monthly reports until targets are hit."    },
];

const ROI_EXAMPLES = [
  { client:"Mid-size fintech",    period:"90 days",  spend_before:"₦18.4M/mo",  spend_after:"₦10.1M/mo",  saving:"₦8.3M/mo",  area:"Cloud (AWS)"          },
  { client:"Logistics platform",  period:"60 days",  spend_before:"₦6.2M/mo",   spend_after:"₦4.0M/mo",   saving:"₦2.2M/mo",  area:"Licences + Cloud"     },
  { client:"Healthcare SaaS",     period:"120 days", spend_before:"₦11.8M/mo",  spend_after:"₦7.4M/mo",   saving:"₦4.4M/mo",  area:"Cloud (GCP) + SaaS"   },
  { client:"E-commerce startup",  period:"45 days",  spend_before:"₦3.9M/mo",   spend_after:"₦2.5M/mo",   saving:"₦1.4M/mo",  area:"Cloud infra"          },
];

// ── Savings dashboard visual ──────────────────────────────────────────────────
function SavingsDashboard() {
  const bars = [
    { label:"Compute",  before:100, after:58,  color:"#059669" },
    { label:"Storage",  before:72,  after:41,  color:"#0d9488" },
    { label:"Network",  before:45,  after:27,  color:"#059669" },
    { label:"Database", before:83,  after:52,  color:"#0d9488" },
    { label:"Licences", before:61,  after:45,  color:"#059669" },
    { label:"Services", before:38,  after:24,  color:"#0d9488" },
  ];

  return (
    <div className="w-full border border-green-900/25 overflow-hidden shadow-2xl shadow-green-950/20">
      {/* Header */}
      <div className="bg-[#030e08] border-b border-green-900/25 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <TrendingDown className="w-3 h-3 text-green-400 ml-1" />
          <span className="text-[10px] font-bold font-mono text-green-400 uppercase tracking-[0.18em]">COST OPTIMISATION REPORT</span>
        </div>
        <span className="text-[10px] font-mono text-green-400 font-bold">↓ 42% savings identified</span>
      </div>

      <div className="bg-[#020b05] p-4 space-y-4">
        {/* Total savings KPI */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label:"Monthly spend (before)", val:"₦18.4M",  color:"#ef4444", sub:"Baseline" },
            { label:"Monthly spend (after)",  val:"₦10.7M",  color:"#059669", sub:"Optimised" },
            { label:"Monthly saving",          val:"₦7.7M",   color:"#34d399", sub:"↑ ROI: 6.2×" },
          ].map((k, i) => (
            <motion.div key={k.label} initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay: 0.3 + i*0.1 }}
              className="border border-green-900/20 bg-white/[0.02] p-3 text-center">
              <p className="text-[8.5px] text-white/30 uppercase mb-1">{k.label}</p>
              <p className="text-[20px] font-bold font-mono leading-none mb-0.5" style={{ color:k.color }}>{k.val}</p>
              <p className="text-[9px] text-white/30">{k.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Cost breakdown bars — before vs after */}
        <div className="border border-green-900/15 bg-white/[0.01] p-4">
          <p className="text-[9px] font-bold text-white/30 uppercase mb-4">Cost by category — Before vs After (₦M)</p>
          <div className="space-y-3">
            {bars.map((b, i) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] font-mono text-white/40">{b.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-red-400/70 line-through">{b.before}</span>
                    <span className="text-[9px] font-mono" style={{ color:b.color }}>{b.after}</span>
                    <span className="text-[9px] font-mono text-green-400">↓{Math.round((1-b.after/b.before)*100)}%</span>
                  </div>
                </div>
                <div className="relative h-3 bg-white/5 rounded-sm overflow-hidden">
                  {/* Before bar */}
                  <div className="absolute inset-y-0 left-0 bg-red-900/30 rounded-sm" style={{ width:`${b.before}%` }} />
                  {/* After bar */}
                  <motion.div className="absolute inset-y-0 left-0 rounded-sm" style={{ background:`${b.color}80` }}
                    initial={{ width:0 }} animate={{ width:`${b.after}%` }}
                    transition={{ delay: 0.6 + i*0.1, duration:0.5, ease:"easeOut" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick wins */}
        <div className="border border-green-900/15 bg-white/[0.01] p-3">
          <p className="text-[9px] font-bold text-white/30 uppercase mb-2">Top 3 quick wins identified</p>
          {[
            { item:"Right-size 14 over-provisioned EC2 instances",  saving:"₦1.8M/mo",  effort:"2 days"  },
            { item:"Enable S3 intelligent tiering on 3 buckets",    saving:"₦640k/mo",   effort:"1 day"   },
            { item:"Remove 47 unused EBS volumes",                  saving:"₦320k/mo",   effort:"4 hours" },
          ].map((q, i) => (
            <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay: 1.0 + i*0.1 }}
              className="flex items-center gap-2 py-1.5">
              <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
              <p className="text-[11px] text-white/45 flex-1">{q.item}</p>
              <span className="text-[10px] font-bold font-mono text-green-400 shrink-0">{q.saving}</span>
              <span className="text-[9px] font-mono text-white/25 shrink-0">{q.effort}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#030e08] border-t border-green-900/20 px-4 py-2 flex justify-between">
        <span className="text-[9.5px] font-mono text-gray-700">Scope: AWS · SaaS · Infrastructure · Licences</span>
        <span className="text-[9.5px] font-mono text-green-400 font-bold">Annual saving: ₦92.4M</span>
      </div>
    </div>
  );
}

export default function CostOptimization() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Cost Optimisation — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/other-services" className="hover:text-[#1f6fb2] transition-colors">Other Services</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Cost Optimisation</span>
        </nav>
      </div>

      {/* HERO */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background:"linear-gradient(150deg,#020a04 0%,#040e06 50%,#020a04 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-green-900/10 blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-teal-950/10 blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle, #059669 1px, transparent 1px)", backgroundSize:"32px 32px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_560px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-green-600/30 bg-green-600/8 px-3 py-1.5 mb-6">
                <TrendingDown className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[11px] font-bold text-green-400 uppercase tracking-[0.16em]">Other Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                Cost<br /><span style={{ color:"#34d399" }}>Optimisation</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                Cloud bills, software licences, infrastructure, and engineering inefficiency —
                we find the waste, quantify the opportunity, and implement the savings.
                Typically 25–45% reduction in 90 days.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"42%",   label:"Avg cloud bill reduction",  color:"#34d399" },
                  { val:"90 day",label:"Results timeframe",          color:"#059669" },
                  { val:"6.2×",  label:"Typical ROI on fee",        color:"#34d399" },
                  { val:"₦0",    label:"Upfront spend required",    color:"#059669" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1 font-mono" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-green-700 hover:bg-green-600 transition-all duration-200">
                  Get a free cost audit <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  Calculate your savings
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }}>
              <SavingsDashboard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ROI EXAMPLES */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-green-600 uppercase tracking-[0.16em] mb-3">Client results</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">Real savings. Real clients. Real timelines.</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {["Client","Time period","Monthly before","Monthly after","Monthly saving","Focus area"].map(h => (
                    <th key={h} className="text-left py-3 pr-6 text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROI_EXAMPLES.map((r, i) => (
                  <motion.tr key={r.client} initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                    viewport={{ once:true }} transition={{ duration:0.25, delay:i*0.08 }}
                    className={`border-b border-gray-100 ${i%2===0?"bg-white":"bg-[#fafafa]"}`}>
                    <td className="py-3.5 pr-6 font-semibold text-[#1f3a5f]">{r.client}</td>
                    <td className="py-3.5 pr-6 text-gray-500 font-mono">{r.period}</td>
                    <td className="py-3.5 pr-6 text-gray-400 font-mono line-through">{r.spend_before}</td>
                    <td className="py-3.5 pr-6 font-mono" style={{ color:"#059669" }}>{r.spend_after}</td>
                    <td className="py-3.5 pr-6">
                      <span className="font-bold font-mono text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 text-[12px]">{r.saving}</span>
                    </td>
                    <td className="py-3.5 pr-6 text-gray-500">{r.area}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-gray-400 mt-4 italic">Savings verified against client billing data. Names anonymised per NDA. Results not guaranteed — outcomes depend on current spend profile.</p>
        </div>
      </div>

      {/* DOMAINS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-green-600 uppercase tracking-[0.16em] mb-4">Optimisation areas</p>
              <h3 className="text-[30px] lg:text-[34px] font-serif text-[#1f3a5f] leading-tight mb-5">Six domains where we find savings.</h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">Most waste lives across three or four of these areas simultaneously. We look at all of them before recommending where to focus.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DOMAINS.map((d, i) => (
                <motion.div key={d.num} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                  className="group relative border border-gray-200 bg-white hover:shadow-sm transition-all duration-200 overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background:`linear-gradient(90deg,${d.accent},${d.accent}55)` }} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background:d.bg }}>
                        <d.icon className="w-4 h-4" style={{ color:d.accent }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{d.num}</span>
                    </div>
                    <h4 className="text-[14.5px] font-bold text-[#1f3a5f] mb-2 group-hover:text-green-700 transition-colors">{d.title}</h4>
                    <div className="w-6 h-[2px] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background:d.accent }} />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-3">{d.desc}</p>
                    <p className="text-[11px] font-bold" style={{ color:d.accent }}>{d.savings}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {d.tags.map(t => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 border" style={{ background:d.bg, color:d.accent, borderColor:d.accent+"30" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-green-600 uppercase tracking-[0.16em] mb-4">How it works</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-12">From audit to savings in four stages.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.num}
                className={`group relative p-8 hover:bg-green-50 transition-colors duration-200 ${i<PROCESS.length-1?"border-b lg:border-b-0 lg:border-r border-gray-200":""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-green-500 to-teal-400" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono text-green-700 bg-green-50 border border-green-200 px-2 py-0.5">{p.num}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 group-hover:text-green-700 transition-colors">{p.title}</h4>
                <div className="w-5 h-[2px] bg-green-600 mb-3 opacity-20 group-hover:opacity-100 transition-opacity" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RELATED */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Services that accelerate savings</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title:"Cloud Engineering", href:"/services/other-services/cloud-engineering", accent:"#0ea5e9", desc:"Right architecture reduces cost structurally." },
              { title:"DevOps Engineering", href:"/services/other-services/devops",           accent:"#f97316", desc:"Faster pipelines mean lower engineering cost." },
              { title:"Consultation",       href:"/services/other-services/consultation",     accent:"#b45309", desc:"Strategy review before committing investment."  },
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
            <p className="text-[11px] font-bold text-green-400 uppercase tracking-[0.15em] mb-3">Find your savings</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Most companies overspend by 30–40%. Let's find yours.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free cost discovery call. In 30 minutes, we'll identify the most likely savings areas in your environment and estimate the opportunity.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-green-700 hover:bg-green-600 transition-all duration-200">
              Get a free cost audit <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/other-services/consultation" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Technology consultation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}