"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import TechCard from "../../components/TechCard";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Eye,
  GitBranch,
  LockKeyhole,
  ServerCog,
  ShieldCheck,
  Smartphone,
  TestTube2,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const DOMAINS = [
  "All",
  "Frontend",
  "Backend",
  "Data",
  "Mobile",
  "Cloud",
  "DevOps",
  "Reliability",
  "Security",
  "Quality",
];

const STACKS = [
  {
    id: "frontend",
    number: "01",
    domain: "Frontend",
    title: "Web & Frontend Engineering",
    icon: Code2,
    summary:
      "Accessible, performant interfaces and design systems engineered for real users, maintainable delivery, and long-term product evolution.",
    capability:
      "We build application frontends that connect cleanly to APIs, authentication, analytics, content systems, and operational workflows.",
    groups: [
      {
        title: "Core frameworks",
        items: [
          ["React", "Component-based web applications and product interfaces."],
          ["Next.js", "Server-rendered and full-stack web applications."],
          ["TypeScript", "Safer, maintainable application code at scale."],
          ["JavaScript", "Modern browser and application development."],
        ],
      },
      {
        title: "UI systems & tooling",
        items: [
          ["Tailwind CSS", "Consistent responsive interfaces and design systems."],
          ["Webpack", "Production build tooling and asset optimisation."],
          ["Framer Motion", "Purposeful interface motion and interaction feedback."],
        ],
      },
    ],
  },
  {
    id: "backend",
    number: "02",
    domain: "Backend",
    title: "Backend & API Engineering",
    icon: ServerCog,
    summary:
      "Reliable application services, APIs, business logic, integrations, authentication flows, and operational back-office systems.",
    capability:
      "Backend architecture is selected around security, integrations, performance, data consistency, and the operational demands of the product.",
    groups: [
      {
        title: "Languages & runtime",
        items: [
          ["Node.js", "Event-driven services, APIs, automation, and integrations."],
          ["TypeScript", "Typed server-side application development."],
          ["Python", "Automation, data processing, integrations, and services."],
        ],
      },
      {
        title: "Application & API layer",
        items: [
          ["Express.js", "Production REST APIs and service backends."],
          ["GraphQL", "Flexible data APIs for application clients."],
          ["REST APIs", "Interoperable services and third-party integrations."],
          ["WebSockets", "Real-time updates and interactive application flows."],
        ],
      },
    ],
  },
  {
    id: "data",
    number: "03",
    domain: "Data",
    title: "Databases & Data Services",
    icon: Database,
    summary:
      "Transactional data stores, document databases, caching layers, and data-access patterns for modern applications.",
    capability:
      "We choose storage models based on consistency requirements, query patterns, scale, availability, reporting needs, and the business domain.",
    groups: [
      {
        title: "Production databases",
        items: [
          ["PostgreSQL", "Transactional applications, SaaS products, and structured business data."],
          ["MongoDB", "Flexible document data models and application workloads."],
          ["Firebase", "Managed application data and real-time product features."],
        ],
      },
      {
        title: "Data access & performance",
        items: [
          ["Prisma", "Type-safe database access and maintainable application data layers."],
          ["Redis", "Caching, sessions, queues, and high-speed application state."],
          ["Cloudinary", "Managed media storage, delivery, and transformation."],
        ],
      },
    ],
  },
  {
    id: "mobile",
    number: "04",
    domain: "Mobile",
    title: "Mobile & Cross-Platform Engineering",
    icon: Smartphone,
    summary:
      "Native-quality mobile experiences for customer applications, employee tools, field operations, and connected business products.",
    capability:
      "We select native or cross-platform delivery based on device requirements, time-to-market, performance, integrations, and lifecycle cost.",
    groups: [
      {
        title: "Mobile platforms",
        items: [
          ["React Native", "Cross-platform mobile products from a shared codebase."],
          ["Expo", "Accelerated React Native delivery and mobile platform tooling."],
          ["Flutter", "Cross-platform mobile applications with expressive UI."],
          ["Swift", "Native iOS development where platform depth matters."],
        ],
      },
      {
        title: "Additional application surfaces",
        items: [
          ["Electron", "Desktop applications built with web technologies."],
          ["Ionic", "Hybrid application delivery for selected business cases."],
        ],
      },
    ],
  },
  {
    id: "cloud",
    number: "05",
    domain: "Cloud",
    title: "Cloud & Infrastructure Engineering",
    icon: Cloud,
    summary:
      "Cloud environments and infrastructure designed around security, availability, performance, cost control, and operational clarity.",
    capability:
      "From a focused product deployment to multi-service infrastructure, we design the operating environment alongside the application.",
    groups: [
      {
        title: "Cloud platforms",
        items: [
          ["AWS", "Compute, storage, networking, managed services, and cloud-native delivery."],
          ["Microsoft Azure", "Enterprise cloud services and Microsoft ecosystem workloads."],
          ["Google Cloud", "Cloud infrastructure, platform services, and managed workloads."],
          ["DigitalOcean", "Focused cloud environments for product teams and growing businesses."],
        ],
      },
      {
        title: "Infrastructure foundations",
        items: [
          ["Docker", "Consistent, portable application packaging."],
          ["Kubernetes", "Container orchestration for distributed workloads."],
          ["Terraform", "Repeatable infrastructure as code."],
          ["Nginx", "Reverse proxying, routing, performance, and web delivery."],
        ],
      },
    ],
  },
  {
    id: "devops",
    number: "06",
    domain: "DevOps",
    title: "DevOps & Platform Delivery",
    icon: GitBranch,
    summary:
      "Repeatable delivery pipelines, environment management, release discipline, and automation that make software safer to change.",
    capability:
      "Our delivery approach connects engineering, quality, security, deployment, and operational ownership rather than treating them as separate handoffs.",
    groups: [
      {
        title: "Delivery automation",
        items: [
          ["Jenkins", "Automated build, test, and deployment workflows."],
          ["GitLab", "Source control and CI/CD workflows."],
          ["PM2", "Node.js process management and application operations."],
          ["Linux", "Production server administration and application hosting."],
        ],
      },
      {
        title: "Infrastructure automation",
        items: [
          ["Ansible", "Configuration automation and environment consistency."],
          ["Terraform", "Versioned, reviewable cloud infrastructure."],
          ["Docker", "Standardised build and deployment artefacts."],
        ],
      },
    ],
  },
  {
    id: "reliability",
    number: "07",
    domain: "Reliability",
    title: "Observability & Reliability",
    icon: Eye,
    summary:
      "Monitoring, diagnostics, and operational signals that help teams understand how systems behave after launch.",
    capability:
      "Building software is only the beginning. We design for visibility into uptime, application health, errors, performance, and change impact.",
    groups: [
      {
        title: "Monitoring & visibility",
        items: [
          ["Prometheus", "Metrics collection and operational monitoring."],
          ["Grafana", "Dashboards and service-health visibility."],
          ["Sentry", "Application error monitoring and issue diagnosis."],
          ["Splunk", "Centralised event and security-oriented log analysis."],
        ],
      },
      {
        title: "Operational practices",
        items: [
          ["Health Checks", "Clear signals for application and dependency health."],
          ["Alerting", "Actionable notification paths for service conditions."],
          ["Performance Monitoring", "Evidence for prioritising speed and stability work."],
          ["Incident Readiness", "Operational context for diagnosing production issues."],
        ],
      },
    ],
  },
  {
    id: "security",
    number: "08",
    domain: "Security",
    title: "Security Engineering",
    icon: ShieldCheck,
    summary:
      "Security-aware architecture, secure delivery practices, identity controls, application testing, and infrastructure protection.",
    capability:
      "We position security as an engineering practice across design, implementation, delivery, and operations—not as a logo collection.",
    groups: [
      {
        title: "Secure application delivery",
        items: [
          ["OWASP Top 10", "Common web application risk awareness and remediation."],
          ["OWASP ASVS", "A structured reference for application-security controls."],
          ["SonarQube", "Code quality and static-analysis support."],
          ["Secure SDLC", "Security considerations integrated through delivery."],
        ],
      },
      {
        title: "Identity, secrets & validation",
        items: [
          ["JWT", "Signed session and API authentication patterns."],
          ["RBAC", "Role-based access control for business applications."],
          ["HashiCorp Vault", "Secrets-management tooling for supported environments."],
          ["Kali Linux", "Security assessment environment and tooling."],
        ],
      },
    ],
  },
  {
    id: "quality",
    number: "09",
    domain: "Quality",
    title: "Quality Engineering",
    icon: TestTube2,
    summary:
      "Quality practices that protect releases through validation, automation, code review, regression testing, and delivery controls.",
    capability:
      "Quality is planned into delivery from requirements and architecture through pre-release validation and production monitoring.",
    groups: [
      {
        title: "Quality & testing practice",
        items: [
          ["Automated Regression Testing", "Repeatable validation for stable releases."],
          ["API Testing", "Verification of integration contracts and service behaviour."],
          ["Performance Testing", "Evidence-based assessment of responsiveness and load."],
          ["CI Quality Gates", "Checks that help prevent unsafe changes from shipping."],
        ],
      },
      {
        title: "Supporting tools",
        items: [
          ["SonarQube", "Code-quality and maintainability feedback."],
          ["Postman", "API development and request validation workflows."],
          ["Jest", "JavaScript and TypeScript unit testing."],
          ["Cypress", "Browser-based end-to-end test automation."],
        ],
      },
    ],
  },
];

