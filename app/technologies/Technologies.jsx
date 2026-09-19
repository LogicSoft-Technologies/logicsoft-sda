"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Eye,
  GitBranch,
  Layers3,
  LockKeyhole,
  MonitorCog,
  ServerCog,
  ShieldCheck,
  Smartphone,
  TestTube2,
} from "lucide-react";

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

function TechPill({ name, description }) {
  return (
    <article className="group border border-[#dce7f1] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1f6fb2]/50 hover:shadow-[0_10px_28px_rgba(31,111,178,0.10)]">
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-[14px] font-bold text-[#1f3a5f]">{name}</h4>
        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF7A00]" />
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">
        {description}
      </p>
    </article>
  );
}

function StackSection({ stack }) {
  const Icon = stack.icon;

  return (
    <section className="border-b border-[#dce7f1] py-14 last:border-b-0 lg:py-18">
      <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-[#FF7A00]">
              {stack.number}
            </span>
            <span className="h-px flex-1 bg-[#dce7f1]" />
          </div>

          <div className="mt-6 flex h-10 w-10 items-center justify-center bg-[#eff6fc] text-[#1f6fb2]">
            <Icon className="h-5 w-5" />
          </div>

          <h2 className="mt-5 font-serif text-[29px] leading-tight text-[#1f3a5f]">
            {stack.title}
          </h2>

          <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
            {stack.summary}
          </p>
        </div>

        <div>
          <p className="max-w-3xl border-l-2 border-[#FF7A00] pl-4 text-[14px] leading-relaxed text-slate-600">
            {stack.capability}
          </p>

          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            {stack.groups.map((group) => (
              <div key={group.title}>
                <div className="flex items-center gap-3">
                  <h3 className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]">
                    {group.title}
                  </h3>
                  <span className="h-px flex-1 bg-[#e8eef6]" />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map(([name, description]) => (
                    <TechPill
                      key={name}
                      name={name}
                      description={description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Technologies() {
  const [activeDomain, setActiveDomain] = useState("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const visibleStacks = useMemo(() => {
    if (activeDomain === "All") return STACKS;
    return STACKS.filter((stack) => stack.domain === activeDomain);
  }, [activeDomain]);

  const totalTechnologyEntries = STACKS.reduce(
    (total, stack) =>
      total +
      stack.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0),
    0
  );

  function chooseDomain(domain) {
    setActiveDomain(domain);
    setMobileFiltersOpen(false);
  }

  return (
    <main className="bg-white pt-[64px] md:pt-[92px]">
      <section className="border-b border-[#17345f] bg-[#07111f]">
        <div className="relative mx-auto max-w-[82rem] overflow-hidden px-6 pb-16 pt-14 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="pointer-events-none absolute -right-36 -top-32 h-[480px] w-[480px] rounded-full bg-[#1f6fb2]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-40 w-96 bg-[#FF7A00]/10 blur-3xl" />

          <nav
            aria-label="Breadcrumb"
            className="relative flex items-center gap-2 text-[11.5px] text-white/55"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/80">Technologies</span>
          </nav>

          <div className="relative mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#ffd1ae]">
                Technologies & platforms
              </p>

              <div className="mt-4 h-px w-14 bg-gradient-to-r from-[#FF7A00] to-[#ffb27a]" />

              <h1 className="mt-6 font-serif text-[45px] leading-[1.05] text-white sm:text-[58px]">
                Engineering the systems behind modern businesses.
              </h1>

              <p className="mt-7 max-w-3xl text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                We select technology around your product requirements, security
                posture, scale, operational needs, and long-term business
                objectives—not around trends.
              </p>

              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-2 bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] px-5 py-3 text-[13px] font-bold text-white transition-transform hover:scale-[1.02]"
              >
                Discuss your architecture
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 border border-white/15">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-5 ${
                    index % 2 === 0 ? "border-r border-white/15" : ""
                  } ${index < 2 ? "border-b border-white/15" : ""}`}
                >
                  <p className="font-serif text-[31px] text-white">{stat.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#dce7f1] bg-[#f7fafc]">
        <div className="mx-auto max-w-[82rem] px-6 py-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                Capability map
              </p>
              <h2 className="mt-3 font-serif text-[30px] text-[#1f3a5f]">
                Technology across the delivery lifecycle.
              </h2>
            </div>

            <p className="text-[13px] leading-relaxed text-slate-500 lg:text-right">
              {totalTechnologyEntries} capabilities shown across product
              engineering, cloud delivery, security, quality, and operations.
            </p>
          </div>

          <div className="mt-7 hidden flex-wrap gap-2 md:flex">
            {DOMAINS.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => chooseDomain(domain)}
                aria-pressed={activeDomain === domain}
                className={`border px-4 py-2 text-[12px] font-bold transition-colors ${
                  activeDomain === domain
                    ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
                    : "border-[#d4e2ee] bg-white text-slate-600 hover:border-[#FF7A00] hover:text-[#C45500]"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          <div className="relative mt-7 md:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((value) => !value)}
              aria-expanded={mobileFiltersOpen}
              className="flex w-full items-center justify-between border border-[#d4e2ee] bg-white px-4 py-3 text-left text-[13px] font-bold text-[#1f3a5f]"
            >
              {activeDomain === "All" ? "All engineering domains" : activeDomain}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  mobileFiltersOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileFiltersOpen && (
              <div className="absolute z-20 mt-2 w-full border border-[#d4e2ee] bg-white shadow-xl">
                {DOMAINS.map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => chooseDomain(domain)}
                    className={`block w-full border-b border-[#edf2f7] px-4 py-3 text-left text-[13px] last:border-0 ${
                      domain === activeDomain
                        ? "bg-[#eff6fc] font-bold text-[#1f6fb2]"
                        : "text-slate-600"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[82rem] px-6 lg:px-10">
          {visibleStacks.map((stack) => (
            <StackSection key={stack.id} stack={stack} />
          ))}
        </div>
      </section>

      <section className="border-y border-[#dce7f1] bg-[#f7fafc] py-16 lg:py-20">
        <div className="mx-auto max-w-[82rem] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                How we select technology
              </p>

              <h2 className="mt-4 font-serif text-[34px] leading-tight text-[#1f3a5f]">
                Right-sized architecture, not a preset stack.
              </h2>

              <p className="mt-5 text-[14px] leading-relaxed text-slate-600">
                The best stack is the one that serves the operating reality of
                your product—not simply the one that is fashionable today.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["01", "Requirements", "Users, workflows, constraints, and the outcomes that matter."],
                ["02", "Architecture", "Data, integrations, scale, security, and operating model."],
                ["03", "Delivery", "Development, testing, CI/CD, release process, and ownership."],
                ["04", "Operate & improve", "Monitoring, support, optimisation, and continuous evolution."],
              ].map(([number, title, text]) => (
                <li key={number} className="border border-[#dce7f1] bg-white p-5">
                  <span className="font-mono text-[11px] font-bold text-[#FF7A00]">
                    {number}
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-[#1f3a5f]">
                    {title}
                  </h3>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-slate-500">
                    {text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[82rem] px-6 lg:px-10">
          <div className="grid gap-10 border border-[#dce7f1] p-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:p-10">
            <div>
              <div className="flex h-10 w-10 items-center justify-center bg-[#eff6fc] text-[#1f6fb2]">
                <LockKeyhole className="h-5 w-5" />
              </div>

              <p className="mt-6 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                Engineering standards & frameworks
              </p>

              <h2 className="mt-4 font-serif text-[32px] leading-tight text-[#1f3a5f]">
                Built with production discipline.
              </h2>

              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-600">
                We use recognised engineering and security frameworks to guide
                implementation. These are practices we engineer against, not
                claims of certification or attestation unless stated separately.
              </p>
            </div>

            <div className="grid content-start gap-3 sm:grid-cols-2">
              {[
                "OWASP Top 10 & OWASP ASVS",
                "Secure SDLC & DevSecOps",
                "CIS Benchmarks",
                "NIST Cybersecurity Framework",
                "ISO/IEC 27001-aligned practices",
                "GDPR, NDPR, HIPAA & PCI DSS considerations",
                "12-Factor App principles",
                "Documented testing & quality controls",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 border border-[#e1eaf2] bg-[#f9fbfd] px-4 py-3"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1f6fb2]" />
                  <span className="text-[12.5px] font-medium leading-relaxed text-slate-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#07111f]">
        <div className="absolute -right-32 -top-20 h-80 w-80 rounded-full bg-[#1f6fb2]/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-96 bg-[#FF7A00]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[82rem] gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#ffd1ae]">
              Have a technology requirement?
            </p>

            <h2 className="mt-4 font-serif text-[34px] leading-tight text-white lg:text-[42px]">
              Tell us what you are building.
            </h2>

            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/65">
              We will help you assess the architecture, technology trade-offs,
              delivery plan, and the practical path to a secure production system.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center justify-center gap-2 bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] px-6 py-4 text-[13px] font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Start a scoping conversation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}