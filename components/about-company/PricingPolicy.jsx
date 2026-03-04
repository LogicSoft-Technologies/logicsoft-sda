"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FaLock, FaClock, FaChartPie, FaCalendarAlt } from "react-icons/fa";

const pricingModels = [
  {
    icon: FaLock,
    title: "Fixed Price",
    badge: "Most predictable",
    badgeBg: "#dcfce7",
    badgeColor: "#16a34a",
    description: "Recommended for mid-size projects where the full scope is clearly defined upfront. You know exactly what you'll pay before work begins.",
    bestFor: ["Well-scoped projects", "Fixed deliverables", "Budget certainty"],
    iconColor: "#1d4ed8", iconBg: "#dbeafe", iconBorder: "#bfdbfe",
  },
  {
    icon: FaClock,
    title: "Time and Material",
    badge: "Most flexible",
    badgeBg: "#fef3c7",
    badgeColor: "#b45309",
    description: "Recommended for mid-to-large projects and consulting engagements that are dynamic in nature and require fluidity as requirements evolve.",
    bestFor: ["Evolving requirements", "Ongoing consulting", "Iterative builds"],
    iconColor: "#7c3aed", iconBg: "#ede9fe", iconBorder: "#ddd6fe",
  },
  {
    icon: FaChartPie,
    title: "Consumption-Based Pricing",
    badge: "Pay for what you use",
    badgeBg: "#cffafe",
    badgeColor: "#0891b2",
    description: "Used for managed services and help desk engagements — billing is tied directly to usage metrics such as tickets resolved or cloud resources consumed.",
    bestFor: ["Managed services", "Help desk support", "Cloud-based workloads"],
    iconColor: "#dc2626", iconBg: "#fee2e2", iconBorder: "#fecaca",
  },
  {
    icon: FaCalendarAlt,
    title: "Monthly Subscription Fee",
    badge: "Consistent support",
    badgeBg: "#d1fae5",
    badgeColor: "#059669",
    description: "Used for ongoing support services where you need reliable, continuous coverage at a predictable monthly rate.",
    bestFor: ["Support retainers", "SLA-backed services", "Long-term partnerships"],
    iconColor: "#059669", iconBg: "#d1fae5", iconBorder: "#6ee7b7",
  },
];

export default function PricingPolicy() {
  return (
    <section
      id="pricing-policy"
      aria-labelledby="pricing-heading"
      className="py-12 sm:py-20 bg-white border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">

        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          Transparent pricing
        </p>

        <h2
          id="pricing-heading"
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-serif text-[#1f3a5f] mb-4 sm:mb-6"
        >
          Our Pricing Policy
        </h2>

        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-[1.85] sm:leading-[2] mb-10 sm:mb-14 max-w-[1100px]">
          Depending on the nature of your project and the service being delivered,
          Logicsoft Technologies applies one of the following pricing models — each
          designed to give you cost clarity, flexibility, and value at every stage
          of the engagement:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-12">
          {pricingModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <div
                key={index}
                className="group relative bg-white flex flex-col border border-gray-200 px-5 sm:px-6 pt-6 sm:pt-7 pb-5 sm:pb-6 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
              >
                <span
                  className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                  aria-hidden="true"
                />

                <div
                  className="mb-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border shrink-0"
                  style={{ backgroundColor: model.iconBg, borderColor: model.iconBorder }}
                >
                  <Icon size={18} style={{ color: model.iconColor }} aria-hidden="true" />
                </div>

                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-[#1f3a5f] leading-snug group-hover:text-[#1f6fb2] transition-colors duration-200">
                    {model.title}
                  </h3>
                  <span
                    className="shrink-0 text-[10px] font-semibold px-2 py-[2px] border"
                    style={{ backgroundColor: model.badgeBg, color: model.badgeColor, borderColor: model.badgeBg }}
                  >
                    {model.badge}
                  </span>
                </div>

                <p className="text-[13px] text-gray-500 leading-[1.85] mb-5">
                  {model.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-[0.08em] mb-2.5">
                    Best for
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {model.bestFor.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[12.5px] text-gray-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1f6fb2] shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link
            href="/pricing"
            className="flex items-center gap-2 px-6 sm:px-8 py-3 text-[13px] sm:text-[13.5px] font-semibold text-white
              bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
              hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
              ring-1 ring-inset ring-white/30 transition-all duration-200"
          >
            Estimate your project cost <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}