"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Elijah O Alexander",
    role: "Chief Executive Officer",
    image: "/images/founders/elijah-x.jpg",
    bio: "Elijah leads Logicsoft Technologies with a focus on strategic growth, enterprise partnerships, and delivery excellence. With a background spanning software engineering and business development, he founded Logicsoft to bridge the gap between world-class technical execution and real business outcomes.",
    linkedin: "https://linkedin.com/in/elijah-alexander-516649331",
    email: "elijah@logicsoft.com",
  },
  {
    name: "Saviour Oviahon Efe",
    role: "Chief Technology Officer",
    image: "/images/founders/saviour-2.png",
    bio: "Saviour is the Chief Technology Officer at Logicsoft, leading the company's technology strategy, software architecture, and engineering operations. He champions innovation, technical excellence, and scalable solutions, ensuring every product is built with performance, security, and long-term growth in mind. His leadership drives the development of modern digital experiences that help businesses innovate and succeed in an evolving technology landscape.",
    linkedin: "https://linkedin.com/in/oviahon-saviour-837a2b422",
    email: "oviahonsaviourefe@gmail.com",
  },
  {
    name: "TBA",
    role: "Head of Delivery",
    image: null,
    bio: "Responsible for project management operations, client delivery frameworks, and ensuring every engagement meets Logicsoft's quality standards.",
    linkedin: null,
    email: null,
  },
];

export default function Leadership() {
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
          <span className="text-gray-600 font-medium">Leadership</span>
        </nav>
      </div>

      {/* ── Hero header ── */}
      <div className="border-t border-b border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 py-14">
          <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
            Our team
          </p>
          <h1 className="text-[36px] font-serif text-[#1f3a5f] mb-4">
            Leadership
          </h1>
          <p className="text-[17px] text-gray-700 leading-[2] max-w-[760px]">
            Logicsoft Technologies is led by a focused team of technology and
            business professionals committed to delivering measurable outcomes for
            every client we serve.
          </p>
        </div>
      </div>

      {/* ── Team grid ── */}
      <div className="max-w-[82rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 overflow-hidden hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
            >
              {/* Top slide-in line */}
              <span
                className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden="true"
              />

              {/* Photo */}
              <div className="relative w-full bg-[#f5f5f5] border-b border-gray-100 overflow-hidden" style={{ paddingBottom: "75%" }}>
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-16 h-16 border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <span className="text-[28px] text-gray-200 font-serif">?</span>
                    </div>
                    <span className="text-[11px] text-gray-300 uppercase tracking-[0.1em]">Position open</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="px-6 pt-5 pb-6">
                <h3 className="text-[15.5px] font-semibold text-[#1f3a5f] leading-snug group-hover:text-[#1f6fb2] transition-colors duration-200">
                  {member.name}
                </h3>
                <p className="text-[12px] font-semibold text-[#1f6fb2] uppercase tracking-[0.08em] mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-[13px] text-gray-500 leading-[1.85] mb-5">
                  {member.bio}
                </p>

                {/* Social links */}
                {(member.linkedin || member.email) && (
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="w-8 h-8 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-all duration-200"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="w-8 h-8 border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1f6fb2] hover:text-[#1f6fb2] transition-all duration-200"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <span
                className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 ease-out group-hover:left-0 group-hover:w-full"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Join the team strip ── */}
      <div className="border-t border-gray-200 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-2">
              Join us
            </p>
            <h3 className="text-[22px] font-serif text-[#1f3a5f]">
              Interested in joining the Logicsoft team?
            </h3>
            <p className="text-[14px] text-gray-500 mt-1">
              We are building a team of engineers, consultants, and delivery experts who care about doing great work.
            </p>
          </div>
          <Link
            href="/careers"
            className="flex items-center gap-2 px-7 py-2.5 text-[13.5px] font-semibold text-white shrink-0
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