"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";

// ── Founders data ─────────────────────────────────────────────────────────────
const FOUNDERS = [
 {
  name: "Elijah Alexander Okpochini",
  title: "Founder & Chief Executive Officer",
  image: "/images/founders/elijah.jpg",
  avatarBg: "#1f3a5f",
  accentColor: "#1f6fb2",
  accentBg: "#eaf4ff",
  bio: [
    "Elijah Alexander Okpochini is a software engineer and entrepreneur pursuing a Bachelor of Science (B.Sc.) in Industrial Physics at the University of Benin. Alongside his academic journey, he has spent the last several years building full-stack software applications with a focus on scalable web platforms, backend architecture, and modern cloud infrastructure.",
    "In July 2024, he founded Logicsoft Technologies with a clear vision: to build an African technology company capable of delivering enterprise-grade software that meets global engineering standards. Rather than competing on price, Logicsoft was created to compete on technical excellence, long-term reliability, and thoughtful product execution.",
    "Today, Elijah leads the company's engineering direction, overseeing product architecture, client delivery, and technology strategy. His work spans custom software development, AI powered business solutions, cloud deployments, and digital transformation initiatives for startups and growing businesses, while continuously investing in building Logicsoft into a globally respected technology company."
  ],
  quote: "Great software isn't built by writing more code, it's built by solving the right problems with discipline, clarity, and uncompromising engineering standards.",
  credentials: [
    "B.Sc. Industrial Physics (In View), University of Benin",
    "Founder & CEO, Logicsoft Technologies",
    "4+ Years in Full-Stack Software Engineering",
    "Specializing in AI, Cloud & Enterprise Software"],
  },
{
  name: "Saviour Oviahon Efe",
  title: "Chief Technology Officer & Co-Founder",
  image: "/images/founders/saviourr.jpg",
  avatarBg: "#059669",
  accentColor: "#059669",
  accentBg: "#ecfdf5",

  bio: [
    "Saviour Oviahon Efe is the Chief Technology Officer and Co-Founder of Logicsoft Technologies, where he leads the company's technology vision, software architecture, and engineering excellence. With a passion for building secure, scalable, and high performance digital solutions, he has been instrumental in transforming complex business challenges into innovative software products that deliver measurable results.",
    "As CTO, Saviour established the engineering standards and development culture that define Logicsoft today. He champions clean architecture, rigorous code reviews, modern cloud infrastructure, cybersecurity best practices, and continuous learning, ensuring every solution is built with long-term reliability, performance, and maintainability in mind.",
    "Working closely with clients, stakeholders, and the engineering team, he oversees the complete software development lifecycle from strategy and solution design to deployment and continuous improvement. His leadership has helped position Logicsoft Technologies as a trusted technology partner for businesses seeking world-class software solutions across multiple industries."
  ],
  quote:
    "Technology alone doesn't transform businesses, people do. Our responsibility is to build software that empowers organizations to grow, innovate, and compete with confidence. Every solution we deliver is a reflection of our commitment to excellence, integrity, and lasting value.",
  credentials: [
    "Co-Founder & Chief Technology Officer, Logicsoft Technologies",
    "Software Architecture & System Design",
    "Cloud Infrastructure & DevOps",
    "Cybersecurity & Enterprise Application Development"],
},
  {
    name: "Ngozi Adeleke",
    title: "Chief Operating Officer & Co-Founder",
    image: "/images/founders/ngozi.jpg",
    avatarBg: "#7c3aed",
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    bio: [
      "Ngozi brings the operational rigour that turns engineering talent into reliable delivery. With a background in management consulting at a Big Four firm, she joined Adewale and Emeka as the third co-founder to build the business infrastructure, the project management frameworks, client relationship processes, and financial discipline that allowed Logicsoft to scale without losing quality.",
      "She architected Logicsoft's project management methodology, which draws from PRINCE2, Agile, and the company's own 5 years of hard won delivery lessons. She also leads People & Culture, a function she considers as important as engineering.",
      "Under her leadership, Logicsoft has maintained a 98% client retention rate and a zero crunch culture that attracts and keeps exceptional engineers.",
    ],
    quote: "Delivery methodology is not bureaucracy. It's the difference between a project that works and one that doesn't. Our clients don't pay us to be creative with their budgets, they pay us to hit our commitments, every single time.",
    credentials: ["MBA, Lagos Business School", "PRINCE2 Practitioner", "PMP Certified", "Former Big Four Management Consultant"],
  },
];

