"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

// ── Founders data ─────────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    name: "Elijah O Alexander",
    title: "Chief Executive Officer & Co-Founder",
    initials: "EA",
    avatarBg: "#1f3a5f",
    accentColor: "#1f6fb2",
    accentBg: "#eaf4ff",
    bio: [
      "Elijah graduated from the University of Lagos in 2008 with a first-class degree in Computer Science. He spent three years at a Lagos-based systems integrator before concluding that Nigerian enterprises were being systematically underserved by both local vendors (who lacked technical rigour) and international firms (who lacked local context).",
      "In 2012, he assembled a small team of engineers and incorporated SDA Logicsoft Technologies with a simple mandate: build enterprise software to global standards, from Lagos. No offshore outsourcing, no template solutions — just disciplined engineering applied to real African business problems.",
      "Under his leadership, Logicsoft has grown from 3 to 85+ engineers, delivered over 300 projects, and built a reputation in sectors as demanding as banking, healthcare, and government.",
    ],
    quote: "I never wanted to build the biggest software company in Nigeria. I wanted to build the most trustworthy one. Those aren't the same goal — and making that distinction early is what shaped everything that followed.",
    credentials: ["B.Sc Computer Science, UNILAG", "PMP Certified", "ISO 27001 Lead Implementer", "15+ years in enterprise software"],
  },
  {
    name: "Chukwuemeka Eze",
    title: "Chief Technology Officer & Co-Founder",
    initials: "CE",
    avatarBg: "#059669",
    accentColor: "#059669",
    accentBg: "#ecfdf5",
    bio: [
      "Emeka studied Electrical and Electronics Engineering at Covenant University before pivoting into software — a transition he describes as inevitable. He spent time in Johannesburg working on banking infrastructure before returning to Nigeria in 2011 convinced that the continent's technical talent gap was a solvable problem.",
      "As CTO, Emeka built Logicsoft's engineering culture from scratch: mandatory code reviews, shift-left testing, architecture documentation requirements, and an internal learning programme that has trained over 40 junior engineers into senior roles. These aren't policies — they're deeply held beliefs about how good software is made.",
      "He leads all technical direction at Logicsoft, chairs the architecture review board, and personally interviews every senior engineer hired.",
    ],
    quote: "The best thing you can do for a client is tell them the truth when the truth is uncomfortable. We've walked away from projects where the requirements were fundamentally broken. That reputation for honesty is what keeps clients coming back.",
    credentials: ["B.Eng Electrical Engineering, Covenant University", "AWS Solutions Architect Professional", "Google Cloud Professional", "Security+ Certified"],
  },
  {
    name: "Ngozi Adeleke",
    title: "Chief Operating Officer & Co-Founder",
    initials: "NA",
    avatarBg: "#7c3aed",
    accentColor: "#7c3aed",
    accentBg: "#f5f3ff",
    bio: [
      "Ngozi brings the operational rigour that turns engineering talent into reliable delivery. With a background in management consulting at a Big Four firm, she joined Adewale and Emeka as the third co-founder to build the business infrastructure — the project management frameworks, client relationship processes, and financial discipline — that allowed Logicsoft to scale without losing quality.",
      "She architected Logicsoft's project management methodology, which draws from PRINCE2, Agile, and the company's own 12 years of hard-won delivery lessons. She also leads People & Culture, a function she considers as important as engineering.",
      "Under her leadership, Logicsoft has maintained a 98% client retention rate and a zero-crunch culture that attracts and keeps exceptional engineers.",
    ],
    quote: "Delivery methodology is not bureaucracy. It's the difference between a project that works and one that doesn't. Our clients don't pay us to be creative with their budgets — they pay us to hit our commitments, every single time.",
    credentials: ["MBA, Lagos Business School", "PRINCE2 Practitioner", "PMP Certified", "Former Big Four Management Consultant"],
  },
];

const CHAPTERS = [
  {
    num: "01",
    title: "The problem we set out to solve",
    content: "Nigerian businesses in 2012 faced a brutal choice: work with local vendors who often lacked technical depth, or engage international firms who lacked market context and charged fees that only the largest companies could afford. The middle market — growing companies that needed serious software — was poorly served by everyone. That was the gap.",
  },
  {
    num: "02",
    title: "The decision to start",
    content: "None of the three founders came from wealth. There was no angel investor, no accelerator, no safety net. The decision to incorporate was made over two meetings in a café in Victoria Island. Adewale would lead the business. Emeka would run engineering. Ngozi would build the operations. Each brought what the others lacked. The first year was lean — three clients, a shared workspace, and a shared determination not to cut corners.",
  },
  {
    num: "03",
    title: "The moment we knew it was working",
    content: "In 2015, a client we had worked with the previous year returned with a referral — their CFO had recommended us to his counterpart at another financial institution. We hadn't advertised, hadn't pitched, hadn't entered any awards. We had simply delivered on time, documented everything, and been honest when problems arose. That referral was worth more than any marketing campaign.",
  },
  {
    num: "04",
    title: "What we've learned",
    content: "Twelve years of running a software company in Lagos has taught us that trust is earned in small moments: answering emails at 11pm when a system goes down, admitting when an estimate was wrong, delivering two days early when the client thought it would be late. These small moments compound. The companies that last are the ones that treat every client interaction as evidence of who they really are.",
  },
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function FoundersStory() {
  return (
    <div className="pt-[96px] bg-white">
      <h1 className="sr-only">Founder's Story LogicSoft Technologies</h1>

      {/* Breadcrumb */}
      <div className="max-w-[82rem] mx-auto px-4">
        <nav className="flex items-center gap-1.5 pt-8 pb-10 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">Home</Link>
          <span className="text-gray-300">›</span>
          <Link href="/about" className="hover:text-[#1f6fb2] transition-colors">About</Link>
          <span className="text-gray-300">›</span>
          <span className="text-gray-600 font-medium">Founder's Story</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="border-t border-b border-gray-200"
        style={{ background: "linear-gradient(135deg, #0d1f35 0%, #1f3a5f 50%, #1a4a7a 100%)" }}>
        <div className="max-w-[82rem] mx-auto px-4 py-20 relative overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative z-10 max-w-[780px]">
            <p className="text-[11px] font-bold text-[#60a5fa] uppercase tracking-[0.16em] mb-5">The founder's story</p>
            <h2 className="text-[38px] lg:text-[54px] font-serif text-white leading-[1.1] mb-6">
              Built from Conviction.<br />Not Capital.
            </h2>
            <p className="text-[17px] text-white/70 leading-[1.9] mb-8 max-w-[620px]">
              Three engineers. One shared belief. No external funding. This is the story of how
              SDA LogicSoft Technologies went from a Victoria Island café to 300+ delivered projects
              across three continents told by the people who built it.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {FOUNDERS.map((f) => (
                  <div key={f.name} className="w-10 h-10 flex items-center justify-center text-[11px] font-bold text-white border-2 border-white/20 shrink-0" style={{ background: f.avatarBg }}>
                    {f.initials}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-white/60">Three co-founders. One company. 12 years.</p>
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
                      <div className="w-14 h-14 flex items-center justify-center text-[16px] font-bold text-white mb-5" style={{ background: f.avatarBg }}>
                        {f.initials}
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