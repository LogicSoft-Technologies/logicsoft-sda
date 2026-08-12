"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Cloud, Server, Shield, Zap,
  GitBranch, BarChart3, RefreshCw, Lock, Globe2
} from "lucide-react";

// ── Design: Cloud infrastructure / aerial view aesthetic.
//    Sky blue #0ea5e9 with deep navy. Multi-cloud node diagram as signature.
//    Feels like looking at infrastructure topology from above.

const CLOUD_PROVIDERS = [
  { name:"AWS",   color:"#ff9900", logo:"AWS",   note:"Primary cloud partner"     },
  { name:"Azure", color:"#0078d4", logo:"AZR",   note:"Microsoft ecosystem"       },
  { name:"GCP",   color:"#4285f4", logo:"GCP",   note:"Data & ML workloads"       },
];

const CAPABILITIES = [
  {
    num:"01", icon:Cloud,
    title:"Cloud Migration",
    accent:"#0ea5e9", bg:"#f0f9ff",
    desc:"Structured migration of on-premise workloads to cloud lift-and-shift, re-platform, or re-architect. Every migration starts with a discovery of dependencies, risks, and cost implications before a single VM moves.",
    tags:["Lift & shift","Re-platform","Re-architect","Migration waves","Cutover planning"],
  },
  {
    num:"02", icon:Server,
    title:"Infrastructure as Code",
    accent:"#7c3aed", bg:"#f5f3ff",
    desc:"Every resource in your cloud estate defined in version-controlled Terraform or Pulumi. Drift detection, change planning, and state management. No undocumented resources; no manual console changes.",
    tags:["Terraform","Pulumi","CloudFormation","Bicep","Drift detection"],
  },
  {
    num:"03", icon:Shield,
    title:"Cloud Security & Compliance",
    accent:"#0ea5e9", bg:"#f0f9ff",
    desc:"Cloud Security Posture Management (CSPM), IAM design, network segmentation, and encryption at rest and in transit. AWS Security Hub, Azure Defender, or GCP Security Command Center configured and monitored.",
    tags:["CSPM","IAM design","VPC / VNET","Encryption","Security Hub"],
  },
  {
    num:"04", icon:Zap,
    title:"Serverless & Managed Services",
    accent:"#7c3aed", bg:"#f5f3ff",
    desc:"Right-sizing your architecture with serverless functions, managed databases, and PaaS services that eliminate operational overhead. Cost and scalability modelled before architecture decisions are locked in.",
    tags:["Lambda / Cloud Run","RDS / Cloud SQL","API Gateway","Event Bridge","SQS/SNS"],
  },
  {
    num:"05", icon:BarChart3,
    title:"Cost Engineering",
    accent:"#0ea5e9", bg:"#f0f9ff",
    desc:"Cloud bills that make sense. Reserved instance strategy, Savings Plans, rightsizing recommendations, spot instance usage for non-critical workloads, and automated budget alerting.",
    tags:["FinOps","Reserved instances","Savings Plans","Rightsizing","Budget alerts"],
  },
  {
    num:"06", icon:RefreshCw,
    title:"Multi-Cloud & Hybrid Architecture",
    accent:"#7c3aed", bg:"#f5f3ff",
    desc:"Workloads distributed across cloud providers based on capability, cost, and compliance. Hybrid connectivity between on-premise data centres and cloud using VPN, Direct Connect, or ExpressRoute.",
    tags:["Multi-cloud","VPN / Direct Connect","ExpressRoute","Hybrid DNS","Anthos / Arc"],
  },
];

const STACK = [
  { name:"Terraform",   role:"IaC",           color:"#7B42BC" },
  { name:"AWS",         role:"Cloud",          color:"#ff9900" },
  { name:"Azure",       role:"Cloud",          color:"#0078d4" },
  { name:"GCP",         role:"Cloud",          color:"#4285f4" },
  { name:"Kubernetes",  role:"Orchestration",  color:"#326ce5" },
  { name:"Vault",       role:"Secrets",        color:"#FFD814" },
  { name:"Prometheus",  role:"Monitoring",     color:"#e6522c" },
  { name:"Grafana",     role:"Dashboards",     color:"#f46800" },
];

const PROCESS = [
  { num:"01", title:"Cloud Readiness Assessment",  desc:"Current infrastructure audit, workload classification, security posture review, and total cost of ownership analysis."          },
  { num:"02", title:"Architecture Design",          desc:"Target architecture documented provider selection, network design, security controls, and cost model before any provisioning." },
  { num:"03", title:"Migration Execution",          desc:"Wave-by-wave migration with rollback plans. Zero-downtime cutovers. Every stage tested and signed off before the next begins."    },
  { num:"04", title:"Optimisation & Handover",      desc:"90-day post-migration cost optimisation, runbook creation, team training, and knowledge transfer before we step back."           },
];

