"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Cloud,
  Container,
  GitBranch,
  Lock,
  Network,
  Server,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

const CAPABILITIES = [
  {
    number: "01",
    title: "Cloud Engineering",
    icon: Cloud,
    accent: "#0ea5e9",
    background: "#f0f9ff",
    description:
      "Cloud architecture, workload migration, serverless systems, and multi-cloud delivery across AWS, Azure, and GCP.",
    tags: ["AWS", "Azure", "GCP", "Cloud migration"],
    href: "/services/other-services/cloud-engineering",
  },
  {
    number: "02",
    title: "DevOps & Delivery Automation",
    icon: GitBranch,
    accent: "#7c3aed",
    background: "#f5f3ff",
    description:
      "CI/CD pipelines, release automation, GitOps workflows, and repeatable deployment processes that let teams ship safely.",
    tags: ["CI/CD", "GitOps", "Release automation", "Pipelines"],
    href: "/services/other-services/devops",
  },
  {
    number: "03",
    title: "Platform Engineering",
    icon: Container,
    accent: "#2563eb",
    background: "#eff6ff",
    description:
      "Kubernetes platforms, container orchestration, internal developer platforms, and self-service tooling for engineering teams.",
    tags: ["Kubernetes", "Docker", "Platform teams", "Developer experience"],
    href: "/it-consulting/platform",
  },
  {
    number: "04",
    title: "Reliability & Observability",
    icon: Activity,
    accent: "#059669",
    background: "#ecfdf5",
    description:
      "Monitoring, alerting, logging, tracing, incident response, and reliability practices that make problems visible before they become outages.",
    tags: ["Monitoring", "SRE", "Logging", "Alerting"],
    href: "/contact",
  },
  {
    number: "05",
    title: "Infrastructure Security",
    icon: Shield,
    accent: "#dc2626",
    background: "#fef2f2",
    description:
      "Identity controls, secrets management, network segmentation, cloud posture management, and security hardening built into every layer.",
    tags: ["IAM", "Zero trust", "CSPM", "Compliance"],
    href: "/services/security/cyber-security",
  },
  {
    number: "06",
    title: "Cost Optimisation",
    icon: BarChart3,
    accent: "#d97706",
    background: "#fffbeb",
    description:
      "FinOps practices, right-sizing, budget controls, usage visibility, and infrastructure improvements that reduce waste without risking reliability.",
    tags: ["FinOps", "Rightsizing", "Budgets", "Cost visibility"],
    href: "/services/other-services/cost-optimization",
  },
];

const DELIVERY_PROCESS = [
  {
    number: "01",
    title: "Infrastructure Assessment",
    description:
      "We assess your environment, delivery workflows, cloud spend, security posture, operational risks, and current technical constraints.",
  },
  {
    number: "02",
    title: "Architecture & Roadmap",
    description:
      "We document a practical target architecture with priorities, dependencies, migration phases, ownership, security controls, and cost projections.",
  },
  {
    number: "03",
    title: "Build & Automation",
    description:
      "We provision infrastructure as code, implement pipelines, configure observability, automate security checks, and migrate workloads safely.",
  },
  {
    number: "04",
    title: "Operate & Optimise",
    description:
      "We support your team with runbooks, monitoring, incident processes, optimisation recommendations, and structured knowledge transfer.",
  },
];

const TOOLCHAIN = [
  { name: "AWS", role: "Cloud platform", color: "#ff9900" },
  { name: "Azure", role: "Cloud platform", color: "#0078d4" },
  { name: "GCP", role: "Cloud platform", color: "#4285f4" },
  { name: "Terraform", role: "Infrastructure as code", color: "#7b42bc" },
  { name: "Kubernetes", role: "Orchestration", color: "#326ce5" },
  { name: "Docker", role: "Containers", color: "#2496ed" },
  { name: "GitHub Actions", role: "CI/CD", color: "#f8fafc" },
  { name: "Grafana", role: "Observability", color: "#f46800" },
];

