"use client";

// ── CDN helpers ───────────────────────────────────────────────────────────────
const dv = (name, variant = "plain-wordmark") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;
const si = (slug, color = "444444") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

// ── Data — condensed showcase (4–5 per category) ──────────────────────────────
const TECH_SECTIONS = [
  {
    eyebrow: "01",
    label: "Full Stack Development",
    groups: [
      {
        sublabel: "MERN Stack",
        items: [
          { name: "MongoDB",    src: dv("mongodb",   "plain-wordmark")    },
          { name: "Express.js", src: dv("express",   "wordmark")          },
          { name: "React.js",   src: dv("react",     "original-wordmark") },
          { name: "Node.js",    src: dv("nodejs",    "plain-wordmark")    },
        ],
      },
      {
        sublabel: "PERN Stack",
        items: [
          { name: "PostgreSQL",    src: dv("postgresql", "plain-wordmark")    },
          { name: "Express.js",    src: dv("express",    "wordmark")          },
          { name: "React/Next.js", src: dv("nextjs",     "plain-wordmark")    },
          { name: "Node.js",       src: dv("nodejs",     "plain-wordmark")    },
        ],
      },
    ],
  },
  {
    eyebrow: "02",
    label: "Mobile Development",
    items: [
      { name: "Swift",    src: dv("swift",    "plain-wordmark") },
      { name: "Android",  src: dv("android",  "plain-wordmark") },
      { name: "Firebase", src: dv("firebase", "plain-wordmark") },
      { name: "Flutter",  src: dv("flutter",  "plain-wordmark") },
      { name: "Kotlin",   src: dv("kotlin",   "plain-wordmark") },
    ],
  },
  {
    eyebrow: "03",
    label: "Frontend & UI",
    items: [
      { name: "React.js",     src: dv("react",       "original-wordmark") },
      { name: "Next.js",      src: dv("nextjs",      "plain-wordmark")    },
      { name: "TypeScript",   src: dv("typescript",  "plain-wordmark")    },
      { name: "Tailwind CSS", src: dv("tailwindcss", "plain-wordmark")    },
      { name: "Sass",         src: dv("sass",        "original-wordmark") },
    ],
  },
  {
    eyebrow: "04",
    label: "Backend & APIs",
    items: [
      { name: "Node.js",    src: dv("nodejs",    "plain-wordmark") },
      { name: "Express.js", src: dv("express",   "wordmark")       },
      { name: "Python",     src: dv("python",    "plain-wordmark") },
      { name: "GraphQL",    src: dv("graphql",   "plain-wordmark") },
      { name: "Redis",      src: dv("redis",     "plain-wordmark") },
    ],
  },
  {
    eyebrow: "05",
    label: "Cloud & Infrastructure",
    items: [
      { name: "AWS",          src: dv("amazonwebservices", "plain-wordmark") },
      { name: "Azure",        src: dv("azure",             "plain-wordmark") },
      { name: "Google Cloud", src: dv("googlecloud",       "plain-wordmark") },
      { name: "Terraform",    src: dv("terraform",         "plain-wordmark") },
      { name: "Kubernetes",   src: dv("kubernetes",        "plain-wordmark") },
    ],
  },
  {
    eyebrow: "06",
    label: "DevOps & CI/CD",
    items: [
      { name: "Docker",     src: dv("docker",     "plain-wordmark") },
      { name: "Jenkins",    src: dv("jenkins",    "line-wordmark")  },
      { name: "GitLab",     src: dv("gitlab",     "plain-wordmark") },
      { name: "Ansible",    src: dv("ansible",    "plain-wordmark") },
      { name: "Linux",      src: dv("linux",      "plain-wordmark") },
    ],
  },
  {
    eyebrow: "07",
    label: "Security & Compliance",
    items: [
      { name: "Splunk",     src: dv("splunk",    "plain-wordmark") },
      { name: "SonarQube",  src: dv("sonarqube", "plain-wordmark") },
      { name: "Vault",      src: dv("vault",     "plain-wordmark") },
      { name: "OWASP",      src: si("owasp",     "333333")         },
      { name: "Kali Linux", src: dv("linux",     "plain-wordmark") },
    ],
  },
  {
    eyebrow: "08",
    label: "Cross-Platform Tools",
    items: [
      { name: "Flutter",      src: dv("flutter",  "plain-wordmark")    },
      { name: "React Native", src: dv("react",    "original-wordmark") },
      { name: "Ionic",        src: dv("ionic",    "plain-wordmark")    },
      { name: "Electron",     src: dv("electron", "plain-wordmark")    },
      { name: "Xamarin",      src: dv("xamarin",  "plain-wordmark")    },
    ],
  },
];

// ── Logo tile ─────────────────────────────────────────────────────────────────
function LogoTile({ tech }) {
  return (
    <div
      className="group relative flex items-center justify-center border border-gray-200 bg-white overflow-hidden hover:border-[#1f6fb2] hover:shadow-sm transition-all duration-200"
      style={{ padding: "18px 16px", minHeight: "80px" }}
    >
      <span
        className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
        aria-hidden="true"
      />
      <img
        src={tech.src}
        alt={tech.name}
        className="w-auto object-contain transition-all duration-300"
        style={{ maxWidth: "110px", maxHeight: "44px" }}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
          if (e.currentTarget.nextSibling) {
            e.currentTarget.nextSibling.style.display = "block";
          }
        }}
      />
      <span className="hidden text-[11px] font-semibold text-gray-500 text-center leading-tight">
        {tech.name}
      </span>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
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
          We build with the tools that the world&apos;s best engineering teams rely on —
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {group.items.map((tech) => (
                          <LogoTile key={`${group.sublabel}-${tech.name}`} tech={tech} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {section.items.map((tech) => (
                    <LogoTile key={tech.name} tech={tech} />
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