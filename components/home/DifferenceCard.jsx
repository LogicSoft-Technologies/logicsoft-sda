"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const PILLARS = [
  {
    num: "01",
    title: "Business-First Engineering",
    desc: "Every technical decision is evaluated against business outcomes — not engineering preference.",
  },
  {
    num: "02",
    title: "Industry-Trained Experts",
    desc: "We deploy specialists with direct domain experience in your sector, workflows, and regulatory environment.",
  },
  {
    num: "03",
    title: "Constraint-Proof Delivery",
    desc: "Changing requirements, tight budgets, shifting timelines — we build the process to absorb all of it.",
  },
];

export default function DifferenceCard() {
  return (
    <section className="relative w-full max-w-[82rem] mx-auto px-4 py-16">
      <div className="relative w-full overflow-hidden">

        {/* Background image + overlay */}
        <div className="absolute inset-0 border-l-[5px] border-[#247cce]">
          <Image
            src="/images/yello.jpg"
            alt="LogicSoft Difference"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 lg:p-14 min-h-[26rem]">

          {/* Top row — eyebrow + heading */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#247cce] uppercase tracking-[0.18em] mb-4">
              <span className="w-6 h-px bg-[#247cce]" />
              What Makes LogicSoft Different
            </span>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-white leading-[1.1] max-w-[600px]">
                We Achieve Project Success<br className="hidden lg:block" />
                <span className="text-[#247cce]"> No Matter What.</span>
              </h2>

              <Link
                href="/contact"
                className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#247cce] text-[13.5px] font-semibold text-white hover:bg-[#247cce] transition-all duration-250 self-start lg:self-auto"
              >
                See how we deliver results
                <span className="text-[#247cce] group-hover:text-white transition-colors">→</span>
              </Link>
            </div>

            <p className="mt-5 text-[15px] text-white/65 leading-[1.85] max-w-[680px]">
              Project success is our standard, not a slogan. We drive projects to their goals by
              overcoming constraints, designing solutions that prioritise business value, and
              bringing in experts trained for your specific industry.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-10" />

          {/* Pillars row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                className={`py-6 pr-8 ${i !== 0 ? "sm:pl-8 sm:border-l border-white/10" : ""} ${i !== PILLARS.length - 1 ? "border-b sm:border-b-0 border-white/10 pb-8 sm:pb-6" : "pt-8 sm:pt-6"}`}
              >
                <span className="block text-[11px] font-mono text-white/25 tracking-widest mb-3">
                  {p.num}
                </span>
                <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[13px] text-white/55 leading-[1.8]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}