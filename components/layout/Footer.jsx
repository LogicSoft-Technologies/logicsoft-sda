"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const footerLinks = {
  Company: [
    { label: "About LogicSoft",   href: "/about/about-company"   },
    { label: "Our Journey",       href: "/about/our-journey"     },
    { label: "Leadership",        href: "/about/leadership"      },
    { label: "Portfolio",         href: "/portfolio"             },
    { label: "Client Reviews",    href: "/about/client-review"   },
  ],
  Services: [
    { label: "Full Stack Development",  href: "/services/web-development/full-stack"        },
    { label: "Cross Platform Apps",     href: "/services/mobile-apps/cross-platform"        },
    { label: "Cyber Security",          href: "/services/security/cyber-security"           },
    { label: "Cloud Engineering",       href: "/services/other-services/cloud-engineering"  },
    { label: "DevOps Services",         href: "/services/other-services/devops"             },
  ],
  Industries: [
    { label: "Banking & FinTech",  href: "/industries/banking"       },
    { label: "Healthcare",         href: "/industries/healthcare"    },
    { label: "Real Estate",        href: "/industries/real-estate"   },
    { label: "Retail",             href: "/industries/retail"        },
    { label: "Manufacturing",      href: "/industries/manufacturing" },
  ],
};

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use",   href: "/terms"          },
  { label: "Legal",          href: "/legal"          },
  { label: "Sitemap",        href: "/sitemap"        },
];

export default function Footer() {
  const [email,       setEmail]       = useState("");
  const [status,      setStatus]      = useState(null); // null | "loading" | "success" | "error" | "duplicate"
  const [errorMsg,    setErrorMsg]    = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res  = await fetch(`${BACKEND_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        setErrorMsg(json.error || "Subscription failed. Please try again.");
        setStatus(res.status === 409 ? "duplicate" : "error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubscribe();
  };

  return (
    <footer className="bg-white border-t border-gray-200">

      {/* ── Newsletter strip ── */}
      <div className="bg-[#f5f5f5] border-b border-gray-200">
        <div className="max-w-[82rem] mx-auto px-6 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">

          <div className="max-w-xl">
            <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
              Stay informed
            </p>
            <h3 className="text-[28px] lg:text-[32px] font-serif text-[#1f3a5f] leading-tight mb-4">
              Technology insights from Logicsoft Technologies
            </h3>
            <p className="text-[15px] text-gray-600 leading-[1.85] mb-8">
              Receive curated updates on software engineering, digital
              transformation, and enterprise innovation strategies.
            </p>

            {status === "success" ? (
              <div className="flex items-center gap-3 px-5 py-4 bg-[#f0fdf4] border border-[#bbf7d0] max-w-lg">
                <svg className="w-5 h-5 text-[#22c55e] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[13.5px] font-semibold text-[#15803d]">
                  You're subscribed! Check your inbox for a welcome email.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus(null); setErrorMsg(""); }}
                    onKeyDown={handleKey}
                    placeholder="Enter your business email"
                    disabled={status === "loading"}
                    className={`flex-1 border bg-white px-4 py-2.5 text-[13.5px] outline-none focus:border-[#1f6fb2] focus:ring-1 focus:ring-[#1f6fb2]/20 transition-all duration-200 placeholder:text-gray-400 disabled:opacity-60 ${
                      status === "error" || status === "duplicate" ? "border-red-300" : "border-gray-200"
                    }`}
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={status === "loading" || !email.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 text-[13.5px] font-semibold text-white
                      bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00]
                      hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]
                      ring-1 ring-inset ring-white/30 transition-all duration-200 whitespace-nowrap
                      disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Subscribing…</>
                    ) : (
                      <>Subscribe <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
                {(status === "error" || status === "duplicate") && (
                  <p className="text-[12px] text-red-500 mt-2">{errorMsg}</p>
                )}
              </>
            )}

            <p className="text-[12px] text-gray-400 mt-3">
              You may unsubscribe at any time.{" "}
              <Link href="/privacy-policy" className="text-[#1f6fb2] hover:underline underline-offset-2">
                View our Privacy Policy.
              </Link>
            </p>
          </div>

          <div className="shrink-0 hidden lg:block">
            <img src="/images/welcome.svg" alt="" aria-hidden="true" className="w-72 h-auto object-contain opacity-80" />
          </div>
        </div>
      </div>

      {/* ── Main footer links ── */}
      <div className="max-w-[82rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-12">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-semibold text-[#1f3a5f] mb-4 tracking-wide">
              Logicsoft Technologies
            </h4>
            <p className="text-[14.5px] text-gray-500 leading-[1.9] max-w-sm mb-8">
              A software development and consulting company delivering
              high-performance web, mobile, and enterprise solutions. We partner
              with startups, FinTech firms, SaaS businesses, and enterprises to
              build scalable digital products engineered for long-term success.
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+2349012688861" className="flex items-center gap-2.5 text-[13.5px] text-gray-500 hover:text-[#1f6fb2] transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 text-[#1f6fb2] shrink-0" />
                  +234 9012 688 861
                </a>
              </li>
              <li>
                <a href="mailto:contact@logicsofttechnologies.online" className="flex items-center gap-2.5 text-[13.5px] text-gray-500 hover:text-[#1f6fb2] transition-colors duration-200">
                  <Mail className="w-3.5 h-3.5 text-[#1f6fb2] shrink-0" />
                  contact@logicsofttechnologies.online
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[13.5px] text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-[#1f6fb2] shrink-0" />
                Lagos, Nigeria
              </li>
            </ul>
          </div>

          {/* Nav columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h5 className="text-[13.5px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-5">
                {heading}
              </h5>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-[13.5px] text-gray-600 hover:text-[#1f6fb2] transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-100 bg-[#f5f5f5]">
        <div className="max-w-[82rem] mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[13.5px] text-gray-400">
          <p>© {new Date().getFullYear()} Logicsoft Technologies. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map(({ label, href }) => (
              <Link key={label} href={href} className="hover:text-[#1f6fb2] transition-colors duration-200">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}