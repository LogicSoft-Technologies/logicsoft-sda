"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Layers, Cpu, Shield, GitBranch,
  ChevronDown, Code2, Cloud,
} from "lucide-react";

// ── CDN helpers ───────────────────────────────────────────────────────────────
const dv = (name, variant = "plain-wordmark") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;
const si = (slug, color = "444444") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

// ── Data ──────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Full Stack",
  "Mobile",
  "Frontend & UI",
  "Backend & APIs",
  "Cloud & Infrastructure",
  "DevOps & CI/CD",
  "Security & Compliance",
  "Cross-Platform",
];

const TECH_SECTIONS = [
  {
    eyebrow: "01",
    label: "Full Stack Development",
    category: "Full Stack",
    icon: Layers,
    summary: "End-to-end web applications built on proven, scalable stacks.",
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
    category: "Mobile",
    icon: Cpu,
    summary: "Native and hybrid mobile apps for iOS and Android platforms.",
    items: [
      { name: "Swift",    src: dv("swift",    "plain-wordmark") },
      { name: "Android",  src: dv("android",  "plain-wordmark") },
      { name: "Kotlin",   src: dv("kotlin",   "plain-wordmark") },
      { name: "Xcode",    src: dv("xcode",    "plain-wordmark") },
      { name: "Firebase", src: dv("firebase", "plain-wordmark") },
      { name: "Flutter",  src: dv("flutter",  "plain-wordmark") },
    ],
  },
  {
    eyebrow: "03",
    label: "Frontend & UI",
    category: "Frontend & UI",
    icon: Code2,
    summary: "Pixel-perfect interfaces with modern toolchains and animation.",
    items: [
      { name: "React.js",     src: dv("react",       "original-wordmark") },
      { name: "Next.js",      src: dv("nextjs",      "plain-wordmark")    },
      { name: "TypeScript",   src: dv("typescript",  "plain-wordmark")    },
      { name: "Tailwind CSS", src: dv("tailwindcss", "plain-wordmark")    },
      { name: "Sass",         src: dv("sass",        "original-wordmark") },
      { name: "Webpack",      src: dv("webpack",     "plain-wordmark")    },
    ],
  },
  {
    eyebrow: "04",
    label: "Backend & APIs",
    category: "Backend & APIs",
    icon: GitBranch,
    summary: "Robust server-side systems, REST and GraphQL APIs, and data layers.",
    items: [
      { name: "Node.js",    src: dv("nodejs",    "plain-wordmark") },
      { name: "Express.js", src: dv("express",   "wordmark")       },
      { name: "Python",     src: dv("python",    "plain-wordmark") },
      { name: "GraphQL",    src: dv("graphql",   "plain-wordmark") },
      { name: "Redis",      src: dv("redis",     "plain-wordmark") },
      { name: "Nginx",      src: dv("nginx",     "plain-wordmark") },
    ],
  },
  {
    eyebrow: "05",
    label: "Cloud Platforms & Engineering",
    category: "Cloud & Infrastructure",
    icon: Cloud,
    summary: "Multi-cloud deployment, IaC, and container orchestration.",
    items: [
      { name: "AWS",             src: dv("amazonwebservices", "plain-wordmark") },
      { name: "Microsoft Azure", src: dv("azure",             "plain-wordmark") },
      { name: "Google Cloud",    src: dv("googlecloud",       "plain-wordmark") },
      { name: "DigitalOcean",    src: dv("digitalocean",      "plain-wordmark") },
      { name: "Terraform",       src: dv("terraform",         "plain-wordmark") },
      { name: "Kubernetes",      src: dv("kubernetes",        "plain-wordmark") },
    ],
  },
  {
    eyebrow: "06",
    label: "DevOps & CI/CD",
    category: "DevOps & CI/CD",
    icon: GitBranch,
    summary: "Automated pipelines, monitoring, and infrastructure as code.",
    items: [
      { name: "Docker",     src: dv("docker",     "plain-wordmark") },
      { name: "Jenkins",    src: dv("jenkins",    "line-wordmark")  },
      { name: "GitLab",     src: dv("gitlab",     "plain-wordmark") },
      { name: "Prometheus", src: dv("prometheus", "plain-wordmark") },
      { name: "Ansible",    src: dv("ansible",    "plain-wordmark") },
      { name: "Linux",      src: dv("linux",      "plain-wordmark") },
    ],
  },
  {
    eyebrow: "07",
    label: "Security & Compliance",
    category: "Security & Compliance",
    icon: Shield,
    summary: "Enterprise-grade security posture, auditing, and compliance frameworks.",
    items: [
      { name: "Kali Linux", src: dv("linux",     "plain-wordmark") },
      { name: "Splunk",     src: dv("splunk",    "plain-wordmark") },
      { name: "SonarQube",  src: dv("sonarqube", "plain-wordmark") },
      { name: "Vault",      src: dv("vault",     "plain-wordmark") },
      { name: "OWASP",      src: si("owasp",     "333333")         },
      { name: "Metasploit", src: si("metasploit","2596CD")         },
    ],
  },
  {
    eyebrow: "08",
    label: "Cross-Platform Tools",
    category: "Cross-Platform",
    icon: Layers,
    summary: "Write once, deploy everywhere — mobile and desktop.",
    items: [
      { name: "React Native", src: dv("react",    "original-wordmark") },
      { name: "Flutter",      src: dv("flutter",  "plain-wordmark")    },
      { name: "Xamarin",      src: dv("xamarin",  "plain-wordmark")    },
      { name: "Ionic",        src: dv("ionic",    "plain-wordmark")    },
      { name: "Electron",     src: dv("electron", "plain-wordmark")    },
      { name: "Cordova",      src: dv("apache",   "plain-wordmark")    },
    ],
  },
];

