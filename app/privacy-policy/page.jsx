"use client";

/**
 * privacy-policy.jsx — LogicSoft Technologies
 * ─────────────────────────────────────────────
 * Full enterprise-grade Privacy Policy page.
 *
 * Sections:
 *   Hero            — dark navy, dot-grid, breadcrumb, effective date
 *   At-a-Glance     — 6 icon summary cards
 *   Compliance      — NDPR, GDPR, ISO 27001 badge strip
 *   Main content    — sticky TOC left / prose right (10 sections)
 *   Data table      — what we collect, why, retention
 *   Rights panel    — your rights at a glance
 *   DPO contact     — contact the Data Protection Officer
 *   CTA             — dark navy
 *
 * Sticky TOC tracks active section via IntersectionObserver.
 */

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight, Shield, Lock, Eye, Database,
  UserCheck, Globe, Bell, RefreshCcw, Mail,
  CheckCircle2, ArrowRight, FileText, Clock,
  AlertCircle, HelpCircle, Download, ExternalLink,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const EFFECTIVE_DATE = "1 January 2025";
const LAST_REVIEWED  = "28 February 2026";

const GLANCE_ITEMS = [
  { icon: Database,    title: "What we collect",      body: "Contact details, usage data, device info, and communications you send us. Nothing beyond what's needed.",           color: "#1f6fb2", bg: "#eff6ff" },
  { icon: Eye,         title: "How we use it",        body: "To deliver services, respond to enquiries, improve our platform, and meet legal obligations. Never sold.",          color: "#0d9488", bg: "#f0fdfa" },
  { icon: UserCheck,   title: "Your rights",          body: "Access, rectify, erase, port, restrict, or object to your data at any time. No friction.",                         color: "#7c3aed", bg: "#f5f3ff" },
  { icon: Globe,       title: "Who we share with",    body: "Only trusted sub-processors (hosting, analytics, email). All bound by GDPR/NDPR-compliant agreements.",            color: "#b45309", bg: "#fffbeb" },
  { icon: Clock,       title: "How long we keep it",  body: "Data is kept only as long as necessary — typically 3–7 years for business records, or until you request deletion.", color: "#dc2626", bg: "#fff1f2" },
  { icon: Shield,      title: "How we protect it",    body: "TLS in transit, AES-256 at rest, SOC 2-aligned controls, penetration testing, and role-based access.",             color: "#059669", bg: "#ecfdf5" },
];

const COMPLIANCE_BADGES = [
  { label: "NDPR",       sub: "Nigeria Data Protection Regulation 2019", icon: Shield  },
  { label: "GDPR",       sub: "General Data Protection Regulation (EU)", icon: Globe   },
  { label: "ISO 27001",  sub: "Information Security Management",         icon: Lock    },
  { label: "PCI DSS",    sub: "Payment Card Industry Data Security",      icon: Database},
];

const TOC_SECTIONS = [
  { id: "s1",  label: "About this policy"                 },
  { id: "s2",  label: "Information we collect"            },
  { id: "s3",  label: "How we use your information"       },
  { id: "s4",  label: "Legal basis for processing"        },
  { id: "s5",  label: "How we share your information"     },
  { id: "s6",  label: "International data transfers"      },
  { id: "s7",  label: "Data retention"                    },
  { id: "s8",  label: "Your rights"                       },
  { id: "s9",  label: "Cookies and tracking"              },
  { id: "s10", label: "Children's privacy"                },
  { id: "s11", label: "Security"                          },
  { id: "s12", label: "Changes to this policy"            },
  { id: "s13", label: "Contact us & DPO"                  },
];

