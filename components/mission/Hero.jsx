"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const pillars = [
  "Adapting fast to emerging challenges",
  "Designing with purpose, managing with discipline",
  "Deep expertise across industries and technologies",
];

export default function MissionHero() {
  return (
    <motion.section
      className="pt-[96px] bg-white border-b border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-label="Logicsoft Technologies Mission"
    >
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Breadcrumb ── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 pt-8 pb-12 text-[12px] text-gray-400 tracking-wide"
        >
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">
            Home
          </Link>
          <span className="text-gray-300">›</span>
          <Link
            href="/about/mission"
            aria-current="page"
            className="text-gray-600 font-medium hover:text-[#1f6fb2] transition-colors duration-200"
          >
            Mission
          </Link>
        </nav>

        {/* ── Two-col grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start pb-20">

          {/* LEFT — cover image */}
          <div className="relative w-full overflow-hidden border border-gray-200 shadow-sm">
            <div className="relative w-full" style={{ paddingBottom: "68%" }}>
              <img
                src="/images/case-1.png"
                alt="Logicsoft Technologies — Driving Project Success"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#1f3a5f]/80 backdrop-blur-sm px-5 py-4">
                <p className="text-white text-[13px] font-semibold tracking-wide">
                  Delivering Project Success. No Matter What.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — copy */}
          <div>
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-5">
              Our mission
            </p>

            <h1 className="text-[36px] lg:text-[50px] font-serif font-normal text-[#1f3a5f] leading-[1.12] mb-6">
              Our Mission
            </h1>

            <p className="text-[16px] text-gray-600 leading-[1.85] mb-5">
              At Logicsoft Technologies, project success is a responsibility we
              take personally. It's not about checking off deliverables it's
              about reaching the business outcomes our clients set, fully and
              efficiently, even when timelines and resources are limited.
            </p>

            <p className="text-[16px] text-gray-600 leading-[1.85] mb-8">
              We believe great results come from doing what it takes: adapting
              fast, solving emerging roadblocks, and staying focused on the
              goals, not just the plan. That means designing with purpose,
              managing with discipline, and bringing in people who understand
              the industries, technologies, and pressures behind each project.
            </p>

            {/* Pillars */}
            <ul className="flex flex-col gap-2.5 mb-10">
              {pillars.map((s, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13.5px] text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#1f6fb2] shrink-0" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            {/* Mission statement */}
            <div className="border-l-[3px] border-[#1f6fb2] pl-5 mb-10">
              <p className="text-[15px] text-[#1f3a5f] font-semibold leading-[1.75] italic">
                "Our mission is simple: if you trust us with your initiative,
                We'll make sure it succeeds completely, and with integrity
                at every step."
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}