const CHAPTERS = [
  {
    num: "01",
    title: "The problem we set out to solve",
    content: "Nigerian businesses in 2021 faced a brutal choice: work with local vendors who often lacked technical depth, or engage international firms who lacked market context and charged fees that only the largest companies could afford. The middle market growing companies that needed serious software was poorly served by everyone. That was the gap.",
  },
  {
    num: "02",
    title: "The decision to start",
    content: "None of the three founders came from wealth. There was no angel investor, no accelerator, no safety net. The decision to incorporate was made over two meetings in a café in Victoria Island. Elijah would lead the business. Saviour would run engineering. Ngozi would build the operations. Each brought what the others lacked. The first year was lean, three clients, a shared workspace, and a shared determination not to cut corners.",
  },
  {
    num: "03",
    title: "The moment we knew it was working",
    content: "In 2023, a client we had worked with the previous year returned with a referral, their CFO had recommended us to his counterpart at another financial institution. We hadn't advertised, hadn't pitched, hadn't entered any awards. We had simply delivered on time, documented everything, and been honest when problems arose. That referral was worth more than any marketing campaign.",
  },
  {
    num: "04",
    title: "What we've learned",
    content: "Five years of running a software company in Lagos has taught us that trust is earned in small moments: answering emails at 11pm when a system goes down, admitting when an estimate was wrong, delivering two days early when the client thought it would be late. These small moments compound. The companies that last are the ones that treat every client interaction as evidence of who they really are.",
  },
];

