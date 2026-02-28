"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, ShieldAlert, Lock, Eye,
  Activity, AlertTriangle, ChevronRight, Terminal,
} from "lucide-react";

// ── Design: SOC command-centre. Deep crimson-black, animated live threat feed
//    terminal, hex dot grid, red danger accent on near-black.

const THREAT_FEED = [
  { time: "09:14:22", sev: "CRIT", type: "Auth bypass attempt — /admin",       src: "194.165.16.x",  action: "BLOCKED"   },
  { time: "09:14:18", sev: "HIGH", type: "SQL injection — POST /api/users",     src: "185.220.101.x", action: "BLOCKED"   },
  { time: "09:14:11", sev: "HIGH", type: "XSS payload in form submission",      src: "91.109.14.x",   action: "BLOCKED"   },
  { time: "09:13:59", sev: "MED",  type: "Brute force — SSH port 22",           src: "103.75.22.x",   action: "THROTTLED" },
  { time: "09:13:44", sev: "INFO", type: "Port scan — TCP/80,443,8080",         src: "45.153.204.x",  action: "LOGGED"    },
  { time: "09:13:31", sev: "MED",  type: "Anomalous API rate — 480 req/s",      src: "195.54.160.x",  action: "THROTTLED" },
  { time: "09:13:10", sev: "INFO", type: "TLS 1.0 handshake rejected",          src: "80.94.95.x",    action: "REJECTED"  },
];
const SEV_STYLE = {
  CRIT: { bg:"#3b0000", text:"#fca5a5" },
  HIGH: { bg:"#431407", text:"#fdba74" },
  MED:  { bg:"#3d2f00", text:"#fcd34d" },
  INFO: { bg:"#0c1a2e", text:"#93c5fd" },
};
const ACTION_COLOR = { BLOCKED:"#10b981", THROTTLED:"#f59e0b", LOGGED:"#6b7280", REJECTED:"#dc2626" };

const SERVICES = [
  { num:"01", icon:ShieldAlert, title:"Penetration Testing",   href:"/services/security/penetration-testing", accent:"#ef4444", bg:"#fff1f2", desc:"Authorised simulated attacks on web apps, APIs, mobile, and network infrastructure — before real attackers do it." },
  { num:"02", icon:Activity,    title:"SIEM Services",         href:"/services/security/siem-services",        accent:"#f59e0b", bg:"#fffbeb", desc:"24/7 real-time threat detection, log correlation, and automated incident alerting across your entire stack." },
  { num:"03", icon:Shield,      title:"Compliance Consulting", href:"/services/security/compliance",           accent:"#1f6fb2", bg:"#eaf4ff", desc:"ISO 27001, NDPR, GDPR, PCI DSS, HIPAA — certification and readiness programmes managed end-to-end." },
  { num:"04", icon:Eye,         title:"Security Testing",      href:"/services/security/security-testing",     accent:"#0d9488", bg:"#f0fdfa", desc:"SAST, DAST, SCA and manual code review integrated into your SDLC. Vulnerabilities found before release, not after." },
];

const STATS = [
  { val:"300+",  label:"Assessments delivered",     color:"#10b981" },
  { val:"OWASP", label:"Top 10 baseline standard",  color:"#f59e0b" },
  { val:"ISO",   label:"27001 certified practice",  color:"#1f6fb2" },
  { val:"24/7",  label:"SIEM monitoring available", color:"#ef4444" },
];

const PILLARS = [
  { icon:Terminal, title:"Offensive Security",      items:["Black / grey / white-box testing","Social engineering simulations","Physical security assessments","Red team exercises"] },
  { icon:Activity, title:"Detection & Response",    items:["SIEM deployment and tuning","Incident response planning","Threat hunting operations","Digital forensic investigation"] },
  { icon:Shield,   title:"Defensive Engineering",   items:["Security architecture review","Hardening & baseline config","WAF and DDoS mitigation","Zero-trust network design"] },
  { icon:Lock,     title:"Compliance & Governance", items:["ISO 27001 implementation","NDPR & GDPR programmes","Policy and procedure writing","Audit preparation & support"] },
];

