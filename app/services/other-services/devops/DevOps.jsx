"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, GitMerge, Repeat2, Server, Cpu,
  BarChart3, Shield, Clock, CheckCircle2, Zap, Package
} from "lucide-react";

// ── Design: CI/CD pipeline conveyor-belt aesthetic. Deep charcoal with
//    orange #f97316 accent — the colour of a build in progress.
//    Signature: animated pipeline stages with status indicators, deploy counter.

const PIPELINE_STAGES = [
  { id:"code",    icon:"⌨",  label:"Code",     sub:"Push to repo",          status:"done",    time:"0s"     },
  { id:"test",    icon:"✓",  label:"Test",     sub:"Unit + integration",    status:"done",    time:"2m 14s" },
  { id:"scan",    icon:"⚡",  label:"Security", sub:"SAST + SCA scan",       status:"done",    time:"1m 47s" },
  { id:"build",   icon:"⚙",  label:"Build",    sub:"Docker image",          status:"running", time:"~3min"  },
  { id:"stage",   icon:"◈",  label:"Staging",  sub:"Deploy + smoke test",   status:"pending", time:"—"      },
  { id:"approve", icon:"✎",  label:"Approve",  sub:"Manual gate",           status:"pending", time:"—"      },
  { id:"prod",    icon:"◉",  label:"Production",sub:"Blue-green deploy",    status:"pending", time:"—"      },
];

const STATUS_COLOR = { done:"#10b981", running:"#f97316", pending:"#374151" };
const STATUS_LABEL = { done:"PASSED", running:"RUNNING", pending:"WAITING" };

const CAPABILITIES = [
  {
    num:"01", icon:GitMerge,
    title:"CI/CD Pipeline Design & Implementation",
    accent:"#f97316", bg:"#fff7ed",
    desc:"Automated build, test, and deployment pipelines from day one. GitHub Actions, GitLab CI, Bitbucket Pipelines, Jenkins — we design the workflow, write the manifests, and own the outcome.",
    tags:["GitHub Actions","GitLab CI","Jenkins","Bitbucket Pipelines","ArgoCD"],
  },
  {
    num:"02", icon:Package,
    title:"Container & Kubernetes Orchestration",
    accent:"#0ea5e9", bg:"#f0f9ff",
    desc:"Docker containerisation of every service. Kubernetes cluster setup, namespace design, RBAC policies, Helm chart authorship, and HPA configuration for elastic workloads.",
    tags:["Docker","Kubernetes","Helm","Kustomize","HPA / VPA"],
  },
  {
    num:"03", icon:Server,
    title:"Infrastructure as Code",
    accent:"#f97316", bg:"#fff7ed",
    desc:"Every infrastructure resource defined in version-controlled code. Terraform modules for AWS, GCP, and Azure. No more snowflake servers; no more undocumented manual changes.",
    tags:["Terraform","Pulumi","Ansible","CloudFormation","Crossplane"],
  },
  {
    num:"04", icon:Shield,
    title:"GitOps & Deployment Strategy",
    accent:"#0ea5e9", bg:"#f0f9ff",
    desc:"Git as the single source of truth for infrastructure and application state. ArgoCD or Flux for declarative continuous delivery. Blue-green, canary, and rolling deployments configured and automated.",
    tags:["ArgoCD","Flux CD","Blue-green","Canary","Feature flags"],
  },
  {
    num:"05", icon:BarChart3,
    title:"Observability Stack",
    accent:"#f97316", bg:"#fff7ed",
    desc:"Prometheus + Grafana for metrics, ELK / Loki for logs, Jaeger / Tempo for distributed traces. Alerting rules, SLO dashboards, and runbooks for every critical service path.",
    tags:["Prometheus","Grafana","Loki","OpenTelemetry","PagerDuty"],
  },
  {
    num:"06", icon:Repeat2,
    title:"Platform Engineering & Developer Experience",
    accent:"#0ea5e9", bg:"#f0f9ff",
    desc:"Internal developer platforms that reduce cognitive load. Self-service environments, golden path templates, scaffolding tooling, and onboarding that gets a new engineer deploying in under an hour.",
    tags:["Backstage","Port","Crossplane","Golden paths","IDP"],
  },
];

const METRICS = [
  { before:"4 weeks",  after:"Same day",  label:"Deployment lead time",         icon:Clock  },
  { before:"8/year",   after:"20+/day",   label:"Deployment frequency",         icon:Zap    },
  { before:"4 hrs",    after:"< 15 min",  label:"Mean time to restore (MTTR)",  icon:Repeat2},
  { before:"22%",      after:"< 1%",      label:"Change failure rate",          icon:CheckCircle2 },
];

