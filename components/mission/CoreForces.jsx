"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaProjectDiagram, FaDraftingCompass, FaUserGraduate } from "react-icons/fa";

const forces = [
  {
    icon: FaProjectDiagram,
    title: "Project Management Office (PMO)",
    subtitle: "Accountable Delivery",
    href: "/how-we-work/pmo",
    description:
      "Our PMO applies lessons from hundreds of past projects to keep every initiative on track even in complex, changing environments. Certified project managers take full ownership of scope, budget, timelines, and risks, and stay completely accountable for results. Where multiple projects run in parallel, delivery managers oversee the full programme to keep all efforts aligned with your business goals.",
    iconColor: "#1d4ed8",
    badgeBg: "#dbeafe",
    badgeBorder: "#bfdbfe",
  },
  {
    icon: FaDraftingCompass,
    title: "Architecture and Solutions Center of Excellence",
    subtitle: "Strategic, Risk-Aware Design",
    href: "/how-we-work/architecture-coe",
    description:
      "Our Architecture and Solutions CoE sets and enforces the standards for scalable, secure, and cost-effective solutions. Led by Principal Architects with 10+ years of experience each, it establishes reusable architecture patterns and best practices, tracks emerging technologies, and conducts hands-on reviews to ensure every system supports your goals, avoids costly rework, and stands up to change.",
    iconColor: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeBorder: "#ddd6fe",
  },
  {
    icon: FaUserGraduate,
    title: "Technology and Competency Center of Excellence",
    subtitle: "People, Skills, Performance",
    href: "/how-we-work/competency-coe",
    description:
      "Our Technology & Competency CoE ensures every professional on your project performs above market average, bringing appropriate skills and deep industry knowledge. A core team of senior experts continuously trains, coaches, and certifies engineers, QA specialists, DevOps engineers, and business analysts focusing on both the latest technologies and the sectoral challenges and regulations that shape each engagement.",
    iconColor: "#059669",
    badgeBg: "#d1fae5",
    badgeBorder: "#6ee7b7",
  },
];

export default function CoreForces() {
  return (
    <section
      id="core-forces"
      aria-labelledby="core-forces-heading"
      className="py-20 bg-white border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Header ── */}
        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          How we deliver
        </p>
        <h2
          id="core-forces-heading"
          className="text-[36px] font-serif text-[#1f3a5f] mb-6"
        >
          Three Core Forces Behind Our Mission
        </h2>
        <p className="text-[17px] text-gray-700 leading-[2] mb-14 max-w-[1100px]">
          Logicsoft Technologies delivery model is built on three organisational
          units that work in unison ensuring every project is managed with
          discipline, designed with rigour, and staffed with the right people.
        </p>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {forces.map((force, index) => {
            const Icon = force.icon;
            return (
              <div
                key={index}
                className="group relative bg-white flex flex-col border border-gray-200 px-7 pt-8 pb-7 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
              >
                {/* Top slide-in line */}
                <span
                  className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />

                {/* Arrow */}
                <ArrowUpRight
                  className="absolute top-3 right-3 w-[15px] h-[15px] text-gray-300 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:text-[#1f6fb2]"
                  aria-hidden="true"
                />

                {/* Icon badge */}
                <div
                  className="mb-5 w-12 h-12 flex items-center justify-center border shrink-0"
                  style={{ backgroundColor: force.badgeBg, borderColor: force.badgeBorder }}
                >
                  <Icon size={22} style={{ color: force.iconColor }} aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-[15.5px] font-semibold text-[#1f3a5f] leading-snug mb-1 group-hover:text-[#1f6fb2] transition-colors duration-200">
                  {force.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[12px] font-semibold text-[#1f6fb2] uppercase tracking-[0.08em] mb-4">
                  {force.subtitle}
                </p>

                {/* Description */}
                <p className="text-[13.5px] text-gray-500 leading-[1.85] flex-1">
                  {force.description}
                </p>

                {/* Learn more */}
                <Link
                  href={force.href}
                  aria-label={`Learn more about ${force.title}`}
                  className="inline-flex items-center gap-1 mt-5 text-[12.5px] font-medium text-[#1f6fb2] group-hover:gap-2 transition-all duration-200"
                >
                  Learn more <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>

                {/* Bottom slide-in line */}
                <span
                  className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}