"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    image: "/images/case-studies/dwh-project.png",
    alt: "Data warehouse project management",
    tag: "Data Engineering",
    title: "Getting a Multi-Vendor DWH Development Project Back on Track",
    challenge:
      "A leading financial regulator commissioned two subcontractors to build its data analytics solution. Poor communication across 30+ stakeholders, unstructured change request workflows, and scope creep meant 40% of the project's duration was lost to coordination alone.",
    solution:
      "Logicsoft formalised requirements gathering and change processing, reorganised the development teams into 10 smaller units, established meeting and reporting schedules, and set up a shared knowledge repository. The client eliminated redundant communication, accelerated development, and regained full control of scope.",
    href: "/case-studies/dwh-project-recovery",
  },
  {
    image: "/images/case-studies/insurance-revamp.jpg",
    alt: "Insurance software revamp",
    tag: "Insurance",
    title: "Rescuing an Insurance Software Revamp From Prior Vendor Missteps",
    challenge:
      "A property insurance brokerage's custom system had incomplete documentation, no structured change management, and changes were being tested directly in production — meaning every unfixed defect immediately disrupted live operations.",
    solution:
      "Within one week, Logicsoft audited the legacy software and produced a full revamp plan including rearchitecting and refactoring guidelines. We identified workflow bottlenecks and helped implement standardised documentation, reporting, and change management practices — reducing costs and accelerating the revamp.",
    href: "/case-studies/insurance-software-rescue",
  },
  {
    image: "/images/case-studies/enterprise-integration.jpg",
    alt: "Enterprise application integration",
    tag: "Enterprise IT",
    title: "Securing Enterprise Data Flows for a Multi-Billion-Dollar Conglomerate",
    challenge:
      "A global conglomerate with 30+ businesses across retail, BFSI, and logistics operated dozens of siloed systems. Data was transferred manually between CRMs, ERPs, POS, and supply chain tools — delaying decisions, causing errors, and making group-wide analytics impossible.",
    solution:
      "Logicsoft architects presented four integration scenarios, each backed by a detailed technology stack recommendation. The new integration foundation kept data clean, consistent, secure, and instantly accessible — positioning the company to scale, innovate faster, and capitalise fully on its global reach.",
    href: "/case-studies/enterprise-integration",
  },
  {
    image: "/images/case-studies/oncology-system.jpg",
    alt: "Oncology drug production automation",
    tag: "Healthcare",
    title: "Ensuring GAMP4-Compliant Oncology and TPN Drug Production Without Disruptions",
    challenge:
      "A multinational pharmaceutical company relied on outdated, fragmented IT to manage oncology and TPN drug production. Disconnected modules, manual updates, fax-based ordering, and a system that failed GAMP4 standards all threatened regulatory compliance and patient safety.",
    solution:
      "Logicsoft delivered a GAMP4-compliant, full-cycle system unifying production, stock control, invoicing, reporting, and security. Key functions included automated recipe validation, least-waste compounding logic, and full production step tracking. The solution has sustained uninterrupted performance for over 10 years.",
    href: "/case-studies/oncology-drug-system",
  },
  {
    image: "/images/case-studies/telecom-analytics.jpg",
    alt: "Telecom analytics platform",
    tag: "Telecoms",
    title: "Delivering a Cost-Aware Streaming and Analytics Platform for Telecom",
    challenge:
      "A Texas-based telecom provider needed a platform to consolidate data from 10+ sources. The legacy setup couldn't support multi-tenancy, high-velocity telemetry, or predictive analytics — creating cost inefficiencies and preventing churn prediction.",
    solution:
      "Logicsoft delivered a scalable, multi-tenant big data platform using AWS, Apache Kafka, and ROLAP cubes. Combining Amazon Spot Instances and load balancers with a thoughtfully designed data pipeline, the platform reduced AWS computing costs by 80% without compromising performance.",
    href: "/case-studies/telecom-analytics",
  },
  {
    image: "/images/case-studies/digital-imaging.jpg",
    alt: "Digital imaging software delivery",
    tag: "Software Development",
    title: "Succeeding Where Other Vendors Failed: Scrum-Based Delivery of Digital Imaging Software",
    challenge:
      "A global image processing company had a poor track record with offshore vendors. A parallel vendor they hired failed to deliver. They needed a team to take over the failing project and meet their demanding Agile and PM standards.",
    solution:
      "Logicsoft's Scrum Master established scoping, communication, and change management flows that ensured rapid, aligned delivery. Each product shipped within 4 months. Flexible resource scaling allowed the client to optimise costs. The collaboration lasted nearly 5 years and produced 12 software products.",
    href: "/case-studies/digital-imaging-software",
  },
];

export default function TurningObstacles() {
  return (
    <section
      id="turning-obstacles"
      aria-labelledby="turning-obstacles-heading"
      className="py-20 bg-[#f5f5f5] border-t border-gray-200"
    >
      <div className="max-w-[82rem] mx-auto px-6">

        {/* ── Header ── */}
        <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
          Featured projects
        </p>
        <h2
          id="turning-obstacles-heading"
          className="text-[36px] font-serif text-[#1f3a5f] mb-6"
        >
          Turning Obstacles Into Successes
        </h2>
        <p className="text-[17px] text-gray-700 leading-[2] mb-14 max-w-[1100px]">
          Challenging projects test our expertise, but they also define our ability to
          deliver. Here are a few cases we are particularly proud of each one a
          real world demonstration of Logicsoft's commitment to project success no
          matter what.
        </p>

        {/* ── Project cards ── */}
        <div className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group grid md:grid-cols-[300px_1fr] bg-white border border-gray-200 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Tag pill */}
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] bg-[#1f3a5f] text-white">
                  {project.tag}
                </span>
              </div>

              {/* Content */}
              <div className="px-8 py-7 flex flex-col">

                <h3 className="text-[16px] font-semibold text-[#1f3a5f] leading-snug mb-5 group-hover:text-[#1f6fb2] transition-colors duration-200">
                  {project.title}
                </h3>

                <div className="grid sm:grid-cols-2 gap-6 flex-1 mb-6">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] mb-2">
                      Challenge
                    </p>
                    <p className="text-[13.5px] text-gray-500 leading-[1.85] italic">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] mb-2">
                      Our Solution
                    </p>
                    <p className="text-[13.5px] text-gray-500 leading-[1.85]">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <Link
                  href={project.href}
                  className="self-start flex items-center gap-2 text-[13px] font-medium text-[#1f6fb2] hover:text-[#1f3a5f] border-b border-[#1f6fb2]/30 hover:border-[#1f3a5f]/40 pb-0.5 transition-all duration-200"
                >
                  See the full project <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </div>

              {/* Bottom slide-in line */}
              <div className="md:col-span-2 relative h-[3px] overflow-hidden">
                <span className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center mt-12">
          <Link
            href="/case-studies"
            className="flex items-center gap-2 px-8 py-3 text-[13.5px] font-medium border border-[#1f6fb2] text-[#1f6fb2] hover:bg-[#1f6fb2] hover:text-white transition-all duration-200"
          >
            See case studies from our portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}