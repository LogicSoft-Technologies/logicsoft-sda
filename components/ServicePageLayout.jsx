// components/ServicePageLayout.jsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";

// ── Fade-up animation preset ──────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1], delay },
});

// ── Section label ─────────────────────────────────────────────────────────────
export function Label({ children }) {
  return (
    <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">
      {children}
    </p>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
export function Divider() {
  return <div className="h-px w-full bg-[#e8eef6] my-16" />;
}

// ── Stat chip ─────────────────────────────────────────────────────────────────
export function StatChip({ value, label }) {
  return (
    <div className="border border-[#dce8f5] bg-[#f5f9ff] px-5 py-4">
      <p className="text-[28px] font-serif font-semibold text-[#1f3a5f] leading-none mb-1">{value}</p>
      <p className="text-[11px] text-gray-500 uppercase tracking-wider">{label}</p>
    </div>
  );
}

// ── Capability card ───────────────────────────────────────────────────────────
export function CapCard({ icon, title, body }) {
  return (
    <motion.div {...fadeUp()} className="border border-[#e8eef6] bg-white p-6 hover:border-[#1f6fb2]/30 hover:shadow-sm transition-all duration-200">
      <div className="text-2xl mb-4">{icon}</div>
      <p className="text-[14.5px] font-semibold text-[#1f3a5f] mb-2">{title}</p>
      <p className="text-[13.5px] text-gray-500 leading-relaxed">{body}</p>
    </motion.div>
  );
}

// ── Delivery step ─────────────────────────────────────────────────────────────
export function Step({ n, title, body }) {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0 w-8 h-8 bg-[#1f6fb2] flex items-center justify-center text-white text-[12px] font-bold">
        {n}
      </div>
      <div className="pt-0.5">
        <p className="text-[14.5px] font-semibold text-[#1f3a5f] mb-1">{title}</p>
        <p className="text-[13.5px] text-gray-500 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

// ── Check list ────────────────────────────────────────────────────────────────
export function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[13.5px] text-gray-600 leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-[#1f6fb2] mt-0.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-10">
      <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
      {crumbs.map(([label, href], i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3" />
          {href ? (
            <Link href={href} className="hover:text-[#1f6fb2] transition-colors">{label}</Link>
          ) : (
            <span className="text-[#1f3a5f] font-semibold">{label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ── CTA strip ─────────────────────────────────────────────────────────────────
function CTAStrip({ title = "Ready to get started?", sub = "Book a free introductory consultation with our team.", href = "/contact" }) {
  return (
    <section className="mt-20 border border-[#bfdbfe] bg-gradient-to-r from-[#eff6ff] to-[#e0f2fe] px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <p className="text-[19px] font-serif font-semibold text-[#1f3a5f] mb-1">{title}</p>
        <p className="text-[13.5px] text-gray-500">{sub}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f6fb2] hover:bg-[#1f3a5f] text-white text-[13px] font-semibold transition-colors duration-200 shrink-0"
      >
        Book a consultation <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

// ── Main layout ───────────────────────────────────────────────────────────────
export default function ServicePageLayout({
  breadcrumbs = [],       
  eyebrow = "",
  title = "",
  subtitle = "",
  stats = [],          
  children,   
  ctaTitle,
  ctaSub,
  ctaHref,
}) {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="border-b border-[#dce8f5] py-16 px-6"
        style={{ background: "linear-gradient(145deg, #f0f7ff 0%, #e8f3ff 60%, #f5f9ff 100%)" }}
      >
        <div className="max-w-[80rem] mx-auto">
          <Breadcrumb crumbs={breadcrumbs} />

          <motion.div {...fadeUp(0)}>
            <Label>{eyebrow}</Label>
            <h1 className="text-[40px] md:text-[48px] font-serif text-[#1f3a5f] leading-tight max-w-3xl mb-5">
              {title}
            </h1>
            <p className="text-[16px] text-gray-500 leading-[1.85] max-w-2xl mb-10">
              {subtitle}
            </p>
          </motion.div>

          {/* Stats row */}
          {stats.length > 0 && (
            <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-3">
              {stats.map((s, i) => <StatChip key={i} {...s} />)}
            </motion.div>
          )}
        </div>
      </section>

      {/* Page body */}
      <div className="max-w-[82rem] mx-auto px-6 py-16">
        {children}
        <CTAStrip title={ctaTitle} sub={ctaSub} href={ctaHref} />
      </div>
    </main>
  );
}