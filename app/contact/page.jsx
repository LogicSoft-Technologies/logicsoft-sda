"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactCountryFlag from "react-country-flag";
import {
  ArrowRight, Phone, Mail, MessageSquare, MapPin,
  Upload, Mic, MicOff, CheckCircle2, ChevronRight,
  Clock, Shield, Users, Zap, Globe, ChevronDown,
} from "lucide-react";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const COUNTRIES = [
  { code: "NG", dial: "+234" }, { code: "US", dial: "+1"   }, { code: "CA", dial: "+1"   },
  { code: "GB", dial: "+44"  }, { code: "DE", dial: "+49"  }, { code: "FR", dial: "+33"  },
  { code: "ES", dial: "+34"  }, { code: "IT", dial: "+39"  }, { code: "NL", dial: "+31"  },
  { code: "BE", dial: "+32"  }, { code: "CH", dial: "+41"  }, { code: "AT", dial: "+43"  },
  { code: "SE", dial: "+46"  }, { code: "NO", dial: "+47"  }, { code: "DK", dial: "+45"  },
  { code: "FI", dial: "+358" }, { code: "IE", dial: "+353" }, { code: "PT", dial: "+351" },
  { code: "GR", dial: "+30"  }, { code: "TR", dial: "+90"  }, { code: "RU", dial: "+7"   },
  { code: "AE", dial: "+971" }, { code: "SA", dial: "+966" }, { code: "IN", dial: "+91"  },
  { code: "PK", dial: "+92"  }, { code: "BD", dial: "+880" }, { code: "LK", dial: "+94"  },
  { code: "MY", dial: "+60"  }, { code: "SG", dial: "+65"  }, { code: "TH", dial: "+66"  },
  { code: "PH", dial: "+63"  }, { code: "ID", dial: "+62"  }, { code: "JP", dial: "+81"  },
  { code: "KR", dial: "+82"  }, { code: "CN", dial: "+86"  }, { code: "ZA", dial: "+27"  },
  { code: "KE", dial: "+254" }, { code: "GH", dial: "+233" }, { code: "EG", dial: "+20"  },
  { code: "AU", dial: "+61"  }, { code: "NZ", dial: "+64"  }, { code: "BR", dial: "+55"  },
  { code: "AR", dial: "+54"  }, { code: "CL", dial: "+56"  }, { code: "CO", dial: "+57"  },
  { code: "MX", dial: "+52"  }, { code: "VE", dial: "+58"  },
];

const SERVICES = [
  "Software Development", "IT Consulting", "Cybersecurity",
  "Cloud Engineering", "Data Analytics", "DevOps & Infrastructure",
  "Application Modernisation", "QA & Testing", "Other",
];

const BUDGETS = [
  "Under $10,000", "$10,000 – $50,000", "$50,000 – $150,000",
  "$150,000 – $500,000", "$500,000+", "Not yet defined",
];

const STATS = [
  { icon: Zap,    val: "24hr", label: "Response guarantee" },
  { icon: Users,  val: "20+", label: "Projects delivered"  },
  { icon: Globe,  val: "5",    label: "Continents served"   },
  { icon: Shield, val: "5+",  label: "Years of practice"   },
];

const CHANNELS = [
  {
    icon: Phone,
    label: "Call our consultants",
    value: "+234 9012 688 861",
    href: "tel:+2349012688861",
    sub: "Mon – Fri · 8am – 6pm WAT",
  },
  {
    icon: Mail,
    label: "Email our team",
    value: "contact@logicsofttechnologies.online",
    href: "mailto:contact@logicsofttechnologies.online",
    sub: "Responses within 24 hours",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp support",
    value: "Chat directly",
    href: "https://wa.me/2349012688861",
    sub: "Typically replies in minutes",
  },
];

const OFFICES = [
  {
    city: "Lekki",  country: "Nigeria",         flag: "NG",
    address: "14 Adeola Odeku Street, Victoria Island",
    phone: "+234 9012 688 861", timezone: "WAT · UTC+1", primary: true,
  },
  {
    city: "Benin", country: "Nigeria",  flag: "NG",
    address: "15 Akenzua Street, GRA",
    phone: "+234 7034302054",  timezone: "WAT · UTC+1", primary: false,
  },
  {
    city: "Abuja",  country: "Nigeria",             flag: "NG",
    address: "12 Aguiyi Ironsi Street, Maitama District",
    phone: "+234 9135257462",   timezone: "WAT · UTC+1", primary: false,
  },
];

