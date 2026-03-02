"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight, ArrowRight, CheckCircle2, AlertTriangle,
  Bell, Rss, Activity, Clock, Info, XCircle,
} from "lucide-react";

const SYSTEM_STATUS = [
  { name: "Core API",               status: "operational" },
  { name: "Web Application",        status: "operational" },
  { name: "Authentication Service", status: "operational" },
  { name: "Database Cluster",       status: "operational" },
  { name: "File Storage",           status: "degraded"    },
  { name: "Email Delivery",         status: "operational" },
  { name: "Payment Processing",     status: "operational" },
  { name: "CDN / Static Assets",    status: "operational" },
];

const INCIDENTS = [
  {
    date: "25 Feb 2026",
    title: "File Storage — Elevated latency",
    status: "investigating",
    severity: "degraded",
    updates: [
      { time: "14:32 WAT", text: "We are investigating reports of elevated latency on file upload operations. Download operations are unaffected." },
      { time: "14:55 WAT", text: "Issue identified as high load on the EU-West storage node. Traffic is being redistributed. Upload operations may be slow." },
    ],
  },
  {
    date: "18 Feb 2026",
    title: "Authentication Service — Login failures for subset of users",
    status: "resolved",
    severity: "incident",
    updates: [
      { time: "09:12 WAT", text: "Reports of login failures for users with enterprise SSO configurations. Investigation underway." },
      { time: "09:44 WAT", text: "Root cause identified — expired token signing certificate on EU tenant. Certificate renewed." },
      { time: "10:05 WAT", text: "All users able to log in successfully. Monitoring continues. Total affected window: 53 minutes." },
    ],
  },
  {
    date: "4 Feb 2026",
    title: "Scheduled maintenance — Database cluster upgrade",
    status: "completed",
    severity: "maintenance",
    updates: [
      { time: "02:00 WAT", text: "Maintenance window begins. Database cluster upgrade started as scheduled." },
      { time: "03:47 WAT", text: "Upgrade complete. All services restored. Performance improvements of ~18% on read operations observed." },
    ],
  },
];

const BLOG_POSTS = [
  { date: "24 Feb 2026", tag: "Engineering", title: "How we reduced API p99 latency by 40% with connection pooling", excerpt: "A deep-dive into the connection pooling strategy we implemented across our client APIs, reducing tail latency and improving reliability under load." },
  { date: "10 Feb 2026", tag: "Security", title: "Our approach to certificate lifecycle management in 2026", excerpt: "Automated certificate renewal, rotation policies, and the monitoring stack we use to prevent certificate-related incidents across all hosted systems." },
  { date: "28 Jan 2026", tag: "DevOps", title: "Zero-downtime deployments — the LogicSoft deployment pipeline", excerpt: "An end-to-end walkthrough of our deployment pipeline — from code merge to production traffic shift, with full rollback capability at every stage." },
];

