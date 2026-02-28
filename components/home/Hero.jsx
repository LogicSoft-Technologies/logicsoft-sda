"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ThreeHeroBackground from "@/components/shared/ThreeHeroBackground";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import HeroColorMood from "@/components/shared/HeroColorMood";

const INDUSTRIES = [
  { label: "FinTech & Banking", image: "/images/fintech.png", cta: "Our FinTech & Banking portfolio →", link: "/portfolio/fintech" },
  { label: "Real Estate & Investment", image: "/images/real-estate.png", cta: "Our Real Estate & Investment portfolio →", link: "/portfolio/real-estate" },
  { label: "E-commerce Marketing", image: "/images/e-commerce.png", cta: "Our E-commerce Marketing portfolio →", link: "/portfolio/ecommerce" },
  { label: "Broker Platforms", image: "/images/trading.png", cta: "Our Broker Platforms portfolio →", link: "/portfolio/trading" },
  { label: "Enterprise & SaaS Businesses", image: "/images/saas.png", cta: "Our Enterprise & SaaS portfolio →", link: "/portfolio/saas" },
];

export default function Hero() {
  const spiralRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const blob1 = useRef(null);
  const blob2 = useRef(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    };
    const handleScroll = () => setScroll(window.scrollY || window.pageYOffset);

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex((prev) => (prev + 1) % INDUSTRIES.length), 7000);
    return () => clearInterval(interval);
  }, []);

  const spiralStyle = {
    transform: `translate(${mouse.x * 12}px, ${mouse.y * 12 + scroll * 0.02}px)`,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(paragraphRef.current, { y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });

      if (blob1.current && blob2.current) {
        gsap.to(blob1.current, { x: 180, y: 100, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(blob2.current, { x: -180, y: -120, duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-wrapper relative min-h-screen overflow-hidden pt-6 bg-[#f5f5f5]">

      <HeroColorMood activeIndex={activeIndex} />
      <div ref={blob1} className="absolute top-10 left-10 w-[450px] h-[450px] bg-blue-400/20 blur-[160px] rounded-full pointer-events-none" />
      <div ref={blob2} className="absolute bottom-10 right-10 w-[520px] h-[520px] bg-indigo-500/18 blur-[180px] rounded-full pointer-events-none" />

      <div className="hero-gradient-layer z-0" />
      <ThreeHeroBackground activeIndex={activeIndex} />
      <div ref={spiralRef} className="hero-spiral-layer" style={spiralStyle} />

      {/* Main Content */}
      <div className="relative z-10 max-w-[82rem] mx-auto px-6 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-[3.5rem] items-center w-full">

          {/* LEFT */}
          <div className="relative">
            <h1
              ref={titleRef}
              className="text-[30px] lg:text-[42px] font-serif leading-tight  text-[#1f3a5f]"
            >
              Software Consulting <br /> and Devlopment
            </h1>

            <p
              ref={paragraphRef}
              className="mt-4 text-[17px] max-w-xl text-gray-700 leading-relaxed"
            >
              Delivering scalable, secure, and enterprise-grade digital solutions for startups and global organizations.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {INDUSTRIES.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.label}
                    className={`
                      px-4 py-2.5 text-[13.5px] font-medium border transition-all
                      ${isActive
                        ? "bg-[#1f6fb2] border-[#1f6fb2] text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
                      }
                    `}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative p-6 rounded-md overflow-hidden bg-white border border-gray-200 shadow-sm">
              <div className="relative w-full aspect-[17/9]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={INDUSTRIES[activeIndex].image}
                      alt={INDUSTRIES[activeIndex].label}
                      fill
                      className="object-cover rounded-md"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + INDUSTRIES.length) % INDUSTRIES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 transition"
              >
                ‹
              </button>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % INDUSTRIES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded border border-gray-300 bg-white hover:bg-gray-50 transition"
              >
                ›
              </button>
            </div>
          </div>

        </div>
      </div>

      <a
        href={INDUSTRIES[activeIndex].link}
        className="absolute bottom-14 right-14 text-[#1f6fb2] hover:text-[#1f3a5f] font-medium text-[14px] transition-all"
      >
        {INDUSTRIES[activeIndex].cta}
      </a>
    </section>
  );
}