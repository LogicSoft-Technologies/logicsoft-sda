"use client";

import { useRef, useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Users,
  Wrench,
} from "lucide-react";
import {
  CASE_STUDIES,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/lib/case-studies-data";

// NOTE: this file is a Client Component (video autoplay + scroll-linked
// motion need the browser). If you want per-project <title>/<meta> tags,
// wrap this in a thin server component at the same route that calls
// `generateMetadata()` using getCaseStudy(params.id) and renders this
// component as a child.

const NAV_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "The Challenge" },
  { id: "solution", label: "Our Solution" },
  { id: "results", label: "Results" },
  { id: "stack", label: "Tech Stack" },
];

const INK = "#0F1E33";
const ACCENT = "#2C5282";

export default function CaseStudyPage({ params }) {
  const { id } = use(params);
  const project = getCaseStudy(id);
  if (!project) notFound();

  const related = getRelatedCaseStudies(project, 3);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className="bg-white">
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-[86vh] min-h-[520px] max-h-[820px] overflow-hidden bg-[#0F1E33]"
      >
        <div className="absolute top-0 left-0 right-0 z-30">
          <div className="max-w-[80rem] mx-auto px-6 pt-6 flex items-center justify-between">
            <Link
              href="/portfolio"
              className="flex items-center gap-2 text-[12.5px] font-medium text-white/80 hover:text-white transition-colors duration-150 border border-white/15 px-3.5 py-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Back to portfolio
            </Link>
            <span className="hidden sm:block font-mono text-[11px] tabular-nums tracking-[0.08em] text-white/50">
              {String(project.id).padStart(2, "0")} /{" "}
              {String(CASE_STUDIES.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <motion.div
          style={{ y: videoY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={project.image}
            onCanPlay={() => setVideoReady(true)}
            className="w-full h-full object-cover"
          >
            <source src={project.video} type="video/mp4" />
          </video>

          {!videoReady && (
            <Image
              src={project.image}
              alt=""
              fill
              priority
              className="object-cover"
              aria-hidden="true"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E33] via-[#0F1E33]/50 to-[#0F1E33]/10" />
          <div className="absolute inset-0 bg-[#0F1E33]/35" />
        </motion.div>

        <div className="relative z-20 h-full flex flex-col justify-end max-w-[80rem] mx-auto px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <p className="font-mono text-[11px] font-medium text-[#7ec1ff] uppercase tracking-[0.14em] mb-5">
              Case Study — {project.category}
            </p>
            <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-semibold text-white leading-[1.1] tracking-tight mb-6 max-w-[780px]">
              {project.title}
            </h1>

            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#7ec1ff] hover:text-white transition-colors duration-200 text-[14px] font-medium mb-6"
              >
                View live project
                <ArrowUpRight className="w-4 h-4 animate-pulse" />
              </a>
            )}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/65 text-[13.5px]">
              <span className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                {project.client}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {project.duration} · {project.year}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ META BAR ══════════════════════ */}
      <div className="relative z-30 border-b border-gray-200 bg-white">
        <div className="max-w-[80rem] mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-gray-200 border-x border-gray-200">
            {[
              { label: "Client", value: project.client, icon: Briefcase },
              { label: "Industry", value: project.industry, icon: Users },
              { label: "Timeline", value: project.duration, icon: Calendar },
              { label: "Team", value: project.teamSize, icon: Wrench },
              { label: "Outcome", value: project.outcome, icon: ArrowUpRight },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="px-5 py-6">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon
                      className="w-3 h-3"
                      style={{ color: ACCENT }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] font-medium text-gray-400 uppercase tracking-[0.08em]">
                      {m.label}
                    </span>
                  </div>
                  <p
                    className="text-[13.5px] font-medium leading-snug"
                    style={{ color: INK }}
                  >
                    {m.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════ BODY: NAV + CONTENT ══════════════════════ */}
      <div className="max-w-[80rem] mx-auto px-6 py-16 grid lg:grid-cols-[200px_1fr] gap-14">
        <aside className="hidden lg:block">
          <nav className="sticky top-[28px] flex flex-col gap-1 border-l border-gray-200 pl-5">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[12.5px] text-gray-500 hover:text-[#2C5282] py-1.5 transition-colors duration-150"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="max-w-[720px]">
          {/* Overview */}
          <section id="overview" className="scroll-mt-[28px] mb-16">
            <p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] mb-4"
              style={{ color: ACCENT }}
            >
              Overview
            </p>
            <p className="text-[17px] text-gray-600 leading-[1.8]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium uppercase tracking-[0.06em] px-2.5 py-1 border border-gray-200 text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Challenge */}
          <section id="challenge" className="scroll-mt-[28px] mb-16">
            <p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] mb-4"
              style={{ color: ACCENT }}
            >
              The Challenge
            </p>
            <h2
              className="text-[24px] font-semibold tracking-tight leading-tight mb-5"
              style={{ color: INK }}
            >
              Where {project.client} was stuck
            </h2>
            <p className="text-[15.5px] text-gray-600 leading-[1.9]">
              {project.challenge}
            </p>
          </section>

          {/* Solution */}
          <section id="solution" className="scroll-mt-[28px] mb-16">
            <p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] mb-4"
              style={{ color: ACCENT }}
            >
              Our Solution
            </p>
            <h2
              className="text-[24px] font-semibold tracking-tight leading-tight mb-5"
              style={{ color: INK }}
            >
              What we built
            </h2>
            <p className="text-[15.5px] text-gray-600 leading-[1.9] mb-8">
              {project.solution}
            </p>
            <div className="border border-gray-200 px-6 py-5">
              <p className="font-mono text-[10px] font-medium text-gray-400 uppercase tracking-[0.08em] mb-1.5">
                Logicsoft's role
              </p>
              <p className="text-[13.5px] text-gray-600 leading-relaxed">
                {project.role}
              </p>
            </div>
          </section>

          {/* Results */}
          <section id="results" className="scroll-mt-[28px] mb-16">
            <p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] mb-4"
              style={{ color: ACCENT }}
            >
              Results
            </p>
            <h2
              className="text-[24px] font-semibold tracking-tight leading-tight mb-8"
              style={{ color: INK }}
            >
              The outcome, in numbers
            </h2>
            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200">
              {project.results.map((r) => (
                <div key={r.label} className="bg-white px-5 py-6">
                  <p
                    className="font-mono text-[26px] font-semibold leading-none mb-2 tabular-nums"
                    style={{ color: INK }}
                  >
                    {r.value}
                  </p>
                  <p className="text-[12px] text-gray-500 leading-snug">
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Tech stack */}
          <section id="stack" className="scroll-mt-[28px] mb-16">
            <p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] mb-4"
              style={{ color: ACCENT }}
            >
              Tech Stack
            </p>
            <h2
              className="text-[24px] font-semibold tracking-tight leading-tight mb-6"
              style={{ color: INK }}
            >
              What it runs on
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="text-[12.5px] font-medium px-3.5 py-2 border border-gray-200 hover:border-[#2C5282] hover:text-[#2C5282] transition-colors duration-150"
                  style={{ color: INK }}
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section className="border-t border-gray-200 pt-14">
            <blockquote
              className="border-l-2 pl-6"
              style={{ borderColor: ACCENT }}
            >
              <p
                className="text-[17px] leading-[1.8] mb-6"
                style={{ color: INK }}
              >
                {project.testimonial.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div
                  className="w-9 h-9 flex items-center justify-center text-[12px] font-semibold text-white"
                  style={{ backgroundColor: ACCENT }}
                >
                  {project.testimonial.name.charAt(0)}
                </div>
                <div>
                  <p
                    className="text-[13.5px] font-semibold"
                    style={{ color: INK }}
                  >
                    {project.testimonial.name}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    {project.testimonial.role}
                  </p>
                </div>
              </footer>
            </blockquote>
          </section>
        </div>
      </div>

      {/* ══════════════════════ RELATED PROJECTS ══════════════════════ */}
      {related.length > 0 && (
        <div className="border-t border-gray-200 bg-[#F8F9FB]">
          <div className="max-w-[80rem] mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] mb-3"
                  style={{ color: ACCENT }}
                >
                  Keep exploring
                </p>
                <h2
                  className="text-[24px] font-semibold tracking-tight"
                  style={{ color: INK }}
                >
                  More projects
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden sm:flex items-center gap-1.5 text-[12.5px] font-medium transition-colors duration-150"
                style={{ color: ACCENT }}
              >
                View all case studies
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/case-studies/${p.id}`}
                  className="group relative bg-white border border-gray-200 overflow-hidden hover:border-[#2C5282] transition-colors duration-200"
                >
                  <div
                    className="relative w-full overflow-hidden bg-gray-100"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="px-5 pt-4 pb-5">
                    <p className="font-mono text-[10px] font-medium text-gray-400 uppercase tracking-[0.08em] mb-1.5">
                      {p.category}
                    </p>
                    <h3
                      className="text-[14px] font-semibold group-hover:text-[#2C5282] transition-colors duration-150"
                      style={{ color: INK }}
                    >
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════ CTA STRIP ══════════════════════ */}
      <div
        className="border-t border-gray-200"
        style={{ backgroundColor: INK }}
      >
        <div className="max-w-[80rem] mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] font-medium text-[#7ec1ff] uppercase tracking-[0.12em] mb-2">
              Start your project
            </p>
            <h3 className="text-[22px] font-semibold tracking-tight text-white mb-1">
              Want an outcome like this one?
            </h3>
            <p className="text-[14px] text-white/50 max-w-lg">
              Tell us about your initiative and we'll show you exactly how
              Logicsoft Technologies can deliver it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-7 py-3 text-[13.5px] font-semibold text-[#0F1E33] bg-white hover:bg-white/90 transition-colors duration-150"
            >
              Discuss my project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center justify-center gap-2 px-7 py-3 text-[13.5px] font-medium border border-white/25 text-white hover:bg-white/10 transition-colors duration-150"
            >
              Full portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
