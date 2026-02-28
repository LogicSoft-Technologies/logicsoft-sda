"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Zap, Shield, Layers, Cpu, Star } from "lucide-react";

// ── Design language: Apple / premium glass aesthetic
// ── Accent: iOS blue #007AFF — Apple's native blue
// ── Signature: iPhone frame mockup with live app UI inside, glass morphism cards

const CAPABILITIES = [
  {
    num: "01",
    icon: Smartphone,
    title: "Native SwiftUI & UIKit",
    desc: "Purpose-built iOS apps using Apple's latest SwiftUI framework for modern declarative UI, with UIKit where legacy or complex custom behaviour demands it. No JavaScript bridges, no compromises.",
    tags: ["SwiftUI", "UIKit", "Combine", "Swift 5.9"],
  },
  {
    num: "02",
    icon: Cpu,
    title: "Core Data & CloudKit",
    desc: "Offline-first data persistence with Core Data, synced seamlessly to iCloud via CloudKit. Users expect their data to follow them across iPhone, iPad, and Mac — we make that reliable.",
    tags: ["Core Data", "CloudKit", "iCloud Sync", "NSPersistentCloudKitContainer"],
  },
  {
    num: "03",
    icon: Zap,
    title: "Performance & Battery Optimisation",
    desc: "Apps that launch in under a second and don't drain the battery. Background task scheduling, efficient memory management, and Instruments profiling are standard practice on every build.",
    tags: ["Instruments", "XCTest", "Memory Graph", "Energy Log"],
  },
  {
    num: "04",
    icon: Shield,
    title: "Security & App Store Compliance",
    desc: "Keychain-based credential storage, biometric authentication (Face ID / Touch ID), App Transport Security, and privacy manifest compliance. First-time App Store approval, not fourth.",
    tags: ["Keychain", "Face ID", "Privacy Manifest", "ATS"],
  },
  {
    num: "05",
    icon: Layers,
    title: "Push Notifications & App Extensions",
    desc: "APNs-backed push notifications, rich notification content extensions, app clips for instant experiences, widgets with WidgetKit, and Siri shortcuts for power users.",
    tags: ["APNs", "WidgetKit", "App Clips", "SiriKit"],
  },
  {
    num: "06",
    icon: Star,
    title: "App Store Optimisation & Launch",
    desc: "We prepare your App Store listing, screenshots, preview videos, and metadata — and manage the review submission process so launch day isn't stressful.",
    tags: ["App Store Connect", "TestFlight", "ASO", "Phased rollout"],
  },
];

const PROCESS = [
  { step: "01", title: "UX & Prototype",       desc: "Human Interface Guidelines-compliant wireframes and interactive prototypes reviewed before a line of Swift is written."  },
  { step: "02", title: "Architecture & Setup",  desc: "MVVM or TCA architecture chosen per project. CI via Xcode Cloud or Fastlane configured from day one."                    },
  { step: "03", title: "Sprint Delivery",       desc: "Working builds on TestFlight every sprint. You test on a real iPhone, not a simulator screenshot."                        },
  { step: "04", title: "App Store Launch",      desc: "Compliance review, metadata submission, staged rollout, and post-launch crash monitoring via Firebase Crashlytics."       },
];

const STACK = [
  { name: "Swift 5.9",       role: "Language",        color: "#FF6B35" },
  { name: "SwiftUI",         role: "UI Framework",    color: "#007AFF" },
  { name: "UIKit",           role: "UI Framework",    color: "#5AC8FA" },
  { name: "Xcode 15",        role: "IDE",             color: "#1D6FA4" },
  { name: "Combine",         role: "Async/Reactive",  color: "#34C759" },
  { name: "Core Data",       role: "Persistence",     color: "#FF9500" },
  { name: "CloudKit",        role: "Cloud Sync",      color: "#5856D6" },
  { name: "TestFlight",      role: "Beta testing",    color: "#007AFF" },
];

