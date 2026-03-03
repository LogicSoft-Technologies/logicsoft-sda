"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactCountryFlag from "react-country-flag";
import {
  Phone, Mail, MessageSquare, MonitorSmartphone,
  Upload, Mic, MicOff, ChevronDown,
  CheckCircle2, Shield, ArrowRight, Users,
  Newspaper, Briefcase,
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

const CHANNELS = [
  {
    icon: Phone,
    label: "Call our consultants",
    sub: "Mon – Fri · 8am – 6pm WAT",
    href: "tel:+2349012688861",
    hoverColor: "#1f6fb2",
  },
  {
    icon: Mail,
    label: "Email our team",
    sub: "contact@logicsoft.ng",
    href: "mailto:contact@logicsoft.ng",
    hoverColor: "#1f6fb2",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp support",
    sub: "Typically replies in minutes",
    href: "https://wa.me/2349012688861",
    hoverColor: "#25D366",
  },
  {
    icon: MonitorSmartphone,
    label: "Live enterprise chat",
    sub: "Available on this page",
    href: null,
    hoverColor: "#7c3aed",
  },
];


export default function ContactSection() {

  const bgRef = useRef(null);
  useEffect(() => {
    if (!bgRef.current) return;
    import("gsap").then(({ gsap }) => {
      gsap.to(Array.from(bgRef.current.children), {
        x: 40, y: 60, duration: 28,
        ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 6,
      });
    }).catch(() => {});
  }, []);


  const [formData, setFormData]     = useState({ name: "", company: "", email: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fileName, setFileName]     = useState(null);

  const [country, setCountry]   = useState(COUNTRIES[0]);
  const [phone, setPhone]       = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [dropPos, setDropPos]   = useState(null);
  const triggerRef              = useRef(null);

  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl]   = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);  
  const recorderRef               = useRef(null);
  const streamRef                 = useRef(null);
  const chunksRef                 = useRef([]);

 
  const fileRef = useRef(null); 

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        const found = COUNTRIES.find((c) => c.code === d.country_code);
        if (found) setCountry(found);
      })
      .catch(() => {});
  }, []);

  const handlePhone = (e) => {
    let d = e.target.value.replace(/\D/g, "");
    if (d.length > 3 && d.length <= 6)  d = d.slice(0, 3) + " " + d.slice(3);
    else if (d.length > 6)              d = d.slice(0, 3) + " " + d.slice(3, 6) + " " + d.slice(6, 10);
    setPhone(d);
  };

  const openDrop = () => {
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setDropPos({ top: r.bottom + window.scrollY, left: r.left + window.scrollX, width: Math.max(r.width, 200) });
    }
    setDropOpen(true);
  };

  const handleVoice = async () => {
    if (recording) {
      recorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
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
      alert("Microphone access denied. Please allow microphone permissions and try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const fd = new FormData();

      // Text fields
      fd.append("name",    formData.name);
      fd.append("company", formData.company);
      fd.append("email",   formData.email);
      fd.append("service", formData.service);
      fd.append("budget",  formData.budget);
      fd.append("message", formData.message);
      fd.append("phone",   phone ? `${country.dial} ${phone}` : "");
      fd.append("country", country.code);

      // Voice note blob
      if (audioBlob) {
        fd.append("voiceNote", audioBlob, "voice-briefing.webm");
      }

      // File attachments
      const files = fileRef.current?.files ?? [];
      for (const file of files) {
        fd.append("attachments", file, file.name);
      }

      const res  = await fetch(`${BACKEND_URL}/api/contact`, { method: "POST", body: fd });
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

  // ── Helpers -- //
  const field = (key) => ({
    value: formData[key],
    onChange: (e) => setFormData((prev) => ({ ...prev, [key]: e.target.value })),
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
    <section className="relative py-16 bg-[#f5f8fc] overflow-hidden">

      {/* Ambient blobs */}
      <div ref={bgRef} className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-blue-400/15 blur-[160px]" />
        <div className="absolute top-1/4 -right-48 w-[620px] h-[620px] rounded-full bg-indigo-400/15 blur-[170px]" />
        <div className="absolute bottom-[-300px] left-1/3 w-[560px] h-[560px] rounded-full bg-sky-300/15 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[82rem] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden shadow-lg">

         
          <div className="lg:col-span-2 bg-white">

            {/* Form header */}
            <div className="relative px-8 pt-8 pb-7 border-b border-[#e8eef6] overflow-hidden"
              style={{ background: "linear-gradient(145deg, #f8fbff, #ffffff)" }}>
              <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #1f6fb2 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[22px] font-bold text-gray-900 pb-1">Schedule a Consultation</h2>
                  <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                    Tell us about your project. Our solution architects respond within 24 hours.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-center gap-1 border border-[#e8eef6] bg-white px-3 py-2.5 text-center">
                  <Shield className="w-5 h-5 text-[#1f6fb2]" />
                  <p className="text-[8.5px] font-bold text-[#1f3a5f] uppercase tracking-wider leading-tight">SSL<br />Secured</p>
                </div>
              </div>
            </div>

            {/* Form / Success */}
            <AnimatePresence mode="wait">

              {/* ── SUCCESS ── */}
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="px-8 py-16 text-center">
                  <div className="w-16 h-16 bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1f3a5f] mb-2">Submission received</h3>
                  <p className="text-[13.5px] text-gray-500 leading-relaxed max-w-sm mx-auto mb-6">
                    A LogicSoft solution architect will review your brief and respond within 24 business hours. Check your inbox and spam folder, just in case.
                  </p>
                  <button onClick={resetForm} className="text-[13px] font-semibold text-[#1f6fb2] hover:text-[#1f3a5f] transition-colors">
                    ← Submit another enquiry
                  </button>
                </motion.div>

              ) : (

                /* ── FORM ── */
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-8 py-7 space-y-5">

                  {/* Message + voice */}
                  <div>
                    <label className="cs-label">Project brief <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <textarea required rows={4} {...field("message")} disabled={recording}
                        placeholder={recording ? "Recording your voice briefing…" : "Describe your project requirements, challenges, or questions…"}
                        className={`cs-input resize-none ${recording ? "border-red-400 bg-red-50/50 placeholder-red-400" : ""}`}
                      />
                      {recording && (
                        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-[11px] text-red-500 font-semibold pointer-events-none">
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

                  <div>
                    <label htmlFor="cs-file-upload"
                      className="flex items-center gap-3 px-4 py-3 border border-dashed border-[#d1d5db] bg-[#f8fafc] hover:border-[#1f6fb2] hover:bg-[#f0f7ff] cursor-pointer transition-all duration-150 group">
                      <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#1f6fb2] transition-colors shrink-0" />
                      <span className="text-[13px] text-gray-500 group-hover:text-[#1f3a5f] transition-colors">
                        {fileName
                          ? <span className="font-semibold text-[#1f6fb2]">{fileName}</span>
                          : <>Upload documentation, diagrams, or specs <span className="text-[#1f6fb2] font-semibold">Browse files</span></>
                        }
                      </span>
                      <span className="ml-auto text-[10.5px] text-gray-400 shrink-0">Max 10MB</span>
                    </label>
                    <input
                      id="cs-file-upload"
                      ref={fileRef}  
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (!e.target.files.length) return;
                        setFileName(
                          e.target.files.length > 1
                            ? `${e.target.files.length} files selected`
                            : e.target.files[0]?.name
                        );
                      }}
                    />
                  </div>

                  {/* Name + Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="cs-label">Full name <span className="text-red-400">*</span></label>
                      <input required {...field("name")} placeholder="Your full name" className="cs-input" />
                    </div>
                    <div>
                      <label className="cs-label">Company name</label>
                      <input {...field("company")} placeholder="Organisation or company" className="cs-input" />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="cs-label">Business email <span className="text-red-400">*</span></label>
                      <input required type="email" {...field("email")} placeholder="name@company.com" className="cs-input" />
                    </div>
                    <div>
                      <label className="cs-label">Phone number</label>
                      <div className="flex items-center border border-gray-300 bg-white hover:border-[#1f6fb2] focus-within:border-[#1f6fb2] focus-within:ring-1 focus-within:ring-[#1f6fb2]/20 transition-all duration-150">
                        <button type="button" ref={triggerRef} onClick={openDrop}
                          className="flex items-center gap-2 px-3 py-[11px] border-r border-gray-200 hover:bg-[#f8fafc] transition-colors shrink-0">
                          <ReactCountryFlag countryCode={country.code} svg style={{ width: "20px", height: "14px" }} />
                          <span className="text-[12.5px] text-gray-600">{country.dial}</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </button>
                        <input type="text" value={phone} onChange={handlePhone} placeholder="000 000 0000"
                          className="flex-1 px-3 py-[11px] text-[13.5px] outline-none bg-transparent placeholder-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Service + Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="cs-label">Service of interest</label>
                      <div className="relative">
                        <select {...field("service")} className="cs-input appearance-none pr-8 cursor-pointer">
                          <option value="">Select a service…</option>
                          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="cs-label">Estimated budget</label>
                      <div className="relative">
                        <select {...field("budget")} className="cs-input appearance-none pr-8 cursor-pointer">
                          <option value="">Select a range…</option>
                          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Error banner */}
                  {submitError && (
                    <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200">
                      <span className="text-red-500 text-sm shrink-0 mt-0.5">⚠</span>
                      <p className="text-[12.5px] text-red-700 leading-relaxed">{submitError}</p>
                    </div>
                  )}

                  {/* Submit row */}
                  <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
                    <p className="text-[11.5px] text-gray-400 leading-relaxed max-w-[260px]">
                      By submitting you agree to our{" "}
                      <Link href="/privacy" className="text-[#1f6fb2] hover:underline">Privacy Policy</Link>.
                      We never share your data.
                    </p>
                    <button type="submit" disabled={submitting}
                      className="relative flex items-center gap-2.5 px-10 py-3 font-bold text-white text-[13.5px] transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #7A2E00 0%, #C45500 50%, #FF7A00 100%)", boxShadow: "0 6px 24px rgba(196,85,0,0.35)" }}>
                      <span aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)", animation: "cs-shimmer 2.5s infinite" }} />
                      {submitting
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting…</>
                        : <>Request consultation<ArrowRight className="w-4 h-4" /></>
                      }
                    </button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <aside className="bg-gradient-to-br from-[#e6f2ff] via-[#f2f8ff] to-[#ffffff] p-8 space-y-8 border-l border-[#bfdbfe]">

            {/* Direct contact channels */}
            <div>
              <p className="text-[11px] font-bold text-[#1f3a5f] uppercase tracking-[0.14em] mb-4">Direct contact channels</p>
              <ul className="space-y-4">
                {CHANNELS.map((ch, i) => (
                  ch.href ? (
                    <li key={i}>
                      <a href={ch.href} target={ch.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="flex items-center gap-3 group">
                        <div className="w-8 h-8 flex items-center justify-center border border-[#bfdbfe] bg-white group-hover:bg-[#1f6fb2] group-hover:border-[#1f6fb2] transition-all duration-150 shrink-0">
                          <ch.icon className="w-3.5 h-3.5 text-[#1f6fb2] group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors truncate">{ch.label}</p>
                          <p className="text-[11px] text-gray-400 truncate">{ch.sub}</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#1f6fb2] group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
                      </a>
                    </li>
                  ) : (
                    <li key={i}>
                      <button type="button" onClick={() => typeof window !== "undefined" && window.Intercom?.("show")}
                        className="w-full flex items-center gap-3 group text-left">
                        <div className="w-8 h-8 flex items-center justify-center border border-[#bfdbfe] bg-white group-hover:bg-[#7c3aed] group-hover:border-[#7c3aed] transition-all duration-150 shrink-0">
                          <ch.icon className="w-3.5 h-3.5 text-[#1f6fb2] group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#1f3a5f] group-hover:text-[#7c3aed] transition-colors truncate">{ch.label}</p>
                          <p className="text-[11px] text-gray-400 truncate">{ch.sub}</p>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#7c3aed] group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
                      </button>
                    </li>
                  )
                ))}
              </ul>
            </div>

            <div className="border-t border-[#bfdbfe]" />

            {/* Media & press */}
            <div>
              <p className="text-[11px] font-bold text-[#1f3a5f] uppercase tracking-[0.14em] mb-3">Media & press</p>
              <a href="mailto:press@logicsoft.ng" className="flex items-center gap-3 group">
                <div className="w-8 h-8 flex items-center justify-center border border-[#bfdbfe] bg-white group-hover:bg-[#1f6fb2] group-hover:border-[#1f6fb2] transition-all duration-150 shrink-0">
                  <Newspaper className="w-3.5 h-3.5 text-[#1f6fb2] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">Request executive insights</p>
                  <p className="text-[11px] text-gray-400">press@logicsoft.ng</p>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#1f6fb2] group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
              </a>
            </div>

            {/* Careers */}
            <div>
              <p className="text-[11px] font-bold text-[#1f3a5f] uppercase tracking-[0.14em] mb-3">Careers at LogicSoft</p>
              <Link href="/careers" className="flex items-center gap-3 group">
                <div className="w-8 h-8 flex items-center justify-center border border-[#bfdbfe] bg-white group-hover:bg-[#1f6fb2] group-hover:border-[#1f6fb2] transition-all duration-150 shrink-0">
                  <Briefcase className="w-3.5 h-3.5 text-[#1f6fb2] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#1f3a5f] group-hover:text-[#1f6fb2] transition-colors">Submit your CV</p>
                  <p className="text-[11px] text-gray-400">View open positions</p>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#1f6fb2] group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
              </Link>
            </div>

            <div className="border-t border-[#bfdbfe]" />

            {/* What happens next */}
            <div>
              <p className="text-[11px] font-bold text-[#1f3a5f] uppercase tracking-[0.14em] mb-4">What happens next</p>
              <div className="space-y-3.5">
                {[
                  { n: "1", t: "Review",         b: "A solution architect reads your brief and researches your context." },
                  { n: "2", t: "Discovery call", b: "30-minute call to align on scope, timeline, and approach." },
                  { n: "3", t: "Proposal",       b: "Scoped proposal with deliverables and pricing within 5 days." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3">
                    <div className="w-6 h-6 bg-[#1f6fb2] flex items-center justify-center text-white text-[11px] font-bold shrink-0 mt-0.5">{s.n}</div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-[#1f3a5f]">{s.t}</p>
                      <p className="text-[11.5px] text-gray-500 leading-snug">{s.b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* Country dropdown portal */}
      {dropOpen && typeof window !== "undefined" && dropPos &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setDropOpen(false)} />
            <div style={{ position: "absolute", top: dropPos.top, left: dropPos.left, width: dropPos.width, zIndex: 9999 }}
              className="bg-white border border-[#e5e7eb] shadow-xl max-h-64 overflow-y-auto">
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
        .cs-label { display:block; font-size:11.5px; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }
        .cs-input { width:100%; border:1px solid #d1d5db; padding:11px 14px; font-size:13.5px; color:#1f2937; background:#ffffff; outline:none; border-radius:0.375rem; transition:border-color 0.15s,box-shadow 0.15s; font-family:inherit; }
        .cs-input:focus { border-color:#1f6fb2; box-shadow:0 0 0 3px rgba(31,111,178,0.1); }
        .cs-input::placeholder { color:#9ca3af; }
        .cs-input:disabled { background:#fef2f2; border-color:#fca5a5; }
        @keyframes cs-shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} }
      `}</style>
    </section>
  );
}