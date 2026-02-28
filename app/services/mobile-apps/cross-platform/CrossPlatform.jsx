"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Repeat2, DollarSign, Zap, Code2, Shield, BarChart3 } from "lucide-react";

// ── Design language: bridge / dual-platform aesthetic
// ── Accent: cyan-sky #0891b2 bridging iOS blue and Android green
// ── Signature: side-by-side iOS + Android dual phone frames sharing one codebase

const RN_STACK = [
  { name: "React Native",  role: "Framework",      color: "#61DAFB" },
  { name: "Expo",          role: "Toolchain",      color: "#000020", textColor: "#fff" },
  { name: "TypeScript",    role: "Language",       color: "#3178C6" },
  { name: "Reanimated 3",  role: "Animations",     color: "#FF6B6B" },
  { name: "Zustand",       role: "State",          color: "#FFB347" },
  { name: "MMKV",          role: "Storage",        color: "#4ECDC4" },
];

const FLUTTER_STACK = [
  { name: "Flutter 3",    role: "Framework",      color: "#02569B" },
  { name: "Dart",         role: "Language",       color: "#0175C2" },
  { name: "Riverpod",     role: "State",          color: "#00BCD4" },
  { name: "Hive / Drift", role: "Local DB",       color: "#FF7043" },
  { name: "GoRouter",     role: "Navigation",     color: "#66BB6A" },
  { name: "Freezed",      role: "Code gen",       color: "#9575CD" },
];

const CAPABILITIES = [
  {
    num: "01",
    icon: Repeat2,
    title: "One Codebase. Two App Stores.",
    desc: "80–90% shared code across iOS and Android with platform-specific adaptations where needed. We don't pretend one codebase means zero platform work — we manage that complexity for you.",
    tags: ["Shared logic", "Platform channels", "Native modules", "OTA updates"],
  },
  {
    num: "02",
    icon: DollarSign,
    title: "Cost-Effective Without Compromise",
    desc: "Cross-platform halves the build time and cost for most apps. We help you evaluate where that trade-off makes sense — and where native is worth the premium. Honest advice, not a sales pitch.",
    tags: ["Budget optimisation", "Native bridge", "Performance profiling"],
  },
  {
    num: "03",
    icon: Zap,
    title: "60fps Animations & Native Feel",
    desc: "React Native Reanimated 3 and Flutter's Skia/Impeller renderer deliver animations that run on the UI thread — indistinguishable from native to users. Smooth scrolling, gesture-driven UI, hero transitions.",
    tags: ["Reanimated 3", "Impeller", "Gesture Handler", "Shared Element"],
  },
  {
    num: "04",
    icon: Code2,
    title: "React Native or Flutter — We Advise",
    desc: "React Native if your team is JavaScript-fluent or you're building a business app. Flutter if you need pixel-perfect custom UI or a very consistent cross-platform experience. We recommend based on your context.",
    tags: ["React Native", "Flutter", "Technology selection", "Migration"],
  },
  {
    num: "05",
    icon: Shield,
    title: "Security on Both Platforms",
    desc: "Secure storage (Keychain on iOS, Keystore on Android), biometric auth, certificate pinning, and jailbreak/root detection — all implemented correctly across platforms from the start.",
    tags: ["Keychain / Keystore", "Biometrics", "Cert pinning", "Root detection"],
  },
  {
    num: "06",
    icon: BarChart3,
    title: "OTA Updates & App Store Compliance",
    desc: "Expo EAS or CodePush for over-the-air JS bundle updates, bypassing app store review for minor changes. Plus full App Store and Play Store submission management.",
    tags: ["EAS Update", "CodePush", "App Store", "Play Store"],
  },
];

const PROCESS = [
  { step: "01", title: "Framework Selection",    desc: "We evaluate your requirements, team, and timeline. React Native vs Flutter recommendation with written rationale."          },
  { step: "02", title: "Shared Architecture",    desc: "Navigation, state management, data layer, and platform channel strategy defined before any feature work begins."           },
  { step: "03", title: "Dual-Platform Builds",   desc: "Both iOS (TestFlight) and Android (Firebase App Distribution) builds delivered every sprint. Test on real devices."        },
  { step: "04", title: "Dual Store Launch",       desc: "Simultaneous App Store and Play Store submission. Store assets, compliance, staged rollout, and crash monitoring."        },
];