// ── Full-size rotating showcase, right side of the hero ────────────────────────
function FounderHeroShowcase({ founders }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % founders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [founders.length]);

  const current = founders[index];

  return (
    <div className="flex flex-col items-center">
      {/* Image frame */}
      <div className="relative w-[280px] h-[340px] lg:w-[320px] lg:h-[390px] rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-cover"
              priority
            />
            {/* Bottom gradient so text below reads as one composition */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Name + title, styled and animated in sync with the photo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name + "-caption"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-5 text-center"
        >
          <p className="text-[16px] font-serif font-semibold text-white">{current.name}</p>
          <p
            className="text-[11.5px] font-semibold uppercase tracking-[0.1em] mt-1"
            style={{ color: current.accentColor }}
          >
            {current.title}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mt-4">
        {founders.map((f, i) => (
          <span
            key={f.name}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === index ? "18px" : "6px",
              background: i === index ? current.accentColor : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FoundersStory() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Founders Story LogicSoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Founders Story</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200"
        style={{ background: "linear-gradient(135deg, #0d1f35 0%, #1f3a5f 50%, #1a4a7a 100%)" }}>
        <div className="max-w-[82rem] mx-auto px-4 py-20 relative overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          {/* Two columns: text + avatars on the left, full-size rotating photo on the right */}
          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-16 items-center">

            <div className="max-w-[780px]">
              <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.16em] mb-5">The founder's story</p>
              <h2 className="text-[38px] lg:text-[54px] font-serif text-white leading-[1.1] mb-6">
                Built from Conviction.<br />Not Capital.
              </h2>
              <p className="text-[17px] text-white/70 leading-[1.9] mb-8 max-w-[620px]">
                Three engineers. One shared belief. No external funding. This is the story of how
                SDA Logicsoft Technologies went from a Victoria Island café to 100+ delivered projects
                across three continents told by the people who built it.
              </p>

              {/* Small avatar trio — left as-is */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {FOUNDERS.map((f) => (
                    <div
                      key={f.name}
                      className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20"
                    >
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-white/60">Three co-founders. One company. 5 years.</p>
              </div>
            </div>

            {/* Right side: full-size rotating founder showcase */}
            <div className="hidden lg:flex justify-end">
              <FounderHeroShowcase founders={FOUNDERS} />
            </div>

          </div>
        </div>
      </div>

      {/* Story chapters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">The story</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">In their own words.</h3>

          <div className="w-full h-px bg-gray-200 mb-0" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {CHAPTERS.map((ch, i) => (
              <div key={ch.num} className={["group relative px-8 py-9 border-b border-gray-200 hover:bg-[#f7fbff] transition-colors duration-200", i % 2 !== 0 ? "sm:border-l lg:border-l-0" : "", i % 4 !== 0 ? "lg:border-l" : ""].join(" ")}>
                <span className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#1f6fb2] to-[#6db3f2]" />
                <span className="block text-[10px] font-mono text-gray-300 mb-5 tracking-[0.2em]">{ch.num}</span>
                <h4 className="text-[15px] font-bold text-[#1f3a5f] mb-3 leading-snug group-hover:text-[#1f6fb2] transition-colors duration-200">{ch.title}</h4>
                <div className="w-6 h-[2px] bg-[#1f6fb2] mb-4 opacity-20 group-hover:opacity-100 group-hover:w-10 transition-all duration-300" />
                <p className="text-[13px] text-gray-500 leading-[1.9]">{ch.content}</p>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      </div>

      {/* Founders */}
      <div className="bg-gradient-to-br from-[#eaf6ff] via-[#dff0ff] to-[#eef7ff] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-4 py-16">
          <p className="text-[11px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-4">The founding team</p>
          <h3 className="text-[28px] lg:text-[36px] font-serif text-[#1f3a5f] mb-12">Meet the co-founders.</h3>

          <div className="flex flex-col gap-8">
            {FOUNDERS.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="grid lg:grid-cols-[260px_1fr_300px] divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

                  {/* Identity */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="relative w-14 h-14 rounded-full overflow-hidden mb-5">
                        <Image
                          src={f.image}
                          alt={f.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-[18px] font-serif font-bold text-[#1f3a5f] mb-1">{f.name}</h4>
                      <p className="text-[12px] font-semibold leading-snug" style={{ color: f.accentColor }}>{f.title}</p>
                    </div>
                    <div className="w-8 h-[2px] mt-5" style={{ background: f.accentColor }} />
                  </div>

                  {/* Bio */}
                  <div className="p-8">
                    <div className="flex flex-col gap-3">
                      {f.bio.map((para, j) => (
                        <p key={j} className="text-[13.5px] text-gray-500 leading-[1.9]">{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* Quote + credentials */}
                  <div className="p-8 flex flex-col gap-6">
                    <div className="flex-1">
                      <Quote className="w-5 h-5 mb-3" style={{ color: f.accentColor }} />
                      <blockquote className="text-[13px] font-serif italic text-[#1f3a5f] leading-[1.85]">
                        "{f.quote}"
                      </blockquote>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-3">Credentials</p>
                      <ul className="space-y-1.5">
                        {f.credentials.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-[12px] text-gray-500">
                            <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: f.accentColor }} />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1f3a5f]">
        <div className="max-w-[82rem] mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.15em] mb-3">Work with us</p>
            <h3 className="text-[26px] font-serif font-normal text-white mb-2">The founders are still involved in every major engagement.</h3>
            <p className="text-[14px] text-white/50 max-w-lg leading-relaxed">We're a founder-led company. When you work with LogicSoft, you work with people who care personally about the outcome.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] ring-1 ring-inset ring-white/30 transition-all duration-200">
              Talk to us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about/our-journey" className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/30 text-white hover:bg-white/10 transition-all duration-200">
              See our journey →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}