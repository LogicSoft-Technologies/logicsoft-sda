"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Scan, GitBranch, PackageSearch, Bug, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// ── Design: shift-left / SDLC security pipeline. Dark teal #0d9488.
//    CI/CD pipeline diagram as hero visual. Vulnerability scan output cards.
//    Feels like security baked INTO the engineering process, not bolted on after.

const TESTING_TYPES = [
  {
    num:"01", icon:Code2,        title:"SAST — Static Analysis",
    accent:"#0d9488", accentBg:"#f0fdfa",
    desc:"Source code analysis without executing the application. We integrate SAST tools into your CI pipeline to catch injection flaws, hard-coded secrets, insecure dependencies, and dangerous coding patterns at commit time.",
    tools:["Semgrep","SonarQube","CodeQL","Snyk Code","Checkmarx"],
    when:"Every commit, every PR — automated.",
  },
  {
    num:"02", icon:Scan,         title:"DAST — Dynamic Analysis",
    accent:"#0891b2", accentBg:"#ecfeff",
    desc:"Runtime testing of a running application. DAST discovers vulnerabilities that only appear when the application is executing — authentication flaws, injection points, session management issues, and server-side logic errors.",
    tools:["OWASP ZAP","Burp Suite Pro","Nuclei","Nikto","w3af"],
    when:"Staging environment, pre-release gates.",
  },
  {
    num:"03", icon:PackageSearch, title:"SCA — Software Composition Analysis",
    accent:"#0d9488", accentBg:"#f0fdfa",
    desc:"Vulnerability scanning of every third-party library, framework, and open-source dependency in your codebase. Known CVEs caught before they reach production. Licence compliance managed automatically.",
    tools:["Snyk Open Source","OWASP Dependency-Check","Dependabot","WhiteSource"],
    when:"On every dependency update, weekly full scan.",
  },
  {
    num:"04", icon:Bug,           title:"Manual Code Review",
    accent:"#0891b2", accentBg:"#ecfeff",
    desc:"Human-led security review of critical code paths — authentication, cryptography, payment flows, and data handling. Tools miss context; our engineers catch the business logic vulnerabilities that automated scanners cannot.",
    tools:["Custom review methodology","OWASP Code Review Guide","CERT Secure Coding","Threat modelling"],
    when:"Pre-release of security-critical features.",
  },
  {
    num:"05", icon:GitBranch,     title:"Infrastructure-as-Code Security",
    accent:"#0d9488", accentBg:"#f0fdfa",
    desc:"Security scanning of Terraform, CloudFormation, Helm charts, Kubernetes manifests, and Dockerfile configurations before infrastructure is provisioned. Misconfigurations caught at PR review, not in production.",
    tools:["Checkov","tfsec","Terrascan","kube-bench","Hadolint"],
    when:"Every IaC change before apply.",
  },
  {
    num:"06", icon:GitBranch,     title:"Secrets Detection",
    accent:"#0891b2", accentBg:"#ecfeff",
    desc:"Automated scanning of git history, code repositories, and environment configurations for leaked API keys, passwords, certificates, and tokens. Pre-commit hooks and CI gates to prevent future exposure.",
    tools:["Gitleaks","TruffleHog","detect-secrets","GitGuardian"],
    when:"Pre-commit hook + CI gate.",
  },
];

const PIPELINE_STAGES = [
  { stage:"Commit",    desc:"Pre-commit hooks\nSecrets detection\nLint rules",                    icon:"⌨",  status:"secure",  time:"<1s"  },
  { stage:"Build",     desc:"SAST analysis\nDependency scan\nLicence check",                       icon:"⚙",  status:"secure",  time:"~2min" },
  { stage:"Test",      desc:"Unit + integration\nSecurity test suite\nIaC scan",                   icon:"✓",  status:"secure",  time:"~8min" },
  { stage:"Staging",   desc:"DAST scan\nAPI fuzzing\nPentest integration",                         icon:"⚡",  status:"warn",    time:"~15min"},
  { stage:"Release",   desc:"Sign-off gate\nCompliance check\nVulnerability threshold",             icon:"🔒",  status:"gate",    time:"Manual"},
  { stage:"Production",desc:"Runtime monitoring\nAnomalous request detection\nSIEM feed",           icon:"◉",  status:"monitor", time:"24/7"  },
];

