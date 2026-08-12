"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

const faqItems = [
  {
    title: "Do you cover all stages of the Software Development Lifecycle (SDLC)?",
    desc: "Absolutely. SDA LogicSoft Technologies delivers end-to-end software engineering services from business analysis, system architecture, UI/UX design, and development to deployment, DevOps, quality assurance, and long-term support. Our multidisciplinary team ensures seamless execution across every phase of the lifecycle.",
    href: "/about/how-we-work",
    btnText: "Our approach",
  },
  {
    title: "How fast can you deliver a project?",
    desc: "Depending on complexity and scope, we can deliver an MVP within 2-12 weeks. Full-scale enterprise platforms are delivered in structured phases with iterative releases every 2–4 weeks. We prioritize speed without compromising architecture quality or security.",
    href: "/contact",
    btnText: "Share your project",
  },
  {
    title: "What determines the cost of software development?",
    desc: "Costs depend on feature complexity, number of platforms (web, mobile, desktop), integrations, UI sophistication, security requirements, scalability needs, and long-term infrastructure considerations. After analyzing your requirements, we provide a transparent and structured estimate.",
    href: "/pricing",
    btnText: "Request a quote",
  },
  {
    title: "What happens after launch?",
    desc: "After deployment, we monitor performance, resolve issues, apply security patches, and optimize infrastructure.\n\n• Incident management\n• Performance tuning\n• Feature evolution\n• L1–L3 support options\n\nWe focus on long-term partnerships and sustainable product growth.",
  },
  {
    title: "What development methodologies do you use?",
    desc: "We primarily use Agile methodologies such as Scrum and Kanban, delivering structured iterations every 2-3 weeks. For projects with strict compliance or fixed scope requirements, we can adopt Waterfall or hybrid models.",
    href: "/about/collaboration",
    btnText: "Learn about collaboration",
  },
  {
    title: "How do you ensure software quality?",
    desc: "We follow a shift-left testing strategy, enforce strict coding standards, perform automated and manual testing, and implement CI/CD validation pipelines. Security, performance, and scalability testing are integrated into every delivery cycle.",
    href: "/about/quality",
    btnText: "Our QA practices",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 bg-[#f5f5f5] border-t border-gray-200">
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">
              Got questions?
            </p>
            <h2 className="text-[36px] lg:text-[44px] font-serif text-[#1f3a5f] leading-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] text-gray-500 leading-[1.85] max-w-[560px]">
              Common questions about our services, methodology, and delivery approach.
            </p>
          </div>
          <Link
            href="/faq"
            className="shrink-0 inline-flex items-center gap-2 border border-[#1f6fb2] text-[#1f6fb2] text-[13px] font-semibold px-7 py-3 hover:bg-[#1f6fb2] hover:text-white transition-all duration-200 self-start lg:self-auto"
          >
            See all questions →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white border transition-all duration-200 ${
                  isOpen
                    ? "border-[#1f6fb2] shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <span className="shrink-0 text-[10px] font-mono text-gray-300 tracking-widest mt-[3px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] font-semibold text-[#1f3a5f] leading-snug">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-200 mt-[1px] ${
                      isOpen
                        ? "border-[#1f6fb2] bg-[#1f6fb2] text-white rotate-180"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    <FiChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* Answer panel */}
                {isOpen && (
                  <div className="px-6 pb-6 pl-[3.25rem]">
                    <div className="w-8 h-px bg-[#1f6fb2] mb-4" />
                    {item.desc.split("\n").map((line, j) => (
                      <p
                        key={j}
                        className={`text-[14px] text-gray-500 leading-[1.9] ${
                          line.startsWith("•")
                            ? "pl-2 border-l-2 border-gray-100 mb-1"
                            : "mb-2"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                    {item.href && item.btnText && (
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 mt-4 text-[12.5px] font-semibold text-[#1f6fb2] hover:underline underline-offset-4 transition-colors"
                      >
                        {item.btnText} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-200 bg-white px-8 py-6">
          <div>
            <p className="text-[14px] font-semibold text-[#1f3a5f] mb-0.5">
              Still have questions?
            </p>
            <p className="text-[13px] text-gray-400">
              Our team typically responds within 2 business hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-[#1f3a5f] text-white text-[13px] font-semibold px-7 py-3 hover:bg-[#1f6fb2] transition-all duration-200"
          >
            Talk to an expert →
          </Link>
        </div>

      </div>
    </section>
  );
}