function InfrastructureDiagram() {
  const nodes = [
    { x: 310, y: 20, label: "Users", icon: "◉", color: "#94a3b8" },
    { x: 310, y: 80, label: "CDN + WAF", icon: "◈", color: "#0ea5e9" },
    { x: 120, y: 150, label: "Web App", icon: "◫", color: "#60a5fa" },
    { x: 310, y: 150, label: "API Layer", icon: "◌", color: "#7c3aed" },
    { x: 500, y: 150, label: "Auth Service", icon: "◉", color: "#a78bfa" },
    { x: 120, y: 225, label: "Database", icon: "▣", color: "#f97316" },
    { x: 310, y: 225, label: "Cache + Queue", icon: "≋", color: "#10b981" },
    { x: 500, y: 225, label: "Object Storage", icon: "◇", color: "#38bdf8" },
    { x: 650, y: 180, label: "Monitoring", icon: "◌", color: "#fbbf24" },
  ];

  const lines = [
    [0, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 5],
    [3, 6],
    [4, 7],
    [3, 8],
    [4, 8],
  ];

  return (
    <div className="border border-sky-900/30 overflow-hidden shadow-2xl shadow-sky-950/20">
      <div className="flex items-center justify-between px-4 py-3 bg-[#030c18] border-b border-sky-900/25">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-[0.17em] text-sky-400">
            INFRASTRUCTURE TOPOLOGY
          </span>
        </div>

        <span className="font-mono text-[10px] text-emerald-400">
          ● SYSTEM HEALTHY
        </span>
      </div>

      <div className="bg-[#040e1a] p-4">
        <svg viewBox="0 0 770 280" className="w-full h-auto">
          {lines.map(([from, to], index) => (
            <motion.line
              key={`${from}-${to}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              x1={nodes[from].x + 50}
              y1={nodes[from].y + 17}
              x2={nodes[to].x + 50}
              y2={nodes[to].y + 17}
              stroke="#1e3a5f"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          ))}

          {nodes.map((node, index) => (
            <motion.g
              key={node.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.06 }}
            >
              <rect
                x={node.x}
                y={node.y}
                width="100"
                height="34"
                rx="4"
                fill={`${node.color}15`}
                stroke={`${node.color}70`}
              />
              <text
                x={node.x + 10}
                y={node.y + 21}
                fill={node.color}
                fontSize="12"
              >
                {node.icon}
              </text>
              <text
                x={node.x + 28}
                y={node.y + 21}
                fill={`${node.color}dd`}
                fontSize="9"
                fontFamily="monospace"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-3 border-t border-sky-900/25 bg-[#030c18]">
        {[
          ["99.9%", "Availability target"],
          ["IaC", "Version-controlled"],
          ["24/7", "Observable systems"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="px-4 py-3 border-r last:border-r-0 border-sky-900/25"
          >
            <p className="font-mono text-[14px] text-sky-400">{value}</p>
            <p className="text-[9px] uppercase tracking-wider text-white/30">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Infrastructure() {
  return (
    <main className="pt-[96px] bg-white">
      <h1 className="sr-only">
        Infrastructure Services — LogicSoft Technologies
      </h1>

      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-8 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">
            Home
          </Link>
          <span className="text-gray-300">›</span>
          <Link
            href="/service"
            className="hover:text-[#1f6fb2] transition-colors"
          >
            Services
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-medium text-gray-600">
            Infrastructure Services
          </span>
        </nav>
      </div>

      <section
        className="relative overflow-hidden border-y border-slate-800"
        style={{
          background:
            "linear-gradient(145deg, #020c18 0%, #071b31 55%, #020c18 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #38bdf8 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -top-40 -right-24 w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-[150px]" />
        <div className="absolute -bottom-44 left-0 w-[500px] h-[350px] rounded-full bg-violet-700/10 blur-[140px]" />

        <div className="relative max-w-[82rem] mx-auto px-4 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_590px] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 border border-sky-500/30 bg-sky-500/10">
                <Server className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px] uppercase tracking-[0.16em] font-bold text-sky-400">
                  Infrastructure Services
                </span>
              </div>

              <h2 className="max-w-[700px] text-[44px] lg:text-[58px] leading-[1.04] font-serif text-white mb-6">
                Infrastructure that keeps your business{" "}
                <span className="text-sky-400">moving.</span>
              </h2>

              <p className="max-w-[600px] text-[16px] lg:text-[17px] leading-[1.9] text-white/60 mb-8">
                We design, automate, secure, and optimise the cloud platforms
                your business depends on. From first deployment to multi-region
                operations, we build infrastructure engineered for resilience,
                speed, visibility, and controlled cost.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-9">
                {[
                  { value: "Cloud", label: "AWS · Azure · GCP", color: "#38bdf8" },
                  { value: "IaC", label: "Automated provisioning", color: "#a78bfa" },
                  { value: "DevOps", label: "Faster releases", color: "#34d399" },
                  { value: "Secure", label: "Built-in controls", color: "#fbbf24" },
                ].map((item) => (
                  <div
                    key={item.value}
                    className="border border-white/10 bg-white/[0.035] px-4 py-3"
                  >
                    <p
                      className="text-[18px] font-medium leading-none mb-1"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </p>
                    <p className="text-[9.5px] uppercase tracking-wide leading-snug text-white/35">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 px-7 py-3.5 text-[13.5px] font-bold text-white transition-colors"
                >
                  Assess your infrastructure <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services/other-services/cloud-engineering"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/45 px-7 py-3.5 text-[13.5px] font-semibold text-white/75 hover:text-white transition-colors"
                >
                  Explore cloud engineering
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <InfrastructureDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-[#f7f8fa]">
        <div className="max-w-[82rem] mx-auto px-4 py-12">
          <div className="flex items-center gap-5 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 whitespace-nowrap">
              Infrastructure toolchain
            </p>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {TOOLCHAIN.map((tool) => (
              <div
                key={tool.name}
                className="border border-gray-200 bg-white px-3.5 py-3 hover:border-sky-200 hover:shadow-sm transition-all"
              >
                <p
                  className="font-bold text-[12px] mb-1"
                  style={{ color: tool.color }}
                >
                  {tool.name}
                </p>
                <p className="text-[9.5px] leading-snug text-gray-400">
                  {tool.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[310px_1fr] gap-14 items-start">
            <div className="lg:sticky top-[120px]">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-600 mb-4">
                What we deliver
              </p>
              <h3 className="text-[31px] lg:text-[36px] leading-tight font-serif text-[#1f3a5f] mb-5">
                The systems behind reliable digital products.
              </h3>
              <p className="text-[13.5px] leading-[1.85] text-gray-500">
                Infrastructure should make it easier for your team to deliver,
                recover, scale, and make good decisions not create another
                operational burden.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    className="group relative flex flex-col overflow-hidden border border-gray-200 bg-white p-6 hover:shadow-md transition-all"
                  >
                    <span
                      className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${item.accent}, ${item.accent}55)`,
                      }}
                    />

                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="flex items-center justify-center w-10 h-10"
                        style={{ background: item.background }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: item.accent }} />
                      </div>
                      <span className="font-mono text-[10px] text-gray-300">
                        {item.number}
                      </span>
                    </div>

                    <h4 className="font-bold text-[15px] text-[#1f3a5f] group-hover:text-sky-700 transition-colors mb-3">
                      {item.title}
                    </h4>
                    <p className="text-[13px] leading-[1.85] text-gray-500 mb-5">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto mb-5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border px-2 py-0.5 text-[9.5px] font-semibold"
                          style={{
                            color: item.accent,
                            background: item.background,
                            borderColor: `${item.accent}30`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold transition-colors"
                      style={{ color: item.accent }}
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-[#f7f8fa]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-600 mb-4">
            How we work
          </p>
          <h3 className="font-serif text-[29px] lg:text-[34px] text-[#1f3a5f] mb-12">
            Infrastructure delivery with visibility at every stage.
          </h3>

          <div className="grid lg:grid-cols-4 border border-gray-200 bg-white">
            {DELIVERY_PROCESS.map((step, index) => (
              <div
                key={step.number}
                className={`group relative p-7 lg:p-8 hover:bg-sky-50 transition-colors ${
                  index < DELIVERY_PROCESS.length - 1
                    ? "border-b lg:border-b-0 lg:border-r border-gray-200"
                    : ""
                }`}
              >
                <span className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-sky-500 transition-colors" />

                <span className="inline-block px-2 py-0.5 mb-5 border border-sky-100 bg-sky-50 font-mono text-[11px] font-bold text-sky-600">
                  {step.number}
                </span>
                <h4 className="font-bold text-[14px] text-[#1f3a5f] mb-3">
                  {step.title}
                </h4>
                <p className="text-[13px] leading-[1.85] text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-400 mb-3">
              Build for reliability
            </p>
            <h3 className="font-serif text-[28px] text-white mb-3">
              Make your infrastructure a competitive advantage.
            </h3>
            <p className="max-w-[650px] text-[14px] leading-relaxed text-white/55">
              Start with an infrastructure assessment. We will identify the
              highest-value improvements across reliability, security, delivery
              speed, and cloud cost.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-[13.5px] font-bold text-white transition-colors"
          >
            Talk to an infrastructure engineer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}