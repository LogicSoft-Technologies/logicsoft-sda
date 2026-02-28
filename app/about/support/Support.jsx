"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronDown, MessageSquare, Phone, Mail,
  Clock, Shield, Zap, LifeBuoy, AlertTriangle, CheckCircle2,
  BookOpen, Users, FileText,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const SUPPORT_TIERS = [
  {
    id: "l1",
    level: "L1",
    title: "Basic Support",
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    desc: "First-line support for general enquiries, system usage questions, and non-critical issues. Handled by our client success team.",
    sla: "< 24 hours",
    coverage: "Business hours (8am–6pm WAT)",
    channels: ["Email", "Support portal"],
    examples: ["How-to questions", "Account and access issues", "Non-urgent feature requests", "Documentation requests"],
    included: true,
    includedNote: "Included in all active engagements",
  },
  {
    id: "l2",
    level: "L2",
    title: "Technical Support",
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    desc: "Intermediate technical support for bugs, performance issues, and functionality questions requiring engineering involvement.",
    sla: "< 8 hours",
    coverage: "Extended hours (7am–9pm WAT)",
    channels: ["Email", "Phone", "Support portal"],
    examples: ["Bug investigation", "Performance issues", "Integration troubleshooting", "Minor configuration changes"],
    included: false,
    includedNote: "Included in retainer plans",
  },
  {
    id: "l3",
    level: "L3",
    title: "Critical Incident Response",
    accentColor: "#dc2626",
    accentBg: "#fff1f2",
    desc: "Senior engineering escalation for production outages, data integrity issues, and critical security incidents requiring immediate action.",
    sla: "< 2 hours",
    coverage: "24/7 — including weekends and holidays",
    channels: ["Dedicated hotline", "Emergency email", "On-call engineer"],
    examples: ["Production outages", "Data corruption or loss", "Security breaches", "Payment system failures"],
    included: false,
    includedNote: "Available with enterprise retainer",
  },
];

const FAQS = [
  { q: "How do I raise a support ticket?", a: "You can raise a support ticket via email to support@logicsoft.com, or through the client portal if your engagement includes one. All tickets are acknowledged within 2 business hours and triaged to the appropriate support level." },
  { q: "What is your uptime commitment?", a: "Our standard SLA for hosted systems is 99.5% monthly uptime. Enterprise retainer clients receive 99.9% uptime commitments with financial SLA penalties if not met. All uptime is measured and reported monthly." },
  { q: "How are incidents classified?", a: "P1 (Critical): system down, revenue impact, data loss. P2 (High): major feature unavailable, significant user impact. P3 (Medium): non-critical bug, workaround available. P4 (Low): cosmetic issue, enhancement request. Classification determines response time." },
  { q: "Do you offer support for systems you didn't build?", a: "Yes. We regularly provide support for systems built by other vendors. We begin with a Technical Audit to establish familiarity with the codebase and architecture before committing to an SLA." },
  { q: "What happens during a P1 incident outside business hours?", a: "P1 incidents are escalated to an on-call senior engineer immediately, regardless of time. The on-call rotation is staffed 24/7 for clients on L3 support. Response begins within 2 hours of the incident being raised." },
];

const CHANNELS = [
  {
    icon: Mail,
    title: "Email Support",
    detail: "support@logicsoft.com",
    desc: "For general support, bug reports, and non-urgent requests. All emails acknowledged within 2 business hours.",
    action: "Send an email",
    href: "mailto:support@logicsoft.com",
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    availability: "Mon–Fri, 8am–6pm WAT",
  },
  {
    icon: Phone,
    title: "Phone Support",
    detail: "+234 9012 688 861",
    desc: "For urgent technical issues requiring real-time diagnosis. Available during extended support hours.",
    action: "Call us",
    href: "tel:+2349012688861",
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    availability: "Mon–Fri, 7am–9pm WAT",
  },
  {
    icon: AlertTriangle,
    title: "P1 Emergency Line",
    detail: "+234 9012 688 890",
    desc: "For production outages and critical security incidents only. 24/7 coverage for eligible retainer clients.",
    action: "Emergency contact",
    href: "tel:+2349012688890",
    accentColor: "#dc2626",
    accentBg: "#fff1f2",
    availability: "24/7 — Emergency only",
  },
];