const STACK = [
  { name:"Terraform",      role:"IaC",         color:"#7B42BC" },
  { name:"Kubernetes",     role:"Orchestration",color:"#326ce5" },
  { name:"ArgoCD",         role:"GitOps",      color:"#ef7b4d" },
  { name:"Prometheus",     role:"Metrics",     color:"#e6522c" },
  { name:"Grafana",        role:"Dashboards",  color:"#f46800" },
  { name:"GitHub Actions", role:"CI",          color:"#2088ff" },
  { name:"Docker",         role:"Containers",  color:"#0db7ed" },
  { name:"Helm",           role:"Packaging",   color:"#0f1689" },
];

const PROCESS = [
  { num:"01", title:"Current State Audit",      desc:"We map your existing delivery process — deployment steps, lead time, failure rate, and infrastructure state — before proposing anything."  },
  { num:"02", title:"Pipeline Architecture",     desc:"Pipeline design, branching strategy, environment model (dev → staging → prod), and toolchain selection documented and agreed."            },
  { num:"03", title:"Foundation Build",          desc:"CI/CD pipeline, containerisation, IaC baseline, and observability stack established in the first sprint."                                },
  { num:"04", title:"Handover & Enablement",    desc:"Your team trained on the toolchain. Runbooks written. On-call process defined. Platform handed over, not just built."                    },
];

