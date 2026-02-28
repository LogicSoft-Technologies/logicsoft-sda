"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Zap, Shield, Layers, Settings, BarChart3 } from "lucide-react";

// ── Design language: Material You / Google / Android aesthetic
// ── Accent: Android green #34A853, with Material dynamic color feel
// ── Signature: Android phone frame with Material You UI, dynamic color blobs

const CAPABILITIES = [
  {
    num: "01",
    icon: Smartphone,
    title: "Kotlin & Jetpack Compose",
    desc: "Modern Android development using Kotlin and Jetpack Compose — Google's declarative UI toolkit. Concise, testable, and fully interoperable with existing View-based code where needed.",
    tags: ["Kotlin", "Jetpack Compose", "Coroutines", "Flow"],
  },
  {
    num: "02",
    icon: Layers,
    title: "Material You Design System",
    desc: "Apps that adapt to each user's wallpaper colour with Material You dynamic colour. Component library built on Material Design 3 — the system 3 billion Android users already know.",
    tags: ["Material Design 3", "Dynamic Color", "Adaptive UI", "Motion"],
  },
  {
    num: "03",
    icon: Settings,
    title: "Architecture & Dependency Injection",
    desc: "Clean Architecture with MVVM or MVI pattern. Hilt for dependency injection, Room for local persistence, Retrofit for networking. Structured for testability and long-term maintainability.",
    tags: ["Clean Architecture", "Hilt", "Room", "Retrofit", "DataStore"],
  },
  {
    num: "04",
    icon: Shield,
    title: "Security & Play Store Compliance",
    desc: "Android Keystore for credential storage, biometric authentication, network security config, and Play App Signing. We navigate Play Store policy requirements so your review goes smoothly.",
    tags: ["Android Keystore", "Biometrics", "Play Signing", "ProGuard"],
  },
  {
    num: "05",
    icon: Zap,
    title: "Performance on All Devices",
    desc: "Android runs on thousands of device profiles — from flagship Pixels to budget Tecno handsets. We profile with Android Studio, test on a representative device matrix, and optimise aggressively.",
    tags: ["Android Profiler", "Memory Optimisation", "Firebase Test Lab", "Baseline Profiles"],
  },
  {
    num: "06",
    icon: BarChart3,
    title: "Firebase & Google Services Integration",
    desc: "Full Firebase suite — Authentication, Firestore, Cloud Messaging (FCM), Analytics, Crashlytics, Remote Config, and App Distribution for test builds. Plus Google Maps, Pay, and Sign-In.",
    tags: ["Firebase", "FCM Push", "Crashlytics", "Google Pay", "Maps SDK"],
  },
];

const PROCESS = [
  { step: "01", title: "UX & Material Audit",    desc: "Wireframes reviewed against Material Design 3 guidelines. Device size class strategy defined before coding starts."   },
  { step: "02", title: "Architecture & Modules", desc: "Feature modules, navigation graph, data layer design, and CI via GitHub Actions or Firebase App Distribution."          },
  { step: "03", title: "Sprint Delivery",         desc: "APK / AAB builds delivered via Firebase App Distribution each sprint. Test on your own Android device, not emulator." },
  { step: "04", title: "Play Store Launch",       desc: "AAB submission, store listing assets, content rating, staged rollout (10% → 50% → 100%), and post-launch ANR monitoring." },
];

const STACK = [
  { name: "Kotlin",        role: "Language",       color: "#7F52FF" },
  { name: "Compose",       role: "UI Framework",   color: "#34A853" },
  { name: "Hilt",          role: "DI",             color: "#EA4335" },
  { name: "Room",          role: "Local DB",       color: "#FBBC05" },
  { name: "Retrofit",      role: "Networking",     color: "#4285F4" },
  { name: "Firebase",      role: "Backend",        color: "#FF6D00" },
  { name: "Coroutines",    role: "Async",          color: "#7F52FF" },
  { name: "Play Console",  role: "Distribution",   color: "#34A853" },
];

