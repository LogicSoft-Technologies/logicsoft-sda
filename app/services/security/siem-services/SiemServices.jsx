"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Activity, Bell, BarChart3, Eye,
  Server, Shield, Clock, AlertTriangle, Zap, Database, Radio
} from "lucide-react";

// ── Design: NOC / Security Operations Centre dashboard aesthetic
// ── Accent: deep indigo #4f46e5 with electric purple highlights
// ── Signature: animated event counter dashboard + live sparkline charts
//    Feels like 24/7 monitoring from inside a real security operations centre.

const EVENT_COUNTS = [
  { label: "Events ingested today",    value: "2,847,341", delta: "+14%",  color: "#818cf8" },
  { label: "Threats detected",         value: "1,247",     delta: "+3%",   color: "#f87171" },
  { label: "Incidents created",        value: "23",        delta: "-8%",   color: "#fb923c" },
  { label: "Mean time to detect",      value: "4.2 min",   delta: "-22%",  color: "#34d399" },
  { label: "Mean time to respond",     value: "18 min",    delta: "-31%",  color: "#34d399" },
  { label: "False positive rate",      value: "0.8%",      delta: "-61%",  color: "#34d399" },
];

const CAPABILITIES = [
  {
    num: "01", icon: Activity,
    title: "Log Aggregation & Normalisation",
    accent: "#4f46e5", bg: "#eef2ff",
    desc: "Centralised ingestion from every source in your environment — cloud, on-premise, SaaS, endpoints, network devices. Normalised into a common schema for consistent correlation regardless of source format.",
    tags: ["Syslog", "CEF", "LEEF", "JSON", "Beats", "Kafka"],
  },
  {
    num: "02", icon: Eye,
    title: "Real-Time Threat Detection",
    accent: "#7c3aed", bg: "#f5f3ff",
    desc: "Correlation rules built on MITRE ATT&CK tactics and your environment's specific risk profile. Tuned to your organisation — not a generic ruleset generating alert fatigue.",
    tags: ["MITRE ATT&CK", "UEBA", "Correlation rules", "Threat intel feeds"],
  },
  {
    num: "03", icon: Bell,
    title: "Automated Alerting & Escalation",
    accent: "#4f46e5", bg: "#eef2ff",
    desc: "Priority-based alerting that reaches the right people through the right channels. P1 critical alerts routed to on-call within 2 minutes. Full escalation matrix configured to your team structure.",
    tags: ["PagerDuty", "Slack", "Email", "SMS", "Webhook"],
  },
  {
    num: "04", icon: BarChart3,
    title: "Dashboards & Reporting",
    accent: "#7c3aed", bg: "#f5f3ff",
    desc: "Executive dashboards showing risk posture at a glance. Technical dashboards for SOC analysts. Compliance reports for ISO 27001, PCI DSS, and NDPR audit evidence — generated automatically.",
    tags: ["Executive reporting", "Compliance evidence", "SOC dashboards", "Trend analysis"],
  },
  {
    num: "05", icon: Zap,
    title: "SOAR & Automated Response",
    accent: "#4f46e5", bg: "#eef2ff",
    desc: "Security Orchestration, Automation and Response — predefined playbooks that execute automatically for known threat patterns. IP blocking, account suspension, and ticket creation without human latency.",
    tags: ["SOAR playbooks", "Auto-remediation", "ServiceNow", "Jira integration"],
  },
  {
    num: "06", icon: Database,
    title: "Log Retention & Forensics",
    accent: "#7c3aed", bg: "#f5f3ff",
    desc: "Immutable, tamper-evident log storage with configurable retention periods (12–84 months). Full forensic timeline reconstruction for incident investigations and compliance audit trails.",
    tags: ["Immutable storage", "12–84mo retention", "Chain of custody", "eDiscovery ready"],
  },
];