const STATS = [
  { value: "40+",  label: "Technologies mastered" },
  { value: "8",    label: "Practice areas"         },
  { value: "100+", label: "Projects shipped"       },
  { value: "5+",  label: "Years in practice"      },
];

// ── Logo Tile — big, bold, generous ─────────────────────────────────────────
function LogoTile({ tech, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative flex flex-col items-center justify-center bg-white border border-gray-200 hover:border-[#1f6fb2] hover:shadow-md transition-all duration-250 cursor-default"
      style={{ padding: "28px 20px 24px", minHeight: "120px" }}
    >
      {/* Hover top accent */}
      <span
        className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-[#5ba8e5] transition-all duration-400 ease-out group-hover:w-full"
        aria-hidden="true"
      />

      {imgError ? (
        <span className="text-[13px] font-semibold text-gray-500 group-hover:text-[#1f6fb2] text-center leading-tight transition-colors duration-200 px-2">
          {tech.name}
        </span>
      ) : (
        <img
          src={tech.src}
          alt={tech.name}
          className="w-auto object-contain opacity-100 transition-all duration-300"
          style={{ maxWidth: "130px", maxHeight: "60px", minHeight: "40px" }}
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}
    </motion.div>
  );
}

// ── Section Block ─────────────────────────────────────────────────────────────
function TechSection({ section }) {
  const Icon = section.icon;
  const totalItems = section.groups
    ? section.groups.reduce((a, g) => a + g.items.length, 0)
    : section.items.length;

  return (
    <div className="mb-16 last:mb-0">
      {/* Section header row */}
      <div className="flex items-center gap-5 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-[12px] font-mono text-gray-300 tracking-widest">{section.eyebrow}</span>
          <div className="flex items-center gap-2.5">
            <Icon className="w-4 h-4 text-[#1f6fb2]" />
            <h3 className="text-[13px] font-bold text-[#1f3a5f] uppercase tracking-[0.13em]">
              {section.label}
            </h3>
          </div>
        </div>
        <div className="flex-1 h-px bg-blue-100" />
        <span className="text-[12px] text-gray-300 font-medium">{totalItems} technologies</span>
      </div>

      {/* Summary */}
      <p className="text-[14px] text-gray-400 mb-7 ml-[calc(12px+1rem+0.625rem+10px)] leading-relaxed">
        {section.summary}
      </p>

      {/* Grid — grouped */}
      {section.groups ? (
        <div className="flex flex-col gap-10">
          {section.groups.map((group) => (
            <div key={group.sublabel}>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.12em] mb-5 flex items-center gap-2">
                <span className="w-5 h-px bg-[#1f6fb2]" />
                {group.sublabel}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {group.items.map((tech, i) => (
                  <LogoTile key={`${group.sublabel}-${tech.name}`} tech={tech} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {section.items.map((tech, i) => (
            <LogoTile key={tech.name} tech={tech} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function TechnologiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen]     = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target))
        setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? TECH_SECTIONS
        : TECH_SECTIONS.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setIsFilterOpen(false);
  };

  const totalTech = TECH_SECTIONS.reduce((acc, s) => {
    if (s.groups) return acc + s.groups.reduce((a, g) => a + g.items.length, 0);
    return acc + s.items.length;
  }, 0);

  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Technologies & Platforms — Logicsoft Technologies</h1>

      {/* ── Breadcrumb ── */}
      <div className="max-w-[82rem] mx-auto px-6 sm:px-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Technologies</span>
        </nav>
      </div>

      {/* ── Hero Header ── */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 sm:px-10 py-16">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.15em] mb-5">
                Our tech stack
              </p>
              <h2 className="text-[40px] lg:text-[54px] font-serif text-[#1f3a5f] leading-[1.08] mb-6">
                Technologies &amp; Platforms<br className="hidden lg:block" /> We Work With
              </h2>
              <p className="text-[18px] text-gray-600 leading-[1.85] max-w-[680px]">
                We build with the tools that the world&apos;s best engineering teams rely on —
                choosing the right stack for every layer of every project, not just the
                most fashionable one.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              {STATS.map((s, i) => (
                <div key={i} className="bg-white border border-gray-200 px-6 py-5 min-w-[150px]">
                  <p className="text-[36px] font-light text-[#1f3a5f] leading-none mb-1">{s.value}</p>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.09em]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="sticky top-[64px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[82rem] mx-auto px-6 sm:px-10">

          {/* Desktop tabs */}
          <div className="hidden md:flex items-center gap-0 overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? TECH_SECTIONS.length
                  : TECH_SECTIONS.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`shrink-0 px-5 py-[18px] text-[13px] font-semibold border-b-[3px] transition-all duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? "border-[#1f6fb2] text-[#1f6fb2]"
                      : "border-transparent text-gray-500 hover:text-[#1f3a5f] hover:border-gray-300"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-2 text-[11px] text-gray-300 font-normal">({count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile dropdown */}
          <div className="md:hidden py-3 relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 text-[14px] font-semibold text-[#1f3a5f] bg-white"
              aria-expanded={isFilterOpen}
            >
              <span>{activeCategory === "All" ? "All categories" : activeCategory}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-30 max-h-[60vh] overflow-y-auto"
                >
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-5 py-3.5 text-[13px] border-b border-gray-100 last:border-0 transition-colors duration-150 ${
                        activeCategory === cat
                          ? "text-[#1f6fb2] bg-[#f0f6ff] font-semibold"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div
        className="py-16"
        style={{ background: "linear-gradient(135deg, #eaf6ff 0%, #dff0ff 50%, #eef7ff 100%)" }}
      >
        <div className="max-w-[82rem] mx-auto px-6 sm:px-10">

          {/* Meta row */}
          <div className="flex items-center gap-4 mb-12">
            <p className="text-[13px] text-gray-500">
              Showing{" "}
              <span className="font-bold text-[#1f3a5f]">{filtered.length}</span> of{" "}
              <span className="font-bold text-[#1f3a5f]">{TECH_SECTIONS.length}</span> practice areas
              {activeCategory !== "All" && (
                <> — <span className="text-[#1f6fb2] font-semibold">{activeCategory}</span></>
              )}
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => handleCategoryChange("All")}
                className="text-[12px] text-gray-400 hover:text-[#1f6fb2] underline underline-offset-2 transition-colors"
              >
                Clear filter
              </button>
            )}
            <div className="flex-1 h-px bg-blue-100" />
            <span className="text-[12px] text-gray-400 font-medium">{totalTech} total technologies</span>
          </div>

          {/* Sections */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              {filtered.length > 0 ? (
                filtered.map((section) => (
                  <TechSection key={section.label} section={section} />
                ))
              ) : (
                <div className="flex flex-col items-center py-24 text-center">
                  <p className="text-[16px] text-gray-400 mb-4">No technologies found in this category.</p>
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className="text-[14px] font-semibold text-[#1f6fb2] hover:underline"
                  >
                    View all technologies
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Standards strip ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-[82rem] mx-auto px-6 sm:px-10 py-14">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.13em] mb-6">
            Standards &amp; certifications we engineer against
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "ISO 27001","SOC 2 Type II","HIPAA","PCI DSS",
              "GDPR","NDPR","OWASP Top 10","CIS Benchmarks",
              "NIST CSF","ISO 9001","IEEE 829","12-Factor App",
            ].map((std) => (
              <span
                key={std}
                className="text-[13px] font-medium text-gray-600 border border-gray-200 bg-[#f9f9f9] px-4 py-2 hover:border-[#1f6fb2] hover:text-[#1f6fb2] hover:bg-white transition-all duration-150 cursor-default"
              >
                {std}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA strip ── */}
      <div className="border-t border-gray-200 bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-6 sm:px-10 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">
              Start your project
            </p>
            <h3 className="text-[28px] font-serif font-normal text-white mb-2 leading-snug">
              Need a specific stack? Let&apos;s talk architecture.
            </h3>
            <p className="text-[15px] text-white/50 max-w-lg leading-relaxed">
              Tell us your requirements and we&apos;ll recommend the right technology
              combination — no upselling, no vendor bias.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="flex items-center gap-2.5 px-8 py-4 text-[14px] font-bold text-white
                bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                ring-1 ring-inset ring-white/30 transition-all duration-200"
            >
              Discuss my stack <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center gap-2.5 px-8 py-4 text-[14px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200"
            >
              See our work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}