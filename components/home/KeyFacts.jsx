"use client";

import { motion } from "framer-motion";

const KEY_FACTS = [
  {
    value: "5+",
    label: "Years of industry experience",
    description: "Focused on reliable software delivery",
  },
  {
    value: "20+",
    label: "Production projects delivered",
    description: "Across web, mobile, cloud, and data platforms",
  },
  {
    value: "15+",
    label: "Enterprise & startup clients",
    description:
      "Partnering with startups and growing businesses across industries",
  },
  {
    value: "10+",
    label: "Experience across 10+ industries",
    description: "Banking, healthcare, retail, telecoms, oil & gas, more",
  },
];

const CAPABILITIES = [
  "Full-Stack Web Platforms",
  "Mobile Applications",
  "Cloud & Infrastructure",
  "Secure Software Engineering",
  "Data & Backend Systems",
  "Technology Consulting",
];

// Duplicate each list once so the strip can loop seamlessly.
// The animation only ever slides by -50% (or +50%), i.e. exactly
// one full copy of the list, so the loop point is invisible.
const FACTS_LOOP = [...KEY_FACTS, ...KEY_FACTS];
const CAPABILITIES_LOOP = [...CAPABILITIES, ...CAPABILITIES];

export default function KeyFacts() {
  return (
    <section
      id="key-facts"
      aria-labelledby="key-facts-heading"
      className="pt-12 sm:pt-20 pb-4 sm:pb-6 bg-[#f5f5f5] border-t border-gray-200"
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
          LogicSoft at a Glance
        </h2>

        {/* Intro paragraph */}
        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-[1.85] sm:leading-[2] max-w-[860px] mb-10 sm:mb-14">
          LogicSoft Technologies provides software engineering and technology
          consulting for startups and growing organizations. We design, build,
          and improve web, mobile, and business software with a focus on
          reliability, security, and long-term maintainability.
        </p>

        {/* Stats marquee — scrolls LEFT infinitely */}
        <div className="marquee-mask mb-6 sm:mb-8">
          <div className="marquee-track marquee-left">
            {FACTS_LOOP.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-200 px-5 sm:px-6 py-5 sm:py-6 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300 shrink-0 w-[260px] sm:w-[280px] mr-3"
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
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities marquee — scrolls RIGHT infinitely */}
        <div className="marquee-mask">
          <div className="marquee-track marquee-right">
            {CAPABILITIES_LOOP.map((cap, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] sm:text-[12.5px] font-medium text-[#1f3a5f] bg-white border border-gray-200 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-colors duration-150 cursor-default shrink-0 whitespace-nowrap mr-3"
              >
                <span
                  className="w-1.5 h-1.5 bg-[#1f6fb2] shrink-0"
                  aria-hidden="true"
                />
                {cap}
              </span>
            ))}
          </div>
        </div>
     </div>

      <style jsx>{`
        /* Clips the marquee and fades the edges so items don't
           appear to "pop" in/out at the container boundary. */
        .marquee-mask {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            black 5%,
            black 95%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0,
            black 5%,
            black 95%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }

        /* Pause on hover so users can read/click an item */
        .marquee-mask:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-left {
          animation: marquee-left 28s linear infinite;
        }

        .marquee-right {
          animation: marquee-right 22s linear infinite;
        }

        @keyframes marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            /* exactly one copy of the list = seamless loop */
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-left,
          .marquee-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}