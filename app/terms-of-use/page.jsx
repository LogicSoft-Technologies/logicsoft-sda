"use client";

/**
 * terms-of-use/page.jsx — LogicSoft Technologies
 * ─────────────────────────────────────────────
 * Enterprise-style Terms of Use page.
 *
 * Structure:
 *  - Hero
 *  - At-a-Glance
 *  - Legal / Governance strip
 *  - Sticky Table of Contents
 *  - Main Terms
 *  - Important notices
 *  - Contact / legal CTA
 *
 * IMPORTANT:
 * Review all company-specific legal details with qualified legal counsel
 * before publishing this document.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  ChevronRight,
  FileText,
  Shield,
  Lock,
  Globe,
  UserCheck,
  Code2,
  BriefcaseBusiness,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Mail,
  Scale,
  RefreshCcw,
  ExternalLink,
  Clock,
  Building2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────

const EFFECTIVE_DATE = "1 January 2025";
const LAST_REVIEWED = "18 September 2026";

const COMPANY_NAME = "LogicSoft Technologies";

const GLANCE_ITEMS = [
  {
    icon: FileText,
    title: "What these Terms cover",
    body:
      "These Terms govern your access to and use of the LogicSoft Technologies website, content, and applicable digital services.",
    color: "#1f6fb2",
    bg: "#eff6ff",
  },
  {
    icon: UserCheck,
    title: "Your responsibilities",
    body:
      "Use our website and services lawfully, provide accurate information, protect your credentials, and respect our intellectual property.",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
  {
    icon: Code2,
    title: "Our services",
    body:
      "Software development, web and mobile applications, technology consulting, digital solutions, and related professional services.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Lock,
    title: "Your information",
    body:
      "Personal information is handled according to our Privacy Policy and applicable data protection requirements.",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    icon: CreditCard,
    title: "Commercial terms",
    body:
      "Project pricing, payment schedules, deliverables, milestones, and acceptance criteria may be defined in a separate agreement or proposal.",
    color: "#b45309",
    bg: "#fffbeb",
  },
  {
    icon: Scale,
    title: "Legal framework",
    body:
      "These Terms are intended to establish clear rules for using the website and engaging with LogicSoft Technologies.",
    color: "#dc2626",
    bg: "#fff1f2",
  },
];

const GOVERNANCE_ITEMS = [
  {
    icon: Building2,
    label: "Company",
    value: "LogicSoft Technologies",
  },
  {
    icon: Globe,
    label: "Primary jurisdiction",
    value: "Nigeria",
  },
  {
    icon: Shield,
    label: "Privacy",
    value: "See Privacy Policy",
  },
  {
    icon: RefreshCcw,
    label: "Review cycle",
    value: "Periodically",
  },
];

const TOC_SECTIONS = [
  { id: "s1", label: "About these Terms" },
  { id: "s2", label: "Acceptance of Terms" },
  { id: "s3", label: "About LogicSoft" },
  { id: "s4", label: "Use of the Website" },
  { id: "s5", label: "Intellectual Property" },
  { id: "s6", label: "Software and Services" },
  { id: "s7", label: "Client Responsibilities" },
  { id: "s8", label: "Third-Party Services and Links" },
  { id: "s9", label: "Payments and Commercial Terms" },
  { id: "s10", label: "Confidentiality" },
  { id: "s11", label: "Privacy and Data Protection" },
  { id: "s12", label: "Disclaimers" },
  { id: "s13", label: "Limitation of Liability" },
  { id: "s14", label: "Indemnification" },
  { id: "s15", label: "Suspension and Termination" },
  { id: "s16", label: "Changes to these Terms" },
  { id: "s17", label: "Governing Law and Disputes" },
  { id: "s18", label: "Contact Us" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
  },
  transition: {
    duration: 0.45,
    ease: [0.22, 1, 0.36, 1],
    delay,
  },
});

function SectionHeading({ id, n, children }) {
  return (
    <div
      id={id}
      className="scroll-mt-28 flex items-start gap-4 mb-6 pt-10 first:pt-0 border-t border-[#e8eef6] first:border-t-0"
    >
      <div className="flex flex-col items-center shrink-0 pt-0.5">
        <span className="text-[9.5px] font-bold font-mono text-[#1f6fb2]/50 mb-1">
          {n}
        </span>

        <div
          className="w-px flex-1 bg-[#e8eef6] mt-1"
          style={{ minHeight: 32 }}
        />
      </div>

      <h2 className="text-[21px] font-serif font-bold text-[#1f3a5f] leading-snug pt-0.5">
        {children}
      </h2>
    </div>
  );
}

function P({ children, className = "" }) {
  return (
    <p
      className={`text-[14px] text-gray-600 leading-[1.9] mb-4 ${className}`}
    >
      {children}
    </p>
  );
}

function UL({ items }) {
  return (
    <ul className="mb-4 space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-2.5 text-[13.5px] text-gray-600 leading-relaxed"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] mt-1.5 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function InfoBox({
  icon: Icon,
  color = "#1f6fb2",
  bg = "#eff6ff",
  children,
}) {
  return (
    <div
      className="flex gap-3 px-4 py-4 border mb-5"
      style={{
        borderColor: `${color}25`,
        background: bg,
      }}
    >
      <Icon
        className="w-4 h-4 mt-0.5 shrink-0"
        style={{ color }}
      />

      <p className="text-[13px] text-gray-600 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STICKY TABLE OF CONTENTS
// ─────────────────────────────────────────────────────────────────────────────

function TableOfContents({ active }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="sticky top-24 w-[220px] shrink-0 hidden lg:block">
      <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-[0.16em] mb-4 font-mono pl-3">
        Table of contents
      </p>

      <div className="flex flex-col gap-0 border-l border-[#e8eef6]">
        {TOC_SECTIONS.map((section) => {
          const isActive = active === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`group text-left px-3 py-2 border-l-[2px] transition-all duration-150 text-[12.5px] leading-snug ${
                isActive
                  ? "border-[#1f6fb2] text-[#1f6fb2] font-semibold"
                  : "border-transparent text-gray-400 hover:text-[#1f3a5f] hover:border-[#1f6fb2]/30"
              }`}
              style={{ marginLeft: -1 }}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState("s1");

  const observerRef = useRef(null);

  useEffect(() => {
    const ids = TOC_SECTIONS.map((section) => section.id);

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top -
              b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    observerRef.current = observer;

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ================================================================
          HERO
      ================================================================ */}

      <section
        className="relative overflow-hidden border-b border-[#1a3258]"
        style={{
          background:
            "linear-gradient(145deg, #05101f 0%, #0a1e38 50%, #0d2448 100%)",
        }}
      >
        {/* Dot grid */}

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1f6fb2 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Background glow */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1f6fb2]/10 blur-[130px]" />

          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-[#0d3a6e]/18 blur-[100px]" />
        </div>

        {/* Ghost text */}

        <div
          className="absolute right-8 top-0 bottom-0 flex items-center pointer-events-none select-none"
          aria-hidden="true"
          style={{ opacity: 0.016 }}
        >
          <span className="text-[200px] font-serif text-white leading-none tracking-tighter">
            Terms
          </span>
        </div>

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">

          {/* Breadcrumb */}

          <nav className="flex items-center gap-1.5 pt-10 text-[11.5px] text-white/30">
            <Link
              href="/"
              className="hover:text-white/60 transition-colors"
            >
              Home
            </Link>

            <ChevronRight className="w-3 h-3" />

            <span className="text-white/55 font-medium">
              Terms of Use
            </span>
          </nav>

          <div className="py-14 lg:py-18 grid lg:grid-cols-[1fr_auto] gap-10 items-end">

            {/* Hero copy */}

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] animate-pulse" />

                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">
                  Legal · Terms of Use
                </span>
              </div>

              <h1 className="text-[42px] lg:text-[58px] font-serif text-white leading-[1.04] mb-5">
                Terms of Use
              </h1>

              <p className="text-[15.5px] text-white/50 leading-[1.9] max-w-[580px]">
                These Terms of Use establish the rules governing access to
                and use of the LogicSoft Technologies website, content,
                digital platforms, and applicable services.
              </p>
            </motion.div>

            {/* Meta */}

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="shrink-0 space-y-3"
            >
              {[
                {
                  label: "Effective date",
                  value: EFFECTIVE_DATE,
                },
                {
                  label: "Last reviewed",
                  value: LAST_REVIEWED,
                },
                {
                  label: "Company",
                  value: COMPANY_NAME,
                },
                {
                  label: "Primary jurisdiction",
                  value: "Nigeria",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-white/8 bg-white/[0.03] px-5 py-3 min-w-[280px]"
                >
                  <p className="text-[9.5px] font-bold text-white/30 uppercase tracking-[0.12em] mb-0.5">
                    {item.label}
                  </p>

                  <p className="text-[13px] text-white/70 font-medium">
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          AT A GLANCE
      ================================================================ */}

      <section
        className="border-b border-[#e8eef6] py-14"
        style={{ background: "#f8fafd" }}
      >
        <div className="max-w-[82rem] mx-auto px-6">

          <motion.div {...fadeUp()} className="mb-10">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2 font-mono">
              Terms at a glance
            </p>

            <h2 className="text-[26px] font-serif text-[#1f3a5f]">
              Key points before you continue
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GLANCE_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  {...fadeUp(index * 0.05)}
                  className="group bg-white border border-[#e8eef6] p-6 hover:border-[#bfdbfe] hover:shadow-sm transition-all duration-200 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2.5px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: item.color }}
                  />

                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4"
                    style={{
                      background: item.bg,
                      border: `1px solid ${item.color}25`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: item.color }}
                    />
                  </div>

                  <p className="text-[14px] font-bold text-[#1f3a5f] mb-2 group-hover:text-[#1f6fb2] transition-colors">
                    {item.title}
                  </p>

                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          GOVERNANCE STRIP
      ================================================================ */}

      <section className="border-b border-[#e8eef6] bg-white">
        <div className="max-w-[82rem] mx-auto px-6 py-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {GOVERNANCE_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 border border-[#e8eef6] bg-[#f8fafd] px-4 py-3"
                >
                  <Icon className="w-4 h-4 text-[#1f6fb2] shrink-0" />

                  <div>
                    <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-[0.12em]">
                      {item.label}
                    </p>

                    <p className="text-[12.5px] font-semibold text-[#1f3a5f]">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================================================================
          MAIN CONTENT
      ================================================================ */}

      <section className="bg-white border-b border-[#e8eef6] py-14">

        <div className="max-w-[82rem] mx-auto px-6">

          <div className="flex gap-16 items-start">

            {/* Sticky TOC */}

            <TableOfContents active={activeSection} />

            {/* Prose */}

            <div className="flex-1 min-w-0 max-w-[760px]">

              {/* ======================================================
                  1. ABOUT THESE TERMS
              ====================================================== */}

              <SectionHeading id="s1" n="01">
                About these Terms
              </SectionHeading>

              <P>
                These Terms of Use ("Terms") govern your access to and use
                of the LogicSoft Technologies website, digital platforms,
                content, and services made available through or in connection
                with our website.
              </P>

              <P>
                In these Terms, "LogicSoft", "we", "us", and "our" refer to
                LogicSoft Technologies. "You" and "your" refer to any
                individual or organisation accessing our website or using
                applicable services.
              </P>

              <P>
                These Terms should be read together with any proposal,
                statement of work, service agreement, software agreement,
                acceptable use policy, or other written agreement that may
                apply to a particular service.
              </P>

              <InfoBox icon={FileText}>
                If a signed agreement between you and LogicSoft contains
                terms that specifically govern a particular service or
                project, those project-specific terms may take precedence
                over these website Terms to the extent of any inconsistency.
              </InfoBox>

              {/* ======================================================
                  2. ACCEPTANCE
              ====================================================== */}

              <SectionHeading id="s2" n="02">
                Acceptance of Terms
              </SectionHeading>

              <P>
                By accessing or using this website, you acknowledge that
                you have read, understood, and agree to be bound by these
                Terms and our Privacy Policy.
              </P>

              <P>
                If you do not agree with these Terms, you should discontinue
                use of the website and should not use any service that is
                expressly subject to these Terms.
              </P>

              <P>
                If you are using our services on behalf of a company,
                organisation, or other legal entity, you represent that you
                have the authority to bind that entity to the applicable
                agreement.
              </P>

              {/* ======================================================
                  3. ABOUT LOGICSOFT
              ====================================================== */}

              <SectionHeading id="s3" n="03">
                About LogicSoft Technologies
              </SectionHeading>

              <P>
                LogicSoft Technologies is a technology company providing
                software development and digital technology services to
                businesses, organisations, entrepreneurs, and other clients.
              </P>

              <P>
                Depending on the engagement, our services may include:
              </P>

              <UL
                items={[
                  "Website and web application development",
                  "Mobile application development",
                  "Custom software development",
                  "Backend and API development",
                  "Cloud and infrastructure solutions",
                  "UI/UX and digital product development",
                  "Artificial intelligence and automation solutions",
                  "Technology consulting and technical support",
                  "Software maintenance, optimisation, and enhancements",
                ]}
              />

              {/* ======================================================
                  4. WEBSITE USE
              ====================================================== */}

              <SectionHeading id="s4" n="04">
                Use of the Website
              </SectionHeading>

              <P>
                You may use our website for lawful purposes and in a manner
                consistent with these Terms.
              </P>

              <P>
                You must not use the website to:
              </P>

              <UL
                items={[
                  "Violate any applicable law or regulation",
                  "Attempt to gain unauthorised access to systems, accounts, or networks",
                  "Introduce malicious code, malware, ransomware, or other harmful material",
                  "Interfere with the operation, security, or availability of the website",
                  "Scrape, harvest, or collect information through automated means without permission",
                  "Impersonate LogicSoft, its personnel, clients, or another person",
                  "Use our website to distribute fraudulent, deceptive, defamatory, or unlawful material",
                  "Infringe the intellectual property or other rights of LogicSoft or any third party",
                ]}
              />

              <InfoBox icon={AlertCircle} color="#b45309" bg="#fffbeb">
                We reserve the right to restrict access where reasonably
                necessary to protect our systems, users, clients, or the
                integrity of our services.
              </InfoBox>

              {/* ======================================================
                  5. INTELLECTUAL PROPERTY
              ====================================================== */}

              <SectionHeading id="s5" n="05">
                Intellectual Property
              </SectionHeading>

              <P>
                Unless otherwise stated, the website and its contents are
                owned by or licensed to LogicSoft Technologies. This includes
                our branding, logos, visual designs, text, graphics,
                interfaces, software, documentation, and other materials.
              </P>

              <P>
                Nothing in these Terms grants you ownership of LogicSoft's
                intellectual property.
              </P>

              <P>
                Subject to applicable law and any separate written agreement,
                you may view and use website content for legitimate
                informational and business purposes. You may not reproduce,
                modify, distribute, sell, publish, or create derivative
                works from our protected materials without appropriate
                permission.
              </P>

              <P>
                For client projects, ownership and licensing of source code,
                designs, documentation, deliverables, and other project
                materials will be determined by the applicable proposal,
                statement of work, or service agreement.
              </P>

              {/* ======================================================
                  6. SOFTWARE AND SERVICES
              ====================================================== */}

              <SectionHeading id="s6" n="06">
                Software and Services
              </SectionHeading>

              <P>
                LogicSoft may provide software development, consulting,
                implementation, maintenance, support, hosting, or other
                technology services.
              </P>

              <P>
                The specific scope of a client engagement may be documented
                through a proposal, quotation, statement of work, service
                agreement, milestone schedule, or other written agreement.
              </P>

              <P>
                Project requirements, timelines, deliverables, integrations,
                technical dependencies, acceptance criteria, support
                obligations, and commercial terms may vary between projects.
              </P>

              <InfoBox icon={BriefcaseBusiness}>
                A project estimate, proposal, or discussion does not by
                itself create an obligation to commence development. Work
                begins when the applicable commercial and contractual
                requirements have been agreed.
              </InfoBox>

              {/* ======================================================
                  7. CLIENT RESPONSIBILITIES
              ====================================================== */}

              <SectionHeading id="s7" n="07">
                Client Responsibilities
              </SectionHeading>

              <P>
                Clients are responsible for providing the information,
                approvals, materials, access credentials, technical
                requirements, and decisions reasonably necessary for us to
                perform an agreed engagement.
              </P>

              <UL
                items={[
                  "Providing accurate project requirements and business information",
                  "Providing timely feedback and approvals",
                  "Ensuring that supplied content and materials may lawfully be used",
                  "Maintaining appropriate access to third-party accounts controlled by the client",
                  "Reviewing and approving deliverables within agreed timelines",
                  "Maintaining backups of client-controlled data where appropriate",
                  "Complying with applicable laws and regulations relevant to the client's business",
                ]}
              />

              <P>
                Delays caused by missing information, delayed approvals,
                unavailable third-party services, or other client-controlled
                dependencies may affect project timelines.
              </P>

              {/* ======================================================
                  8. THIRD PARTY
              ====================================================== */}

              <SectionHeading id="s8" n="08">
                Third-Party Services and Links
              </SectionHeading>

              <P>
                Our website or services may integrate with or link to
                third-party services, platforms, APIs, hosting providers,
                payment providers, analytics tools, communication platforms,
                or other external services.
              </P>

              <P>
                Third-party services are generally governed by their own
                terms and privacy policies. LogicSoft does not control the
                operation, availability, security, or policies of independent
                third-party providers.
              </P>

              <P>
                Where a client project depends on a third-party service,
                changes, outages, pricing changes, API modifications, or
                discontinuation by that provider may affect the project or
                service.
              </P>

              {/* ======================================================
                  9. PAYMENTS
              ====================================================== */}

              <SectionHeading id="s9" n="09">
                Payments and Commercial Terms
              </SectionHeading>

              <P>
                Fees for LogicSoft services are determined according to the
                applicable proposal, quotation, statement of work, invoice,
                or service agreement.
              </P>

              <P>
                Unless otherwise agreed in writing, commercial documents may
                specify:
              </P>

              <UL
                items={[
                  "Project or service fees",
                  "Payment schedules",
                  "Deposits or upfront payments",
                  "Milestone payments",
                  "Taxes and applicable charges",
                  "Third-party service costs",
                  "Change requests and additional development",
                  "Maintenance or support fees",
                ]}
              />

              <P>
                A change in project requirements after approval may require
                a revised estimate, timeline, or commercial agreement.
              </P>

              <InfoBox icon={CreditCard} color="#7c3aed" bg="#f5f3ff">
                The commercial terms contained in a signed agreement,
                accepted quotation, or statement of work will govern the
                applicable project where they differ from these general
                website Terms.
              </InfoBox>

              {/* ======================================================
                  10. CONFIDENTIALITY
              ====================================================== */}

              <SectionHeading id="s10" n="10">
                Confidentiality
              </SectionHeading>

              <P>
                During a client engagement, either party may receive
                confidential or commercially sensitive information belonging
                to the other party.
              </P>

              <P>
                Each party should take reasonable measures to protect
                confidential information and use it only for the purposes for
                which it was disclosed.
              </P>

              <P>
                Confidentiality obligations may be further defined through
                a separate non-disclosure agreement, service agreement,
                statement of work, or other written contract.
              </P>

              {/* ======================================================
                  11. PRIVACY
              ====================================================== */}

              <SectionHeading id="s11" n="11">
                Privacy and Data Protection
              </SectionHeading>

              <P>
                Our collection and use of personal information is described
                in our Privacy Policy.
              </P>

              <P>
                By using the website, you acknowledge that personal
                information may be processed in accordance with our Privacy
                Policy and applicable data protection requirements.
              </P>

              <div className="border border-[#bfdbfe] bg-[#eff6ff] p-5 mb-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#1f6fb2] mt-0.5 shrink-0" />

                  <div>
                    <p className="text-[13.5px] font-bold text-[#1f3a5f] mb-1">
                      Privacy Policy
                    </p>

                    <p className="text-[12.5px] text-gray-600 leading-relaxed mb-3">
                      For information about personal data, cookies, data
                      rights, retention, security, and processing activities,
                      please review our Privacy Policy.
                    </p>

                    <Link
                      href="/privacy-policy"
                      className="inline-flex items-center gap-2 text-[12.5px] font-bold text-[#1f6fb2] hover:text-[#1f3a5f]"
                    >
                      View Privacy Policy
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* ======================================================
                  12. DISCLAIMERS
              ====================================================== */}

              <SectionHeading id="s12" n="12">
                Warranties and Disclaimers
              </SectionHeading>

              <P>
                We aim to keep the information on our website useful,
                accurate, and current. However, website content may contain
                errors, omissions, or information that becomes outdated.
              </P>

              <P>
                To the extent permitted by applicable law, the website and
                general informational content are provided on an
                "as available" basis.
              </P>

              <P>
                Nothing on the website should be interpreted as legal,
                financial, medical, accounting, or other professional advice
                unless expressly stated otherwise.
              </P>

              <P>
                Specific warranties, service levels, performance commitments,
                acceptance criteria, and remedies for client projects should
                be set out in the applicable written agreement.
              </P>

              {/* ======================================================
                  13. LIABILITY
              ====================================================== */}

              <SectionHeading id="s13" n="13">
                Limitation of Liability
              </SectionHeading>

              <P>
                To the maximum extent permitted by applicable law, LogicSoft
                Technologies will not be responsible for losses arising
                solely from matters outside our reasonable control, including
                failures of independent third-party services, internet
                connectivity, infrastructure outages, or unauthorised
                actions by third parties.
              </P>

              <P>
                Nothing in these Terms is intended to exclude or limit
                liability that cannot lawfully be excluded or limited under
                applicable law.
              </P>

              <P>
                Where a client agreement contains a negotiated limitation of
                liability, that agreement will govern the applicable project
                to the extent permitted by law.
              </P>

              {/* ======================================================
                  14. INDEMNIFICATION
              ====================================================== */}

              <SectionHeading id="s14" n="14">
                Indemnification
              </SectionHeading>

              <P>
                To the extent permitted by applicable law and subject to any
                applicable client agreement, you agree to use the website and
                our services lawfully and not in a manner that infringes the
                rights of LogicSoft or third parties.
              </P>

              <P>
                If your misuse of the website or violation of these Terms
                causes a third-party claim, investigation, loss, or expense,
                the parties may address responsibility and remedies according
                to the applicable agreement and governing law.
              </P>

              {/* ======================================================
                  15. TERMINATION
              ====================================================== */}

              <SectionHeading id="s15" n="15">
                Suspension and Termination
              </SectionHeading>

              <P>
                We may suspend or restrict access to the website or relevant
                services where reasonably necessary to protect our systems,
                users, clients, or legal interests.
              </P>

              <P>
                A client service may also be suspended or terminated in
                accordance with the applicable proposal, statement of work,
                service agreement, or other contractual arrangement.
              </P>

              <P>
                Termination of access does not automatically eliminate rights
                or obligations that are intended to survive termination,
                including applicable confidentiality, intellectual property,
                payment, dispute, or liability provisions.
              </P>

              {/* ======================================================
                  16. CHANGES
              ====================================================== */}

              <SectionHeading id="s16" n="16">
                Changes to these Terms
              </SectionHeading>

              <P>
                We may update these Terms from time to time to reflect
                changes to our services, business practices, technology, or
                applicable legal requirements.
              </P>

              <P>
                The "Last reviewed" date at the top of this page indicates
                when the current version was reviewed.
              </P>

              <P>
                Where appropriate, material changes may be communicated
                through our website or other reasonable channels.
              </P>

              <InfoBox icon={RefreshCcw} color="#0d9488" bg="#f0fdfa">
                Your continued use of the website after updated Terms are
                published may constitute acceptance of the updated Terms to
                the extent permitted by applicable law.
              </InfoBox>

              {/* ======================================================
                  17. GOVERNING LAW
              ====================================================== */}

              <SectionHeading id="s17" n="17">
                Governing Law and Dispute Resolution
              </SectionHeading>

              <P>
                These Terms are intended to be governed by the laws of the
                Federal Republic of Nigeria, subject to any mandatory
                provisions of applicable law.
              </P>

              <P>
                Where a dispute arises between LogicSoft and a client, the
                parties should first attempt to resolve the matter through
                good-faith communication and appropriate escalation between
                their authorised representatives.
              </P>

              <P>
                If a dispute cannot be resolved through reasonable
                discussions, the parties may use mediation, arbitration, or
                court proceedings as provided by the applicable written
                agreement and applicable law.
              </P>

              <InfoBox icon={Scale} color="#b45309" bg="#fffbeb">
                The precise dispute-resolution mechanism for a particular
                client engagement should be confirmed in the applicable
                signed agreement.
              </InfoBox>

              {/* ======================================================
                  18. CONTACT
              ====================================================== */}

              <SectionHeading id="s18" n="18">
                Contact Us
              </SectionHeading>

              <P>
                If you have questions about these Terms, our website, or
                LogicSoft Technologies services, you can contact our team.
              </P>

              {/* Contact Card */}

              <motion.div
                {...fadeUp(0.05)}
                className="border border-[#bfdbfe] bg-gradient-to-br from-[#eff6ff] to-[#f5f9ff] overflow-hidden mb-6"
              >
                <div className="h-1 bg-[#1f6fb2]" />

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

                  <div>
                    <p className="text-[10px] font-bold text-[#1f6fb2] uppercase tracking-[0.14em] mb-3 font-mono">
                      Legal & General Enquiries
                    </p>

                    <p className="text-[15px] font-serif font-bold text-[#1f3a5f] mb-1">
                      {COMPANY_NAME}
                    </p>

                    <p className="text-[13px] text-gray-500 leading-relaxed">
                      For questions concerning these Terms, services,
                      contracts, or general enquiries, please contact our
                      team.
                    </p>
                  </div>

                  <div className="space-y-3">

                    <div className="flex items-start gap-2.5">
                      <Mail className="w-3.5 h-3.5 text-[#1f6fb2] mt-0.5 shrink-0" />

                      <div>
                        <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">
                          Email
                        </p>

                        <a
                          href="mailto:contact@logicsofttechnologies.com"
                          className="text-[13px] font-semibold text-[#1f6fb2] hover:underline"
                        >
                          support@logicsofttechnologies.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <FileText className="w-3.5 h-3.5 text-[#1f6fb2] mt-0.5 shrink-0" />

                      <div>
                        <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">
                          Subject
                        </p>

                        <p className="text-[13px] text-gray-600 font-medium">
                          TERMS OF USE ENQUIRY
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-[#1f6fb2] mt-0.5 shrink-0" />

                      <div>
                        <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-wider">
                          Website
                        </p>

                        <Link
                          href="/"
                          className="text-[13px] text-[#1f6fb2] font-semibold hover:underline"
                        >
                          logicsofttechnologies.com
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>

              <P>
                For privacy-related requests, please refer to our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[#1f6fb2] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </P>

            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ACCEPTANCE CHECKLIST
      ================================================================ */}

      <section
        className="border-b border-[#e8eef6] py-14"
        style={{ background: "#f8fafd" }}
      >
        <div className="max-w-[82rem] mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">

            <motion.div {...fadeUp()}>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2 font-mono">
                Before using our services
              </p>

              <h2 className="text-[26px] font-serif text-[#1f3a5f] mb-6">
                What you should review
              </h2>

              <div className="space-y-3">

                {[
                  {
                    n: "01",
                    title: "Read these Terms",
                    body:
                      "Understand the general rules that apply when using the LogicSoft Technologies website.",
                  },
                  {
                    n: "02",
                    title: "Review our Privacy Policy",
                    body:
                      "Understand how personal information is collected and processed.",
                  },
                  {
                    n: "03",
                    title: "Review your project agreement",
                    body:
                      "For client work, review the applicable proposal, statement of work, quotation, or service agreement.",
                  },
                  {
                    n: "04",
                    title: "Contact us with questions",
                    body:
                      "If anything is unclear, contact LogicSoft before entering into a project or using a restricted service.",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="flex gap-4 border border-[#e8eef6] bg-white p-4"
                  >
                    <div className="w-8 h-8 bg-[#1f6fb2] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
                      {item.n}
                    </div>

                    <div>
                      <p className="text-[13.5px] font-bold text-[#1f3a5f] mb-0.5">
                        {item.title}
                      </p>

                      <p className="text-[12.5px] text-gray-500 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick reference */}

            <motion.div
              {...fadeUp(0.08)}
              className="border border-[#bfdbfe] bg-gradient-to-br from-[#eff6ff] to-[#f5f9ff] p-6 min-w-[300px]"
            >
              <div className="h-1 -mx-6 -mt-6 mb-5 bg-[#1f6fb2]" />

              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.14em] mb-4 font-mono">
                Quick reference
              </p>

              <ul className="space-y-3">

                {[
                  "Website use",
                  "Intellectual property",
                  "Client responsibilities",
                  "Payments and projects",
                  "Privacy",
                  "Liability",
                  "Termination",
                  "Dispute resolution",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1f6fb2] mt-0.5 shrink-0" />

                    <p className="text-[13px] font-semibold text-[#1f3a5f]">
                      {item}
                    </p>
                  </li>
                ))}

              </ul>

              <div className="mt-5 pt-5 border-t border-[#bfdbfe]">

                <a
                  href="mailto:contact@logicsofttechnologies.com"
                  className="flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact LogicSoft
                </a>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================================================================
          CTA
      ================================================================ */}

      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #07111f 0%, #0d2448 65%, #0a1830 100%)",
        }}
      >

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1f6fb2 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1f6fb2]/8 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-16 lg:py-20">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >

              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/35 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">

                <Scale className="w-3.5 h-3.5 text-[#60a8dc]" />

                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">
                  Questions about our Terms?
                </span>

              </div>

              <h2 className="text-[28px] lg:text-[38px] font-serif text-white leading-tight mb-4">
                Clear terms. Clear relationships.
              </h2>

              <p className="text-[14.5px] text-white/45 leading-[1.9] max-w-lg">
                If you have questions about these Terms or a LogicSoft
                project, our team is available to discuss the applicable
                requirements and next steps.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="flex flex-col gap-3 shrink-0"
            >

              <a
                href="mailto:contact@logicsofttechnologies.com"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[14px] font-bold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, #7A2E00, #C45500 50%, #FF7A00)",
                  boxShadow:
                    "0 8px 28px rgba(196,85,0,0.4)",
                }}
              >
                Contact LogicSoft
                <Mail className="w-4 h-4" />
              </a>

              <Link
                href="/privacy-policy"
                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-[13.5px] font-semibold border border-white/20 text-white/60 hover:border-white/40 hover:text-white transition-all duration-200"
              >
                Privacy Policy
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-[12px] text-white/30 hover:text-white/60 transition-colors"
              >
                General enquiries
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}