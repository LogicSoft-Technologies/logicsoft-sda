"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Target, Crosshair, AlertTriangle, ShieldOff, Wifi, Database, Globe, Smartphone, Server } from "lucide-react";

// ── Design: Red team / offensive security. Pure black, neon red #ef4444,
//    monospace type used as decoration, attack methodology visualised as
//    step-by-step terminal flow. Feels like someone who FINDS the holes.

const ATTACK_TYPES = [
  {
    num:"01", icon:Globe,      title:"Web Application Pentest",
    accent:"#ef4444",
    scope:"Public-facing web apps, APIs, web services",
    methods:["OWASP Top 10 manual testing","Injection flaws (SQL, NoSQL, LDAP, OS)","Broken authentication & session management","IDOR and access control bypass","Business logic vulnerability analysis","API endpoint enumeration and abuse"],
    output:"Full technical report with CVSS scores, proof-of-concept code, and remediation guidance.",
  },
  {
    num:"02", icon:Wifi,       title:"Network & Infrastructure Pentest",
    accent:"#f97316",
    scope:"Internal networks, firewalls, VPNs, cloud infra",
    methods:["Network discovery and enumeration","Exploitation of unpatched services","Credential attacks and privilege escalation","Lateral movement simulation","Cloud misconfiguration assessment","Firewall and IDS/IPS evasion testing"],
    output:"Network topology findings, exploitation path diagrams, and hardening recommendations.",
  },
  {
    num:"03", icon:Smartphone, title:"Mobile Application Pentest",
    accent:"#ef4444",
    scope:"iOS and Android apps, backend APIs",
    methods:["Static analysis (SAST) of app binary","Dynamic analysis on real device","Insecure data storage testing","Improper session handling","Man-in-the-middle interception","Reverse engineering & obfuscation review"],
    output:"OWASP MASVS-aligned report with severity ratings and developer remediation tasks.",
  },
  {
    num:"04", icon:Database,   title:"API Security Testing",
    accent:"#f97316",
    scope:"REST, GraphQL, gRPC APIs",
    methods:["Full endpoint enumeration","Authentication and authorisation bypass","Mass assignment and parameter tampering","GraphQL introspection and query abuse","JWT manipulation and algorithm confusion","Rate limiting and resource exhaustion"],
    output:"API-specific findings mapped to OWASP API Security Top 10.",
  },
  {
    num:"05", icon:Server,     title:"Cloud Configuration Review",
    accent:"#ef4444",
    scope:"AWS, GCP, Azure environments",
    methods:["IAM policy misconfiguration review","S3/Blob/GCS bucket exposure checks","Security group and firewall rule audit","Container and Kubernetes security review","Secrets in code repositories scan","Logging and monitoring coverage gaps"],
    output:"Cloud security posture report with remediation priority matrix.",
  },
  {
    num:"06", icon:ShieldOff,  title:"Red Team Exercises",
    accent:"#f97316",
    scope:"Full organisation, people, process, technology",
    methods:["Custom attack scenarios per organisation","Phishing and social engineering campaigns","Physical security testing","Assumed breach simulation","Persistence and exfiltration testing","Defender detection capability assessment"],
    output:"Executive narrative, attack timeline, and detection gap analysis.",
  },
];

const METHODOLOGY = [
  { phase:"01", code:"RECON",    title:"Reconnaissance",       desc:"Passive and active intelligence gathering on targets, technology stack, exposed services, and employee information.",      color:"#6b7280" },
  { phase:"02", code:"ENUM",     title:"Enumeration",          desc:"Deep mapping of attack surface open ports, service versions, web directories, API endpoints, credentials in public repos.", color:"#f97316" },
  { phase:"03", code:"EXPLOIT",  title:"Exploitation",         desc:"Authorised exploitation of identified vulnerabilities to establish initial access with full documentation of every step.",   color:"#ef4444" },
  { phase:"04", code:"ESCALATE", title:"Privilege Escalation", desc:"Simulating attacker progression from low-privileged foothold to admin, domain controller, or database-level access.",          color:"#dc2626" },
  { phase:"05", code:"PERSIST",  title:"Lateral Movement",     desc:"Mapping how far a real attacker could move through your environment from the initial compromise point.",                         color:"#b91c1c" },
  { phase:"06", code:"REPORT",   title:"Reporting & Debrief",  desc:"Full technical report with CVSS-rated findings, proof-of-concept artefacts, remediation guidance, and executive summary.",      color:"#10b981" },
];