const STATS = [
  { value: "9", label: "Engineering domains" },
  { value: "40+", label: "Technologies in our stack" },
  { value: "20+", label: "Projects shipped" },
  { value: "1", label: "Production-minded delivery model" },
];

const SELECTION_STEPS = [
  { num: "01", title: "Requirements", desc: "Users, workflows, constraints, and the outcomes that matter." },
  { num: "02", title: "Architecture", desc: "Data, integrations, scale, security, and operating model." },
  { num: "03", title: "Delivery", desc: "Development, testing, CI/CD, release process, and ownership." },
  { num: "04", title: "Operate & improve", desc: "Monitoring, support, optimisation, and continuous evolution." },
];

const STANDARDS = [
  "OWASP Top 10 & OWASP ASVS",
  "Secure SDLC & DevSecOps",
  "CIS Benchmarks",
  "NIST Cybersecurity Framework",
  "ISO/IEC 27001-aligned practices",
  "GDPR, NDPR, HIPAA & PCI DSS considerations",
  "12-Factor App principles",
  "Documented testing & quality controls",
];

const countItems = (stack) =>
  stack.groups.reduce((total, group) => total + group.items.length, 0);

// ── Tech card (design kept, palette aligned to Industries) ────────────────────
function TechPill({ name, description }) {
  return (
    <article className="group border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1f6fb2]/50 hover:shadow-[0_10px_28px_rgba(31,111,178,0.10)]">
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-[14px] font-bold text-[#1f3a5f] transition-colors duration-200 group-hover:text-[#1f6fb2]">
          {name}
        </h4>
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f6fb2]/40 transition-colors duration-200 group-hover:bg-[#1f6fb2]" />
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">{description}</p>
    </article>
  );
}

// ── Stack section ─────────────────────────────────────────────────────────────
function StackSection({ stack, index }) {
  const Icon = stack.icon;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="border-t border-gray-200 py-12"
    >
      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        {/* Left column */}
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] text-gray-300">{stack.number}</span>
            <span className="h-px flex-1 bg-blue-100" />
          </div>

          <div className="mt-6 flex h-10 w-10 items-center justify-center bg-[#eaf4ff] text-[#1f6fb2]">
            <Icon className="h-5 w-5" />
          </div>

          <h2 className="mt-5 font-serif text-[26px] leading-snug text-[#1f3a5f]">{stack.title}</h2>

          <div className="mt-4 mb-4 h-[2px] w-8 bg-[#1f6fb2] opacity-30" />

          <p className="text-[13px] leading-[1.85] text-gray-500">{stack.summary}</p>
        </div>

        {/* Right column */}
        <div>
          <p className="max-w-3xl border-l-[3px] border-[#1f6fb2] bg-[#eaf4ff] px-4 py-3 text-[13px] leading-[1.85] text-gray-600">
            {stack.capability}
          </p>

          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            {stack.groups.map((group) => (
              <div key={group.title}>
                <div className="flex items-center gap-3">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
                    {group.title}
                  </h3>
                  <span className="h-px flex-1 bg-blue-100" />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map(([name, description]) => (
                    <TechCard key={name} name={name} description={description} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Technologies() {
  const [activeDomain, setActiveDomain] = useState("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const visibleStacks = useMemo(
    () => (activeDomain === "All" ? STACKS : STACKS.filter((stack) => stack.domain === activeDomain)),
    [activeDomain]
  );

  const totalTechnologyEntries = STACKS.reduce((total, stack) => total + countItems(stack), 0);

  function chooseDomain(domain) {
    setActiveDomain(domain);
    setMobileFiltersOpen(false);
  }

  return (
    <main className="pt-[96px] bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff]">
      {/* ── Breadcrumb ── */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors duration-200">
            Home
          </Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Technologies</span>
        </nav>
      </div>

      {/* ── Hero Header ── */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-14">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.15em] mb-4">
                Technologies &amp; platforms
              </p>
              <h1 className="text-[38px] lg:text-[52px] font-serif text-[#1f3a5f] leading-[1.08] mb-5">
                Engineering the systems
                <br className="hidden lg:block" /> behind{" "}
                <span className="text-[#1f6fb2]">modern businesses.</span>
              </h1>
              <p className="text-[17px] text-gray-600 leading-[1.9] max-w-[680px]">
                We select technology around your product requirements, security posture, scale,
                operational needs, and long-term business objectives not around trends.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 border border-[#1f6fb2] text-[#1f6fb2] text-[13px] font-semibold px-7 py-3 hover:bg-[#1f6fb2] hover:text-white transition-all duration-200"
              >
                Discuss your architecture <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 px-5 py-4 min-w-[140px]">
                  <p className="text-[36px] font-light text-[#1f3a5f] leading-none mb-1">{s.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="sticky top-[64px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[82rem] mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center overflow-x-auto scrollbar-hide">
            {DOMAINS.map((domain) => {
              const count =
                domain === "All"
                  ? null
                  : STACKS.filter((s) => s.domain === domain).reduce((t, s) => t + countItems(s), 0);
              return (
                <button
                  key={domain}
                  type="button"
                  onClick={() => chooseDomain(domain)}
                  aria-pressed={activeDomain === domain}
                  className={`shrink-0 px-4 py-[18px] text-[12.5px] font-semibold border-b-[3px] transition-all duration-200 whitespace-nowrap ${
                    activeDomain === domain
                      ? "border-[#1f6fb2] text-[#1f6fb2]"
                      : "border-transparent text-gray-500 hover:text-[#1f3a5f] hover:border-gray-300"
                  }`}
                >
                  {domain}
                  {count !== null && (
                    <span className="ml-1.5 text-[10px] text-gray-300 font-normal">({count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile */}
          <div className="md:hidden py-3 relative">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((v) => !v)}
              aria-expanded={mobileFiltersOpen}
              className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 text-[13px] font-semibold text-[#1f3a5f] bg-white"
            >
              <span>{activeDomain === "All" ? "All engineering domains" : activeDomain}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  mobileFiltersOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {mobileFiltersOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-30 max-h-[60vh] overflow-y-auto"
                >
                  {DOMAINS.map((domain) => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => chooseDomain(domain)}
                      className={`w-full text-left px-5 py-3 text-[13px] border-b border-gray-100 last:border-0 transition-colors ${
                        activeDomain === domain
                          ? "text-[#1f6fb2] bg-[#f0f6ff] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {domain}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[82rem] mx-auto px-4 pt-14 pb-14">
        {/* Meta row */}
        <div className="flex items-center gap-4 mb-10">
          <p className="text-[12px] text-gray-400">
            Showing <span className="font-bold text-[#1f3a5f]">{visibleStacks.length}</span> of{" "}
            <span className="font-bold text-[#1f3a5f]">{STACKS.length}</span> engineering domains
            {activeDomain !== "All" && (
              <>
                {" "}
                — <span className="text-[#1f6fb2] font-semibold">{activeDomain}</span>
              </>
            )}
          </p>
          {activeDomain !== "All" && (
            <button
              type="button"
              onClick={() => chooseDomain("All")}
              className="text-[11.5px] text-gray-400 hover:text-[#1f6fb2] underline underline-offset-2 transition-colors"
            >
              Clear filter
            </button>
          )}
          <div className="flex-1 h-px bg-blue-100" />
          <span className="hidden sm:block text-[11px] text-gray-300 font-medium">
            {totalTechnologyEntries} capabilities across the delivery lifecycle
          </span>
        </div>

        <div>
          {visibleStacks.map((stack, index) => (
            <StackSection key={stack.id} stack={stack} index={index} />
          ))}
        </div>
      </div>

      {/* ── How we select technology ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.15em] mb-4">
                How we select technology
              </p>
              <h2 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] leading-tight max-w-[520px]">
                Right-sized architecture, not a preset stack.
              </h2>
            </div>
            <p className="text-[13px] text-gray-500 leading-[1.85] max-w-[440px]">
              The best stack is the one that serves the operating reality of your product not simply
              the one that is fashionable today.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {SELECTION_STEPS.map((p, i) => (
              <li
                key={p.num}
                className={[
                  "group relative px-8 py-8 border-t border-gray-200 hover:bg-[#f7fbff] transition-colors duration-200",
                  i % 2 !== 0 ? "sm:border-l" : "",
                  i % 4 !== 0 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <span
                  className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#1f6fb2] to-[#6db3f2]"
                  aria-hidden="true"
                />
                <span className="block text-[10px] font-mono text-gray-300 tracking-[0.2em] mb-4">{p.num}</span>
                <h3 className="text-[15px] font-bold text-[#1f3a5f] mb-3 group-hover:text-[#1f6fb2] transition-colors duration-200">
                  {p.title}
                </h3>
                <div className="w-6 h-[2px] bg-[#1f6fb2] mb-3 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.85]">{p.desc}</p>
              </li>
            ))}
          </ol>
          <div className="w-full h-px bg-gray-200" />
        </div>
      </div>

      {/* ── Engineering standards ── */}
      <div className="border-t border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <div className="grid gap-10 border border-gray-200 bg-white p-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:p-10">
            <div>
              <div className="flex h-10 w-10 items-center justify-center bg-[#eaf4ff] text-[#1f6fb2]">
                <LockKeyhole className="h-5 w-5" />
              </div>

              <p className="mt-6 text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.15em] mb-4">
                Engineering standards &amp; frameworks
              </p>

              <h2 className="text-[28px] lg:text-[32px] font-serif text-[#1f3a5f] leading-tight">
                Built with production discipline.
              </h2>

              <p className="mt-4 max-w-2xl text-[13px] leading-[1.85] text-gray-500">
                We use recognised engineering and security frameworks to guide implementation. These
                are practices we engineer against, not claims of certification or attestation unless
                stated separately.
              </p>
            </div>

            <div className="grid content-start gap-3 sm:grid-cols-2">
              {STANDARDS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border border-gray-200 bg-[#f9fafb] px-4 py-3 hover:border-[#1f6fb2] transition-colors duration-150"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1f6fb2]" />
                  <span className="text-[12px] font-medium leading-relaxed text-gray-500">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="border-t border-gray-200 bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">
              Have a technology requirement?
            </p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2 leading-snug">
              Tell us what you are building.
            </h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">
              We will help you assess the architecture, technology trade-offs, delivery plan, and the
              practical path to a secure production system.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white
                bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                ring-1 ring-inset ring-white/30 transition-all duration-200"
            >
              Start a scoping conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200"
            >
              See our work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}