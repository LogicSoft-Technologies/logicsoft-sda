"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  FaCode, FaMobileAlt, FaServer, FaDatabase,
  FaShieldAlt, FaCloud, FaCogs, FaChartBar,
  FaRobot, FaBrain, FaNetworkWired, FaClipboardCheck,
  FaHeadset, FaProjectDiagram, FaPaintBrush, FaLayerGroup,
} from "react-icons/fa";

const departments = [
  {
    label: "Engineering",
    roles: [
      {
        icon: FaCode,
        title: "Frontend Engineers",
        description: "React, Next.js, Vue, and TypeScript specialists building performant, accessible user interfaces for web applications.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        iconColor: "#1d4ed8",
        badgeBg: "#dbeafe",
        badgeBorder: "#bfdbfe",
      },
      {
        icon: FaServer,
        title: "Backend Engineers",
        description: "API design, microservices, and server-side architecture across Node.js, Python, Java, and Go.",
        skills: ["Node.js", "Python", "REST & GraphQL", "Microservices"],
        iconColor: "#7c3aed",
        badgeBg: "#ede9fe",
        badgeBorder: "#ddd6fe",
      },
      {
        icon: FaLayerGroup,
        title: "Full Stack Engineers",
        description: "End-to-end product engineers capable of owning features from database schema to UI component.",
        skills: ["React", "Node.js", "PostgreSQL", "Docker"],
        iconColor: "#0891b2",
        badgeBg: "#cffafe",
        badgeBorder: "#a5f3fc",
      },
      {
        icon: FaMobileAlt,
        title: "Mobile Engineers",
        description: "Cross-platform and native mobile development for iOS and Android using React Native and Flutter.",
        skills: ["React Native", "Flutter", "iOS", "Android"],
        iconColor: "#059669",
        badgeBg: "#d1fae5",
        badgeBorder: "#6ee7b7",
      },
    ],
  },
  {
    label: "Data & AI",
    roles: [
      {
        icon: FaDatabase,
        title: "Data Engineers",
        description: "Building reliable data pipelines, warehouses, and integration layers that power business intelligence across the organisation.",
        skills: ["Apache Kafka", "dbt", "AWS Glue", "Snowflake"],
        iconColor: "#b45309",
        badgeBg: "#fef3c7",
        badgeBorder: "#fde68a",
      },
      {
        icon: FaChartBar,
        title: "Data Analysts & BI Specialists",
        description: "Transforming raw data into actionable dashboards, reports, and decision-ready insights for enterprise clients.",
        skills: ["Power BI", "Tableau", "SQL", "Python"],
        iconColor: "#d97706",
        badgeBg: "#fff7ed",
        badgeBorder: "#fed7aa",
      },
      {
        icon: FaBrain,
        title: "Machine Learning Engineers",
        description: "Designing, training, and deploying ML models for prediction, classification, NLP, and computer vision use cases.",
        skills: ["TensorFlow", "PyTorch", "scikit-learn", "MLflow"],
        iconColor: "#dc2626",
        badgeBg: "#fee2e2",
        badgeBorder: "#fecaca",
      },
      {
        icon: FaRobot,
        title: "AI & Automation Engineers",
        description: "Building intelligent automation systems, LLM-powered workflows, and AI-augmented enterprise applications.",
        skills: ["LangChain", "OpenAI API", "RPA", "Python"],
        iconColor: "#7c3aed",
        badgeBg: "#ede9fe",
        badgeBorder: "#ddd6fe",
      },
    ],
  },
  {
    label: "Infrastructure & Security",
    roles: [
      {
        icon: FaCloud,
        title: "Cloud Engineers",
        description: "Designing and managing cloud infrastructure on AWS, Azure, and GCP — focused on reliability, scalability, and cost efficiency.",
        skills: ["AWS", "Azure", "GCP", "Terraform"],
        iconColor: "#0891b2",
        badgeBg: "#cffafe",
        badgeBorder: "#a5f3fc",
      },
      {
        icon: FaCogs,
        title: "DevOps Engineers",
        description: "CI/CD pipelines, container orchestration, infrastructure-as-code, and release automation to accelerate safe delivery.",
        skills: ["Kubernetes", "Docker", "GitHub Actions", "Ansible"],
        iconColor: "#475569",
        badgeBg: "#f1f5f9",
        badgeBorder: "#cbd5e1",
      },
      {
        icon: FaNetworkWired,
        title: "Network & Infrastructure Engineers",
        description: "Managing enterprise networks, server environments, and hybrid cloud setups for high availability and business continuity.",
        skills: ["Cisco", "VPN", "Linux", "VMware"],
        iconColor: "#1d4ed8",
        badgeBg: "#dbeafe",
        badgeBorder: "#bfdbfe",
      },
      {
        icon: FaShieldAlt,
        title: "Cybersecurity Engineers",
        description: "Penetration testing, threat detection, compliance assessments, and security hardening for enterprise systems and applications.",
        skills: ["SIEM", "Pentest", "ISO 27001", "Zero Trust"],
        iconColor: "#dc2626",
        badgeBg: "#fee2e2",
        badgeBorder: "#fecaca",
      },
    ],
  },
  {
    label: "Quality & Design",
    roles: [
      {
        icon: FaClipboardCheck,
        title: "QA & Testing Engineers",
        description: "Manual and automated testing specialists ensuring every release meets quality, performance, and regression standards.",
        skills: ["Selenium", "Cypress", "Jest", "Postman"],
        iconColor: "#059669",
        badgeBg: "#d1fae5",
        badgeBorder: "#6ee7b7",
      },
      {
        icon: FaPaintBrush,
        title: "UI/UX Designers",
        description: "Research-driven designers creating intuitive interfaces, design systems, and user experiences that reduce friction and drive engagement.",
        skills: ["Figma", "Prototyping", "Design Systems", "UX Research"],
        iconColor: "#db2777",
        badgeBg: "#fce7f3",
        badgeBorder: "#fbcfe8",
      },
    ],
  },
  {
    label: "Consulting & Delivery",
    roles: [
      {
        icon: FaProjectDiagram,
        title: "Project Managers",
        description: "Certified PMs who own scope, timeline, budget, and stakeholder communication from discovery through to final delivery.",
        skills: ["Agile", "Scrum", "JIRA", "Risk Management"],
        iconColor: "#b45309",
        badgeBg: "#fef3c7",
        badgeBorder: "#fde68a",
      },
      {
        icon: FaHeadset,
        title: "IT Support & Help Desk",
        description: "ITIL-aligned support specialists providing 24/7 first and second-line technical assistance for enterprise clients.",
        skills: ["ITIL", "ServiceNow", "Remote Support", "SLA Management"],
        iconColor: "#0891b2",
        badgeBg: "#cffafe",
        badgeBorder: "#a5f3fc",
      },
    ],
  },
];