const COMPARISON = [
  { factor: "Recommended for",   rn: "Business & data-heavy apps",        flutter: "Custom UI & design-led apps"   },
  { factor: "Language",          rn: "TypeScript / JavaScript",           flutter: "Dart"                          },
  { factor: "Hot reload",        rn: "Fast refresh ✓",                    flutter: "Hot reload ✓"                  },
  { factor: "Native modules",    rn: "Extensive ecosystem",               flutter: "Platform channels"              },
  { factor: "UI consistency",    rn: "Platform-native components",        flutter: "Pixel-identical on both"        },
  { factor: "Team fit",          rn: "Web / React developers",            flutter: "Mobile-first developers"        },
];

// ── Dual phone mockup ─────────────────────────────────────────────────────────
function DualPhoneMockup() {
  return (
    <div className="relative flex items-end justify-center gap-4">

      {/* Shared code badge */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1.5 flex items-center gap-1.5 whitespace-nowrap shadow-lg shadow-cyan-500/40">
          <Repeat2 className="w-3 h-3" />
          ONE CODEBASE
        </div>
        {/* Connector lines down */}
        <div className="flex justify-center gap-16 mt-1">
          <div className="w-px h-6 bg-cyan-500/40" />
          <div className="w-px h-6 bg-cyan-500/40" />
        </div>
      </div>

      {/* iOS Phone — left, slightly lower */}
      <motion.div
        initial={{ opacity: 0, x: -20, rotate: -3 }}
        animate={{ opacity: 1, x: 0, rotate: -3 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative w-[160px] shrink-0"
        style={{ marginBottom: "16px" }}
      >
        <div className="absolute inset-0 rounded-[32px] bg-blue-500/10 blur-[20px] scale-110" />
        <div className="relative rounded-[32px] border-[5px] border-[#1c1c1e] bg-[#1c1c1e] shadow-xl overflow-hidden">
          {/* Dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-14 h-5 bg-black rounded-full" />
          <div className="bg-[#000] pt-10 pb-3 px-3 min-h-[320px]">
            <p className="text-[8px] text-white/40 mb-1 font-medium">iOS</p>
            <p className="text-[13px] font-semibold text-white mb-3">Dashboard</p>

            <div className="rounded-[14px] p-3 mb-2" style={{ background: "linear-gradient(135deg, #0a2540, #1a4a80)" }}>
              <p className="text-[7px] text-white/50 mb-0.5">Balance</p>
              <p className="text-[16px] font-bold text-white">$4,821</p>
              <p className="text-[7px] text-blue-300">↑ 6.2%</p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2">
              {["Income", "Expense"].map((l, i) => (
                <div key={l} className="rounded-[10px] p-2 border border-white/10" style={{ background: "#111" }}>
                  <div className="w-3 h-1 rounded-full mb-1" style={{ background: i === 0 ? "#007AFF" : "#FF3B30" }} />
                  <p className="text-[10px] font-bold text-white">$1,240</p>
                  <p className="text-[7px] text-white/40">{l}</p>
                </div>
              ))}
            </div>

            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-2 rounded-[10px] px-2 py-1.5 mb-1 bg-white/5">
                <div className="w-5 h-5 rounded-full shrink-0" style={{ background: `hsl(${i * 80 + 200}, 70%, 40%)` }} />
                <div className="flex-1">
                  <div className="w-12 h-1 bg-white/30 rounded-sm mb-0.5" />
                  <div className="w-8 h-0.5 bg-white/15 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-black py-1.5 flex justify-center">
            <div className="w-16 h-0.5 bg-white/20 rounded-full" />
          </div>
        </div>
        {/* iOS label */}
        <div className="mt-2 flex justify-center">
          <span className="text-[9px] font-bold text-[#007AFF]/70 uppercase tracking-widest">iOS</span>
        </div>
      </motion.div>

      {/* Android Phone — right, slightly higher */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative w-[160px] shrink-0"
      >
        <div className="absolute inset-0 rounded-[28px] bg-green-500/10 blur-[20px] scale-110" />
        <div className="relative rounded-[28px] border-[5px] border-[#202124] bg-[#202124] shadow-xl overflow-hidden">
          {/* Punch hole */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-3 h-3 bg-[#202124] rounded-full border border-[#2e2e2e]" />
          <div className="min-h-[320px] pt-8 pb-3 px-3"
            style={{ background: "linear-gradient(160deg, #1C1B1F 0%, #1a1d24 100%)" }}>
            <p className="text-[8px] text-white/40 mb-1 font-medium">Android</p>
            <p className="text-[13px] font-medium text-white mb-3">Dashboard</p>

            <div className="rounded-[14px] p-3 mb-2" style={{ background: "linear-gradient(135deg, #1B5E3B, #2E7D52)" }}>
              <p className="text-[7px] text-white/50 mb-0.5">Balance</p>
              <p className="text-[16px] font-bold text-white">$4,821</p>
              <p className="text-[7px] text-green-300">↑ 6.2%</p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-2">
              {["Income", "Expense"].map((l, i) => (
                <div key={l} className="rounded-[10px] p-2 border border-white/10" style={{ background: "#28282B" }}>
                  <div className="w-3 h-1 rounded-full mb-1" style={{ background: i === 0 ? "#34A853" : "#EA4335" }} />
                  <p className="text-[10px] font-bold text-white">$1,240</p>
                  <p className="text-[7px] text-white/40">{l}</p>
                </div>
              ))}
            </div>

            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-2 rounded-[10px] px-2 py-1.5 mb-1" style={{ background: "#28282B" }}>
                <div className="w-5 h-5 rounded-full shrink-0" style={{ background: `hsl(${i * 80 + 120}, 60%, 35%)` }} />
                <div className="flex-1">
                  <div className="w-12 h-1 bg-white/30 rounded-sm mb-0.5" />
                  <div className="w-8 h-0.5 bg-white/15 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#1C1B1F] py-1.5 flex justify-center">
            <div className="w-16 h-0.5 bg-white/20 rounded-full" />
          </div>
        </div>
        {/* Android label */}
        <div className="mt-2 flex justify-center">
          <span className="text-[9px] font-bold text-[#34A853]/70 uppercase tracking-widest">Android</span>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CrossPlatform() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Cross-Platform Mobile Development — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/mobile-apps" className="hover:text-[#1f6fb2] transition-colors">Mobile Apps</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Cross-Platform</span>
        </nav>
      </div>

      {/* ── HERO ── */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #020b10 0%, #040f18 50%, #040d10 100%)" }}>

        {/* Dual-colour blobs — iOS blue left, Android green right */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full bg-blue-700/6 blur-[100px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-green-700/6 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-700/6 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.16em]">Mobile Apps</span>
              </div>

              <h2 className="text-[40px] lg:text-[54px] font-serif text-white leading-[1.06] mb-5">
                Cross-Platform<br />
                <span className="text-[#0891b2]">React Native</span><br className="hidden lg:block" />
                <span className="text-[40px] lg:text-[36px] text-white/50">&amp; Flutter</span>
              </h2>

              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[520px] mb-8">
                One engineering team. One codebase. Two production-grade apps delivered to both
                App Store and Play Store simultaneously. We recommend React Native or Flutter
                based on your project — never based on what's easier for us.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { value: "~80%",  label: "Code shared across platforms" },
                  { value: "2×",    label: "Faster than native dual-build" },
                  { value: "Both",  label: "Stores launched simultaneously"},
                  { value: "OTA",   label: "Updates without store review"  },
                ].map((s) => (
                  <div key={s.label} className="border border-cyan-500/20 bg-cyan-500/5 px-4 py-3">
                    <p className="text-[22px] font-light text-cyan-400 leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all duration-200">
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  See our work
                </Link>
              </div>
            </div>

            {/* Dual phones */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center pt-10"
            >
              <DualPhoneMockup />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STACKS — side by side ── */}
      <div className="bg-[#040d12] border-b border-white/8">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* React Native */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#61DAFB]" />
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">React Native stack</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {RN_STACK.map((s) => (
                  <div key={s.name} className="border border-white/8 bg-white/2 hover:bg-white/6 transition-all duration-200 p-3">
                    <p className="text-[12px] font-bold mb-1" style={{ color: s.color }}>{s.name}</p>
                    <p className="text-[10px] text-white/25">{s.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flutter */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#02569B]" />
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Flutter stack</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {FLUTTER_STACK.map((s) => (
                  <div key={s.name} className="border border-white/8 bg-white/2 hover:bg-white/6 transition-all duration-200 p-3">
                    <p className="text-[12px] font-bold mb-1" style={{ color: s.color }}>{s.name}</p>
                    <p className="text-[10px] text-white/25">{s.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── COMPARISON TABLE ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.16em] mb-3">React Native vs Flutter</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-8">Which framework is right for your project?</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 pr-8 text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] w-[200px]">Factor</th>
                  <th className="text-left py-4 px-4">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#61DAFB]" /><span className="text-[13px] font-bold text-[#1f3a5f]">React Native</span></div>
                  </th>
                  <th className="text-left py-4 px-4">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#02569B]" /><span className="text-[13px] font-bold text-[#1f3a5f]">Flutter</span></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.factor} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}>
                    <td className="py-3.5 pr-8 text-[13px] font-semibold text-gray-600">{row.factor}</td>
                    <td className="py-3.5 px-4 text-[13px] text-gray-500">{row.rn}</td>
                    <td className="py-3.5 px-4 text-[13px] text-gray-500">{row.flutter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-gray-400 mt-5 italic">Not sure which to choose? We'll recommend the right one after understanding your product requirements and team.</p>
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.16em] mb-4">What we deliver</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Six capabilities. For both platforms at once.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                Cross-platform doesn't mean cut corners. We engineer the same quality across
                both stores — at roughly half the cost of two separate native teams.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="group relative border border-gray-200 bg-white hover:shadow-sm transition-all duration-200 overflow-hidden"
                >
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-500 to-sky-300" />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center bg-cyan-50 shrink-0">
                        <cap.icon className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-2 leading-snug group-hover:text-cyan-700 transition-colors duration-200">{cap.title}</h4>
                    <div className="w-6 h-[2px] bg-cyan-500 mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-cyan-50 text-cyan-700 border border-cyan-100">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-cyan-600 uppercase tracking-[0.16em] mb-4">How we work</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Our cross-platform delivery process.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.step}
                className={`group relative p-8 hover:bg-cyan-50 transition-colors duration-200 ${i < PROCESS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-cyan-500 to-sky-300" />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono text-cyan-600 bg-cyan-50 border border-cyan-100 px-2 py-0.5">{p.step}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2">{p.title}</h4>
                <div className="w-5 h-[2px] bg-cyan-500 mb-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Need native instead?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "iOS Development",     href: "/services/mobile-apps/ios",     desc: "SwiftUI, UIKit, Face ID, WidgetKit — truly native Apple.", accent: "#007AFF" },
              { title: "Android Development", href: "/services/mobile-apps/android", desc: "Kotlin, Jetpack Compose, Material You — truly native Google.", accent: "#34A853" },
            ].map((s) => (
              <Link key={s.title} href={s.href}
                className="group flex items-center justify-between gap-4 border border-gray-200 bg-[#f9fafb] hover:border-gray-300 hover:bg-white hover:shadow-sm transition-all duration-200 px-6 py-5"
              >
                <div>
                  <div className="w-2 h-2 rounded-full mb-2" style={{ background: s.accent }} />
                  <p className="text-[15px] font-bold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">{s.title}</p>
                  <p className="text-[12.5px] text-gray-400 mt-0.5">{s.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1f6fb2] group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-[0.15em] mb-3">Build for both</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">One build. Two stores. Ship faster.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free call and we'll tell you whether React Native or Flutter is right for your product — and by how much cross-platform would reduce your budget.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-all duration-200">
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/price-models" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              View pricing models
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}