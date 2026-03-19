"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const heroImages = [
  { src: "/images/newsletter.jpg", alt: "Logicsoft Lagos HQ"      },
  { src: "/images/office2.jpg",    alt: "Engineering team at work" },
  { src: "/images/office3.jpg",    alt: "Client collaboration"     },
];

const signals = [
  "5+ years delivering enterprise software",
  "100+ projects shipped across 30+ industries",
  "Offices in Lagos, Abuja and Edo",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.section
      className="pt-[96px] bg-white border-b border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      aria-label="About Logicsoft Technologies"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 pt-6 sm:pt-8 pb-8 sm:pb-12 text-[12px] text-gray-400 tracking-wide"
        >
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">
            Home
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">About Company</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start pb-14 sm:pb-20">

          <div>
            <h1 className="text-[28px] sm:text-[36px] lg:text-[50px] font-serif font-normal text-[#1f3a5f] leading-[1.12] mb-3 sm:mb-4">
              About LogicSoft —
            </h1>

            <h2 className="text-[16px] sm:text-[18px] text-[#1f6fb2] font-medium mb-4 sm:mb-6 leading-snug">
              Your Partner for Project Success
            </h2>

            <p className="text-[15px] sm:text-[16px] text-gray-600 leading-[1.85] max-w-[520px] mb-6 sm:mb-8">
              Founded as Logicsoft Technologies, we deliver IT consulting and
              software development services with a strong focus on transparency,
              budget control, and consistently high service quality. Our clients
              trust us to build scalable, secure, and future-ready digital solutions.
            </p>

            <ul className="flex flex-col gap-2 sm:gap-2.5 mb-8 sm:mb-10">
              {signals.map((s, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px] sm:text-[13.5px] text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-[#1f6fb2] shrink-0" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 text-[13px] sm:text-[13.5px] font-semibold text-white
                  bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                  hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                  ring-1 ring-inset ring-white/30 transition-all duration-200"
              >
                Start a project <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 text-[13px] sm:text-[13.5px] font-medium
                  border border-[#1f6fb2] text-[#1f6fb2]
                  hover:bg-[#1f6fb2] hover:text-white transition-all duration-200"
              >
                Our services
              </Link>
            </div>

            <div className="mt-8 sm:mt-10 w-16 h-[3px] bg-[#1f6fb2]" />
          </div>

          <div className="relative w-full overflow-hidden bg-white border border-gray-200 shadow-sm">
            <div className="relative w-full" style={{ paddingBottom: "64%" }}>
              <AnimatePresence>
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9 }}
                  className="absolute inset-0"
                >
                  <img
                    src={heroImages[current].src}
                    alt={heroImages[current].alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-3 right-3 z-10 bg-white/85 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-gray-500 border border-gray-200">
                {current + 1} / {heroImages.length}
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100">
              {heroImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Show: ${img.alt}`}
                  className={`h-[3px] transition-all duration-300 ${
                    idx === current ? "w-8 bg-[#1f6fb2]" : "w-4 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
              <span className="ml-auto text-[11px] text-gray-400 truncate max-w-[140px] sm:max-w-[200px]">
                {heroImages[current].alt}
              </span>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}