const SCAN_RESULTS = [
  { severity:"CRITICAL", count:0,  color:"#ef4444", status:"clean"  },
  { severity:"HIGH",     count:2,  color:"#f97316", status:"flagged"},
  { severity:"MEDIUM",   count:5,  color:"#f59e0b", status:"flagged"},
  { severity:"LOW",      count:11, color:"#6b7280", status:"info"   },
  { severity:"INFO",     count:23, color:"#3b82f6", status:"info"   },
];

const FINDINGS_PREVIEW = [
  { id:"SEC-047", sev:"HIGH",   file:"src/auth/login.js:142",     desc:"Timing attack in password comparison — use crypto.timingSafeEqual()",         fixed:false },
  { id:"SEC-046", sev:"HIGH",   file:"src/api/users.js:78",       desc:"Missing authorisation check on DELETE /users/:id endpoint",                   fixed:false },
  { id:"SEC-045", sev:"MED",    file:"package.json:lodash",       desc:"CVE-2021-23337 — lodash 4.17.20 prototype pollution. Upgrade to 4.17.21",     fixed:true  },
  { id:"SEC-044", sev:"MED",    file:"terraform/s3.tf:12",        desc:"S3 bucket public ACL enabled — set acl = private",                            fixed:true  },
  { id:"SEC-043", sev:"MED",    file:"Dockerfile:1",              desc:"Base image node:16 — EOL. Migrate to node:20-alpine",                         fixed:false },
];

const SEV_DOT = { CRITICAL:"#ef4444", HIGH:"#f97316", MED:"#f59e0b", LOW:"#6b7280", INFO:"#3b82f6" };
const PIPE_STATUS = { secure:"#10b981", warn:"#f59e0b", gate:"#3b82f6", monitor:"#8b5cf6" };