const FAQS = [
  {
    q: "How quickly will you respond to my enquiry?",
    a: "All contact form submissions receive an initial response from a solution architect within 24 business hours. For urgent matters, we recommend calling or using WhatsApp directly.",
  },
  {
    q: "What information should I include about my project?",
    a: "The more context the better — project scope, timeline, budget range, and any technical constraints. You can also upload documentation or use voice recording. Even a rough brief is enough to get started.",
  },
  {
    q: "Do you work with startups or only enterprise clients?",
    a: "We work across the spectrum — from Series A startups to multinational corporations. Engagement size is less important than project clarity and ambition.",
  },
  {
    q: "What is the typical process after I submit a form?",
    a: "A solution architect reviews your submission and schedules a 30-minute discovery call. We then produce a scoped proposal within 5 business days — no cost, no obligation.",
  },
  {
    q: "Are your engagements fixed-price or time-and-materials?",
    a: "We default to fixed-scope, fixed-price engagements with clearly defined deliverables. This eliminates budget uncertainty and keeps both parties aligned throughout delivery.",
  },
];


function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#e8eef6]">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-center justify-between gap-4 group">
        <span className="text-[14.5px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors leading-snug">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-[#1f6fb2] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}>
            <p className="text-[13.5px] text-gray-500 leading-relaxed pb-5 max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OfficeCard({ office }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`relative border p-6 transition-all duration-200 ${office.primary ? "border-[#1f6fb2]/40 bg-[#f0f7ff]" : "border-[#e8eef6] bg-white hover:border-[#1f6fb2]/30 hover:shadow-sm"}`}>
      {office.primary && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1f6fb2]" />}
      <div className="flex items-center gap-3 mb-4">
        <ReactCountryFlag countryCode={office.flag} svg style={{ width: "28px", height: "20px" }} />
        <div>
          <p className="text-[15px] font-bold text-[#1f3a5f]">{office.city}</p>
          <p className="text-[11px] text-gray-400">{office.country}</p>
        </div>
        {office.primary && (
          <span className="ml-auto text-[9.5px] font-bold text-[#1f6fb2] border border-[#1f6fb2]/30 bg-[#e0f0ff] px-2 py-0.5 uppercase tracking-wider">HQ</span>
        )}
      </div>
      <div className="space-y-2.5">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-3.5 h-3.5 text-gray-300 mt-0.5 shrink-0" />
          <p className="text-[12.5px] text-gray-500 leading-snug">{office.address}</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-[12.5px] text-gray-500 hover:text-[#1f6fb2] transition-colors">{office.phone}</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
          <p className="text-[12px] text-gray-400">{office.timezone}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {

  
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", service: "", budget: "", message: "",
  });
  const [submitted,   setSubmitted]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fileName,    setFileName]    = useState(null);

  const [country,  setCountry]  = useState(COUNTRIES[0]);
  const [phone,    setPhone]    = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [dropPos,  setDropPos]  = useState(null);
  const triggerRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [audioUrl,  setAudioUrl]  = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const recorderRef = useRef(null);
  const streamRef   = useRef(null);
  const chunksRef   = useRef([]);
  const fileRef     = useRef(null);

  const blobRef = useRef(null);

  // Auto-detect country via IP
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const found = COUNTRIES.find((c) => c.code === d.country_code);
        if (found) setCountry(found);
      })
      .catch(() => {});
  }, []);

  // Blob animation
  useEffect(() => {
    if (!blobRef.current) return;
    try {
      import("gsap").then(({ gsap }) => {
        gsap.to(Array.from(blobRef.current.children), {
          x: 40, y: 60, duration: 28,
          ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 6,
        });
      });
    } catch {}
  }, []);

  // Phone formatting
  const handlePhone = (e) => {
    let d = e.target.value.replace(/\D/g, "");
    if (d.length > 3 && d.length <= 6) d = d.slice(0, 3) + " " + d.slice(3);
    else if (d.length > 6) d = d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6, 10);
    setPhone(d);
  };

  // Country dropdown
  const toggleDrop = () => {
    if (!dropOpen && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + window.scrollY, left: r.left + window.scrollX, width: r.width });
    }
    setDropOpen(!dropOpen);
  };

  // Voice recording
  const handleVoice = async () => {
    if (recording) {
      recorderRef.current.stop();
      streamRef.current.getTracks().forEach((t) => t.stop());
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };
      recorder.start();
      setRecording(true);
    } catch {
      alert("Microphone access denied. Please allow microphone permissions.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const fd = new FormData();

      fd.append("name",    formData.name);
      fd.append("company", formData.company);
      fd.append("email",   formData.email);
      fd.append("service", formData.service);
      fd.append("budget",  formData.budget);
      fd.append("message", formData.message);
      fd.append("phone",   phone ? `${country.dial} ${phone}` : "");
      fd.append("country", country.code);

      if (audioBlob) {
        fd.append("voiceNote", audioBlob, "voice-briefing.webm");
      }

      const files = fileRef.current?.files ?? [];
      for (const file of files) {
        fd.append("attachments", file, file.name);
      }

      const res  = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        body: fd,
       
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setSubmitError(json.error || "Submission failed. Please try again.");
        return;
      }

      setSubmitted(true);

    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData((p) => ({ ...p, [key]: e.target.value })),
  });

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", company: "", email: "", service: "", budget: "", message: "" });
    setPhone("");
    setAudioUrl(null);
    setAudioBlob(null);
    setFileName(null);
    setSubmitError(null);
  };


  return (
    <div className="min-h-screen bg-white pt-[80px]">

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden border-b border-[#1a3258]"
        style={{ background: "linear-gradient(145deg, #050c18 0%, #0a1e38 45%, #0d2448 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div ref={blobRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-[#1f6fb2]/10 blur-[140px]" />
          <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-[#0d3a6e]/20 blur-[120px]" />
          <div className="absolute -bottom-20 left-1/3 w-[480px] h-[480px] rounded-full bg-[#1a3258]/25 blur-[130px]" />
        </div>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, transparent 0%, transparent 49.5%, rgba(31,111,178,0.08) 49.5%, rgba(31,111,178,0.08) 50.5%, transparent 50.5%)" }} />

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <nav className="flex items-center gap-1.5 pt-10 pb-0 text-[11.5px] text-white/30">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55 font-medium">Contact</span>
          </nav>
          <div className="py-14 lg:py-18 grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 border border-[#1f6fb2]/40 bg-[#1f6fb2]/10 px-3 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1f6fb2] animate-pulse" />
                <span className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.18em] font-mono">Enterprise Enquiries</span>
              </div>
              <h1 className="text-[42px] lg:text-[60px] font-serif text-white leading-[1.04] mb-5">
                Let&rsquo;s Build<br /><span className="text-[#1f6fb2]">Something</span> Together
              </h1>
              <p className="text-[16px] text-white/50 leading-[1.95] max-w-[520px]">
                Whether you have a defined brief or an open challenge our solution architects will listen, scope, and propose a path forward. No sales pressure. No commitment required.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.2 }} className="grid grid-cols-2 gap-2 min-w-[280px]">
              {STATS.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.07 }} className="border border-white/8 bg-white/[0.03] px-5 py-4">
                  <s.icon className="w-4 h-4 text-[#1f6fb2] mb-2" />
                  <p className="text-[26px] font-light text-white leading-none mb-1">{s.val}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CHANNELS STRIP ══*/}
      <div className="bg-[#f5f8fc] border-b border-[#dce8f5]">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#dce8f5]">
            {CHANNELS.map((ch, i) => (
              <motion.a key={i} href={ch.href} target={ch.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group flex items-center gap-4 px-8 py-5 hover:bg-white transition-colors duration-200">
                <div className="w-10 h-10 flex items-center justify-center border border-[#dce8f5] bg-white group-hover:border-[#1f6fb2]/30 group-hover:bg-[#f0f7ff] transition-all duration-200 shrink-0">
                  <ch.icon className="text-[#1f6fb2]" style={{ width: 18, height: 18 }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors truncate">{ch.label}</p>
                  <p className="text-[11.5px] text-gray-500 truncate">{ch.value}</p>
                  <p className="text-[10.5px] text-gray-400 mt-0.5">{ch.sub}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-[#1f6fb2] group-hover:translate-x-1 transition-all duration-200 ml-auto shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FORM + SIDEBAR ═══ */}
      <section className="relative bg-[#f5f8fc] py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[160px]" />
          <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full bg-indigo-300/8 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-[82rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

            {/* Form card */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#e8eef6] shadow-sm p-16 text-center">
                  <div className="w-16 h-16 bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                  </div>
                  <h2 className="text-[26px] font-serif text-[#1f3a5f] mb-3">Submission received</h2>
                  <p className="text-[14px] text-gray-500 leading-relaxed max-w-sm mx-auto mb-8">
                    A LogicSoft solution architect will review your brief and respond within 24 business hours. Check your inbox — and your spam folder, just in case.
                  </p>
                  <button onClick={resetForm} className="text-[13px] font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors">
                    ← Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                  className="bg-white border border-[#e8eef6] shadow-sm overflow-hidden">

                  {/* Form header */}
                  <div className="relative px-8 pt-8 pb-7 border-b border-[#e8eef6] overflow-hidden"
                    style={{ background: "linear-gradient(145deg, #f8fbff, #ffffff)" }}>
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                      style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.15em] mb-2">Schedule a consultation</p>
                        <h2 className="text-[24px] font-serif text-[#1f3a5f] mb-1.5">Tell us about your project</h2>
                        <p className="text-[13px] text-gray-500 leading-relaxed">Our solution architects respond within 24 hours. All engagements begin with a free scoping call.</p>
                      </div>
                      <div className="shrink-0 flex flex-col items-center gap-1 border border-[#e8eef6] bg-white px-3 py-2.5 text-center">
                        <Shield className="w-5 h-5 text-[#1f6fb2]" />
                        <p className="text-[8.5px] font-bold text-[#1f3a5f] uppercase tracking-wider leading-tight">SSL<br />Secured</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">

                    {/* Name + Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="ls-label">Full name <span className="text-red-400">*</span></label>
                        <input required {...field("name")} placeholder="Your full name" className="ls-input" />
                      </div>
                      <div>
                        <label className="ls-label">Company name</label>
                        <input {...field("company")} placeholder="Organisation or company" className="ls-input" />
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="ls-label">Business email <span className="text-red-400">*</span></label>
                        <input required type="email" {...field("email")} placeholder="name@company.com" className="ls-input" />
                      </div>
                      <div>
                        <label className="ls-label">Phone number</label>
                        <div ref={triggerRef} className="flex items-center border border-[#d1d5db] bg-white hover:border-[#1f6fb2] focus-within:border-[#1f6fb2] focus-within:ring-1 focus-within:ring-[#1f6fb2]/20 transition-all duration-150">
                          <button type="button" onClick={toggleDrop}
                            className="flex items-center gap-2 px-3 py-3 border-r border-[#e5e7eb] hover:bg-[#f8fafc] transition-colors shrink-0">
                            <ReactCountryFlag countryCode={country.code} svg style={{ width: "20px", height: "14px" }} />
                            <span className="text-[12.5px] text-gray-600">{country.dial}</span>
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                          </button>
                          <input type="text" value={phone} onChange={handlePhone} placeholder="000 000 0000"
                            className="flex-1 px-3 py-3 text-[13.5px] outline-none bg-transparent placeholder-gray-400" />
                        </div>
                      </div>
                    </div>

                    {/* Service + Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="ls-label">Service of interest</label>
                        <div className="relative">
                          <select {...field("service")} className="ls-input appearance-none pr-8 cursor-pointer">
                            <option value="">Select a service…</option>
                            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="ls-label">Estimated budget</label>
                        <div className="relative">
                          <select {...field("budget")} className="ls-input appearance-none pr-8 cursor-pointer">
                            <option value="">Select a range…</option>
                            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Message + voice button */}
                    <div>
                      <label className="ls-label">Project brief <span className="text-red-400">*</span></label>
                      <div className="relative">
                        <textarea required rows={5} {...field("message")} disabled={recording}
                          placeholder={recording ? "Recording your voice briefing…" : "Describe your project requirements, challenges, or questions…"}
                          className={`ls-input resize-none ${recording ? "border-red-400 bg-red-50/40 placeholder-red-400" : ""}`}
                        />
                        {recording && (
                          <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[11px] text-red-500 font-semibold">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            Recording voice briefing…
                          </div>
                        )}
                        <button type="button" onClick={handleVoice}
                          title={recording ? "Stop recording" : "Record a voice briefing"}
                          className={`absolute right-3 bottom-3 p-1.5 border transition-all duration-150 ${recording ? "border-red-300 bg-red-50 scale-110" : "border-[#e5e7eb] bg-white hover:border-[#1f6fb2] hover:bg-[#f0f7ff]"}`}>
                          {recording ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4 text-gray-400" />}
                        </button>
                      </div>
                      {audioUrl && <audio controls src={audioUrl} className="mt-2 w-full h-9" />}
                    </div>

                    {/* File upload */}
                    <div>
                      <label htmlFor="file-upload"
                        className="flex items-center gap-3 px-4 py-3.5 border border-dashed border-[#d1d5db] bg-[#f8fafc] hover:border-[#1f6fb2] hover:bg-[#f0f7ff] cursor-pointer transition-all duration-150 group">
                        <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#1f6fb2] transition-colors shrink-0" />
                        <span className="text-[13px] text-gray-500 group-hover:text-[#1f3a5f] transition-colors">
                          {fileName
                            ? <span className="font-semibold text-[#1f6fb2]">{fileName}</span>
                            : <>Upload documentation, diagrams, or specs <span className="text-[#1f6fb2] font-semibold">Browse files</span></>
                          }
                        </span>
                        <span className="ml-auto text-[10.5px] text-gray-400 shrink-0">Max 10MB</span>
                      </label>
                      <input id="file-upload" ref={fileRef} type="file" multiple className="hidden"
                        onChange={(e) => setFileName(
                          e.target.files.length > 1
                            ? `${e.target.files.length} files selected`
                            : e.target.files[0]?.name || null
                        )} />
                    </div>

                    {/* Error message */}
                    {submitError && (
                      <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200">
                        <span className="text-red-500 text-sm shrink-0 mt-0.5">⚠</span>
                        <p className="text-[12.5px] text-red-700 leading-relaxed">{submitError}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                      <p className="text-[11.5px] text-gray-400 leading-relaxed max-w-xs">
                        By submitting you agree to our{" "}
                        <Link href="/privacy" className="text-[#1f6fb2] hover:underline">Privacy Policy</Link>.
                        We never share your data.
                      </p>
                      <button type="submit" disabled={submitting}
                        className="relative flex items-center gap-2.5 px-8 py-3 font-bold text-white text-[13.5px] transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #7A2E00 0%, #C45500 50%, #FF7A00 100%)", boxShadow: "0 6px 24px rgba(196,85,0,0.35)" }}>
                        <span className="absolute inset-0 opacity-20 pointer-events-none"
                          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)", animation: "ls-shimmer 2.5s infinite" }} />
                        {submitting
                          ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
                          : <>Request consultation<ArrowRight className="w-4 h-4" /></>
                        }
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className="space-y-5 lg:sticky lg:top-24">
              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
                className="border border-[#bfdbfe] bg-[#eff6ff] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#1f6fb2] flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-white" /></div>
                  <p className="text-[13.5px] font-bold text-[#1f3a5f]">24-hour response</p>
                </div>
                <p className="text-[12.5px] text-gray-500 leading-relaxed">Every enquiry is reviewed by a solution architect — not an SDR — and responded to within one business day.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.08 }}
                className="border border-[#e8eef6] bg-white p-5">
                <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.14em] mb-4">What happens next</p>
                <div className="space-y-4">
                  {[
                    { n: "1", t: "Review",         b: "A solution architect reads your brief and researches your context." },
                    { n: "2", t: "Discovery call", b: "30-minute call to align on scope, timeline, and approach." },
                    { n: "3", t: "Proposal",       b: "Scoped proposal with deliverables and pricing within 5 days." },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-3">
                      <div className="w-6 h-6 bg-[#1f6fb2] flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5">{s.n}</div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#1f3a5f]">{s.t}</p>
                        <p className="text-[12px] text-gray-500 leading-snug">{s.b}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.14 }}
                className="border border-[#e8eef6] bg-white divide-y divide-[#f1f5f9]">
                <a href="mailto:contact@logicsofttechnologies.online.ng" className="flex items-center gap-3 p-4 group hover:bg-[#f8fafc] transition-colors">
                  <div className="w-8 h-8 bg-[#f0f7ff] border border-[#dce8f5] flex items-center justify-center shrink-0 group-hover:bg-[#1f6fb2] group-hover:border-[#1f6fb2] transition-all">
                    <Mail className="w-3.5 h-3.5 text-[#1f6fb2] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">Media & press enquiries</p>
                    <p className="text-[11px] text-gray-400">contact@logicsofttechnologies.online</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-[#1f6fb2] ml-auto transition-all group-hover:translate-x-0.5" />
                </a>
                <Link href="/careers" className="flex items-center gap-3 p-4 group hover:bg-[#f8fafc] transition-colors">
                  <div className="w-8 h-8 bg-[#f0f7ff] border border-[#dce8f5] flex items-center justify-center shrink-0 group-hover:bg-[#1f6fb2] group-hover:border-[#1f6fb2] transition-all">
                    <Users className="w-3.5 h-3.5 text-[#1f6fb2] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[12.5px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">Careers at LogicSoft</p>
                    <p className="text-[11px] text-gray-400">Submit your CV</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-200 group-hover:text-[#1f6fb2] ml-auto transition-all group-hover:translate-x-0.5" />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.18 }}
                className="border border-[#e8eef6] bg-white p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.14em] mb-3">Standards & certifications</p>
                <div className="flex flex-wrap gap-2">
                  {["ISO 27001", "GDPR", "NDPR", "OWASP", "PCI DSS", "SOC 2"].map((c) => (
                    <span key={c} className="text-[10px] font-bold text-[#1f3a5f] border border-[#e8eef6] bg-[#f8fafc] px-2.5 py-1">{c}</span>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ OFFICES ══ */}
      <section className="bg-white border-t border-[#e8eef6] py-16">
        <div className="max-w-[82rem] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-2">Where we are</p>
            <h2 className="text-[28px] font-serif text-[#1f3a5f]">Our offices</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OFFICES.map((o) => <OfficeCard key={o.city} office={o} />)}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="bg-[#f5f8fc] border-t border-[#e8eef6] py-16">
        <div className="max-w-[82rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-16">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[10.5px] font-bold text-[#1f6fb2] uppercase tracking-[0.16em] mb-3">Common questions</p>
              <h2 className="text-[28px] font-serif text-[#1f3a5f] mb-4">Before you reach out</h2>
              <p className="text-[13.5px] text-gray-500 leading-relaxed">Answers to the questions we hear most often. Still not sure? Just ask.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═ */}
      <section className="relative overflow-hidden border-t border-[#1a3258]"
        style={{ background: "linear-gradient(160deg, #07111f 0%, #0d2448 60%, #0a1830 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#1f6fb2]/8 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-[82rem] mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-[10.5px] font-bold text-[#60a8dc] uppercase tracking-[0.16em] mb-3 font-mono">No obligation · No lock-in</p>
            <h2 className="text-[28px] font-serif font-normal text-white mb-2">Ready when you are.</h2>
            <p className="text-[14px] text-white/45 max-w-lg leading-relaxed">Start with a conversation. We&rsquo;ll scope the work, provide a proposal, and you decide if it&rsquo;s the right fit — zero pressure.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="#form" onClick={(e) => { e.preventDefault(); document.querySelector("form")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-bold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #7A2E00, #C45500 50%, #FF7A00)", boxShadow: "0 6px 24px rgba(196,85,0,0.4)" }}>
              Start a conversation <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/software-development/services"
              className="inline-flex items-center gap-2.5 px-8 py-4 text-[13.5px] font-semibold border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all duration-200">
              Explore our services
            </Link>
          </div>
        </div>
      </section>

      {/* Country dropdown portal */}
      {dropOpen && typeof window !== "undefined" && dropPos &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setDropOpen(false)} />
            <div style={{ position: "absolute", top: dropPos.top, left: dropPos.left, width: Math.max(dropPos.width, 200), zIndex: 9999 }}
              className="bg-white border border-[#e5e7eb] shadow-xl max-h-60 overflow-y-auto">
              {COUNTRIES.map((c) => (
                <div key={c.code} onClick={() => { setCountry(c); setDropOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-2.5 hover:bg-[#f5f9ff] cursor-pointer transition-colors ${country.code === c.code ? "bg-[#eff6ff]" : ""}`}>
                  <ReactCountryFlag countryCode={c.code} svg style={{ width: "20px", height: "14px" }} />
                  <span className="text-[12.5px] text-gray-700">{c.dial}</span>
                  <span className="text-[11px] text-gray-400 ml-auto">{c.code}</span>
                </div>
              ))}
            </div>
          </>,
          document.getElementById("dropdown-root") || document.body,
        )
      }

      <style jsx global>{`
        .ls-label { display:block; font-size:11.5px; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }
        .ls-input { width:100%; border:1px solid #d1d5db; padding:11px 14px; font-size:13.5px; color:#1f2937; background:#fff; outline:none; transition:border-color .15s,box-shadow .15s; border-radius:0; font-family:inherit; }
        .ls-input:focus { border-color:#1f6fb2; box-shadow:0 0 0 3px rgba(31,111,178,0.1); }
        .ls-input::placeholder { color:#9ca3af; }
        .ls-input:disabled { background:#fef2f2; border-color:#fca5a5; }
        @keyframes ls-shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
      `}</style>
    </div>
  );
}