function ThreatTerminal() {
  return (
    <div className="w-full max-w-[600px] border border-red-900/30 overflow-hidden shadow-2xl shadow-red-950/40">
      <div className="bg-[#0a0404] border-b border-red-950/50 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2 ml-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold font-mono text-red-400 uppercase tracking-[0.18em]">LIVE THREAT FEED · SOC-01</span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-green-500">● ACTIVE</span>
      </div>

      <div className="bg-[#0d0606] border-b border-red-950/30 px-4 py-1.5 grid gap-2" style={{ gridTemplateColumns:"72px 44px 1fr 96px 76px" }}>
        {["TIME","SEV","THREAT DETECTED","SOURCE","ACTION"].map(h => (
          <span key={h} className="text-[9px] font-bold font-mono text-gray-700 uppercase tracking-[0.14em]">{h}</span>
        ))}
      </div>

      <div className="bg-[#080303] divide-y divide-red-950/20">
        {THREAT_FEED.map((r, i) => {
          const s = SEV_STYLE[r.sev];
          return (
            <motion.div key={i} initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.2 }}
              className="px-4 py-2 grid gap-2 items-center hover:bg-white/[0.02] transition-colors"
              style={{ gridTemplateColumns:"72px 44px 1fr 96px 76px" }}>
              <span className="text-[9.5px] font-mono text-gray-700">{r.time}</span>
              <span className="text-[8.5px] font-bold font-mono px-1.5 py-0.5 text-center" style={{ background:s.bg, color:s.text }}>{r.sev}</span>
              <span className="text-[11px] font-mono truncate" style={{ color: r.sev==="CRIT" ? "#fca5a5" : "#9ca3af" }}>{r.type}</span>
              <span className="text-[9.5px] font-mono text-gray-700 truncate">{r.src}</span>
              <span className="text-[9px] font-bold font-mono" style={{ color: ACTION_COLOR[r.action] }}>{r.action}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-[#0a0404] border-t border-red-950/30 px-4 py-2 flex items-center justify-between">
        <span className="text-[9.5px] font-mono text-gray-700">847 events today · 12 blocked · 0 breaches</span>
        <span className="text-[9.5px] font-mono text-green-500 font-bold">ALL SYSTEMS SECURED ✓</span>
      </div>
    </div>
  );
}

export default function CyberSecurity() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Cybersecurity Services — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Cybersecurity</span>
        </nav>
      </div>

      {/* HERO */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background:"linear-gradient(150deg,#050008 0%,#0a0205 45%,#080012 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-red-900/10 blur-[140px]" />
          <div className="absolute -bottom-20 right-0 w-[500px] h-[400px] rounded-full bg-red-950/14 blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle, #dc2626 1px, transparent 1px)", backgroundSize:"28px 28px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_620px] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-red-600/30 bg-red-600/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-[0.16em] font-mono">Security Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[58px] font-serif text-white leading-[1.05] mb-5">
                Cybersecurity<br /><span className="text-red-500">Services</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                Offensive testing, continuous threat monitoring, compliance readiness, and
                security engineering — a full-spectrum practice for organisations that treat
                security as a business requirement, not an afterthought.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {STATS.map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-red-600 hover:bg-red-500 transition-all duration-200">
                  Request an assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  Case studies
                </Link>
              </div>
            </div>
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }} className="flex justify-center lg:justify-end">
              <ThreatTerminal />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ALERT BAND */}
      <div className="bg-[#1c0a00] border-b border-amber-900/30">
        <div className="max-w-[82rem] mx-auto px-4 py-4 flex items-center gap-4">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-[13px] text-amber-200/65">
            <span className="font-bold text-amber-400">43% of cyberattacks target SMBs.</span>{" "}
            Most are preventable with a structured security programme — not a one-time scan.
          </p>
          <Link href="/contact" className="ml-auto shrink-0 text-[12px] font-bold text-amber-400 hover:text-amber-300 whitespace-nowrap flex items-center gap-1">
            Get assessed <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* SERVICE AREAS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em] mb-3">Practice areas</p>
          <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Four disciplines. One security partner.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => (
              <motion.div key={s.num} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.08 }}>
                <Link href={s.href} className="group relative flex flex-col border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden h-full">
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background:`linear-gradient(90deg,${s.accent},${s.accent}55)` }} />
                  <div className="p-7 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background:s.bg }}>
                          <s.icon className="w-5 h-5" style={{ color:s.accent }} />
                        </div>
                        <span className="text-[10px] font-mono text-gray-300">{s.num}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200 mt-1" />
                    </div>
                    <h4 className="text-[18px] font-serif font-bold text-[#1f3a5f] mb-2 group-hover:text-red-600 transition-colors duration-200">{s.title}</h4>
                    <div className="w-8 h-[2px] mb-4 opacity-20 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" style={{ background:s.accent }} />
                    <p className="text-[13.5px] text-gray-500 leading-[1.85] flex-1">{s.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* PILLARS — dark */}
      <div className="border-b border-red-950/30" style={{ background:"linear-gradient(160deg,#070205 0%,#0d0308 100%)" }}>
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.16em] mb-3">Full-spectrum coverage</p>
          <h3 className="text-[28px] lg:text-[34px] font-serif text-white mb-12">Every attack surface. Every compliance framework.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PILLARS.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.08 }}
                className="group border border-red-900/20 bg-white/[0.02] hover:bg-white/[0.04] hover:border-red-700/30 transition-all duration-200 p-6">
                <div className="w-9 h-9 flex items-center justify-center bg-red-950/50 border border-red-900/30 mb-5">
                  <p.icon className="w-4 h-4 text-red-400" />
                </div>
                <h4 className="text-[14px] font-bold text-white mb-4 group-hover:text-red-300 transition-colors">{p.title}</h4>
                <ul className="space-y-2">
                  {p.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-white/40">
                      <span className="w-1 h-1 rounded-full bg-red-800 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Standards we work to</p>
            <h3 className="text-[20px] font-serif text-[#1f3a5f]">We test and consult against the frameworks that matter.</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["ISO 27001","SOC 2","OWASP","NIST CSF","CIS Controls","PCI DSS","HIPAA","GDPR","NDPR","PTES"].map(c => (
              <span key={c} className="text-[11px] font-bold text-[#1f3a5f] border border-gray-200 bg-[#f9fafb] px-3 py-1.5 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-colors cursor-default">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-red-400 uppercase tracking-[0.15em] mb-3">Don't wait for a breach</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Know your exposure before attackers do.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Our security team will map your attack surface, identify critical gaps, and deliver a prioritised remediation roadmap.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-red-600 hover:bg-red-500 transition-all duration-200">
              Request assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/security/penetration-testing" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              Penetration testing →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}