// ── Pipeline visual ───────────────────────────────────────────────────────────
function PipelineVisual() {
  return (
    <div className="w-full border border-orange-900/25 overflow-hidden shadow-2xl shadow-orange-950/20">
      {/* Header */}
      <div className="bg-[#0c0802] border-b border-orange-900/25 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <Cpu className="w-3 h-3 text-orange-500 ml-1" />
          <span className="text-[10px] font-bold font-mono text-orange-400 uppercase tracking-[0.18em]">CI/CD PIPELINE · BUILD #1,247</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-mono text-orange-400">IN PROGRESS</span>
        </div>
      </div>

      {/* Repo info */}
      <div className="bg-[#0d0a04] border-b border-orange-950/30 px-4 py-2 flex items-center gap-4">
        <span className="text-[10px] font-mono text-gray-600">repo: logicsoft/api-service</span>
        <span className="text-[10px] font-mono text-gray-600">branch: main</span>
        <span className="text-[10px] font-mono text-gray-600">commit: a4f2c91</span>
        <span className="text-[10px] font-mono text-gray-600">author: dev@logicsoft.ng</span>
      </div>

      {/* Pipeline stages */}
      <div className="bg-[#080602] p-4">
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={stage.id} className="flex items-start">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.3 }}
                className="flex flex-col items-center min-w-[80px]"
              >
                {/* Stage box */}
                <div className={`w-16 h-16 border flex flex-col items-center justify-center relative ${
                  stage.status === "done" ? "border-green-800/50 bg-green-950/30" :
                  stage.status === "running" ? "border-orange-600/50 bg-orange-950/30" :
                  "border-gray-800/50 bg-gray-950/20"
                }`}>
                  {stage.status === "running" && (
                    <div className="absolute inset-0 border border-orange-500/30 animate-pulse" />
                  )}
                  <span className="text-[16px] mb-0.5">{stage.icon}</span>
                  <span className="text-[8.5px] font-bold font-mono" style={{ color: STATUS_COLOR[stage.status] }}>{STATUS_LABEL[stage.status]}</span>
                </div>
                <p className="text-[10px] font-bold text-gray-300 mt-2 text-center">{stage.label}</p>
                <p className="text-[9px] text-gray-700 text-center leading-snug">{stage.sub}</p>
                <p className="text-[9px] font-mono mt-1" style={{ color: STATUS_COLOR[stage.status] }}>{stage.time}</p>
              </motion.div>

              {/* Connector */}
              {i < PIPELINE_STAGES.length - 1 && (
                <div className="flex items-center mt-7 mx-1">
                  <div className={`w-5 h-px ${stage.status === "done" ? "bg-green-700" : "bg-gray-800"}`} />
                  <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent"
                    style={{ borderLeftColor: stage.status === "done" ? "#166534" : "#1f2937" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Log tail */}
      <div className="bg-[#050400] border-t border-orange-950/20 px-4 py-3 font-mono text-[11px] space-y-1">
        {[
          { t:"[build] Step 1/9 : FROM node:20-alpine",                    c:"#6b7280" },
          { t:"[build] Step 4/9 : RUN npm ci --production",                c:"#6b7280" },
          { t:"[build] Step 9/9 : CMD [\"node\", \"server.js\"]",          c:"#6b7280" },
          { t:"[build] Successfully built image 94mb (↓ 12% vs last)",     c:"#f97316" },
          { t:"[push]  Pushing to registry.logicsoft.ng/api:1.247...",      c:"#6b7280" },
        ].map((l, i) => (
          <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay: 1.2 + i*0.15 }} style={{ color: l.c }}>{l.t}</motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-[#0c0802] border-t border-orange-950/20 px-4 py-2 flex justify-between">
        <span className="text-[9.5px] font-mono text-gray-700">Triggered by: git push · main</span>
        <span className="text-[9.5px] font-mono text-orange-400 font-bold">BUILD STAGE 4/7</span>
      </div>
    </div>
  );
}

export default function DevOps() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">DevOps Engineering — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/other-services" className="hover:text-[#1f6fb2] transition-colors">Other Services</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">DevOps</span>
        </nav>
      </div>

      {/* HERO */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg,#0c0602 0%,#100800 50%,#0a0600 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[500px] rounded-full bg-orange-900/10 blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-950/12 blur-[100px]" />
        </div>
        {/* Gear / grid texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)", backgroundSize:"48px 48px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_580px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-orange-600/30 bg-orange-600/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-[0.16em] font-mono">Other Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                DevOps<br /><span className="text-orange-500">Engineering</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                CI/CD pipelines, container orchestration, infrastructure as code, and observability —
                the engineering discipline that turns great software into software that ships. Fast,
                reliably, and repeatedly.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"20+/day", label:"Deploy frequency target",  color:"#f97316" },
                  { val:"<1%",     label:"Change failure rate",       color:"#10b981" },
                  { val:"15min",   label:"MTTR target",               color:"#10b981" },
                  { val:"100%",    label:"Infrastructure as code",    color:"#f97316" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1 font-mono" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all duration-200">
                  Improve your pipeline <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  Request a DevOps audit
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }}>
              <PipelineVisual />
            </motion.div>
          </div>
        </div>
      </div>

      {/* DORA METRICS */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.16em] mb-3">DORA metrics impact</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">What a mature DevOps practice looks like in numbers.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.08 }}
                className="group border border-gray-200 bg-white hover:shadow-sm hover:border-orange-200 transition-all duration-200 overflow-hidden">
                <span className="block h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-orange-500 to-orange-200" />
                <div className="p-6">
                  <m.icon className="w-5 h-5 text-orange-400 mb-4" />
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="border border-gray-100 bg-gray-50 px-3 py-2 text-center">
                      <p className="text-[9px] text-gray-400 uppercase mb-1">Before</p>
                      <p className="text-[14px] font-bold text-gray-500 font-mono">{m.before}</p>
                    </div>
                    <div className="border border-orange-100 bg-orange-50 px-3 py-2 text-center">
                      <p className="text-[9px] text-orange-400 uppercase mb-1">After</p>
                      <p className="text-[14px] font-bold text-orange-600 font-mono">{m.after}</p>
                    </div>
                  </div>
                  <p className="text-[12.5px] font-semibold text-[#1f3a5f]">{m.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 mt-5 italic">Based on DORA State of DevOps research. Typical outcomes after 6-month DevOps transformation engagement.</p>
        </div>
      </div>

      {/* STACK */}
      <div className="bg-[#0c0800] border-b border-orange-950/20">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] whitespace-nowrap font-mono">DevOps toolchain</span>
            <div className="flex-1 h-px bg-white/6" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {STACK.map(s => (
              <div key={s.name} className="border border-orange-950/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-800/30 transition-all p-3.5">
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
              <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.16em] mb-4">What we deliver</p>
              <h3 className="text-[30px] lg:text-[34px] font-serif text-[#1f3a5f] leading-tight mb-5">Six capabilities that accelerate delivery.</h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">Every DevOps engagement ends with your team owning a platform they understand — not a black box we manage.</p>
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
                    <h4 className="text-[14.5px] font-bold text-[#1f3a5f] mb-2 group-hover:text-orange-600 transition-colors">{cap.title}</h4>
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
          <p className="text-[11px] font-bold text-orange-600 uppercase tracking-[0.16em] mb-4">Engagement model</p>
          <h3 className="text-[28px] lg:text-[34px] font-serif text-[#1f3a5f] mb-12">From audit to autonomous platform.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.num}
                className={`group relative p-8 hover:bg-orange-50 transition-colors duration-200 ${i<PROCESS.length-1?"border-b lg:border-b-0 lg:border-r border-gray-200":""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-orange-500 to-orange-300" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5">{p.num}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 group-hover:text-orange-600 transition-colors">{p.title}</h4>
                <div className="w-5 h-[2px] bg-orange-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity" />
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
            <p className="text-[11px] font-bold text-orange-400 uppercase tracking-[0.15em] mb-3">Ship faster. Break less.</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Transform your delivery pipeline.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">We'll audit your current process, identify the bottlenecks, and build a DevOps programme that changes your DORA metrics in 90 days.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-orange-600 hover:bg-orange-500 transition-all duration-200">
              Start the conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/cloud-engineering" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Cloud engineering →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}