const DELIVERABLES = [
  "Full technical report with CVSS 3.1 scores for every finding",
  "Proof-of-concept code and screenshots documenting exploitation",
  "Executive summary with business risk translation",
  "Remediation guidance mapped to each finding",
  "Remediation verification retest (included)",
  "OWASP / PTES / NIST methodology alignment",
  "Raw tool output (Burp Suite, Nmap, Metasploit logs)",
  "Debrief call with your development and security teams",
];

// ── Attack terminal visual ────────────────────────────────────────────────────
function AttackTerminal() {
  const lines = [
    { t:"[*] Initialising pentest scope...",                           c:"#6b7280" },
    { t:"[*] Target: api.client-production.com",                       c:"#6b7280" },
    { t:"[+] Discovered 47 API endpoints",                             c:"#f97316" },
    { t:"[+] Auth endpoint: /api/v1/auth/login",                       c:"#f97316" },
    { t:"[!] Testing for SQL injection in login form...",              c:"#fcd34d" },
    { t:"[!] Payload: ' OR 1=1 --",                                    c:"#fcd34d", mono:true },
    { t:"[CRITICAL] SQL Injection confirmed — auth bypass achieved",   c:"#ef4444" },
    { t:"[*] Enumerating users as administrator...",                    c:"#6b7280" },
    { t:"[+] Extracted 12,847 user records",                           c:"#f97316" },
    { t:"[+] PII data exposed: name, email, phone, NIN",               c:"#f97316" },
    { t:"[*] Documenting finding — CVSS 9.8 CRITICAL",                c:"#6b7280" },
    { t:"[✓] Finding logged. Proceeding to next vector...",            c:"#10b981" },
  ];
  return (
    <div className="w-full border border-red-950/30 overflow-hidden shadow-2xl shadow-red-950/30">
      <div className="bg-[#0a0000] border-b border-red-950/40 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex items-center gap-2 ml-1">
            <Target className="w-3 h-3 text-red-500" />
            <span className="text-[10px] font-bold font-mono text-red-400 uppercase tracking-[0.18em]">PENTEST SESSION · AUTHORISED</span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-amber-400 font-bold">IN PROGRESS</span>
      </div>
      <div className="bg-[#050000] px-5 py-4 font-mono text-[12px] space-y-1.5 min-h-[300px]">
        <div className="text-gray-800 text-[10px] mb-3"># Logicsoft Security — Penetration Test · {new Date().toLocaleDateString()}</div>
        {lines.map((l, i) => (
          <motion.div key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.3 + i*0.15, duration:0.15 }}
            className={l.mono ? "pl-4 text-[11px]" : ""} style={{ color:l.c }}>
            {l.t}
          </motion.div>
        ))}
      </div>
      <div className="bg-[#0a0000] border-t border-red-950/30 px-4 py-2 flex justify-between">
        <span className="text-[9.5px] font-mono text-gray-800">Scope: web_app · network · api · mobile</span>
        <span className="text-[9.5px] font-mono text-red-400 font-bold">1 CRITICAL · 3 HIGH · 2 MED</span>
      </div>
    </div>
  );
}