const MIGRATION_STRATEGIES = [
  { code:"Rehost",      name:"Lift & Shift",       desc:"Move workloads as-is. Fastest time to cloud, minimal change. Best for tight deadlines or compliance deadlines.",                    effort:"Low",  savings:"~20%" },
  { code:"Replatform",  name:"Lift & Reshape",     desc:"Minor optimisations swap out databases for managed services, containerise apps without changing core architecture.",            effort:"Med",  savings:"~40%" },
  { code:"Rearchitect", name:"Re-architect",       desc:"Redesign to cloud-native patterns. Microservices, serverless, event-driven. Highest effort, highest long-term ROI.",               effort:"High", savings:"~60%" },
];

// ── Cloud architecture node diagram ──────────────────────────────────────────
function CloudDiagram() {
  const nodes = [
    // Top row — users
    { x:200, y:20,  label:"Web Users",     icon:"👥",  color:"#6b7280" },
    { x:360, y:20,  label:"Mobile",        icon:"📱",  color:"#6b7280" },
    // CDN / LB
    { x:280, y:90,  label:"CDN + WAF",     icon:"🌐",  color:"#0ea5e9" },
    // App layer
    { x:140, y:170, label:"API Gateway",   icon:"⚡",  color:"#0ea5e9" },
    { x:280, y:170, label:"App Service",   icon:"⚙",   color:"#7c3aed" },
    { x:420, y:170, label:"Auth Service",  icon:"🔒",  color:"#7c3aed" },
    // Data layer
    { x:140, y:250, label:"PostgreSQL",    icon:"🗄",   color:"#f97316" },
    { x:280, y:250, label:"Redis Cache",   icon:"⚡",  color:"#ef4444" },
    { x:420, y:250, label:"Object Store",  icon:"📦",  color:"#10b981" },
    // Monitoring
    { x:560, y:170, label:"Monitoring",    icon:"📊",  color:"#f59e0b" },
  ];

  const edges = [
    [0,2],[1,2],[2,3],[2,4],[2,5],[3,6],[4,7],[5,8],[4,9],[5,9]
  ];

  return (
    <div className="w-full border border-sky-900/25 overflow-hidden shadow-2xl shadow-sky-950/20">
      <div className="bg-[#030c18] border-b border-sky-900/25 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <Globe2 className="w-3 h-3 text-sky-400 ml-1" />
          <span className="text-[10px] font-bold font-mono text-sky-400 uppercase tracking-[0.18em]">CLOUD ARCHITECTURE · MULTI-REGION</span>
        </div>
        <span className="text-[10px] font-mono text-green-400">● ALL HEALTHY</span>
      </div>

      {/* SVG architecture diagram */}
      <div className="bg-[#040e1a] p-4">
        <svg viewBox="0 0 700 310" className="w-full" style={{ height: 200 }}>
          {/* Edges */}
          {edges.map(([from, to], i) => (
            <motion.line key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              x1={nodes[from].x + 28} y1={nodes[from].y + 14}
              x2={nodes[to].x + 28}   y2={nodes[to].y + 14}
              stroke="#1e3a5f" strokeWidth="1.5"
              strokeDasharray={nodes[from].y === nodes[to].y ? "none" : "4 3"}
            />
          ))}
          {/* Nodes */}
          {nodes.map((n, i) => (
            <motion.g key={i} initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
              transition={{ delay: 0.3 + i * 0.06 }} style={{ transformOrigin:`${n.x+28}px ${n.y+14}px` }}>
              <rect x={n.x} y={n.y} width={56} height={28} rx={4}
                fill={`${n.color}15`} stroke={`${n.color}50`} strokeWidth="1" />
              <text x={n.x+8} y={n.y+16} fontSize="11" fill={n.color}>{n.icon}</text>
              <text x={n.x+22} y={n.y+17} fontSize="7.5" fill={`${n.color}cc`} fontFamily="monospace">{n.label}</text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Provider row */}
      <div className="bg-[#030c18] border-t border-sky-900/20 px-4 py-3 grid grid-cols-3 gap-3">
        {CLOUD_PROVIDERS.map(p => (
          <div key={p.name} className="border border-sky-900/20 bg-white/[0.02] px-3 py-2 flex items-center gap-3">
            <span className="text-[11px] font-bold font-mono w-8" style={{ color:p.color }}>{p.logo}</span>
            <div>
              <p className="text-[11px] font-bold text-white">{p.name}</p>
              <p className="text-[9px] text-white/30">{p.note}</p>
            </div>
            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CloudEngineering() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Cloud Engineering — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/other-services" className="hover:text-[#1f6fb2] transition-colors">Other Services</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Cloud Engineering</span>
        </nav>
      </div>

      {/* HERO */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background:"linear-gradient(150deg,#020c18 0%,#040f20 50%,#020c18 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 right-0 w-[700px] h-[500px] rounded-full bg-sky-900/8 blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-blue-950/10 blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle, #0ea5e9 1px, transparent 1px)", backgroundSize:"36px 36px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_600px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-sky-600/30 bg-sky-600/8 px-3 py-1.5 mb-6">
                <Cloud className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-[0.16em]">Other Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                Cloud<br /><span style={{ color:"#0ea5e9" }}>Engineering</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                Cloud migration, infrastructure as code, serverless architecture, and FinOps across
                AWS, Azure, and GCP. We design and build cloud estates that are secure, cost-efficient,
                and properly documented.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"AWS",   label:"Azure · GCP also",      color:"#ff9900" },
                  { val:"IaC",   label:"100% — no console drift",color:"#0ea5e9" },
                  { val:"FinOps",label:"Cost optimised",         color:"#10b981" },
                  { val:"CSPM",  label:"Security posture mgmt",  color:"#7c3aed" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all duration-200">
                  Plan your cloud migration <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  Request cloud assessment
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }}>
              <CloudDiagram />
            </motion.div>
          </div>
        </div>
      </div>

      {/* MIGRATION STRATEGIES */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-sky-600 uppercase tracking-[0.16em] mb-3">Migration strategies</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">Three approaches. We recommend the right one for you.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {MIGRATION_STRATEGIES.map((s, i) => (
              <motion.div key={s.code} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.1 }}
                className="group border border-gray-200 bg-white hover:shadow-sm hover:border-sky-200 transition-all duration-200 overflow-hidden">
                <span className="block h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-sky-500 to-sky-300" />
                <div className="p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 border border-sky-200 text-sky-600 bg-sky-50">{s.code.toUpperCase()}</span>
                    <div className="text-right">
                      <p className="text-[9px] text-gray-400 uppercase">Effort</p>
                      <p className="text-[12px] font-bold text-[#1f3a5f]">{s.effort}</p>
                    </div>
                  </div>
                  <h4 className="text-[18px] font-serif font-bold text-[#1f3a5f] mb-3 group-hover:text-sky-700 transition-colors">{s.name}</h4>
                  <p className="text-[13px] text-gray-500 leading-[1.85] mb-5">{s.desc}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wide">Typical savings</p>
                    <p className="text-[16px] font-bold text-sky-600 font-mono">{s.savings}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* STACK */}
      <div className="bg-[#030c18] border-b border-sky-900/20">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] whitespace-nowrap font-mono">Cloud toolchain</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {STACK.map(s => (
              <div key={s.name} className="border border-sky-900/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all p-3.5">
                <p className="text-[12.5px] font-bold mb-1" style={{ color:s.color }}>{s.name}</p>
                <p className="text-[10px] text-white/25">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAPABILITIES */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-sky-600 uppercase tracking-[0.16em] mb-4">What we deliver</p>
              <h3 className="text-[30px] lg:text-[34px] font-serif text-[#1f3a5f] leading-tight mb-5">Six cloud capabilities. Multi-cloud, properly done.</h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">We're platform-agnostic. We recommend the right cloud and the right architecture for your workload, not the easiest one for us.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap, i) => (
                <motion.div key={cap.num} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                  className="group relative border border-gray-200 bg-white hover:shadow-sm transition-all duration-200 overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background:`linear-gradient(90deg,${cap.accent},${cap.accent}55)` }} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background:cap.bg }}>
                        <cap.icon className="w-4 h-4" style={{ color:cap.accent }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4 className="text-[14.5px] font-bold text-[#1f3a5f] mb-2 group-hover:text-sky-700 transition-colors">{cap.title}</h4>
                    <div className="w-6 h-[2px] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background:cap.accent }} />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map(t => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 border" style={{ background:cap.bg, color:cap.accent, borderColor:cap.accent+"30" }}>{t}</span>
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
          <p className="text-[11px] font-bold text-sky-600 uppercase tracking-[0.16em] mb-4">Migration process</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-12">From on-premise to cloud in four stages.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.num}
                className={`group relative p-8 hover:bg-sky-50 transition-colors duration-200 ${i<PROCESS.length-1?"border-b lg:border-b-0 lg:border-r border-gray-200":""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-sky-500 to-sky-300" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5">{p.num}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 group-hover:text-sky-700 transition-colors">{p.title}</h4>
                <div className="w-5 h-[2px] bg-sky-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-sky-400 uppercase tracking-[0.15em] mb-3">Cloud-first infrastructure</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Build on the cloud, the right way.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a cloud readiness assessment. We'll evaluate your current workloads, identify migration candidates, and produce an architecture blueprint.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all duration-200">
              Get a cloud assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/other-services/devops" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              DevOps engineering →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}