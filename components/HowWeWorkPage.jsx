// components/HowWeWorkPage.jsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

export default function HowWeWorkPage({ index, title, tagline, description, steps, principles, outcomes, quote }) {
  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg,#050c18 0%,#0a1e38 45%,#0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#1f6fb2 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/how-we-work/project-management" className="hover:text-white/60 transition-colors">How We Work</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">{title}</span>
          </nav>
          <div className="py-16 lg:py-20 max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">
                  Project Management · {String(index).padStart(2, "0")}
                </span>
              </div>
              <h1 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.06] mb-6">{title}</h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[580px]">{description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Our process</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">How we approach {title.toLowerCase()}</h2>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 ${steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} gap-0 border border-[#e8eef6]`}>
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`p-8 relative group hover:bg-[#f8fbff] transition-colors border-b border-[#e8eef6] ${i < steps.length - 1 ? "lg:border-r lg:border-b-0" : ""} ${i < steps.length - 2 ? "md:border-r" : ""}`}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1f6fb2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="block text-[10px] font-mono text-gray-300 tracking-[0.2em] mb-5">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[16px] font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors">{s.title}</h3>
                <p className="text-[13.5px] text-gray-500 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      {principles && (
        <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-20">
          <div className="max-w-[82rem] mx-auto px-6">
            <div className="mb-12">
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Guiding principles</p>
              <h2 className="text-[30px] font-serif text-[#1f3a5f]">What drives our approach</h2>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(principles.length, 4)} gap-6`}>
              {principles.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white border border-[#e8eef6] p-7 hover:border-[#1f6fb2]/30 hover:shadow-sm transition-all">
                  <p.icon className="w-8 h-8 text-[#1f6fb2] mb-5" strokeWidth={1.5} />
                  <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-2">{p.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUTCOMES */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">What you get</p>
              <h2 className="text-[30px] font-serif text-[#1f3a5f] mb-6">Outcomes you can measure</h2>
              <ul className="space-y-4">
                {outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1f6fb2] shrink-0 mt-0.5" />
                    <span className="text-[14px] text-gray-600 leading-relaxed">{o}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            {quote && (
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className="border border-[#bfdbfe] bg-[#eff6ff] p-10">
                <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Industry insight</p>
                <p className="text-[24px] font-light text-[#1f3a5f] leading-snug mb-6">"{quote.text}"</p>
                <p className="text-[12px] text-gray-400">— {quote.source}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg,#07111f 0%,#0d2448 60%,#0a1830 100%)" }}>
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-[26px] font-serif text-white mb-2">Ready to start your engagement?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">Every LogicSoft project is governed by all eight disciplines from kickoff through post-launch.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/how-we-work/project-management" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all">
              Full methodology
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}