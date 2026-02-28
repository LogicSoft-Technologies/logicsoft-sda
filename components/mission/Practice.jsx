"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const practices = [
  { label: "Collaboration",               href: "/how-we-work/collaboration"        },
  { label: "Scope Management",            href: "/how-we-work/scoping"              },
  { label: "Cost Estimation",             href: "/how-we-work/estimate"             },
  { label: "Resource Selection",          href: "/how-we-work/resources"            },
  { label: "Risk Management",             href: "/how-we-work/risk-management"      },
  { label: "Deadline Management",         href: "/how-we-work/deadline-management"  },
  { label: "Budget Management",           href: "/how-we-work/budget-management"    },
  { label: "Change Request Management",   href: "/how-we-work/change-requests"      },
  { label: "Software Documentation",      href: "/how-we-work/documentation"        },
  { label: "Knowledge Management",        href: "/how-we-work/knowledge-management" },
  { label: "Success Measurement",         href: "/how-we-work/success-measurement"  },
  { label: "Project Reporting",           href: "/how-we-work/reporting"            },
];

export default function Practice() {
  return (
    <section
      id="practices"
      aria-labelledby="practices-heading"
      className="py-20 bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Header ── */}
        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          How we work
        </p>
        <h2
          id="practices-heading"
          className="text-[36px] font-serif text-[#1f3a5f] mb-6"
        >
          Logicsoft's Practices to Lead Software Projects to Success
        </h2>
        <p className="text-[17px] text-gray-700 leading-[2] mb-14 max-w-[1100px]">
          Wondering how we rise to the occasion in complex software initiatives?
          Explore the project management and development practices we apply to
          drive tangible results for our clients.
        </p>

        {/* ── Practice grid ── */}
        <div className="grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {practices.map((practice, index) => (
            <Link
              key={index}
              href={practice.href}
              aria-label={practice.label}
              className="group relative flex items-center justify-between bg-white border border-gray-200 px-5 py-12 overflow-hidden hover:border-[#1f6fb2] hover:shadow-sm transition-all duration-300"
            >
              {/* Top slide-in line */}
              <span
                className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden="true"
              />

              <span className="text-[15px] font-medium text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors duration-200 leading-snug">
                {practice.label}
              </span>

              <ArrowUpRight
                className="w-4 h-4 text-gray-300 shrink-0 ml-3 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:text-[#1f6fb2]"
                aria-hidden="true"
              />

              {/* Bottom slide-in line */}
              <span
                className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}