const RESOURCES = [
  { icon: BookOpen,  title: "Documentation",         desc: "Technical documentation, API references, and system guides for all Logicsoft-built systems.", href: "/docs",     label: "Browse docs"   },
  { icon: FileText,  title: "Runbooks",               desc: "Step-by-step operational runbooks for common maintenance tasks, deployment procedures, and incident responses.", href: "/runbooks", label: "View runbooks" },
  { icon: Users,     title: "Client Portal",          desc: "Raise and track support tickets, view SLA status, access monthly reports, and manage your engagement.", href: "/portal",   label: "Access portal" },
  { icon: MessageSquare, title: "Community & Updates",desc: "Service status updates, planned maintenance notifications, and engineering blog posts.", href: "/updates",  label: "View updates"  },
];

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-gray-300 tracking-widest shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[15px] font-semibold text-[#1f3a5f]">{item.q}</span>
        </div>
        <span className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-200 ${open ? "border-[#1f6fb2] bg-[#1f6fb2] text-white rotate-180" : "border-gray-200 text-gray-400"}`}>
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
            <p className="text-[14px] text-gray-500 leading-[1.9] pb-5 pl-[2.25rem]">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Support() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Support — Logicsoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Support</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Client support</p>
              <h2 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                We're Accountable<br className="hidden lg:block" />
                <span className="text-[#1f6fb2]">After Delivery.</span>
              </h2>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[620px]">
                Support isn't a ticket queue — it's a continuation of the relationship. Our support
                structure is designed to resolve issues at the right level, as fast as the severity demands.
              </p>
            </div>
            <div className="shrink-0 grid grid-cols-2 gap-3">
              {[
                { icon: Zap,      value: "< 2hr",  label: "P1 response time"       },
                { icon: Shield,   value: "24/7",   label: "Emergency coverage"     },
                { icon: Clock,    value: "99.9%",  label: "Enterprise uptime SLA"  },
                { icon: LifeBuoy, value: "L1–L3",  label: "Support tiers"          },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white border border-gray-200 px-5 py-4 min-w-[130px]">
                    <Icon className="w-3.5 h-3.5 text-[#1f6fb2] mb-2" />
                    <p className="text-[28px] font-light text-[#1f3a5f] leading-none mb-1">{s.value}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Support tiers */}
      <div className="bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Support tiers</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Three levels. One promise: issues get resolved.</h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {SUPPORT_TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="group relative bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${tier.accentColor}, ${tier.accentColor}55)` }} />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center text-[13px] font-bold" style={{ background: tier.accentBg, color: tier.accentColor }}>
                      {tier.level}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">Support level</p>
                      <h4 className="text-[17px] font-bold text-[#1f3a5f]">{tier.title}</h4>
                    </div>
                  </div>
                  <div className="w-8 h-[2px] mb-5 opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" style={{ background: tier.accentColor }} />
                  <p className="text-[13px] text-gray-500 leading-[1.85] mb-6">{tier.desc}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2.5 text-[12.5px]">
                      <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: tier.accentColor }} />
                      <span className="text-gray-500">SLA: <span className="font-bold text-[#1f3a5f]">{tier.sla}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[12.5px]">
                      <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: tier.accentColor }} />
                      <span className="text-gray-500">{tier.coverage}</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Covers</p>
                  <ul className="space-y-1.5 mb-6">
                    {tier.examples.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-[12px] text-gray-500">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: tier.accentColor }} />
                        {e}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-[11px] font-bold px-3 py-1.5" style={{ background: tier.accentBg, color: tier.accentColor }}>
                      {tier.includedNote}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact channels */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Get in touch</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">How to reach us.</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {CHANNELS.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <div key={i} className="group relative border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200 overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-[3px] w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${ch.accentColor}, ${ch.accentColor}44)` }} />
                  <div className="p-7">
                    <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: ch.accentBg }}>
                      <Icon className="w-5 h-5" style={{ color: ch.accentColor }} />
                    </div>
                    <h4 className="text-[16px] font-bold text-[#1f3a5f] mb-1">{ch.title}</h4>
                    <p className="text-[13.5px] font-semibold mb-3" style={{ color: ch.accentColor }}>{ch.detail}</p>
                    <div className="w-6 h-[2px] mb-4 opacity-30 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" style={{ background: ch.accentColor }} />
                    <p className="text-[13px] text-gray-500 leading-[1.85] mb-4">{ch.desc}</p>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-5">{ch.availability}</p>
                    <a href={ch.href} className="inline-flex items-center gap-1.5 text-[12.5px] font-bold transition-colors" style={{ color: ch.accentColor }}>
                      {ch.action} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Self-service resources */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Self-service</p>
          <h3 className="text-[28px] font-serif text-[#1f3a5f] mb-10">Resources to help you solve issues faster.</h3>
          <div className="w-full h-px bg-gray-200 mb-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCES.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className={["group relative px-8 py-9 border-b border-gray-200 bg-white hover:bg-[#f7fbff] transition-colors duration-200", i % 2 !== 0 ? "sm:border-l lg:border-l-0" : "", i % 4 !== 0 ? "lg:border-l" : ""].join(" ")}>
                  <span className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#1f6fb2] to-[#6db3f2]" />
                  <Icon className="w-5 h-5 text-[#1f6fb2] mb-5" />
                  <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors">{r.title}</h4>
                  <div className="w-6 h-[2px] bg-[#1f6fb2] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                  <p className="text-[13px] text-gray-500 leading-[1.85] mb-5">{r.desc}</p>
                  <Link href={r.href} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1f6fb2] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {r.label} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[360px_1fr] gap-16">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">Support FAQ</p>
              <h3 className="text-[28px] font-serif text-[#1f3a5f] leading-tight mb-5">Common support questions.</h3>
              <p className="text-[14px] text-gray-500 leading-[1.85] mb-8">Can't find what you need? Email us at <a href="mailto:support@logicsoft.com" className="text-[#1f6fb2] hover:underline">support@logicsoft.com</a>.</p>
              <Link href="/about/faq" className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#1f3a5f] px-7 py-3.5 hover:bg-[#1f6fb2] transition-all duration-200">
                Full FAQ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-[#f9fafb] border border-gray-200 px-8 py-2">
              {FAQS.map((item, i) => <FaqItem key={i} item={item} index={i} />)}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">Need help right now?</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">Our team is ready.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">Whether it's a critical incident or a question about your project — reach out and we'll respond fast.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Contact support <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+2349012688861" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              <Phone className="w-4 h-4" /> Call us directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}