"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, ArrowRight, CheckCircle2, TicketIcon,
  BarChart2, FileText, Bell, Shield, Users, Clock,
  Activity, Lock,
} from "lucide-react";

const FEATURES = [
  {
    icon: TicketIcon, color: "#1f6fb2", bg: "#eaf4ff",
    title: "Ticket Management",
    desc: "Raise, track, and manage all support tickets in one place. Real-time status updates, priority indicators, and full communication history.",
    bullets: ["One-click ticket creation", "Priority classification", "SLA countdown timers", "Full audit trail"],
  },
  {
    icon: BarChart2, color: "#059669", bg: "#ecfdf5",
    title: "SLA Dashboard",
    desc: "Live SLA performance metrics for your account — response times, resolution rates, and uptime statistics updated in real time.",
    bullets: ["Live uptime monitoring", "Response time tracking", "Monthly SLA reports", "Breach alerts"],
  },
  {
    icon: FileText, color: "#7c3aed", bg: "#f3f0ff",
    title: "Report Access",
    desc: "Access all engagement reports — sprint summaries, monthly steering packs, quality metrics, and project health dashboards.",
    bullets: ["All historical reports", "Downloadable PDFs", "Filterable by date/project", "Executive summaries"],
  },
  {
    icon: Bell, color: "#d97706", bg: "#fffbeb",
    title: "Notifications & Alerts",
    desc: "Configurable notifications for ticket updates, SLA warnings, maintenance windows, and system status changes.",
    bullets: ["Email & SMS alerts", "Maintenance notifications", "SLA warning alerts", "Custom thresholds"],
  },
  {
    icon: Users, color: "#0891b2", bg: "#ecfeff",
    title: "Team & Access Management",
    desc: "Manage your team's portal access — add users, assign roles, and control what each member can view and interact with.",
    bullets: ["Role-based access control", "Multi-user accounts", "Activity audit log", "SSO support"],
  },
  {
    icon: Activity, color: "#dc2626", bg: "#fff1f2",
    title: "System Status",
    desc: "Live status page for all your LogicSoft-hosted systems — including incident history, planned maintenance, and current health.",
    bullets: ["Real-time system health", "Incident timeline", "Planned maintenance", "Historical uptime data"],
  },
];

const STEPS = [
  { n: "01", title: "Request access", body: "Contact your LogicSoft account manager or email support@logicsoft.ng to request portal credentials for your organisation." },
  { n: "02", title: "Receive credentials", body: "You'll receive a secure invitation email within one business day. Your account manager will be in touch to confirm your team's access requirements." },
  { n: "03", title: "Configure your team", body: "Add team members, assign roles, and configure notification preferences during your first session. Setup takes under 15 minutes." },
  { n: "04", title: "Go live", body: "Start raising tickets, monitoring SLA performance, and accessing reports immediately. Your full engagement history is pre-loaded." },
];

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg,#050c18 0%,#0a1e38 45%,#0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle,#1f6fb2 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/about/support" className="hover:text-white/60 transition-colors">Support</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">Client Portal</span>
          </nav>
          <div className="py-16 lg:py-20 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <Shield className="w-3 h-3 text-[#60a8dc]" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Client Portal</span>
              </div>
              <h1 className="text-[42px] lg:text-[56px] font-serif text-white leading-[1.06] mb-6">Your engagement,<br />fully visible.</h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[540px]">
                The LogicSoft Client Portal gives you complete visibility into your support tickets, SLA performance, project reports, and system health — all in one secure place.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              className="shrink-0">
              <div className="border border-white/10 bg-white/[0.04] p-8 min-w-[260px]">
                <Lock className="w-8 h-8 text-[#1f6fb2] mb-5" strokeWidth={1.5} />
                <p className="text-[14px] font-semibold text-white mb-2">Existing client?</p>
                <p className="text-[12.5px] text-white/40 leading-relaxed mb-5">Log in to the portal to manage your support tickets and reports.</p>
                <a href="https://portal.logicsoft.ng" className="inline-flex items-center gap-2 w-full justify-center py-3 text-[13px] font-bold text-white border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 hover:bg-[#1f6fb2]/20 transition-colors">
                  Log in to portal <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-[10.5px] text-white/20 text-center mt-3">SSO supported · 256-bit encrypted</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-white py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">What's inside</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">Everything you need to manage your engagement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group border border-[#e8eef6] p-7 hover:border-[#1f6fb2]/30 hover:shadow-sm transition-all">
                <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: f.bg }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} strokeWidth={1.5} />
                </div>
                <h3 className="text-[16px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors">{f.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[12px] text-gray-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: f.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO GET ACCESS ── */}
      <section className="bg-[#f5f8fc] border-y border-[#e8eef6] py-20">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-12">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Getting started</p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">How to access the portal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#e8eef6] bg-white">
            {STEPS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`p-8 relative group hover:bg-[#f8fbff] transition-colors ${i < 3 ? "border-r border-[#e8eef6]" : ""}`}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1f6fb2] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="block text-[10px] font-mono text-gray-300 tracking-[0.2em] mb-4">{s.n}</span>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY NOTE ── */}
      <section className="bg-white py-16 border-b border-[#e8eef6]">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">Security & privacy</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-5">Built on enterprise-grade security</h2>
              <ul className="space-y-3.5">
                {[
                  "256-bit TLS encryption for all data in transit",
                  "Role-based access control — users only see what they need to",
                  "Full audit log of all portal actions and data access",
                  "SSO integration with your identity provider",
                  "GDPR and NDPR compliant data handling throughout",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1f6fb2] shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="border border-[#bfdbfe] bg-[#eff6ff] p-8">
              <Clock className="w-8 h-8 text-[#1f6fb2] mb-4" strokeWidth={1.5} />
              <p className="text-[14px] font-bold text-[#1f3a5f] mb-3">Portal availability</p>
              <p className="text-[13.5px] text-gray-500 leading-relaxed mb-4">
                The portal is available 24/7. Scheduled maintenance windows are announced at least 72 hours in advance via in-portal notification and email.
              </p>
              <div className="flex flex-wrap gap-2">
                {["99.9% uptime SLA", "Global CDN", "Automated backups", "DDoS protection"].map((tag) => (
                  <span key={tag} className="text-[11px] font-bold border border-[#bfdbfe] text-[#1f6fb2] bg-white px-2.5 py-1">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg,#07111f 0%,#0d2448 60%,#0a1830 100%)" }}>
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] font-serif text-white mb-2">Ready to get portal access?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">Portal access is available to all active LogicSoft clients. Contact your account manager to get started.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
              Request access <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/support" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all">
              Back to support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}