export default function OurTeam() {
  return (
    <motion.div
      className="pt-[96px] bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* ── Breadcrumb ── */}
      <div className="max-w-[82rem] mx-auto px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400 tracking-wide"
        >
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors duration-200">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Our Team</span>
        </nav>
      </div>

      {/* ── Hero header ── */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 py-14">
          <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
            Our people
          </p>
          <h1 className="text-[36px] font-serif text-[#1f3a5f] mb-4">
            Our Team
          </h1>
          <p className="text-[17px] text-gray-700 leading-[2] max-w-[860px]">
            Logicsoft Technologies is built on people — engineers, analysts, designers,
            and consultants who bring deep technical expertise and genuine accountability
            to every project. Each role is staffed to match your project's specific
            demands, ensuring optimal performance and cost efficiency.
          </p>
        </div>
      </div>

      {/* ── Departments ── */}
      <div className="max-w-[82rem] mx-auto px-6 py-16 flex flex-col gap-16">
        {departments.map((dept, di) => (
          <div key={di}>
            {/* Department label */}
            <div className="flex items-center gap-4 mb-7">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.1em] whitespace-nowrap">
                {dept.label}
              </p>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Role cards */}
            <div className="grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              {dept.roles.map((role, ri) => {
                const Icon = role.icon;
                return (
                  <div
                    key={ri}
                    className="group relative bg-white flex flex-col border border-gray-200 px-6 pt-6 pb-5 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
                  >
                    {/* Top slide-in line */}
                    <span
                      className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                      aria-hidden="true"
                    />

                    <ArrowUpRight
                      className="absolute top-3 right-3 w-[14px] h-[14px] text-gray-300 transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#1f6fb2]"
                      aria-hidden="true"
                    />

                    {/* Icon badge */}
                    <div
                      className="mb-4 w-11 h-11 flex items-center justify-center border shrink-0"
                      style={{ backgroundColor: role.badgeBg, borderColor: role.badgeBorder }}
                    >
                      <Icon size={19} style={{ color: role.iconColor }} aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h3 className="text-[14.5px] font-semibold text-[#1f3a5f] leading-snug mb-2 group-hover:text-[#1f6fb2] transition-colors duration-200">
                      {role.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-gray-500 leading-[1.85] flex-1 mb-4">
                      {role.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                      {role.skills.map((skill, si) => (
                        <span
                          key={si}
                          className="text-[10.5px] font-semibold uppercase tracking-[0.06em] px-2 py-[3px] border border-gray-200 text-gray-400 bg-[#f9f9f9]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bottom slide-in line */}
                    <span
                      className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                      aria-hidden="true"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Join the team strip ── */}
      <div className="border-t border-gray-200 bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-2">
              Join us
            </p>
            <h3 className="text-[24px] font-serif font-normal text-white mb-1">
              Want to build with us?
            </h3>
            <p className="text-[14px] text-white/50 max-w-lg">
              We're always looking for talented engineers, analysts, designers, and
              consultants who are serious about their craft and client outcomes.
            </p>
          </div>
          <Link
            href="/careers"
            className="flex items-center gap-2 px-7 py-3 text-[13.5px] font-semibold text-white shrink-0
              bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
              hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
              ring-1 ring-inset ring-white/30 transition-all duration-200"
          >
            View open roles
          </Link>
        </div>
      </div>

    </motion.div>
  );
}