const STATUS_CONFIG = {
  operational: { label: "Operational", color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", dot: "#059669" },
  degraded:    { label: "Degraded",    color: "#d97706", bg: "#fffbeb", border: "#fde68a", dot: "#d97706" },
  outage:      { label: "Outage",      color: "#dc2626", bg: "#fff1f2", border: "#fecaca", dot: "#dc2626" },
  maintenance: { label: "Maintenance", color: "#1f6fb2", bg: "#eaf4ff", border: "#bfdbfe", dot: "#1f6fb2" },
};

const INCIDENT_SEV = {
  degraded:    { icon: AlertTriangle, color: "#d97706", bg: "#fffbeb", label: "Degraded"    },
  incident:    { icon: XCircle,       color: "#dc2626", bg: "#fff1f2", label: "Incident"    },
  maintenance: { icon: Clock,         color: "#1f6fb2", bg: "#eaf4ff", label: "Maintenance" },
};

const INCIDENT_STATUS = {
  investigating: { color: "#d97706", label: "Investigating" },
  resolved:      { color: "#059669", label: "Resolved"      },
  completed:     { color: "#059669", label: "Completed"     },
};

const overallHealthy = SYSTEM_STATUS.every((s) => s.status === "operational");

export default function UpdatesPage() {
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
            <span className="text-white/55 font-medium">Updates</span>
          </nav>
          <div className="py-16 lg:py-20 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <Activity className="w-3 h-3 text-[#60a8dc]" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Service Status & Updates</span>
              </div>
              <h1 className="text-[42px] lg:text-[56px] font-serif text-white leading-[1.06] mb-6">Status & Updates</h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[520px]">
                Live system status, incident reports, planned maintenance windows, and engineering updates from the LogicSoft team.
              </p>
            </motion.div>
            {/* Subscribe widget */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
              className="border border-white/10 bg-white/[0.04] p-7 min-w-[260px]">
              <Bell className="w-6 h-6 text-[#1f6fb2] mb-4" strokeWidth={1.5} />
              <p className="text-[13.5px] font-bold text-white mb-1">Subscribe to updates</p>
              <p className="text-[12px] text-white/35 mb-4 leading-relaxed">Get notified by email when incidents or maintenance are announced.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 bg-white/[0.06] border border-white/15 px-3 py-2 text-[12.5px] text-white placeholder:text-white/25 outline-none focus:border-[#1f6fb2]/50" />
                <button className="px-4 py-2 text-[12px] font-bold text-white bg-[#1f6fb2] hover:bg-[#1a5a96] transition-colors">
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Rss className="w-3.5 h-3.5 text-white/25" />
                <a href="#" className="text-[11px] text-white/30 hover:text-white/50 transition-colors">RSS feed available</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SYSTEM STATUS ── */}
      <section className="bg-white py-16 border-b border-[#e8eef6]">
        <div className="max-w-[82rem] mx-auto px-6">
          {/* Overall status banner */}
          <div className={`flex items-center gap-4 px-6 py-4 mb-10 border ${overallHealthy ? "border-[#a7f3d0] bg-[#ecfdf5]" : "border-[#fde68a] bg-[#fffbeb]"}`}>
            {overallHealthy
              ? <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0" />
              : <AlertTriangle className="w-5 h-5 text-[#d97706] shrink-0" />}
            <div>
              <p className={`text-[14px] font-bold ${overallHealthy ? "text-[#065f46]" : "text-[#92400e]"}`}>
                {overallHealthy ? "All systems operational" : "Some systems experiencing issues"}
              </p>
              <p className={`text-[12px] ${overallHealthy ? "text-[#047857]" : "text-[#b45309]"}`}>
                Last checked: {new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            <div>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">System components</p>
              <div className="divide-y divide-[#f1f5f9] border border-[#e8eef6]">
                {SYSTEM_STATUS.map((sys, i) => {
                  const cfg = STATUS_CONFIG[sys.status];
                  return (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />
                        <span className="text-[13.5px] text-gray-600">{sys.name}</span>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 border"
                        style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}>
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-6">Uptime — last 90 days</p>
              <div className="space-y-4">
                {["Core API", "Web Application", "Authentication", "Database"].map((name) => (
                  <div key={name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[12px] text-gray-500">{name}</span>
                      <span className="text-[12px] font-bold text-[#059669]">99.97%</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 90 }).map((_, i) => (
                        <div key={i} className="flex-1 h-5 rounded-sm"
                          style={{ background: i === 15 || i === 42 ? "#fde68a" : "#bbf7d0" }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10.5px] text-gray-400 mt-3">
                <span className="inline-block w-3 h-2 bg-[#bbf7d0] rounded-sm mr-1.5" />Operational
                <span className="inline-block w-3 h-2 bg-[#fde68a] rounded-sm mx-1.5 ml-4" />Degraded
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INCIDENTS ── */}
      <section className="bg-[#f5f8fc] py-16 border-b border-[#e8eef6]">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-10">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Incident history</p>
            <h2 className="text-[28px] font-serif text-[#1f3a5f]">Recent incidents & maintenance</h2>
          </div>
          <div className="space-y-5">
            {INCIDENTS.map((incident, i) => {
              const sev = INCIDENT_SEV[incident.severity];
              const statusCfg = INCIDENT_STATUS[incident.status];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="bg-white border border-[#e8eef6] overflow-hidden">
                  <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-[#f1f5f9]"
                    style={{ background: sev.bg }}>
                    <div className="flex items-start gap-3">
                      <sev.icon className="w-4.5 h-4.5 mt-0.5 shrink-0" style={{ color: sev.color }} strokeWidth={1.5} />
                      <div>
                        <p className="text-[14px] font-bold text-[#1f3a5f]">{incident.title}</p>
                        <p className="text-[11.5px] text-gray-400 mt-0.5">{incident.date}</p>
                      </div>
                    </div>
                    <span className="text-[10.5px] font-bold px-2.5 py-1 shrink-0" style={{ color: statusCfg.color, background: "white", border: `1px solid ${statusCfg.color}40` }}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="px-6 py-4 space-y-3">
                    {incident.updates.map((u, j) => (
                      <div key={j} className="flex gap-4">
                        <span className="text-[11px] font-mono text-gray-400 shrink-0 mt-0.5">{u.time}</span>
                        <p className="text-[13px] text-gray-600 leading-relaxed">{u.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING BLOG ── */}
      <section className="bg-white py-16 border-b border-[#e8eef6]">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="mb-10">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Engineering blog</p>
            <h2 className="text-[28px] font-serif text-[#1f3a5f]">Latest from the engineering team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BLOG_POSTS.map((post, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group border border-[#e8eef6] p-7 hover:border-[#1f6fb2]/30 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-[#1f6fb2] bg-[#eaf4ff] border border-[#bfdbfe] px-2.5 py-1">{post.tag}</span>
                  <span className="text-[11px] text-gray-400">{post.date}</span>
                </div>
                <h3 className="text-[14.5px] font-bold text-[#1f3a5f] mb-3 leading-snug group-hover:text-[#1f6fb2] transition-colors">{post.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1f6fb2] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg,#07111f 0%,#0d2448 60%,#0a1830 100%)" }}>
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-[24px] font-serif text-white mb-2">Need to report an issue?</h2>
            <p className="text-[14px] text-white/45 max-w-lg">If you're experiencing a problem not shown here, contact our support team immediately.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link href="/about/support" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#7A2E00,#C45500 50%,#FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
              Contact support <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portal" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all">
              Open a ticket
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}