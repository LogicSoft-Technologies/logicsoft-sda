"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  FaHeartbeat,
  FaUniversity,
  FaShieldAlt,
  FaHandHoldingUsd,
  FaCreditCard,
  FaChartLine,
  FaBuilding,
  FaShoppingCart,
  FaCogs,
  FaTruck,
  FaOilCan,
  FaBolt,
  FaBriefcase,
  FaSatelliteDish,
  FaHardHat,
  FaPlane,
} from "react-icons/fa";

const industries = [
  {
    icon: FaHeartbeat,
    label: "Healthcare",
    iconColor: "#16a34a",
    badgeBg: "#dcfce7",
    badgeBorder: "#bbf7d0",
  },
  {
    icon: FaUniversity,
    label: "Banking",
    iconColor: "#1d4ed8",
    badgeBg: "#dbeafe",
    badgeBorder: "#bfdbfe",
  },
  {
    icon: FaShieldAlt,
    label: "Insurance",
    iconColor: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeBorder: "#ddd6fe",
  },
  {
    icon: FaHandHoldingUsd,
    label: "Lending",
    iconColor: "#b45309",
    badgeBg: "#fef3c7",
    badgeBorder: "#fde68a",
  },
  {
    icon: FaCreditCard,
    label: "Payments",
    iconColor: "#0891b2",
    badgeBg: "#cffafe",
    badgeBorder: "#a5f3fc",
  },
  {
    icon: FaChartLine,
    label: "Investment",
    iconColor: "#059669",
    badgeBg: "#d1fae5",
    badgeBorder: "#6ee7b7",
  },
  {
    icon: FaBuilding,
    label: "Real Estate",
    iconColor: "#d97706",
    badgeBg: "#fff7ed",
    badgeBorder: "#fed7aa",
  },
  {
    icon: FaShoppingCart,
    label: "Retail",
    iconColor: "#db2777",
    badgeBg: "#fce7f3",
    badgeBorder: "#fbcfe8",
  },
  {
    icon: FaCogs,
    label: "Manufacturing",
    iconColor: "#475569",
    badgeBg: "#f1f5f9",
    badgeBorder: "#cbd5e1",
  },
  {
    icon: FaTruck,
    label: "Logistics and Transportation",
    iconColor: "#ea580c",
    badgeBg: "#fff7ed",
    badgeBorder: "#fed7aa",
  },
  {
    icon: FaOilCan,
    label: "Oil and Gas",
    iconColor: "#92400e",
    badgeBg: "#fef3c7",
    badgeBorder: "#fde68a",
  },
  {
    icon: FaBolt,
    label: "Energy and Utilities",
    iconColor: "#ca8a04",
    badgeBg: "#fefce8",
    badgeBorder: "#fef08a",
  },
  {
    icon: FaBriefcase,
    label: "Professional Services",
    iconColor: "#1e40af",
    badgeBg: "#eff6ff",
    badgeBorder: "#bfdbfe",
  },
  {
    icon: FaSatelliteDish,
    label: "Telecoms",
    iconColor: "#0e7490",
    badgeBg: "#ecfeff",
    badgeBorder: "#a5f3fc",
  },
  {
    icon: FaHardHat,
    label: "Engineering and Construction",
    iconColor: "#b45309",
    badgeBg: "#fffbeb",
    badgeBorder: "#fde68a",
  },
  {
    icon: FaPlane,
    label: "Travel and Hospitality",
    iconColor: "#0369a1",
    badgeBg: "#f0f9ff",
    badgeBorder: "#bae6fd",
  },
];

export default function Industries() {
  return (
    <section
      id="industries-section"
      aria-labelledby="industries-heading"
      className="py-12 sm:py-20 bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-6">
        <h2
          id="industries-heading"
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-serif text-[#1f3a5f] mb-4 sm:mb-6"
        >
          Industries Logicsoft Technologies Serves
        </h2>

        <p className="text-[15px] sm:text-[17px] text-gray-700 leading-[1.85] sm:leading-[2] mb-10 sm:mb-14 max-w-[1100px]">
          During our practice, we acquired expertise and a deep understanding of
          business models and processes across 10+ industries. Logicsoft
          Technologies brings domain knowledge and technical depth to every
          engagement, including:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.label}
                className="bg-white flex flex-col items-center border border-gray-200 px-4 sm:px-6 pt-6 sm:pt-7 pb-5 sm:pb-6 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
              >
                <div
                  className="mb-3 sm:mb-4 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center rounded-sm"
                 
                >
                  {industry.image ? (
                    <Image
                      src={industry.image}
                      alt={`${industry.label} industry`}
                      width={28}
                      height={28}
                      className="h-12 w-12 object-contain"
                    />
                  ) : (
                    <Icon
                      size={25}
                      style={{ color: industry.iconColor }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <span className="text-[13px] sm:text-[14.5px] text-gray-800 text-center font-semibold leading-snug">
                  {industry.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}