export default function SecurityTesting() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Security Testing — Logicsoft Technologies</h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/security" className="hover:text-[#1f6fb2] transition-colors">Security</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Security Testing</span>
        </nav>
      </div>

      {/* HERO — dark teal, CI/CD security pipeline */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background:"linear-gradient(150deg,#020e0c 0%,#041210 50%,#020e0e 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-teal-900/10 blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-teal-950/12 blur-[100px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage:"radial-gradient(circle, #0d9488 1px, transparent 1px)", backgroundSize:"32px 32px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 border border-teal-600/30 bg-teal-600/8 px-3 py-1.5 mb-6">
                <Scan className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px] font-bold text-teal-400 uppercase tracking-[0.16em]">Security Services</span>
              </div>
              <h2 className="text-[44px] lg:text-[56px] font-serif text-white leading-[1.05] mb-5">
                Security<br /><span style={{ color:"#0d9488" }}>Testing</span>
              </h2>
              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[500px] mb-8">
                SAST, DAST, SCA, and manual code review integrated into your development pipeline.
                Security found at commit is 100× cheaper to fix than security found in production.
                We shift it left.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { val:"SAST",    label:"Every commit scanned",    color:"#0d9488" },
                  { val:"DAST",    label:"Runtime vulnerability",   color:"#0891b2" },
                  { val:"SCA",     label:"Dependency CVE scanning",  color:"#0d9488" },
                  { val:"CI/CD",   label:"Pipeline integration",    color:"#0891b2" },
                ].map(s => (
                  <div key={s.label} className="border border-white/8 bg-white/3 px-4 py-3">
                    <p className="text-[22px] font-light leading-none mb-1 font-mono" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-teal-600 hover:bg-teal-500 transition-all duration-200">
                  Integrate security testing <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  Request pipeline review
                </Link>
              </div>
            </div>

            {/* Scan output card */}
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.2 }}>
              <div className="border border-teal-900/30 overflow-hidden shadow-2xl shadow-teal-950/30">
                <div className="bg-[#020a08] border-b border-teal-900/30 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="ml-1 text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest">SECURITY SCAN REPORT</span>
                  </div>
                  <span className="text-[10px] font-mono text-teal-500">branch: main · PR #284</span>
                </div>

                {/* Summary */}
                <div className="bg-[#030c0a] px-4 py-3 grid grid-cols-5 gap-2 border-b border-teal-950/20">
                  {SCAN_RESULTS.map(r => (
                    <div key={r.severity} className="text-center">
                      <p className="text-[18px] font-bold font-mono leading-none mb-0.5" style={{ color: r.count===0 ? "#10b981" : SEV_DOT[r.severity] }}>{r.count}</p>
                      <p className="text-[8px] font-bold text-white/30 uppercase">{r.severity}</p>
                    </div>
                  ))}
                </div>

                {/* Findings */}
                <div className="bg-[#030e0b] divide-y divide-teal-950/20">
                  {FINDINGS_PREVIEW.map((f, i) => (
                    <motion.div key={f.id} initial={{ opacity:0 }} animate={{ opacity:1 }}
                      transition={{ delay: 0.5 + i*0.1, duration:0.2 }}
                      className="px-4 py-3 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-start gap-2.5">
                        {f.fixed
                          ? <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                          : <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: SEV_DOT[f.sev] }} />
                        }
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-bold font-mono" style={{ color: SEV_DOT[f.sev] }}>{f.sev}</span>
                            <span className="text-[9px] font-mono text-gray-700">{f.id}</span>
                            {f.fixed && <span className="text-[8px] font-bold text-teal-500 bg-teal-950/50 px-1.5 py-0.5">FIXED</span>}
                          </div>
                          <p className="text-[11px] font-mono text-teal-400/70 truncate">{f.file}</p>
                          <p className="text-[11px] text-white/45 leading-snug mt-0.5">{f.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="bg-[#020a08] border-t border-teal-950/20 px-4 py-2 flex justify-between">
                  <span className="text-[9.5px] font-mono text-gray-700">SAST + SCA + IaC · Logicsoft pipeline</span>
                  <span className="text-[9.5px] font-mono text-teal-500">Gate: PASS with warnings</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PIPELINE DIAGRAM */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-teal-600 uppercase tracking-[0.16em] mb-3">Security pipeline</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">Security at every stage of your SDLC.</h3>
          <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
            {PIPELINE_STAGES.map((s, i) => (
              <div key={s.stage} className="flex items-stretch">
                <div className="group flex flex-col border border-gray-200 bg-white hover:shadow-sm transition-all duration-200 min-w-[130px] overflow-hidden relative">
                  <span className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: PIPE_STATUS[s.status] }} />
                  <div className="px-4 py-4 flex-1">
                    <p className="text-[18px] mb-2">{s.icon}</p>
                    <p className="text-[13px] font-bold text-[#1f3a5f] mb-2">{s.stage}</p>
                    <p className="text-[11px] text-gray-400 leading-[1.7] whitespace-pre-line">{s.desc}</p>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gray-400">{s.time}</span>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: PIPE_STATUS[s.status] }} />
                  </div>
                </div>
                {i < PIPELINE_STAGES.length - 1 && (
                  <div className="flex items-center shrink-0 px-1">
                    <div className="w-5 h-px bg-gray-300" />
                    <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-5 mt-5">
            {Object.entries({ secure:"Automated secure gate", warn:"Findings — review required", gate:"Manual approval gate", monitor:"Continuous monitoring" }).map(([k,v]) => (
              <div key={k} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <div className="w-2 h-2 rounded-full" style={{ background: PIPE_STATUS[k] }} />{v}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTING TYPES */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-teal-600 uppercase tracking-[0.16em] mb-4">Testing types</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">Six ways we test your security.</h3>
              <p className="text-[13.5px] text-gray-500 leading-[1.85]">
                Each type catches different vulnerability classes. A complete programme uses
                all of them — automated in CI, manual for critical paths.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TESTING_TYPES.map((t, i) => (
                <motion.div key={t.num} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.3, delay:i*0.07 }}
                  className="group relative border border-gray-200 bg-white hover:shadow-sm transition-all duration-200 overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background:`linear-gradient(90deg,${t.accent},${t.accent}55)` }} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background:t.accentBg }}>
                        <t.icon className="w-4 h-4" style={{ color:t.accent }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{t.num}</span>
                    </div>
                    <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-1.5 group-hover:text-teal-700 transition-colors">{t.title}</h4>
                    <p className="text-[10px] font-mono text-gray-400 mb-3">{t.when}</p>
                    <div className="w-6 h-[2px] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background:t.accent }} />
                    <p className="text-[12.5px] text-gray-500 leading-[1.85] mb-4">{t.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.tools.map(tool => (
                        <span key={tool} className="text-[10px] font-semibold px-2 py-0.5 border" style={{ background:t.accentBg, color:t.accent, borderColor:t.accent+"30" }}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-teal-400 uppercase tracking-[0.15em] mb-3">Shift security left</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Find vulnerabilities at commit. Not in production.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">We'll review your current SDLC, identify where security testing is missing, and propose a pipeline integration plan.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-teal-600 hover:bg-teal-500 transition-all duration-200">
              Get a pipeline review <ArrowRight className="w-4 h-4" />
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