// ── iPhone frame mockup ───────────────────────────────────────────────────────
function IPhoneMockup() {
  return (
    <div className="relative w-[240px] mx-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-[44px] bg-blue-500/15 blur-[32px] scale-110" />

      {/* Phone body */}
      <div className="relative rounded-[44px] border-[6px] border-[#1c1c1e] bg-[#1c1c1e] shadow-2xl shadow-black/60 overflow-hidden">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 w-24 h-7 bg-black rounded-full flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1c1c1e] border border-gray-700" />
          <div className="w-3 h-3 rounded-full bg-[#1c1c1e] border border-gray-700" />
        </div>

        {/* Screen */}
        <div className="bg-gradient-to-b from-[#000000] to-[#0a0a12] min-h-[480px] pt-14 px-4 pb-6">
          {/* Status bar */}
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-[10px] font-semibold text-white">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px] items-end">
                {[3,5,7,9].map((h, i) => <div key={i} className="w-[3px] bg-white rounded-sm" style={{ height: h }} />)}
              </div>
              <div className="w-5 h-2.5 border border-white/60 rounded-sm ml-0.5">
                <div className="h-full w-3/4 bg-white/80 rounded-sm m-[1px]" />
              </div>
            </div>
          </div>

          {/* App header */}
          <div className="mb-5">
            <p className="text-[11px] text-white/50 mb-0.5">Good morning</p>
            <p className="text-[20px] font-bold text-white">Dashboard</p>
          </div>

          {/* Hero card — glass */}
          <div className="rounded-2xl p-4 mb-3 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, rgba(0,122,255,0.8), rgba(88,86,214,0.8))" }}>
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4), transparent)" }} />
            <p className="text-[10px] text-white/70 mb-1">Total Revenue</p>
            <p className="text-[24px] font-bold text-white">₦4.2M</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] text-emerald-300">↑ 12.4%</span>
              <span className="text-[10px] text-white/50">vs last month</span>
            </div>
          </div>

          {/* Mini cards */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "Orders",   value: "847",  color: "#34C759" },
              { label: "Pending",  value: "23",   color: "#FF9500" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl p-3 bg-white/8 border border-white/10">
                <div className="w-4 h-1.5 rounded-full mb-2" style={{ background: c.color }} />
                <p className="text-[16px] font-bold text-white">{c.value}</p>
                <p className="text-[9px] text-white/50">{c.label}</p>
              </div>
            ))}
          </div>

          {/* List items */}
          <div className="space-y-2">
            {["Recent transaction", "Pending approval", "New message"].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white/5 rounded-xl px-3 py-2.5">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/60 to-purple-500/60 shrink-0" />
                <div className="flex-1">
                  <div className="w-20 h-1.5 bg-white/40 rounded-sm mb-1" />
                  <div className="w-14 h-1 bg-white/20 rounded-sm" />
                </div>
                <div className="w-8 h-1.5 bg-white/20 rounded-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Home indicator */}
        <div className="bg-black py-2 flex justify-center">
          <div className="w-28 h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute right-[-8px] top-[100px] w-[4px] h-16 bg-[#2c2c2e] rounded-full" />
      <div className="absolute left-[-8px] top-[80px] w-[4px] h-8 bg-[#2c2c2e] rounded-full" />
      <div className="absolute left-[-8px] top-[100px] w-[4px] h-14 bg-[#2c2c2e] rounded-full" />
      <div className="absolute left-[-8px] top-[128px] w-[4px] h-14 bg-[#2c2c2e] rounded-full" />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Ios() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">iOS App Development — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services" className="hover:text-[#1f6fb2] transition-colors">Services</Link>
          <span className="text-gray-300">›</span>
          <Link href="/services/mobile-apps" className="hover:text-[#1f6fb2] transition-colors">Mobile Apps</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">iOS Development</span>
        </nav>
      </div>

      {/* ── HERO ── */}
      <div className="relative border-t border-b border-gray-200 overflow-hidden"
        style={{ background: "linear-gradient(150deg, #000000 0%, #0a0a14 40%, #060612 100%)" }}>

        {/* Radial bloom */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[700px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-800/8 blur-[100px]" />
        </div>

        {/* SF-style grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(0,122,255,0.8) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#007AFF]/30 bg-[#007AFF]/8 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] animate-pulse" />
                <span className="text-[11px] font-bold text-[#007AFF] uppercase tracking-[0.16em]">Mobile Apps</span>
              </div>

              <h2 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.06] mb-5">
                iOS<br />
                <span style={{ color: "#007AFF" }}>Development</span>
              </h2>

              <p className="text-[17px] text-white/60 leading-[1.9] max-w-[520px] mb-8">
                Native iPhone and iPad applications built with SwiftUI and the full Apple
                platform SDK. Apps that feel exactly like they belong on iOS — because
                they're engineered to Apple's own standards, not adapted from something else.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                {[
                  { value: "Native", label: "SwiftUI only"              },
                  { value: "<1s",    label: "Cold launch target"        },
                  { value: "100%",   label: "HIG compliant"             },
                  { value: "1st",    label: "App Store pass rate"       },
                ].map((s) => (
                  <div key={s.label} className="border border-[#007AFF]/20 bg-[#007AFF]/5 px-4 py-3">
                    <p className="text-[22px] font-light text-[#007AFF] leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: "#007AFF" }}>
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-3.5 text-[13.5px] font-semibold border border-white/15 text-white/70 hover:border-white/35 hover:text-white transition-all duration-200">
                  See our work
                </Link>
              </div>
            </div>

            {/* iPhone */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <IPhoneMockup />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STACK ── */}
      <div className="bg-[#050508] border-b border-white/8">
        <div className="max-w-[82rem] mx-auto px-4 py-10">
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em] whitespace-nowrap">Apple platform stack</span>
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
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: "#007AFF" }}>What we build</p>
              <h3 className="text-[30px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight mb-5">
                Six capabilities. All native. All Apple-quality.
              </h3>
              <p className="text-[14px] text-gray-500 leading-[1.9]">
                We build iOS apps that reviewers score 4.8+ because they're made the Apple way —
                not ported, not adapted, not compromised.
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
                  style={{ "--accent": "#007AFF" }}
                >
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "linear-gradient(90deg, #007AFF, #5AC8FA)" }} />
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ background: "#EBF4FF" }}>
                        <cap.icon className="w-4 h-4" style={{ color: "#007AFF" }} />
                      </div>
                      <span className="text-[10px] font-mono text-gray-300 mt-2.5">{cap.num}</span>
                    </div>
                    <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-2 leading-snug group-hover:transition-colors duration-200" style={{ "--tw-text-opacity": 1 }}
                      onMouseEnter={e => e.currentTarget.style.color = "#007AFF"}
                      onMouseLeave={e => e.currentTarget.style.color = ""}
                    >{cap.title}</h4>
                    <div className="w-6 h-[2px] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background: "#007AFF" }} />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{cap.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <span key={t} className="text-[10px] font-semibold px-2 py-0.5 border" style={{ background: "#EBF4FF", color: "#007AFF", borderColor: "#BFDBFE" }}>{t}</span>
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
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: "#007AFF" }}>How we work</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Our iOS delivery process.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border border-gray-200 bg-white">
            {PROCESS.map((p, i) => (
              <div key={p.step}
                className={`group relative p-8 transition-colors duration-200 ${i < PROCESS.length - 1 ? "border-b lg:border-b-0 lg:border-r border-gray-200" : ""}`}
                style={{ "--hover-bg": "#EBF4FF" }}
                onMouseEnter={e => e.currentTarget.style.background = "#EBF4FF"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: "linear-gradient(90deg, #007AFF, #5AC8FA)" }} />
                <div className="mb-5">
                  <span className="text-[11px] font-bold font-mono px-2 py-0.5 border" style={{ color: "#007AFF", background: "#EBF4FF", borderColor: "#BFDBFE" }}>{p.step}</span>
                </div>
                <h4 className="text-[14px] font-bold text-[#1f3a5f] mb-2">{p.title}</h4>
                <div className="w-5 h-[2px] mb-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "#007AFF" }} />
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
              { title: "Android Development",      href: "/services/mobile-apps/android",        desc: "Kotlin, Jetpack Compose, Material You, Play Store.", accent: "#34A853" },
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
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#5AC8FA" }}>Build for Apple</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Your iOS app, built the native way.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Book a free discovery call with one of our iOS engineers. We'll review your requirements and scope a native build plan.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all duration-200 hover:opacity-85"
              style={{ background: "#007AFF" }}>
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