const DATA_TABLE = [
  { category: "Identity data",      examples: "Full name, job title, company",               purpose: "Account creation, service delivery, communications",            retention: "Duration of relationship + 3 years", color: "#1f6fb2" },
  { category: "Contact data",       examples: "Email, phone, postal address",                purpose: "Enquiry responses, contract management, support",               retention: "Duration of relationship + 3 years", color: "#0d9488" },
  { category: "Usage data",         examples: "Pages visited, features used, time on site",  purpose: "Service improvement, analytics, performance monitoring",        retention: "26 months (anonymised after 14 months)", color: "#7c3aed" },
  { category: "Technical data",     examples: "IP address, browser type, device identifiers",purpose: "Security, fraud prevention, debugging",                        retention: "12 months",                          color: "#b45309" },
  { category: "Communications",     examples: "Emails, form submissions, support tickets",   purpose: "Providing support, resolving disputes, legal compliance",       retention: "5 years",                            color: "#dc2626" },
  { category: "Financial data",     examples: "Invoice details (no card numbers stored)",    purpose: "Billing, accounting, legal compliance",                        retention: "7 years (statutory requirement)",     color: "#059669" },
  { category: "Marketing data",     examples: "Communication preferences, opt-in status",   purpose: "Sending relevant communications with your consent",             retention: "Until withdrawal of consent",         color: "#0891b2" },
];

const RIGHTS = [
  { icon: Eye,         right: "Right of access",        body: "Request a copy of all personal data we hold about you, within 30 days." },
  { icon: RefreshCcw,  right: "Right to rectification", body: "Ask us to correct inaccurate or incomplete personal data without delay." },
  { icon: AlertCircle, right: "Right to erasure",       body: "Request deletion of your data where there is no lawful reason to retain it." },
  { icon: Download,    right: "Right to portability",   body: "Receive your data in a structured, machine-readable format to transfer elsewhere." },
  { icon: UserCheck,   right: "Right to object",        body: "Object to processing based on legitimate interests or for direct marketing purposes." },
  { icon: Lock,        right: "Right to restrict",      body: "Ask us to pause processing of your data while a concern is being resolved." },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true        },
  transition:  { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
});

/** Section heading with anchor, number, and left accent bar */
function SectionHeading({ id, n, children }) {
  return (
    <div id={id} className="scroll-mt-28 flex items-start gap-4 mb-6 pt-10 first:pt-0 border-t border-[#e8eef6] first:border-t-0">
      <div className="flex flex-col items-center shrink-0 pt-0.5">
        <span className="text-[9.5px] font-bold font-mono text-[#1f6fb2]/50 mb-1">{n}</span>
        <div className="w-px flex-1 bg-[#e8eef6] mt-1" style={{ minHeight: 32 }} />
      </div>
      <h2 className="text-[21px] font-serif font-bold text-[#1f3a5f] leading-snug pt-0.5">{children}</h2>
    </div>
  );
}

/** Body paragraph */
function P({ children, className = "" }) {
  return (
    <p className={`text-[14px] text-gray-600 leading-[1.9] mb-4 ${className}`}>
      {children}
    </p>
  );
}