const PLATFORMS = [
  { name: "Microsoft Sentinel", role: "Cloud-native SIEM",  color: "#0078d4", note: "Azure-native, best for M365 environments" },
  { name: "Splunk Enterprise",  role: "Enterprise SIEM",    color: "#ff5c35", note: "Maximum flexibility, largest ecosystem"    },
  { name: "Elastic SIEM",       role: "Open-core SIEM",     color: "#00bfb3", note: "Cost-effective, developer-friendly"        },
  { name: "IBM QRadar",         role: "Enterprise SIEM",    color: "#1261fe", note: "Strong compliance and network focus"       },
  { name: "Chronicle SIEM",     role: "Google Cloud SIEM",  color: "#34a853", note: "Petabyte-scale, flat-rate pricing"         },
  { name: "Wazuh",              role: "Open-source SIEM",   color: "#00a9e0", note: "Excellent for budget-conscious deployments" },
];

const TIERS = [
  {
    name: "Starter",
    price: "Managed service",
    desc: "For growing organisations establishing their first SIEM programme.",
    accent: "#818cf8",
    features: ["SIEM platform deployment and configuration", "Up to 5GB/day log ingestion", "50 baseline detection rules", "Business hours monitoring (8×5)", "Weekly threat summary report", "Email alerting"],
    cta: "Talk to us",
  },
  {
    name: "Professional",
    price: "Most popular",
    desc: "For organisations requiring continuous monitoring with faster response.",
    accent: "#4f46e5",
    featured: true,
    features: ["Up to 50GB/day log ingestion", "200+ customised detection rules", "MITRE ATT&CK coverage mapping", "Extended hours monitoring (16×7)", "SOAR playbook automation (10)", "Dedicated analyst on call", "Monthly compliance report"],
    cta: "Enquire now",
  },
  {
    name: "Enterprise",
    price: "24/7 SOC coverage",
    desc: "Full SOC-as-a-service. Unlimited scale. Named analysts. SLA-backed response.",
    accent: "#7c3aed",
    features: ["Unlimited log ingestion", "Custom rule development — unlimited", "Full MITRE ATT&CK coverage", "24/7/365 analyst monitoring", "2-minute P1 alert SLA", "SOAR — unlimited playbooks", "Dedicated SIEM engineer", "Quarterly red team exercises"],
    cta: "Book a call",
  },
];

const PROCESS = [
  { num: "01", title: "Environment Discovery",   desc: "Inventory of all log sources, network topology, cloud accounts, and critical assets. Scoping report delivered before any deployment."             },
  { num: "02", title: "Platform Deployment",     desc: "SIEM platform deployed and configured — log collectors, parsing rules, and retention policies — typically within 2 weeks."                    },
  { num: "03", title: "Tuning & Baselining",     desc: "30-day baseline period. Detection rules tuned against your specific traffic patterns to reduce false positives before going live."              },
  { num: "04", title: "Go-Live Monitoring",      desc: "Full monitoring activated. Alerting matrix configured. Runbooks for common incident types handed to your team."                                },
];

