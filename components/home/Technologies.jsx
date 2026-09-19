"use client";

// Shared card: logo by default → bio fades in on hover (same as /technologies).
// Adjust this path to wherever you put TechCard.jsx.
import TechCard from "@/components/TechCard";

// Short bio shown on hover, keyed by tech name.
// Logos come from TechCard's own map (public/tech/*.svg), so items only need a name.
// Add `src: "/images/your-file.png"` to any item to force a custom image instead.
const BIOS = {
  "MongoDB": "Flexible document data models and application workloads.",
  "PostgreSQL": "Transactional applications, SaaS products, and structured business data.",
  "Express.js": "Production REST APIs and service backends.",
  "React.js": "Component-based web applications and product interfaces.",
  "React/Next.js": "Interactive interfaces with server-rendered, full-stack delivery.",
  "Next.js": "Server-rendered and full-stack web applications.",
  "Node.js": "Event-driven services, APIs, automation, and integrations.",
  "Swift": "Native iOS development where platform depth matters.",
  "Flutter": "Cross-platform mobile applications with expressive UI.",
  "Expo": "Accelerated React Native delivery and mobile platform tooling.",
  "React Native": "Cross-platform mobile products from a shared codebase.",
  "TypeScript": "Safer, maintainable application code at scale.",
  "Tailwind CSS": "Consistent responsive interfaces and design systems.",
  "Python": "Automation, data processing, integrations, and services.",
  "GraphQL": "Flexible data APIs for application clients.",
  "Redis": "Caching, sessions, queues, and high-speed application state.",
  "AWS": "Compute, storage, networking, managed services, and cloud-native delivery.",
  "Azure": "Enterprise cloud services and Microsoft ecosystem workloads.",
  "Google Cloud": "Cloud infrastructure, platform services, and managed workloads.",
  "Terraform": "Repeatable infrastructure as code.",
  "Kubernetes": "Container orchestration for distributed workloads.",
  "Docker": "Consistent, portable application packaging.",
  "Jenkins": "Automated build, test, and deployment workflows.",
  "GitLab": "Source control and CI/CD workflows.",
  "Ansible": "Configuration automation and environment consistency.",
  "Linux": "Production server administration and application hosting.",
  "Splunk": "Centralised event and security-oriented log analysis.",
  "SonarQube": "Code quality and static-analysis support.",
  "Vault": "Secrets-management tooling for supported environments.",
  "OWASP": "Common web application risk awareness and remediation.",
  "Kali Linux": "Security assessment environment and tooling.",
  "Ionic": "Hybrid application delivery for selected business cases.",
  "Electron": "Desktop applications built with web technologies.",
  "Xamarin": "Cross-platform mobile applications on the .NET stack.",
};

const TECH_SECTIONS = [
  {
    eyebrow: "01",
    label: "Full Stack Development",
    groups: [
      {
        sublabel: "MERN Stack",
        items: [
          { name: "MongoDB" },
          { name: "Express.js" },
          { name: "React.js" },
          { name: "Node.js" },
        ],
      },
      {
        sublabel: "PERN Stack",
        items: [
          { name: "PostgreSQL" },
          { name: "Express.js" },
          { name: "React/Next.js", src: "/images/react-next.png" },
          { name: "Node.js" },
        ],
      },
    ],
  },
  {
    eyebrow: "02",
    label: "Mobile Development",
    items: [
      { name: "Swift" },
      { name: "Flutter" },
      { name: "Expo" },
      { name: "React Native" },
    ],
  },
  {
    eyebrow: "03",
    label: "Frontend & UI",
    items: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    eyebrow: "04",
    label: "Backend & APIs",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Python" },
      { name: "GraphQL" },
      { name: "Redis" },
    ],
  },
  {
    eyebrow: "05",
    label: "Cloud & Infrastructure",
    items: [
      { name: "AWS" },
      { name: "Azure" },
      { name: "Google Cloud" },
      { name: "Terraform" },
      { name: "Kubernetes" },
    ],
  },
  {
    eyebrow: "06",
    label: "DevOps & CI/CD",
    items: [
      { name: "Docker" },
      { name: "Jenkins" },
      { name: "GitLab" },
      { name: "Ansible" },
      { name: "Linux" },
    ],
  },
  {
    eyebrow: "07",
    label: "Security & Compliance",
    items: [
      { name: "Splunk" },
      { name: "SonarQube" },
      { name: "Vault" },
      { name: "OWASP" },
      { name: "Kali Linux" },
    ],
  },
  {
    eyebrow: "08",
    label: "Cross-Platform Tools",
    items: [
      { name: "Flutter" },
      { name: "React Native" },
      { name: "Ionic" },
      { name: "Electron" },
      { name: "Xamarin" },
    ],
  },
];

// 5 columns on desktop (was 6) so each card has room for its bio.
const GRID = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3";

export default function Technologies() {
  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="py-24 bg-white"
    >
      <div className="max-w-[82rem] mx-auto px-4 sm:px-10">

        {/* Header */}
        <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.14em] mb-4">
          Our tech stack
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
          <h2
            id="technologies-heading"
            className="text-[36px] lg:text-[44px] font-serif text-[#1f3a5f] leading-tight"
          >
            Technologies &amp; Platforms We Work With
          </h2>
          <a
            href="/technologies"
            className="shrink-0 flex items-center gap-2 text-[13px] font-semibold text-[#1f6fb2] border border-[#1f6fb2] px-5 py-2.5 hover:bg-[#1f6fb2] hover:text-white transition-all duration-200 self-start sm:self-auto whitespace-nowrap"
          >
            View full stack →
          </a>
        </div>
        <p className="text-[17px] text-gray-600 leading-[1.85] max-w-[860px] mb-14">
          We build with the tools that the world&apos;s best engineering teams rely on
          choosing the right stack for every layer of every project, not just the
          most fashionable one.
        </p>

        {/* Content wrapper */}
        <div
          className="space-y-12 px-8 py-10"
          style={{ background: "linear-gradient(135deg, #eaf6ff 0%, #dff0ff 50%, #eef7ff 100%)" }}
        >
          {TECH_SECTIONS.map((section) => (
            <div key={section.label}>

              {/* Section label row */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-[11px] font-mono text-gray-300 tracking-widest">
                  {section.eyebrow}
                </span>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.12em] whitespace-nowrap">
                  {section.label}
                </p>
                <div className="flex-1 h-px bg-blue-100" />
                <span className="text-[11px] text-gray-300 font-medium whitespace-nowrap">
                  {section.groups
                    ? section.groups.reduce((acc, g) => acc + g.items.length, 0)
                    : section.items.length}{" "}
                  technologies
                </span>
              </div>

              {/* Grouped (MERN / PERN) */}
              {section.groups ? (
                <div className="flex flex-col gap-7">
                  {section.groups.map((group) => (
                    <div key={group.sublabel}>
                      <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
                        <span className="w-4 h-px bg-[#1f6fb2]" aria-hidden="true" />
                        {group.sublabel}
                      </p>
                      <div className={GRID}>
                        {group.items.map((tech) => (
                          <TechCard
                            key={`${group.sublabel}-${tech.name}`}
                            name={tech.name}
                            description={BIOS[tech.name]}
                            src={tech.src}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={GRID}>
                  {section.items.map((tech) => (
                    <TechCard
                      key={tech.name}
                      name={tech.name}
                      description={BIOS[tech.name]}
                      src={tech.src}
                    />
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}