export default function PenetrationTesting() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Penetration Testing — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/security" className="hover:text-[#1f6fb2] transition-colors">Security</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Penetration Testing</span>
        </nav>
      </div>

      {/* HERO — pure black, neon red */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden" style={{ background:"#000000" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[700px] h-[500px] rounded-full bg-red-950/20 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-red-950/15 blur-[120px]" />
        </div>
        {/* Scan lines */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.3) 2px, rgba(255,0,0,0.3) 3px)", backgroundSize:"100% 3px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_560px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-red-700/40 bg-red-950/30 px-3 py-1.5 mb-6">
                <Crosshair className="w-3.5 h-3.5 text-red-500" />
                <span className="text-[11px] font-bold text-red-400 uppercase tracking-[0.16em] font-mono">Offensive Security</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                Penetration<br /><span className="text-red-500">Testing</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                We attack your systems legally, methodically, and thoroughly before someone else does.
                Black-box, grey-box, and white-box engagements across web, mobile, API, network, and cloud.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"PTES",   label:"Methodology standard",    color:"#ef4444" },
                  { val:"CVSS",   label:"3.1 scoring on all finds", color:"#f97316" },
                  { val:"100%",   label:"Retest included",          color:"#10b981" },
                  { val:"48hr",   label:"Critical finding notify",  color:"#fcd34d" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1 font-mono" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-red-600 hover:bg-red-500 transition-all duration-200">
                  Request a pentest <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  Download scope template
                </Link>
              </div>
            </div>
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }}>
              <AttackTerminal />
            </motion.div>
          </div>
        </div>
      </div>

      {/* METHODOLOGY */}
      <div className="bg-[#0a0000] border-b border-red-950/30">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-red-500 uppercase tracking-[0.16em] mb-3 font-mono">Attack methodology</p>
          <h3 className="text-[28px] font-serif text-white mb-10">Six phases. Zero shortcuts.</h3>
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-red-950/50 hidden lg:block" />
            <div className="flex flex-col gap-3">
              {METHODOLOGY.map((m, i) => (
                <motion.div key={m.phase} initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                  className="group flex gap-5 items-start">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center border font-mono text-[10px] font-bold z-10 transition-all duration-200"
                    style={{ borderColor:`${m.color}40`, background:`${m.color}10`, color:m.color }}>
                    {m.phase}
                  </div>
                  <div className="flex-1 border border-red-950/20 bg-white/[0.01] hover:bg-white/[0.03] hover:border-red-900/30 transition-all duration-200 px-5 py-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[9px] font-bold font-mono px-2 py-0.5" style={{ background:`${m.color}15`, color:m.color }}>{m.code}</span>
                      <h4 className="text-[14px] font-bold text-white">{m.title}</h4>
                    </div>
                    <p className="text-[12.5px] text-white/40 leading-[1.85]">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ATTACK TYPES */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em] mb-3">Pentest types</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Six attack surfaces. All covered.</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ATTACK_TYPES.map((a, i) => (
              <motion.div key={a.num} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                className="group relative border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden">
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background:`linear-gradient(90deg,${a.accent},${a.accent}55)` }} />
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 flex items-center justify-center shrink-0 bg-red-50">
                      <a.icon className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-300 mt-2.5">{a.num}</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-1 group-hover:text-red-600 transition-colors">{a.title}</h4>
                  <p className="text-[11px] text-gray-400 mb-3 font-mono">{a.scope}</p>
                  <div className="w-6 h-[2px] bg-red-500 mb-4 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                  <ul className="space-y-1.5 mb-4">
                    {a.methods.map(m => (
                      <li key={m} className="flex items-start gap-2 text-[12px] text-gray-500">
                        <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-[11px] text-gray-400 italic leading-snug">{a.output}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* DELIVERABLES */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16">
            <div>
              <p className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em] mb-4">Every engagement includes</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">What you receive after every pentest.</h3>
              <div className="flex flex-col gap-2.5">
                {DELIVERABLES.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 border border-gray-200 bg-white px-5 py-3.5">
                    <span className="text-[10px] font-mono text-gray-300 mt-0.5 shrink-0">{String(i+1).padStart(2,"0")}</span>
                    <p className="text-[13.5px] text-gray-600">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-red-600 uppercase tracking-[0.16em] mb-4">Types of engagement</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">Choose the right approach.</h3>
              <div className="flex flex-col gap-3">
                {[
                  { name:"Black-box", desc:"No prior knowledge. Simulates a real external attacker with zero information. Maximum realism, best for mature targets.",         color:"#111827" },
                  { name:"Grey-box",  desc:"Partial knowledge (credentials, architecture docs). Simulates an insider threat or compromised employee. Most common engagement.",color:"#374151" },
                  { name:"White-box", desc:"Full access to code, infrastructure docs, and credentials. Most thorough coverage. Best for SDLC integration and compliance.",    color:"#4b5563" },
                ].map(b => (
                  <div key={b.name} className="border border-gray-200 bg-white px-6 py-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 rounded-full border-2 border-gray-800" style={{ background:b.color }} />
                      <h4 className="text-[15px] font-bold text-[#1f3a5f]">{b.name}</h4>
                    </div>
                    <p className="text-[13px] text-gray-500 leading-[1.85] pl-6">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:"#000" }}>
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-red-400 uppercase tracking-[0.15em] mb-3 font-mono">Find your vulnerabilities first</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Request a penetration test.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">We'll scope the engagement, agree rules of engagement, and deliver a full technical report with verified findings. Retest included.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-red-600 hover:bg-red-500 transition-all duration-200">
              Request a pentest <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/security" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:bg-white/8 transition-all duration-200">
              All security services →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}