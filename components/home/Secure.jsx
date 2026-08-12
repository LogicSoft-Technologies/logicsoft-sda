"use client";

import React from "react";
import Link from "next/link";

const items = [
  {
    title: "Scoping",
    href: "/how-we-work/scoping",
    desc: "Learn how we gather complete requirements, map the accurate scope, and prevent scope creep while preserving critical deliverables.",
  },
  {
    title: "Resource Planning",
    href: "/how-we-work/resources",
    desc: "Discover how we compose a right-sized team and pick the best candidates for the needed roles under a fully outsourced cooperation model.",
  },
  {
    title: "Cost Estimation",
    href: "/how-we-work/estimate",
    desc: "Explore the factors and principles we consider to deliver precise estimates, see our sample cost calculations, and learn our cost optimization practices.",
  },
  {
    title: "Risk Management",
    href: "/how-we-work/risk-management",
    desc: "Check the steps we take to recognize potential risks at early project stages and effectively tackle emerging challenges throughout the SDLC.",
  },
  {
    title: "Change Management",
    href: "/how-we-work/change-requests",
    desc: "Understand our structured and controllable process to record, assess, triage, and implement feasible change requests.",
  },
  {
    title: "Success Measurement",
    href: "/how-we-work/success-measurement",
    desc: "Check the KPIs we use to objectively evaluate cooperation health and learn our practices for joint success assessment.",
  },
  {
    title: "Project Reporting",
    href: "/how-we-work/reporting",
    desc: "Learn the types and scope of reports we deliver in software development projects and explore report examples.",
  },
  {
    title: "Collaboration",
    href: "/how-we-work/collaboration",
    desc: "Discover the communication forms and tools we use to ensure productive teamwork and smooth interactions with our clients.",
  },
];

const Secure = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[82rem] mx-auto px-4 sm:px-10">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-[680px]">
            <p className="text-[11px] font-bold text-[#1f5fae] uppercase tracking-[0.16em] mb-4">
              Project management
            </p>
            <h2 className="text-[32px] lg:text-[44px] font-serif text-[#0f2b46] leading-[1.1] mb-5">
              Secure the Success of Your IT Initiative
            </h2>
            <p className="text-[16px] text-[#4a4a4a] leading-[1.85]">
              Check the tried-and-true{" "}
              <Link
                href="/how-we-work/project-management"
                className="text-[#1f5fae] hover:underline underline-offset-4"
              >
                project management practices
              </Link>{" "}
              we rely on to drive the project to its goals despite budget
              constraints and changing requirements. Beyond practices, our
              strength lies in our people and principles defined by our{" "}
              <Link
                href="/code-of-conduct"
                className="text-[#1f5fae] hover:underline underline-offset-4"
              >
                Code of Conduct
              </Link>{" "}
              ensuring every interaction is grounded in trust, respect, and
              transparency.
            </p>
          </div>

          {/* Stat callout */}
          <div className="shrink-0 flex flex-row lg:flex-col gap-8 lg:gap-5 lg:items-end">
            {[
              { value: "8", label: "Management disciplines" },
              { value: "100+", label: "Projects governed" },
            ].map((s) => (
              <div key={s.label} className="lg:text-right">
                <p className="text-[40px] font-light text-[#0f2b46] leading-none">
                  {s.value}
                </p>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Full-width top border ── */}
        <div className="w-full h-px bg-gray-200 mb-0" />

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={[
                "group relative px-8 py-9",
                "border-b border-gray-200",
                // left borders: every col except first in each row
                i % 2 !== 0 ? "sm:border-l" : "",
                i % 4 !== 0 ? "lg:border-l" : "",
                // remove sm border-l when lg overrides
                i % 4 === 0 ? "lg:border-l-0" : "",
                "hover:bg-[#f7fbff] transition-colors duration-200",
              ].join(" ")}
            >
              {/* Hover top accent line */}
              <span
                className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#1f5fae] to-[#6db3f2] transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden="true"
              />

              {/* Index */}
              <span className="block text-[10px] font-mono text-gray-300 mb-5 tracking-[0.2em]">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3 className="text-[16px] font-bold text-[#0f2b46] mb-3 leading-snug group-hover:text-[#1f5fae] transition-colors duration-200">
                <Link href={item.href}>{item.title}</Link>
              </h3>

              {/* Animated rule */}
              <div className="w-6 h-[2px] bg-[#1f5fae] mb-4 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />

              {/* Description */}
              <p className="text-[13.5px] text-[#5a5a5a] leading-[1.85] mb-5">
                {item.desc}
              </p>

              {/* Reveal-on-hover CTA */}
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#1f5fae] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>

        {/* ── Bottom border ── */}
        <div className="w-full h-px bg-gray-200" />

        {/* ── Footer CTA ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
          <p className="text-[14px] text-gray-400 leading-relaxed max-w-[500px]">
            Every engagement is governed end-to-end by these disciplines from
            kickoff through to post-launch.
          </p>
          <Link
            href="/how-we-work/project-management"
            className="shrink-0 inline-flex items-center gap-2 border border-[#1f5fae] text-[#1f5fae] text-[13px] font-semibold px-7 py-3 hover:bg-[#1f5fae] hover:text-white transition-all duration-200"
          >
            Full methodology →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Secure;
