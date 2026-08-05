"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  FaClipboardList, FaCalculator, FaSlidersH, FaUsers,
  FaExclamationTriangle, FaRocket, FaExchangeAlt, FaWallet,
  FaClock, FaComments, FaChartBar, FaDatabase,
} from "react-icons/fa";

const guarantees = [
  {
    icon: FaClipboardList,
    title: "Engaged Requirements Engineering",
    description: "We don't expect all clients to arrive with a full specification. If you have high-level requirements only, we dive in, ask the right questions, and surface non-obvious needs and goals.",
    href: "/how-we-work/requirements",
    iconColor: "#1d4ed8", badgeBg: "#dbeafe", badgeBorder: "#bfdbfe",
  },
  {
    icon: FaCalculator,
    title: "Accurate and Realistic Cost Estimation",
    description: "Our thorough discovery work gives us a complete project scope, enabling precise cost estimates. We factor in risk and actively pursue cost optimisation where possible.",
    href: "/how-we-work/estimation",
    iconColor: "#0891b2", badgeBg: "#cffafe", badgeBorder: "#a5f3fc",
  },
  {
    icon: FaSlidersH,
    title: "Dynamic, Yet Controllable, Project Scoping",
    description: "We work out granular requirements at the start and stay responsive throughout. The result is software that meets your current goals even if those goals evolved over time.",
    href: "/how-we-work/scoping",
    iconColor: "#7c3aed", badgeBg: "#ede9fe", badgeBorder: "#ddd6fe",
  },
  {
    icon: FaUsers,
    title: "Competence-Based Team Selection",
    description: "We assess the expertise level your project demands and select team members accordingly. Clients get optimal resource costs and guaranteed high team performance.",
    href: "/how-we-work/team-selection",
    iconColor: "#059669", badgeBg: "#d1fae5", badgeBorder: "#6ee7b7",
  },
  {
    icon: FaExclamationTriangle,
    title: "Comprehensive Risk Management",
    description: "We evaluate operational, business, technology, and external risk factors, then plan mitigation strategies so we can react quickly and confidently to any disruption.",
    href: "/how-we-work/risk-management",
    iconColor: "#dc2626", badgeBg: "#fee2e2", badgeBorder: "#fecaca",
  },
  {
    icon: FaRocket,
    title: "Agile Delivery",
    description: "We manage evolving requirements by working in sprints, each covering a full cycle of feature ideation, development, testing, and deployment from a prioritised backlog.",
    href: "/how-we-work/agile",
    iconColor: "#d97706", badgeBg: "#fef3c7", badgeBorder: "#fde68a",
  },
  {
    icon: FaExchangeAlt,
    title: "Prevention of Scope Creep",
    description: "We're flexible to change but every change request is assessed for feasibility and desirability before it enters the project, keeping the process firmly under control.",
    href: "/how-we-work/scope-control",
    iconColor: "#b45309", badgeBg: "#fff7ed", badgeBorder: "#fed7aa",
  },
  {
    icon: FaWallet,
    title: "Budget Control",
    description: "Realistic estimates backed by a risk mitigation plan, thorough change-request management, and continuous budget monitoring throughout the full project lifecycle.",
    href: "/how-we-work/budget-management",
    iconColor: "#16a34a", badgeBg: "#dcfce7", badgeBorder: "#bbf7d0",
  },
  {
    icon: FaClock,
    title: "Responsible Approach to Deadlines",
    description: "Work decomposition, clear project documentation, and regular retrospectives allow us to manage project time effectively and deliver on schedule.",
    href: "/how-we-work/deadline-management",
    iconColor: "#1d4ed8", badgeBg: "#dbeafe", badgeBorder: "#bfdbfe",
  },
  {
    icon: FaComments,
    title: "Coordinated Teamwork",
    description: "We establish tailored communication flows and choose the right cadence and format to ensure seamless cooperation between all stakeholders on both sides.",
    href: "/how-we-work/collaboration",
    iconColor: "#ca8a04", badgeBg: "#fefce8", badgeBorder: "#fef08a",
  },
  {
    icon: FaChartBar,
    title: "Routine Reporting",
    description: "We report regularly on agreed KPIs and provide progress forecasts so clients are always in the loop, no surprises, no ambiguity.",
    href: "/how-we-work/reporting",
    iconColor: "#0891b2", badgeBg: "#cffafe", badgeBorder: "#a5f3fc",
  },
  {
    icon: FaDatabase,
    title: "Centralised Knowledge Management",
    description: "All important decisions and processes are documented to prevent data silos and knowledge loss, ensuring continuity across the full project team.",
    href: "/how-we-work/knowledge-management",
    iconColor: "#dc2626", badgeBg: "#fee2e2", badgeBorder: "#fecaca",
  },
];

export default function Guarantee() {
  return (
    <section
      id="guarantee"
      aria-labelledby="guarantee-heading"
      className="py-12 sm:py-20 bg-[#f5f5f5] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">

        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          Our commitment
        </p>

        <h2
          id="guarantee-heading"
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-serif text-[#1f3a5f] mb-4 sm:mb-6"
        >
          What We Do to Guarantee Project Success
        </h2>

        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-[1.85] sm:leading-[2] mb-10 sm:mb-14 max-w-[1100px]">
          At Logicsoft Technologies, we see our mission in driving project success no
          matter what. These are not just ambitious words, we apply a proven set of
          practices and techniques to keep projects on track and deliver on our
          commitments despite any possible obstacles. Our Code of Conduct underpins
          this dedication, fostering accountability, fairness, and professionalism
          across every engagement.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                aria-label={item.title}
                className="group relative bg-white flex flex-col border border-gray-200 px-5 sm:px-6 pt-6 sm:pt-7 pb-5 sm:pb-6 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
              >
                <span
                  className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />

                <ArrowUpRight
                  className="absolute top-3 right-3 w-[15px] h-[15px] text-gray-300 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:text-[#1f6fb2]"
                  aria-hidden="true"
                />

                <div
                  className="mb-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border shrink-0"
                  style={{ backgroundColor: item.badgeBg, borderColor: item.badgeBorder }}
                >
                  <Icon size={18} style={{ color: item.iconColor }} aria-hidden="true" />
                </div>

                <h3 className="text-[14px] sm:text-[14.5px] font-semibold text-[#1f3a5f] leading-snug mb-2 group-hover:text-[#1f6fb2] transition-colors duration-200">
                  {item.title}
                </h3>

                <p className="text-[13px] text-gray-500 leading-[1.85] flex-1">
                  {item.description}
                </p>

                <span className="inline-flex items-center gap-1 mt-4 text-[12.5px] font-medium text-[#1f6fb2] group-hover:gap-2 transition-all duration-200">
                  Details <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>

                <span
                  className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}