/** Bulleted list */
function UL({ items }) {
  return (
    <ul className="mb-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-gray-600 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] mt-1.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Info callout box */
function InfoBox({ icon: Icon, color = "#1f6fb2", bg = "#eff6ff", children }) {
  return (
    <div className="flex gap-3 px-4 py-4 border mb-5"
      style={{ borderColor: `${color}25`, background: bg }}>
      <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color }} />
      <p className="text-[13px] text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STICKY TOC (tracks active section via IntersectionObserver)
// ─────────────────────────────────────────────────────────────────────────────

function TableOfContents({ active }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-24 w-[220px] shrink-0 hidden lg:block">
      <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-[0.16em] mb-4 font-mono pl-3">
        Table of contents
      </p>
      <div className="flex flex-col gap-0 border-l border-[#e8eef6]">
        {TOC_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`group text-left px-3 py-2 border-l-[2px] transition-all duration-150 text-[12.5px] leading-snug ${
                isActive
                  ? "border-[#1f6fb2] text-[#1f6fb2] font-semibold"
                  : "border-transparent text-gray-400 hover:text-[#1f3a5f] hover:border-[#1f6fb2]/30"
              }`}
              style={{ marginLeft: -1 }}>
              {s.label}
            </button>
          );
        })}
      </div>
      {/* Download PDF chip */}
      <div className="mt-6 px-3">
        <a href="/documents/logicsoft-privacy-policy.pdf" target="_blank"
          className="flex items-center gap-2 text-[11.5px] font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors">
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </a>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("s1");
  const observerRef = useRef(null);

  // IntersectionObserver to track which section is visible
  useEffect(() => {
    const ids = TOC_SECTIONS.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ══════════════════════════════════════════════════
          HERO — dark navy, dot-grid, breadcrumb
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg, #05101f 0%, #0a1e38 50%, #0d2448 100%)" }}>

        {/* Dot-grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1f6fb2]/10 blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-[#0d3a6e]/18 blur-[100px]" />
        </div>
        {/* Ghost text */}
        <div className="absolute right-8 top-0 bottom-0 flex items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.016 }}>
          <span className="text-[220px] font-serif text-white leading-none tracking-tighter">Privacy</span>
        </div>

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">Privacy Policy</span>
          </nav>

          <div className="py-14 lg:py-18 grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Legal · Data Protection</span>
              </div>
              <h1 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.04] mb-5">
                Privacy Policy
              </h1>
              <p className="text-[15.5px] text-white/50 leading-[1.9] max-w-[560px]">
                LogicSoft Technologies is committed to protecting the personal data of everyone
                who engages with us — clients, visitors, job applicants, and partners alike.
                This policy explains exactly what we collect, why, and how you can exercise your rights.
              </p>
            </motion.div>

            {/* Meta block */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }} className="shrink-0 space-y-3">
              {[
                { label: "Effective date",   value: EFFECTIVE_DATE },
                { label: "Last reviewed",    value: LAST_REVIEWED  },
                { label: "Controller",       value: "LogicSoft Technologies Ltd" },
                { label: "Jurisdiction",     value: "Nigeria · EU/UK applicable" },
              ].map((m) => (
                <div key={m.label} className="border border-white/8 bg-white/[0.03] px-5 py-3 min-w-[280px]">
                  <p className="text-[9.5px] font-bold text-white/30 uppercase tracking-[0.12em] mb-0.5">{m.label}</p>
                  <p className="text-[13px] text-white/70 font-medium">{m.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          AT-A-GLANCE — 6 icon summary cards
      ══════════════════════════════════════════════════ */}
      <section className="border-b border-[#e8eef6] py-14" style={{ background: "#f8fafd" }}>
        <div className="max-w-[82rem] mx-auto px-6">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2 font-mono">Privacy at a glance</p>
            <h2 className="text-[26px] font-serif text-[#1f3a5f]">Key points — before you read further</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLANCE_ITEMS.map((item, i) => (
              <motion.div key={item.title} {...fadeUp(i * 0.05)}
                className="group bg-white border border-[#e8eef6] p-6 hover:border-[#bfdbfe] hover:shadow-sm transition-all duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: item.color }} />
                <div className="w-10 h-10 flex items-center justify-center mb-4"
                  style={{ background: item.bg, border: `1px solid ${item.color}25` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <p className="text-[14px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors">{item.title}</p>
                <p className="text-[13px] text-gray-500 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          COMPLIANCE BADGES
      ══════════════════════════════════════════════════ */}
      <div className="border-b border-[#e8eef6] bg-white">
        <div className="max-w-[82rem] mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] shrink-0 font-mono">
              Regulatory compliance
            </p>
            <div className="flex flex-wrap gap-3">
              {COMPLIANCE_BADGES.map((b) => (
                <div key={b.label}
                  className="flex items-center gap-2.5 border border-[#e8eef6] bg-[#f8fafd] px-4 py-2.5 hover:border-[#1f6fb2]/30 transition-colors">
                  <b.icon className="w-4 h-4 text-[#1f6fb2] shrink-0" />
                  <div>
                    <p className="text-[12.5px] font-bold text-[#1f3a5f] leading-none">{b.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-none">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/documents/logicsoft-privacy-policy.pdf" target="_blank"
              className="ml-auto flex items-center gap-2 text-[12.5px] font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors shrink-0">
              <Download className="w-3.5 h-3.5" />
              Download full policy (PDF)
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN CONTENT — Sticky TOC left | Prose right
      ══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#e8eef6] py-14">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="flex gap-16 items-start">

            {/* Sticky TOC */}
            <TableOfContents active={activeSection} />

            {/* Prose */}
            <div className="flex-1 min-w-0 max-w-[760px]">

              {/* ── 1. About this policy ── */}
              <SectionHeading id="s1" n="01">About this policy</SectionHeading>
              <P>LogicSoft Technologies Limited ("<strong>LogicSoft</strong>", "<strong>we</strong>", "<strong>us</strong>", or "<strong>our</strong>") is the data controller for the personal data described in this Privacy Policy. We are registered in Nigeria and operate in compliance with the Nigeria Data Protection Regulation 2019 (NDPR), the Nigeria Data Protection Act 2023, and — where applicable to our EU/UK clients and contacts — the General Data Protection Regulation (GDPR) and UK GDPR.</P>
              <P>This policy applies to all personal data we process in connection with:</P>
              <UL items={[
                "Our website at logicsoft.ng and any subdomains",
                "Services we provide to clients under contract",
                "Job applications, recruitment, and candidate management",
                "Communications you initiate with us (email, phone, contact forms, live chat)",
                "Marketing communications you have opted into",
              ]} />
              <P>This policy does not apply to third-party websites linked from our platform. We are not responsible for the privacy practices of those sites and encourage you to review their own policies.</P>
              <InfoBox icon={HelpCircle} color="#1f6fb2" bg="#eff6ff">
                If you have questions about this policy, please contact our Data Protection Officer at <strong>dpo@logicsoft.ng</strong> before taking any action. We are always willing to explain how your data is handled.
              </InfoBox>

              {/* ── 2. Information we collect ── */}
              <SectionHeading id="s2" n="02">Information we collect</SectionHeading>
              <P>We collect personal data in the following ways:</P>
              <P><strong className="text-[#1f3a5f]">Information you provide directly</strong></P>
              <UL items={[
                "Enquiry forms: name, email, phone, company, project description",
                "Account registration: name, email, role, and credentials",
                "Contracts and service agreements: full business and contact details",
                "Job applications: CV, cover letter, work history, references",
                "Support communications: content of tickets, chat logs, and email exchanges",
                "Marketing opt-ins: name, email, and communication preferences",
              ]} />
              <P><strong className="text-[#1f3a5f]">Information collected automatically</strong></P>
              <UL items={[
                "Log data: IP addresses, browser type, operating system, referring URLs",
                "Usage data: pages visited, time on page, click paths, session duration",
                "Device data: device type, screen resolution, language settings",
                "Cookies and tracking technologies (see Section 9 for full detail)",
              ]} />
              <P><strong className="text-[#1f3a5f]">Information from third parties</strong></P>
              <UL items={[
                "Publicly available business directories and LinkedIn profiles (for sales outreach, with a right to object)",
                "Our partners and referral networks where you have consented to data sharing",
                "Payment processors: we receive transaction confirmations but never raw card data",
              ]} />

              {/* ── 3. How we use your information ── */}
              <SectionHeading id="s3" n="03">How we use your information</SectionHeading>
              <P>We use personal data only for clearly defined purposes. We do not sell, rent, or trade your personal data to third parties for their own marketing purposes under any circumstances.</P>
              <UL items={[
                "Providing and managing the services we have contracted to deliver to you",
                "Responding to enquiries, proposals, and service requests",
                "Processing payments and managing invoicing and financial records",
                "Recruiting and evaluating job applicants",
                "Sending service updates, security notices, and operational communications",
                "Sending marketing communications where you have expressly opted in",
                "Improving our website, services, and internal processes through analytics",
                "Complying with legal and regulatory obligations under Nigerian and applicable international law",
                "Investigating and preventing fraud, security incidents, and abuse",
                "Exercising or defending legal claims",
              ]} />

              {/* ── 4. Legal basis for processing ── */}
              <SectionHeading id="s4" n="04">Legal basis for processing</SectionHeading>
              <P>Under NDPR and GDPR, we must identify a lawful basis for each processing activity. Our principal bases are:</P>
              <div className="space-y-3 mb-5">
                {[
                  { basis: "Contract",             color: "#1f6fb2", bg: "#eff6ff", desc: "Processing necessary to perform a contract with you, or to take steps at your request before entering into a contract." },
                  { basis: "Legal obligation",      color: "#dc2626", bg: "#fff1f2", desc: "Processing necessary to comply with Nigerian law, tax regulations, or applicable international legal requirements." },
                  { basis: "Legitimate interests",  color: "#7c3aed", bg: "#f5f3ff", desc: "Processing for our legitimate business interests — improving services, fraud prevention, network security — where these are not overridden by your rights." },
                  { basis: "Consent",               color: "#059669", bg: "#ecfdf5", desc: "Processing based on your freely given, specific, informed consent — principally for marketing emails and non-essential cookies. Consent may be withdrawn at any time." },
                ].map((b) => (
                  <div key={b.basis} className="flex gap-3 border p-4"
                    style={{ borderColor: `${b.color}25`, background: b.bg }}>
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: b.color }} />
                    <div>
                      <p className="text-[13px] font-bold mb-1" style={{ color: b.color }}>{b.basis}</p>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── 5. How we share your information ── */}
              <SectionHeading id="s5" n="05">How we share your information</SectionHeading>
              <P>We do not sell personal data. We share data only with the following categories of recipients, under strict contractual and/or regulatory safeguards:</P>
              <UL items={[
                "Cloud infrastructure providers (e.g. AWS, Azure, GCP) — for hosting our systems and client project environments",
                "Analytics providers (e.g. Google Analytics, Mixpanel) — pseudonymised usage data only",
                "Email and communication platforms (e.g. Mailchimp, Postmark) — for transactional and marketing email",
                "Customer support software (e.g. Zendesk, Intercom) — for support ticket management",
                "Accounting and payment systems (e.g. Paystack, QuickBooks) — for billing and financial management",
                "Professional advisers (solicitors, accountants, auditors) — under confidentiality obligations",
                "Law enforcement or regulatory bodies — where required by law or court order",
                "Acquirers or successors — in the event of a merger, acquisition, or sale of assets, subject to equivalent protections",
              ]} />
              <P>All sub-processors are bound by data processing agreements that require NDPR and/or GDPR-equivalent protections. We publish a list of our current sub-processors on request.</P>

              {/* ── 6. International data transfers ── */}
              <SectionHeading id="s6" n="06">International data transfers</SectionHeading>
              <P>LogicSoft is headquartered in Nigeria. Some of our sub-processors operate in the European Economic Area, United Kingdom, or United States. Where personal data is transferred outside Nigeria to a country not recognised by NITDA as having adequate protections, we rely on:</P>
              <UL items={[
                "Standard Contractual Clauses (SCCs) approved by the European Commission",
                "UK International Data Transfer Agreements (IDTAs) where applicable",
                "Your explicit consent where no other mechanism is available",
              ]} />
              <InfoBox icon={Globe} color="#0d9488" bg="#f0fdfa">
                Clients subject to GDPR should note that LogicSoft has entered into Data Processing Agreements (DPAs) with all EU-based sub-processors. Request a copy from your account manager or at <strong>dpo@logicsoft.ng</strong>.
              </InfoBox>

              {/* ── 7. Data retention ── */}
              <SectionHeading id="s7" n="07">Data retention</SectionHeading>
              <P>We retain personal data only for as long as is necessary for the purposes described in this policy, and in compliance with applicable legal and regulatory requirements. Our default retention periods are set out in the data table below. On expiry of the applicable retention period, personal data is securely deleted or anonymised so that it can no longer be associated with any individual.</P>
              <P>Factors we consider when determining retention include:</P>
              <UL items={[
                "The nature of our contractual relationship and whether services are ongoing",
                "Legal obligations under Nigerian financial, tax, and employment law",
                "Legitimate business need to resolve disputes or enforce agreements",
                "Whether you have exercised your right to erasure",
              ]} />

              {/* ── 8. Your rights ── */}
              <SectionHeading id="s8" n="08">Your rights</SectionHeading>
              <P>Under the NDPR and GDPR, you have the following rights in relation to your personal data. To exercise any right, submit a request to <strong>dpo@logicsoft.ng</strong> with sufficient information to verify your identity. We will respond within 30 days.</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {RIGHTS.map((r, i) => (
                  <motion.div key={r.right} {...fadeUp(i * 0.05)}
                    className="flex gap-3 border border-[#e8eef6] bg-[#f8fafd] p-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#eff6ff] border border-[#bfdbfe] shrink-0">
                      <r.icon className="w-4 h-4 text-[#1f6fb2]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#1f3a5f] mb-0.5">{r.right}</p>
                      <p className="text-[12px] text-gray-500 leading-snug">{r.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <InfoBox icon={AlertCircle} color="#b45309" bg="#fffbeb">
                You also have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) at <strong>ndpb.gov.ng</strong>, or with your local data protection authority if you are in the EU or UK.
              </InfoBox>

              {/* ── 9. Cookies ── */}
              <SectionHeading id="s9" n="09">Cookies and tracking</SectionHeading>
              <P>Our website uses cookies and similar technologies to distinguish you from other users, improve our site, and measure performance. We categorise cookies as follows:</P>
              <div className="space-y-2 mb-4">
                {[
                  { type: "Strictly necessary", color: "#059669", required: true,  desc: "Essential for the website to function. These cannot be disabled. Examples: session management, security tokens." },
                  { type: "Functional",          color: "#1f6fb2", required: false, desc: "Remember your preferences such as language or region to provide a personalised experience." },
                  { type: "Analytics",           color: "#7c3aed", required: false, desc: "Help us understand how visitors interact with our site. All data is pseudonymised. Powered by Google Analytics 4 with IP anonymisation enabled." },
                  { type: "Marketing",           color: "#dc2626", required: false, desc: "Used to serve relevant content and measure advertising effectiveness. Only deployed with your explicit consent." },
                ].map((c) => (
                  <div key={c.type} className="flex items-start gap-3 border border-[#e8eef6] p-4 bg-[#fafbfd]">
                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: c.color }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[13px] font-bold text-[#1f3a5f]">{c.type}</p>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 ${c.required ? "bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]" : "bg-[#f3f4f6] text-gray-400 border border-[#e5e7eb]"}`}>
                          {c.required ? "Always on" : "Optional"}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-gray-500 leading-snug">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <P>You can manage your cookie preferences at any time using our cookie preference centre (accessible from the footer) or your browser settings. Withdrawing consent will not affect the lawfulness of processing before withdrawal.</P>

              {/* ── 10. Children's privacy ── */}
              <SectionHeading id="s10" n="10">Children's privacy</SectionHeading>
              <P>Our services are not directed at children under the age of 18. We do not knowingly collect personal data from anyone under 18. If we become aware that we have inadvertently collected data from a child, we will delete it promptly. If you believe we have received personal data from a minor, please contact <strong>dpo@logicsoft.ng</strong> immediately.</P>

              {/* ── 11. Security ── */}
              <SectionHeading id="s11" n="11">Security</SectionHeading>
              <P>LogicSoft implements appropriate technical and organisational measures to protect personal data against unauthorised access, accidental loss, destruction, or alteration. Our security controls include:</P>
              <UL items={[
                "TLS 1.2+ encryption for all data in transit",
                "AES-256 encryption for data at rest in cloud storage",
                "Role-based access control (RBAC) with principle of least privilege",
                "Multi-factor authentication (MFA) enforced for all internal systems",
                "Annual third-party penetration testing of our infrastructure and applications",
                "Continuous vulnerability monitoring and dependency scanning",
                "Incident response plan with defined notification procedures",
                "Regular security awareness training for all staff",
              ]} />
              <InfoBox icon={Shield} color="#059669" bg="#ecfdf5">
                In the event of a personal data breach that poses a risk to your rights and freedoms, LogicSoft will notify the NDPC within 72 hours and will communicate directly with affected individuals without undue delay.
              </InfoBox>

              {/* ── 12. Changes ── */}
              <SectionHeading id="s12" n="12">Changes to this policy</SectionHeading>
              <P>We review this Privacy Policy at least annually and whenever there is a material change to how we process personal data. The "Last reviewed" date at the top of the page indicates when the current version was issued.</P>
              <P>For material changes, we will notify you by email (if we hold your address) or by placing a prominent notice on our website for at least 30 days before the change takes effect. Continued use of our services after the effective date of a revised policy constitutes acceptance of the revised terms.</P>
              <P>Previous versions of this policy are available on request from <strong>dpo@logicsoft.ng</strong>.</P>

              {/* ── 13. Contact & DPO ── */}
              <SectionHeading id="s13" n="13">Contact us & DPO</SectionHeading>
              <P>If you have questions, concerns, or wish to exercise any of your rights under this policy, contact our Data Protection Officer:</P>

              {/* DPO Card */}
              <motion.div {...fadeUp(0.05)}
                className="border border-[#bfdbfe] bg-gradient-to-br from-[#eff6ff] to-[#f5f9ff] overflow-hidden mb-6">
                <div className="h-1 bg-[#1f6fb2]" />
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-[#1f6fb2] uppercase tracking-[0.14em] mb-3 font-mono">Data Protection Officer</p>
                    <p className="text-[15px] font-serif font-bold text-[#1f3a5f] mb-1">LogicSoft DPO Office</p>
                    <p className="text-[13px] text-gray-500 leading-relaxed">LogicSoft Technologies Limited<br />14 Adeola Odeku Street<br />Victoria Island, Lagos, Nigeria</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Mail,     label: "Email",      value: "dpo@logicsoft.ng",   href: "mailto:dpo@logicsoft.ng" },
                      { icon: FileText, label: "Subject",    value: "Mark: PRIVACY REQUEST", href: null },
                      { icon: Clock,    label: "Response",   value: "Within 30 days",      href: null },
                    ].map((c) => (
                      <div key={c.label} className="flex items-start gap-2.5">
                        <c.icon className="w-3.5 h-3.5 text-[#1f6fb2] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">{c.label}</p>
                          {c.href
                            ? <a href={c.href} className="text-[13px] font-semibold text-[#1f6fb2] hover:underline">{c.value}</a>
                            : <p className="text-[13px] text-gray-600 font-medium">{c.value}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <P>If you are not satisfied with our response, you have the right to escalate your complaint to the Nigeria Data Protection Commission (NDPC), or if you are based in the EU or UK, to your local supervisory authority.</P>

            </div>{/* end prose */}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DATA TABLE — what we collect, why, retention
      ══════════════════════════════════════════════════ */}
      <section className="border-b border-[#e8eef6] py-14" style={{ background: "#f8fafd" }}>
        <div className="max-w-[82rem] mx-auto px-6">
          <motion.div {...fadeUp()} className="mb-8">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2 font-mono">Data reference table</p>
            <h2 className="text-[26px] font-serif text-[#1f3a5f]">What we collect, why, and for how long</h2>
          </motion.div>

          {/* Desktop table */}
          <div className="hidden lg:block border border-[#e8eef6] overflow-hidden shadow-sm">
            <div className="grid bg-[#1f3a5f] text-white text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ gridTemplateColumns: "160px 1fr 1fr 160px" }}>
              <div className="px-5 py-3">Category</div>
              <div className="px-5 py-3 border-l border-white/10">Examples</div>
              <div className="px-5 py-3 border-l border-white/10">Purpose</div>
              <div className="px-5 py-3 border-l border-white/10">Retention</div>
            </div>
            {DATA_TABLE.map((row, i) => (
              <div key={row.category}
                className={`grid border-t border-[#e8eef6] ${i % 2 === 0 ? "bg-white" : "bg-[#f8fafd]"}`}
                style={{ gridTemplateColumns: "160px 1fr 1fr 160px" }}>
                <div className="px-5 py-4 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: row.color }} />
                  <p className="text-[12.5px] font-bold text-[#1f3a5f]">{row.category}</p>
                </div>
                <div className="px-5 py-4 border-l border-[#e8eef6]">
                  <p className="text-[12.5px] text-gray-600 leading-relaxed">{row.examples}</p>
                </div>
                <div className="px-5 py-4 border-l border-[#e8eef6]">
                  <p className="text-[12.5px] text-gray-600 leading-relaxed">{row.purpose}</p>
                </div>
                <div className="px-5 py-4 border-l border-[#e8eef6]">
                  <p className="text-[11.5px] text-gray-500 leading-snug">{row.retention}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {DATA_TABLE.map((row, i) => (
              <motion.div key={row.category} {...fadeUp(i * 0.04)} className="bg-white border border-[#e8eef6] overflow-hidden">
                <div className="h-1" style={{ background: row.color }} />
                <div className="p-5">
                  <p className="text-[13.5px] font-bold text-[#1f3a5f] mb-3">{row.category}</p>
                  <div className="space-y-2">
                    {[
                      { label: "Examples",  value: row.examples  },
                      { label: "Purpose",   value: row.purpose   },
                      { label: "Retention", value: row.retention },
                    ].map((r) => (
                      <div key={r.label} className="flex gap-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-16 shrink-0 pt-0.5">{r.label}</p>
                        <p className="text-[12.5px] text-gray-600 leading-snug">{r.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RIGHTS CHECKLIST
      ══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#e8eef6] py-14">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
            <motion.div {...fadeUp()}>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2 font-mono">Exercise your rights</p>
              <h2 className="text-[26px] font-serif text-[#1f3a5f] mb-6">How to make a data request</h2>
              <div className="space-y-3">
                {[
                  { n: "01", title: "Identify your request",    body: "Determine which right you wish to exercise — access, erasure, restriction, portability, rectification, or objection." },
                  { n: "02", title: "Email the DPO",            body: 'Send your request to dpo@logicsoft.ng with the subject line "PRIVACY REQUEST" and your full name and the email address associated with your data.' },
                  { n: "03", title: "Identity verification",    body: "We may ask for proof of identity to ensure we do not disclose data to the wrong person. This is a security measure, not a barrier." },
                  { n: "04", title: "We respond within 30 days",body: "We aim to respond within 14 days and will always meet the 30-day statutory deadline. Complex requests may be extended by a further 60 days with notice." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4 border border-[#e8eef6] bg-[#f8fafd] p-4">
                    <div className="w-8 h-8 bg-[#1f6fb2] flex items-center justify-center text-white text-[11px] font-bold shrink-0">{s.n}</div>
                    <div>
                      <p className="text-[13.5px] font-bold text-[#1f3a5f] mb-0.5">{s.title}</p>
                      <p className="text-[12.5px] text-gray-500 leading-relaxed">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rights at a glance checklist */}
            <motion.div {...fadeUp(0.08)} className="border border-[#bfdbfe] bg-gradient-to-br from-[#eff6ff] to-[#f5f9ff] p-6 min-w-[300px]">
              <div className="h-1 -mx-6 -mt-6 mb-5 bg-[#1f6fb2]" />
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.14em] mb-4 font-mono">Your rights at a glance</p>
              <ul className="space-y-3">
                {RIGHTS.map((r) => (
                  <li key={r.right} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1f6fb2] mt-0.5 shrink-0" />
                    <p className="text-[13px] font-semibold text-[#1f3a5f]">{r.right}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-[#bfdbfe]">
                <a href="mailto:dpo@logicsoft.ng"
                  className="flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors">
                  <Mail className="w-4 h-4" />
                  dpo@logicsoft.ng
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA — dark navy
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #07111f 0%, #0d2448 65%, #0a1830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1f6fb2]/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/35 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <Shield className="w-3.5 h-3.5 text-[#60a8dc]" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Questions about your data?</span>
              </div>
              <h2 className="text-[28px] lg:text-[38px] font-serif text-white leading-tight mb-4">
                We take data protection seriously.
              </h2>
              <p className="text-[14.5px] text-white/45 leading-[1.9] max-w-lg">
                If you have any questions about this policy or how we handle your personal data,
                our Data Protection Officer is available and will respond within 30 days.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-3 shrink-0">
              <a href="mailto:dpo@logicsoft.ng"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[14px] font-bold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #7A2E00, #C45500 50%, #FF7A00)", boxShadow: "0 8px 28px rgba(196,85,0,0.4)" }}>
                Email the DPO <Mail className="w-4 h-4" />
              </a>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[13.5px] font-semibold border border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all duration-200">
                General enquiries <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="/documents/logicsoft-privacy-policy.pdf" target="_blank"
                className="inline-flex items-center justify-center gap-2 text-[12px] text-white/30 hover:text-white/60 transition-colors">
                <Download className="w-3.5 h-3.5" /> Download this policy (PDF)
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}