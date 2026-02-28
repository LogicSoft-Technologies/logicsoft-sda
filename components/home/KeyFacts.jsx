"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const KEY_FACTS = [
  { value: "3+",  label: "Years of industry experience", description: "Focused on enterprise delivery since day one"         },
  { value: "50+", label: "Projects successfully delivered", description: "Across web, mobile, cloud, and data platforms"      },
  { value: "40+", label: "Enterprise & startup clients", description: "From funded startups to established conglomerates"   },
  { value: "12+", label: "Industries served globally", description: "Banking, healthcare, retail, telecoms, oil & gas, more" },
];

const CLIENT_LOGOS = [
  "/images/client1.svg",
  "/images/client2.svg",
  "/images/client3.svg",
  "/images/client4.svg",
  "/images/client5.svg",
  "/images/client4.svg",
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
      className="py-20 bg-[#f5f5f5] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Header ── */}
        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          Who we are
        </p>
        <h2
          id="key-facts-heading"
          className="text-[36px] font-serif text-[#1f3a5f] mb-5"
        >
          Key Facts About Logicsoft Technologies
        </h2>
        <p className="text-[17px] text-gray-700 leading-[2] max-w-[860px] mb-14">
          At Logicsoft Technologies, we specialise in software development and
          consulting for startups, FinTech innovators, SaaS platforms, and
          enterprise organisations seeking long-term digital growth — engineering
          high-performance systems designed to scale reliably, stay secure, and
          evolve with your business.
        </p>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {KEY_FACTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group relative bg-white border border-gray-200 px-6 py-6 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
            >
              {/* Top slide-in line */}
              <span
                className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden="true"
              />

              {/* Left accent bar */}
              <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-gray-100 group-hover:bg-[#1f6fb2] transition-colors duration-300" aria-hidden="true" />

              <div className="pl-4">
                <p className="text-[42px] font-light text-[#1f6fb2] leading-none mb-2 tracking-tight">
                  {item.value}
                </p>
                <p className="text-[14px] font-semibold text-[#1f3a5f] leading-snug mb-1">
                  {item.label}
                </p>
                <p className="text-[12px] text-gray-400 leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Bottom slide-in line */}
              <span
                className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        {/* ── Capabilities strip ── */}
        <div className="flex flex-wrap gap-2 mb-14">
          {CAPABILITIES.map((cap, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium text-[#1f3a5f] bg-white border border-gray-200 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-colors duration-150 cursor-default"
            >
              <span className="w-1.5 h-1.5 bg-[#1f6fb2] shrink-0" aria-hidden="true" />
              {cap}
            </span>
          ))}
        </div>

        {/* ── Client logos ── */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em]">
              Trusted by
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-0 divide-x divide-y divide-gray-100">
            {CLIENT_LOGOS.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-6 py-6 hover:bg-[#f9fbff] transition-colors duration-200"
              >
                <Image
                  src={logo}
                  alt={`Client ${index + 1}`}
                  width={120}
                  height={48}
                  className="object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}