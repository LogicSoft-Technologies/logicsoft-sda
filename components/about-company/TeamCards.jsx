"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCode,
  FaServer,
  FaLayerGroup,
  FaMobileAlt,
  FaRobot,
  FaCloud,
  FaCogs,
  FaShieldAlt,
  FaClipboardCheck,
  FaPaintBrush,
  FaProjectDiagram,
  FaHeadset,
  FaLinkedin,
} from "react-icons/fa";

const members = [
  {
    name: "Ikeme Ozemoya Favour",
    role: "Frontend Engineer",
    department: "Engineering",
    image: "/images/favour-3.jpeg",
    imagePosition: "50% 20%",
    linkedin:"https://www.linkedin.com/in/ikeme-ozemoya-favour-441169428",
    icon: FaCode,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand", "TanStack Query"],
    iconColor: "#1d4ed8",
    badgeBg: "#dbeafe",
    badgeBorder: "#bfdbfe",
  },
  {
    name: "Elijah Alexander Okpochini",
    role: "Backend Engineer",
    department: "Engineering",
    image: "/images/founders/elijah-x.jpg",
    imagePosition: "50% 15%",
    linkedin: "https://linkedin.com/in/elijah-alexander-516649331",
    icon: FaServer,
    skills: ["Node.js", "Python", "MongoDB", "Typescript", "JavaScript", "JWT", "Redis", "PostgreSQL", "Express.js", "Prisma"],
    iconColor: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeBorder: "#ddd6fe",
  },
  {
    name: "Saviour Oviahon",
    role: "Full Stack Engineer",
    department: "Engineering",
    image: "/images/founders/saviour-pic.png",
    imagePosition: "50% 10%",
    linkedin: "https://www.linkedin.com/in/oviahon-saviour-837a2b422",
    icon: FaLayerGroup,
    skills: ["React", "Node.js", "PostgreSQL", "Express.js", "Tailwind CSS", "Framer Motion", "Zustand", "Typescript", "MongoDB", "JWT", "Redis", "Prisma"],
    iconColor: "#0891b2",
    badgeBg: "#cffafe",
    badgeBorder: "#a5f3fc",
  },
  {
    name: "Elijah Alexander Okpochini",
    role: "Mobile Engineer",
    department: "Engineering",
    image: "/images/founders/elijah.jpg",
    imagePosition: "50% 15%",
    linkedin: "https://linkedin.com/in/elijah-alexander-516649331",
    icon: FaMobileAlt,
    skills: ["React Native", "Expo",  "Deep Linking", "Push Notifications", "Redux Toolkit", "React Navigation"],
    iconColor: "#059669",
    badgeBg: "#d1fae5",
    badgeBorder: "#6ee7b7",
  },
  {
    name: "Hiring!",
    role: "AI & Automation Engineer",
    department: "Data & AI",
    image: null,
    icon: FaRobot,
    skills: [],
    iconColor: "#7c3aed",
    badgeBg: "#ede9fe",
    badgeBorder: "#ddd6fe",
  },
  {
    name: "Hiring!",
    role: "Cloud Engineer",
    department: "Infrastructure & Security",
    image: null,
    icon: FaCloud,
    skills: [],
    iconColor: "#0891b2",
    badgeBg: "#cffafe",
    badgeBorder: "#a5f3fc",
  },
  {
    name: "Elijah Alexander Okpochini",
    role: "DevOps Engineer",
    department: "Infrastructure & Security",
    image: "/images/alex.png",
    imagePosition: "50% 15%",
    linkedin: "https://linkedin.com/in/elijah-alexander-516649331",
    icon: FaCogs,
    skills: ["Vercel", "Docker", "GitHub Actions", "Firebase", "Sentry", "Supabase", "Nginx", "PM2"],
    iconColor: "#475569",
    badgeBg: "#f1f5f9",
    badgeBorder: "#cbd5e1",
  },
  {
    name: "Samson Okpochini",
    role: "Cybersecurity Engineer",
    department: "Infrastructure & Security",
    image: "/images/sir-samson.png",
    imagePosition: "50% 15%",
    linkedin: "https://linkedin.com/in/samson-okpochini-3962211b1",
    icon: FaShieldAlt,
    skills: ["Network Security", "Penetration Testing", "Vulnerability", "Firewalls", "SIEM", "Incident Response"],
    iconColor: "#dc2626",
    badgeBg: "#fee2e2",
    badgeBorder: "#fecaca",
  },
  {
    name: "Aigbomian Benedicta",
    role: "QA & Testing Engineer",
    department: "Quality & Design",
    image: "/images/bennie.jpeg",
    imagePosition: "50% 30%",
    linkedin: "https://linkedin.com/in/benedicta-aigbomian-9b8a21375",
    icon: FaClipboardCheck,
    skills: ["Selenium", "Cypress", "Jest", "Postman", "API Testing", "SQL", "Test Automation", "Git/GitHub"],
    iconColor: "#059669",
    badgeBg: "#d1fae5",
    badgeBorder: "#6ee7b7",
  },
  {
    name: "Praise Tehillah",
    role: "UI/UX Designer",
    department: "Quality & Design",
    image: "/images/tehillah.jpeg",
    imagePosition: "50% 60%",
    linkedin: "https://linkedin.com/in/praise-tehillah-5a4850212",
    icon: FaPaintBrush,
    skills: ["Figma", "Prototyping", "Design Systems", "UX Research", "HTML/CSS", "JavaScript", "Reponsive Design"],
    iconColor: "#db2777",
    badgeBg: "#fce7f3",
    badgeBorder: "#fbcfe8",
  },
  {
    name: "Onyekanna Chukwuebuka Maximos",
    role: "Project Manager",
    department: "Consulting & Delivery",
    image: "/images/ebuka1.png",
    imagePosition: "50% 6%",
    icon: FaProjectDiagram,
    skills: ["Methodologies", "Agile", "Scrum", "Kanban", "Waterfall", "Risk Management", "Stakeholder Communication"],
    iconColor: "#b45309",
    badgeBg: "#fef3c7",
    badgeBorder: "#fde68a",
  },
  {
    name: "Hiring!",
    role: "IT Support & Help Desk",
    department: "Consulting & Delivery",
    image: null,
    icon: FaHeadset,
    skills: [],
    iconColor: "#0891b2",
    badgeBg: "#cffafe",
    badgeBorder: "#a5f3fc",
  },
];