// ── NOC Dashboard visual ──────────────────────────────────────────────────────
function NocDashboard() {
  // Fake sparkline path
  const spark = (points) => {
    const w = 80, h = 30;
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const min = Math.min(...points), max = Math.max(...points);
    const ys = points.map(p => h - ((p - min) / (max - min + 0.001)) * h);
    return xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  };

  const charts = [
    { label: "Events/min",   points: [120,145,132,168,155,180,142,195,178,210,188,205], color: "#818cf8" },
    { label: "Threats",      points: [2,1,4,3,2,6,4,3,5,3,4,3],                        color: "#f87171" },
    { label: "MTTD (min)",   points: [8,7,6,5,4.5,4.2,4.8,4.1,4.3,4.2,4.0,4.2],       color: "#34d399" },
  ];

  return (
    <div className="w-full max-w-[580px] border border-indigo-900/30 overflow-hidden shadow-2xl shadow-indigo-950/30">
      {/* Header bar */}
      <div className="bg-[#080614] border-b border-indigo-900/30 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2 ml-1">
            <Radio className="w-3 h-3 text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-bold font-mono text-indigo-400 uppercase tracking-[0.18em]">SOC DASHBOARD · LIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-gray-600">WAT · 09:14:33</span>
          <span className="text-[10px] font-mono font-bold text-green-400">● ALL SYSTEMS</span>
        </div>
      </div>

      <div className="bg-[#05030f] p-4 space-y-3">
        {/* Event counter grid */}
        <div className="grid grid-cols-3 gap-2">
          {EVENT_COUNTS.map((e, i) => (
            <motion.div key={e.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="border border-indigo-900/20 bg-white/[0.02] p-3">
              <p className="text-[18px] font-bold font-mono leading-none mb-0.5" style={{ color: e.color }}>{e.value}</p>
              <p className="text-[8.5px] text-white/30 uppercase mb-1">{e.label}</p>
              <p className="text-[9px] font-mono" style={{ color: e.delta.startsWith("-") ? "#34d399" : "#f87171" }}>{e.delta} vs yesterday</p>
            </motion.div>
          ))}
        </div>

        {/* Sparkline charts */}
        <div className="grid grid-cols-3 gap-2">
          {charts.map((c, ci) => (
            <div key={c.label} className="border border-indigo-900/20 bg-white/[0.02] p-3">
              <p className="text-[9px] text-white/30 uppercase mb-2">{c.label}</p>
              <svg viewBox={`0 0 80 30`} className="w-full" style={{ height: 30 }}>
                <defs>
                  <linearGradient id={`grad${ci}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={c.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={c.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={spark(c.points) + ` L80,30 L0,30 Z`} fill={`url(#grad${ci})`} />
                <path d={spark(c.points)} fill="none" stroke={c.color} strokeWidth="1.5" />
              </svg>
            </div>
          ))}
        </div>

        {/* Recent alerts */}
        <div className="border border-indigo-900/20 bg-white/[0.01]">
          <div className="px-3 py-2 border-b border-indigo-900/20 flex items-center justify-between">
            <span className="text-[9px] font-bold font-mono text-indigo-400/60 uppercase tracking-widest">Recent Alerts</span>
            <span className="text-[9px] font-mono text-gray-700">last 15 min</span>
          </div>
          <div className="divide-y divide-indigo-950/30">
            {[
              { sev:"P1", title:"Lateral movement — 3 hosts",      time:"09:12",  color:"#ef4444" },
              { sev:"P2", title:"Impossible travel — user jide@",  time:"09:09",  color:"#f97316" },
              { sev:"P3", title:"Privilege escalation attempt",     time:"09:06",  color:"#f59e0b" },
              { sev:"P3", title:"Anomalous data exfil — 2.4GB",    time:"09:02",  color:"#f59e0b" },
            ].map((a, i) => (
              <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ delay: 0.8 + i * 0.08 }}
                className="px-3 py-2 flex items-center gap-2.5 hover:bg-white/[0.02] transition-colors">
                <span className="text-[9px] font-bold font-mono w-6 shrink-0" style={{ color:a.color }}>{a.sev}</span>
                <span className="text-[11px] text-white/50 flex-1 truncate">{a.title}</span>
                <span className="text-[9px] font-mono text-gray-700">{a.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#080614] border-t border-indigo-900/20 px-4 py-2 flex justify-between">
        <span className="text-[9.5px] font-mono text-gray-700">Sources: 142 · Rules: 312 active</span>
        <span className="text-[9.5px] font-mono text-indigo-400 font-bold">Sentinel · Elastic · Wazuh</span>
      </div>
    </div>
  );
}

export default function SiemServices() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">SIEM Services — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/security" className="hover:text-[#1f6fb2] transition-colors">Security</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">SIEM Services</span>
        </nav>
      </div>

      {/* HERO — deep indigo NOC aesthetic */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg,#03020e 0%,#06041a 50%,#040210 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-20 w-[700px] h-[600px] rounded-full bg-indigo-900/10 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-violet-950/12 blur-[120px]" />
        </div>
        {/* Diamond grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle, #4f46e5 1px, transparent 1px)", backgroundSize:"30px 30px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_600px] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-indigo-600/30 bg-indigo-600/8 px-3 py-1.5 mb-6">
                <Radio className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-[0.16em] font-mono">Security Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                SIEM<br /><span style={{ color:"#818cf8" }}>Services</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                Security Information and Event Management — deployed, tuned, and monitored by our
                analysts. Real-time threat detection across your entire environment, 24 hours a day,
                365 days a year.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val: "24/7",   label: "Analyst monitoring",      color: "#818cf8" },
                  { val: "2min",   label: "P1 alert SLA",            color: "#f87171" },
                  { val: "MITRE",  label: "ATT&CK coverage",         color: "#34d399" },
                  { val: "Multi",  label: "Platform — not locked in", color: "#818cf8" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1 font-mono" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200">
                  Request a SIEM demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  View pricing tiers
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }} className="flex justify-center lg:justify-end">
              <NocDashboard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* PLATFORMS */}
      <div className="bg-[#06040f] border-b border-indigo-900/20">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] whitespace-nowrap font-mono">Platforms we deploy</span>
            <div className="flex-1 h-px bg-white/6" />
            <span className="text-[10px] text-white/20 whitespace-nowrap">Platform-agnostic — we recommend what's right for you</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PLATFORMS.map(p => (
              <div key={p.name} className="group border border-indigo-900/20 bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo-700/30 transition-all duration-200 p-4">
                <p className="text-[12.5px] font-bold mb-1" style={{ color:p.color }}>{p.name}</p>
                <p className="text-[10px] text-white/25 mb-2">{p.role}</p>
                <p className="text-[10px] text-white/20 leading-snug">{p.note}</p>
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
              <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.16em] mb-4">What we deliver</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Six SIEM capabilities. All managed.
              </h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">
                Deploying a SIEM is the easy part. Tuning it, maintaining it, and acting on
                what it tells you is where most programmes fail. We handle all of it.
              </p>
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
                    <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-2 group-hover:text-indigo-700 transition-colors">{cap.title}</h4>
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

      {/* TIERS */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.16em] mb-3">Service tiers</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Choose the level of coverage you need.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {TIERS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.1 }}
                className={`relative border bg-white overflow-hidden ${t.featured ? "border-indigo-300 shadow-lg shadow-indigo-100" : "border-gray-200"}`}>
                {t.featured && (
                  <div className="absolute top-0 left-0 right-0 text-center py-1.5 text-[10px] font-bold text-white uppercase tracking-[0.15em]"
                    style={{ background:"#4f46e5" }}>
                    Most popular
                  </div>
                )}
                <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background:`linear-gradient(90deg,${t.accent},${t.accent}55)` }} />
                <div className={`p-7 ${t.featured ? "pt-10" : ""}`}>
                  <h4 className="text-[22px] font-serif font-bold text-[#1f3a5f] mb-1">{t.name}</h4>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] mb-4" style={{ color:t.accent }}>{t.price}</p>
                  <p className="text-[13px] text-gray-500 leading-[1.8] mb-6">{t.desc}</p>
                  <div className="space-y-2.5 mb-8">
                    {t.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background:t.accent+"18" }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background:t.accent }} />
                        </div>
                        <p className="text-[12.5px] text-gray-600">{f}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="block text-center py-3 text-[13px] font-bold transition-all duration-200"
                    style={{ background: t.featured ? t.accent : "transparent", color: t.featured ? "#fff" : t.accent, border:`2px solid ${t.accent}` }}>
                    {t.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[12px] text-gray-400 mt-6 text-center">All tiers include platform licensing, configuration, and onboarding. Custom volumes available. Prices on request.</p>
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.16em] mb-4">Deployment process</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Live monitoring in 4 stages.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.num}
                className={`group relative p-8 hover:bg-indigo-50 transition-colors duration-200 ${i < PROCESS.length-1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}>
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-violet-400" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 border text-indigo-600 bg-indigo-50 border-indigo-100">{p.num}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2 group-hover:text-indigo-700 transition-colors">{p.title}</h4>
                <div className="w-5 h-[2px] bg-indigo-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RELATED */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Pair with</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title:"Penetration Testing", href:"/services/security/penetration-testing", accent:"#ef4444", desc:"Test what the SIEM is protecting."       },
              { title:"Security Testing",    href:"/services/security/security-testing",     accent:"#0d9488", desc:"Shift security left into your SDLC."    },
              { title:"Compliance",          href:"/services/security/compliance",            accent:"#d97706", desc:"SIEM evidence for ISO 27001 & PCI DSS." },
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
            <p className="text-[11px] font-bold text-indigo-300 uppercase tracking-[0.15em] mb-3">24/7 threat visibility</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">See everything. Miss nothing. Respond faster.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a SIEM demo. We'll show you exactly what a tuned, managed SIEM deployment looks like for an organisation like yours.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200">
              Request a demo <ArrowRight className="w-4 h-4" />
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