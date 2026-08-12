"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const KEY_FACTS = [
  { value: "5+",  label: "Years of industry experience",      description: "Focused on enterprise delivery since day one"         },
  { value: "100+", label: "Projects successfully delivered",   description: "Across web, mobile, cloud, and data platforms"        },
  { value: "60+", label: "Enterprise & startup clients",      description: "From funded startups to established conglomerates"    },
  { value: "12+", label: "Industries served globally",        description: "Banking, healthcare, retail, telecoms, oil & gas, more"},
];


const CAPABILITIES = [
  "Full-Stack Web Platforms",
  "Mobile Applications",
  "Cloud-Native Architecture",
  "Cybersecurity Frameworks",
  "Data Engineering",
  "IT Consulting",
];

export default function KeyFacts() {
  return (
   
    <section
      id="key-facts"
      aria-labelledby="key-facts-heading"
      className="py-12 sm:py-20 bg-[#f5f5f5] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">

        {/* Eyebrow label */}
        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          Who we are
        </p>

        {/* Section heading */}
        <h2
          id="key-facts-heading"
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-serif text-[#1f3a5f] mb-4 sm:mb-5"
        >
          Key Facts About Logicsoft Technologies
        </h2>

        {/* Intro paragraph */}
        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-[1.85] sm:leading-[2] max-w-[860px] mb-10 sm:mb-14">
          At Logicsoft Technologies, we specialize in software development and
          consulting for startups, FinTech innovators, SaaS platforms, and
          enterprise organizations seeking long-term digital growth engineering
          high-performance systems designed to scale reliably, stay secure, and
          evolve with your business.
        </p>

        {/* Stats grid — 1 col mobile, 2 col sm, 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
          {KEY_FACTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group relative bg-white border border-gray-200 px-5 sm:px-6 py-5 sm:py-6 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
            >
              {/* Top hover line */}
              <span
                className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden="true"
              />
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[3px] bg-gray-100 group-hover:bg-[#1f6fb2] transition-colors duration-300"
                aria-hidden="true"
              />

              <div className="pl-4">
                {/* Stat value */}
                <p className="text-[38px] sm:text-[42px] font-light text-[#1f6fb2] leading-none mb-2 tracking-tight">
                  {item.value}
                </p>
                {/* Stat label */}
                <p className="text-[13.5px] sm:text-[14px] font-semibold text-[#1f3a5f] leading-snug mb-1">
                  {item.label}
                </p>
                {/* Stat description */}
                <p className="text-[12px] text-gray-400 leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Bottom hover line */}
              <span
                className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* Capabilities pill strip — wraps naturally on mobile */}
        <div className="flex flex-wrap gap-2 mb-10 sm:mb-14">
          {CAPABILITIES.map((cap, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] sm:text-[12.5px] font-medium text-[#1f3a5f] bg-white border border-gray-200 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-colors duration-150 cursor-default"
            >
              <span className="w-1.5 h-1.5 bg-[#1f6fb2] shrink-0" aria-hidden="true" />
              {cap}
            </span>
          ))}
        </div>

        {/* Client logos grid — 2 col mobile, 3 col sm, 6 col md */}
        <div className="bg-white border border-gray-200">

          {/* "Trusted by" label row */}
<div className="px-4 sm:px-6 py-4 sm:py-3 border-b border-gray-100">
  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em]">
    Trusted by Several Industries around the world :
  </p>
  </div>
{/* Large bold industries row */}
<div className="mt-3 sm:mt-2 flex flex-wrap items-center gap-x-15 gap-y-3 py-6 font-[playfair]">
<span className="px-7 engraved-text text-lg sm:text-xl font-extrabold text-gray-400 uppercase tracking-wide">
    HEALTHCARE
  </span>
  <span className="engraved-text text-lg sm:text-xl font-extrabold text-gray-400 uppercase tracking-wide">
    E-COMMERCE & RETAIL
  </span>
  <span className="engraved-text text-lg sm:text-xl font-extrabold text-gray-400 uppercase tracking-wide">
    TELECOMS
  </span>
  <span className="engraved-text text-lg sm:text-xl font-extrabold text-gray-400 uppercase tracking-wide">
    MANUFACTURING
  </span>
  <span className="engraved-text text-lg sm:text-xl font-extrabold text-gray-400 uppercase tracking-wide">
    EDUCATION & EDTECH
  </span>
  </div>
      </div>

      </div>
    </section>
  );
}