// ── Android phone mockup ──────────────────────────────────────────────────────
function AndroidMockup() {
  return (
    <div className="relative w-[240px] mx-auto">
      {/* Green glow */}
      <div className="absolute inset-0 rounded-[36px] bg-green-500/12 blur-[32px] scale-110" />

      {/* Phone body */}
      <div className="relative rounded-[36px] border-[5px] border-[#202124] bg-[#202124] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Camera punch hole */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-4 h-4 bg-[#202124] rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full border border-[#2e2e2e]" />
        </div>

        {/* Screen */}
        <div className="min-h-[500px] pt-10 overflow-hidden"
          style={{ background: "linear-gradient(160deg, #1C1B1F 0%, #1a1d24 100%)" }}>

          {/* Status bar */}
          <div className="flex justify-between items-center px-5 mb-4">
            <span className="text-[10px] font-medium text-white/80">9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 24 24"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
              <div className="flex gap-[2px] items-end">
                {[3,5,7,9].map((h, i) => <div key={i} className="w-[3px] bg-white/80 rounded-sm" style={{ height: h }} />)}
              </div>
              <div className="w-5 h-2.5 border border-white/50 rounded-sm">
                <div className="h-full w-4/5 bg-green-400/90 rounded-sm m-[1px]" />
              </div>
            </div>
          </div>

          {/* Material You top bar */}
          <div className="px-4 mb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] text-white/50">Wednesday, 24 Feb</p>
                <p className="text-[18px] font-medium text-white">Overview</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400/40 to-teal-500/40 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-green-400/30" />
              </div>
            </div>

            {/* Dynamic colour hero card — Material You */}
            <div className="rounded-[20px] p-4 mb-3 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1B5E3B 0%, #2E7D52 100%)" }}>
              {/* Dynamic colour blob */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-green-300/20 blur-xl" />
              <div className="relative">
                <p className="text-[10px] text-green-200/70 mb-0.5 font-medium">Active Users</p>
                <p className="text-[26px] font-bold text-white leading-none mb-2">12,847</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full w-4/5 rounded-full bg-green-300/60" />
                  </div>
                  <span className="text-[10px] text-green-200 font-medium">↑ 8.2%</span>
                </div>
              </div>
            </div>

            {/* Chips row — Material 3 */}
            <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
              {["All", "Today", "Week", "Month"].map((chip, i) => (
                <div key={chip} className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-medium border ${i === 0 ? "bg-green-500/20 border-green-500/40 text-green-300" : "border-white/15 text-white/50"}`}>
                  {chip}
                </div>
              ))}
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { label: "Revenue",  value: "₦2.1M", accent: "#34A853" },
                { label: "Sessions", value: "4,312",  accent: "#4285F4" },
              ].map((c) => (
                <div key={c.label} className="rounded-[16px] p-3 border border-white/10" style={{ background: "#2D2D30" }}>
                  <div className="w-4 h-1 rounded-full mb-2" style={{ background: c.accent }} />
                  <p className="text-[15px] font-bold text-white leading-none">{c.value}</p>
                  <p className="text-[9px] text-white/45 mt-0.5">{c.label}</p>
                </div>
              ))}
            </div>

            {/* List */}
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-[14px] px-3 py-2.5 border border-white/8" style={{ background: "#28282B" }}>
                  <div className="w-7 h-7 rounded-full shrink-0" style={{ background: `hsl(${i * 60 + 120}, 60%, 35%)` }} />
                  <div className="flex-1">
                    <div className="w-16 h-1.5 bg-white/35 rounded-sm mb-1" />
                    <div className="w-10 h-1 bg-white/15 rounded-sm" />
                  </div>
                  <div className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation bar — Android gesture bar */}
        <div className="bg-[#1C1B1F] py-2 flex justify-center">
          <div className="w-24 h-1 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Volume buttons */}
      <div className="absolute right-[-7px] top-[110px] w-[3px] h-20 bg-[#2e2e2e] rounded-full" />
      <div className="absolute left-[-7px] top-[80px] w-[3px] h-10 bg-[#2e2e2e] rounded-full" />
      <div className="absolute left-[-7px] top-[104px] w-[3px] h-16 bg-[#2e2e2e] rounded-full" />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Android() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Android App Development — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/mobile-apps" className="hover:text-[#1f6fb2] transition-colors">Mobile Apps</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Android Development</span>
        </nav>
      </div>

      {/* ── HERO ── */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0a0f0a 0%, #0c1410 40%, #0a0f0a 100%)" }}>

        {/* Material You dynamic blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] rounded-full bg-green-600/8 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-teal-700/6 blur-[100px]" />
          <div className="absolute top-1/3 left-0 w-[300px] h-[300px] rounded-full bg-blue-800/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-green-500/30 bg-green-500/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                <span className="text-[11px] font-bold text-[#34A853] uppercase tracking-[0.16em]">Mobile Apps</span>
              </div>

              <h2 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.06] mb-5">
                Android<br />
                <span style={{ color: "#34A853" }}>Development</span>
              </h2>

              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[520px] mb-8">
                Native Android apps built with Kotlin and Jetpack Compose — the modern Android
                stack Google recommends. Material You adaptive design that feels at home on every
                Android device from Lagos to London.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { value: "Kotlin",  label: "First-class language"       },
                  { value: "M3",      label: "Material Design 3"          },
                  { value: "3B+",     label: "Active Android devices"     },
                  { value: "AAB",     label: "Optimised delivery format"  },
                ].map((s) => (
                  <div key={s.label} className="border border-green-500/20 bg-green-500/5 px-4 py-3">
                    <p className="text-[22px] font-light text-[#34A853] leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "#34A853" }}>
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  See our work
                </Link>
              </div>
            </div>

            {/* Android phone */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <AndroidMockup />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STACK ── */}
      <div className="bg-[#0a0f0a] border-b border-white/8">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] whitespace-nowrap">Android platform stack</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {STACK.map((s) => (
              <div key={s.name} className="border border-white/8 bg-white/2 hover:bg-white/6 hover:border-white/16 transition-all duration-200 p-3.5">
                <p className="text-[13px] font-bold mb-1" style={{ color: s.color }}>{s.name}</p>
                <p className="text-[10px] text-white/30">{s.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: "#34A853" }}>What we build</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Six capabilities. Built for the Android ecosystem.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                Android's diversity is its strength — and its challenge. We build apps that work
                across the full device spectrum while looking exceptional on every one.
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
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "linear-gradient(90deg, #34A853, #81C995)" }} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "#E6F4EA" }}>
                        <cap.icon className="w-4 h-4" style={{ color: "#34A853" }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4
                      className="text-[15px] font-bold text-[#1f3a5f] mb-2 leading-snug transition-colors duration-200 group-hover:text-[#34A853]"
                    >{cap.title}</h4>
                    <div className="w-6 h-[2px] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background: "#34A853" }} />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 border" style={{ background: "#E6F4EA", color: "#34A853", borderColor: "#CEEAD6" }}>{t}</span>
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
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: "#34A853" }}>How we work</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Our Android delivery process.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.step}
                className={`group relative p-8 transition-colors duration-200 ${i < PROCESS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}
                onMouseEnter={e => e.currentTarget.style.background = "#E6F4EA"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "linear-gradient(90deg, #34A853, #81C995)" }} />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 border" style={{ color: "#34A853", background: "#E6F4EA", borderColor: "#CEEAD6" }}>{p.step}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2">{p.title}</h4>
                <div className="w-5 h-[2px] mb-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "#34A853" }} />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RELATED ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Also in Mobile Apps</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "iOS Development",           href: "/services/mobile-apps/ios",            desc: "SwiftUI, UIKit, Face ID, CloudKit, App Store.", accent: "#007AFF" },
              { title: "Cross-Platform (RN / Flutter)", href: "/services/mobile-apps/cross-platform", desc: "One codebase, both platforms. React Native & Flutter.", accent: "#0891b2" },
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
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#81C995" }}>Build for Android</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Your Android app, native and performant.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free discovery call with our Android engineers. We'll scope your app and advise on architecture, monetisation, and device targeting.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-85"
              style={{ background: "#34A853" }}>
              Start a project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/services/mobile-apps/cross-platform" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              View cross-platform →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}