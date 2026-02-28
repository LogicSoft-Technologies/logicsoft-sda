"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MessageCircle, Headphones } from "lucide-react";

const contacts = [
  { icon: Phone,         label: "+234 9012 688 861",        href: "tel:+2349012688861",           hoverClass: "hover:text-[#1f6fb2]"  },
  { icon: Mail,          label: "contact@logicsoft.com",    href: "mailto:contact@logicsoft.com", hoverClass: "hover:text-[#1f6fb2]"  },
  { icon: MessageCircle, label: "WhatsApp",                 href: "https://wa.me/2349012688861",  hoverClass: "hover:text-green-600", external: true },
  { icon: Headphones,    label: "Live chat",                href: "#",                            hoverClass: "hover:text-[#1f6fb2]"  },
];

export default function Discuss() {
  return (
    <section
      id="discuss"
      aria-labelledby="discuss-heading"
      className="py-20 bg-[#1f3a5f] border-t border-[#162d4a]"
    >
      <div className="max-w-[82rem] mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_280px] gap-12 items-center">

          {/* ── Left — CTA ── */}
          <div>
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-5">
              Let's talk
            </p>
            <h2
              id="discuss-heading"
              className="text-[32px] lg:text-[42px] font-serif font-normal text-white leading-[1.2] mb-8"
            >
              Have a project in mind?<br />
              Let's discuss how we can<br />
              <span className="text-[#1f6fb2]">make it a success.</span>
            </h2>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-[13.5px] font-semibold text-white
                bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                ring-1 ring-inset ring-white/30 transition-all duration-200"
            >
              Discuss my needs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── Right — contact links ── */}
          <div className="border-l border-white/10 pl-10">
            <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.12em] mb-6">
              Or reach us directly
            </p>
            <ul className="flex flex-col gap-4">
              {contacts.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={i}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-3 text-[14px] text-white/60 transition-colors duration-200 ${c.hoverClass}`}
                    >
                      <div className="w-8 h-8 border border-white/15 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      {c.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}