export default function TeamCards() {
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-[82rem] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
          <div>
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-3">
              Our people
            </p>
            <h2 className="text-[30px] font-serif text-[#1f3a5f]">
              Meet the engineers
            </h2>
          </div>

          <p className="max-w-md text-[13px] text-gray-500 leading-relaxed">
            The people bringing technical depth and accountability to every
            Logicsoft engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {members.map((member, index) => {
            const Icon = member.icon;

            return (
              <motion.article
                key={member.role}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative overflow-hidden bg-white border border-gray-200 hover:border-[#1f6fb2] hover:shadow-md transition-all duration-300"
              >
                <span
                  className="absolute top-0 left-0 z-10 h-[2px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-300 transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />

               <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f5] border-b border-gray-100">
                {member.image ? (
                 <img
                   src={member.image}
                   alt={member.name}
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{
                  objectPosition: member.imagePosition || "50% 50%",
               }}
                />
  ) : (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#eef4fa] to-[#dbeafe]">
              <div className="w-16 h-16 flex items-center justify-center animate-pulse">
               <img
                src="/favicon.ico"
                alt="LS"
                aria-hidden="true"
                className="w-10 h-10 object-contain"
                />
             </div>

         <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 animate-pulse">
               Open position
        </span>
      </div>
        )}

          <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.09em] text-[#1f6fb2] shadow-sm">
             {member.department}
         </span>
      </div>

                <div className="px-6 pt-5 pb-6">
                  <h3 className="text-[16px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1f6fb2]">
                    {member.role}
                  </p>

                  {member.linkedin && (
                <a
                   href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${member.name}'s LinkedIn profile`}
                  className="inline-flex items-center gap-2 mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400 hover:text-[#1f6fb2] transition-colors">
                <FaLinkedin size={15} aria-hidden="true" />
                   LinkedIn
               </a>
                   )}

                  <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-gray-100">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.06em] text-gray-400 bg-[#f9f9f9] border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                {!member.image && (
          <Link
            href={`/careers?role=${encodeURIComponent(member.role)}`}
              className="group/apply inline-flex items-center px-6 gap-2 mt-15 text-[11px] font-semibold animate-pulse uppercase tracking-[0.08em] text-[#1f6fb2] hover:text-[#163f67] transition-colors"
          >
            Apply
            <span aria-hidden="true" 
            className="transition-transform duration-200 ease-out group-hover/apply:translate-x-2"> → </span>
           </Link>
      )}

                <span
                  className="absolute bottom-0 left-1/2 h-[3px] w-0 bg-gradient-to-r from-[#1f6fb2] to-blue-400 transition-all duration-500 group-hover:left-0 group-hover:w-full"
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}