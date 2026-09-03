"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Upload,
} from "lucide-react";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Mobile Engineer",
  "AI & Automation Engineer",
  "Cloud Engineer",
  "Cybersecurity Engineer",
  "Project Manager",
  "IT Support & Help Desk",
];

export default function ApplyPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    linkedin: "",
    experience: "",
    availability: "",
    coverLetter: "",
  });

  const [cv, setCv] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const selectedRole = new URLSearchParams(window.location.search).get("role");

    if (selectedRole) {
      setForm((current) => ({ ...current, role: selectedRole }));
    }
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!cv) {
      setError("Please upload your CV before submitting.");
      return;
    }

    if (cv.size > 10 * 1024 * 1024) {
      setError("Your CV must be 10 MB or smaller.");
      return;
    }

    setStatus("submitting");

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("cv", cv);

      const response = await fetch(`${BACKEND_URL}/api/careers/apply`, {
        method: "POST",
        body: data,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Your application could not be submitted.");
      }

      setStatus("success");
    } catch (submissionError) {
      setError(submissionError.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen bg-[#f5f8fc] pt-[96px] px-6 py-20">
        <div className="max-w-xl mx-auto bg-white border border-gray-200 px-8 py-14 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-green-50 border border-green-200">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>

          <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-3">
            Application received
          </p>

          <h1 className="text-[30px] font-serif text-[#1f3a5f] mb-4">
            Thank you for applying.
          </h1>

          <p className="text-[14px] text-gray-500 leading-relaxed">
            Your application and CV have been sent to the LogicSoft team. We
            will contact you if your experience matches the role.
          </p>

          <Link
            href="/about/about-company"
            className="inline-flex items-center gap-2 mt-8 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#1f6fb2] hover:text-[#163f67] transition-colors"
          >
            Back to About LogicSoft
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f8fc] pt-[96px]">
      <div className="max-w-[82rem] mx-auto px-6 py-10">
        <nav className="flex items-center gap-1.5 text-[12px] text-gray-400">
          <Link href="/" className="hover:text-[#1f6fb2] transition-colors">
            Home
          </Link>
          <span>›</span>
          <Link
            href="/about/about-company"
            className="hover:text-[#1f6fb2] transition-colors"
          >
            About
          </Link>
          <span>›</span>
          <span className="text-gray-600">Apply</span>
        </nav>
      </div>

      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-[82rem] mx-auto px-6 py-14">
          <p className="text-[11px] font-semibold text-[#1f6fb2] uppercase tracking-[0.12em] mb-4">
            Careers at LogicSoft
          </p>

          <h1 className="text-[36px] font-serif text-[#1f3a5f] mb-4">
            Apply for a role
          </h1>

          <p className="max-w-2xl text-[16px] text-gray-600 leading-[1.9]">
            Tell us about your experience and attach your CV. Every application
            is reviewed by our team.
          </p>
        </div>
      </section>

      <section className="max-w-[82rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-7 items-start">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 p-6 md:p-8"
          >
            <div className="flex items-start gap-4 pb-6 mb-7 border-b border-gray-100">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#dbeafe] border border-[#bfdbfe]">
                <Briefcase className="w-5 h-5 text-[#1f6fb2]" />
              </div>

              <div>
                <h2 className="text-[18px] font-semibold text-[#1f3a5f]">
                  Your application
                </h2>
                <p className="mt-1 text-[13px] text-gray-500">
                  Fields marked with <span className="text-red-500">*</span> are required.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                placeholder="Your full name"
                required
              />

              <Field
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                required
              />

              <Field
                label="Phone number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateField}
                placeholder="+234 000 000 0000"
                required
              />

              <Field
                label="Location"
                name="location"
                value={form.location}
                onChange={updateField}
                placeholder="City, Country"
                required
              />

              <div>
                <label className="field-label">
                  Role applying for <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  name="role"
                  value={form.role}
                  onChange={updateField}
                  className="field-input appearance-none"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="field-label">
                  Years of experience <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  name="experience"
                  value={form.experience}
                  onChange={updateField}
                  className="field-input appearance-none"
                >
                  <option value="">Select experience</option>
                  <option value="0–1 year">0–1 year</option>
                  <option value="2–3 years">2–3 years</option>
                  <option value="4–6 years">4–6 years</option>
                  <option value="7+ years">7+ years</option>
                </select>
              </div>

              <Field
                label="LinkedIn or portfolio URL"
                name="linkedin"
                type="url"
                value={form.linkedin}
                onChange={updateField}
                placeholder="https://linkedin.com/in/your-name"
              />

              <div>
                <label className="field-label">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  name="availability"
                  value={form.availability}
                  onChange={updateField}
                  className="field-input appearance-none"
                >
                  <option value="">Select availability</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="More than 1 month">More than 1 month</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="field-label">
                Why are you a good fit? <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                name="coverLetter"
                value={form.coverLetter}
                onChange={updateField}
                placeholder="Briefly describe your relevant experience, projects, and what interests you about this role."
                className="field-input resize-y"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="cv"
                className="flex items-center gap-4 p-4 border border-dashed border-gray-300 bg-[#f8fafc] hover:border-[#1f6fb2] hover:bg-[#f0f7ff] cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200">
                  <Upload className="w-4 h-4 text-[#1f6fb2]" />
                </div>

                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#1f3a5f]">
                    {cv ? cv.name : "Upload your CV"}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400">
                    PDF, DOC, or DOCX · Maximum 10 MB
                  </p>
                </div>
              </label>

              <input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(event) => setCv(event.target.files?.[0] || null)}
              />
            </div>

            {error && (
              <p className="mt-5 p-3 bg-red-50 border border-red-200 text-[12px] text-red-700">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-7 pt-6 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 leading-relaxed max-w-sm">
                By applying, you consent to LogicSoft reviewing your application
                and CV for recruitment purposes.
              </p>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-[13px] font-semibold text-white bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {status === "submitting" ? "Submitting…" : "Submit application"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>

          <aside className="bg-[#1f3a5f] p-7 text-white">
            <FileText className="w-6 h-6 text-blue-300 mb-5" />
            <h2 className="text-[21px] font-serif">Before you apply</h2>

            <ul className="mt-5 space-y-4 text-[13px] leading-relaxed text-white/70">
              <li>Use an up-to-date CV with your relevant technical experience.</li>
              <li>Include a portfolio or LinkedIn profile where possible.</li>
              <li>Only submit one application per role at a time.</li>
            </ul>

            <div className="flex gap-3 mt-7 pt-6 border-t border-white/15">
              <ShieldCheck className="w-5 h-5 shrink-0 text-blue-300" />
              <p className="text-[11px] leading-relaxed text-white/60">
                Your information is used only to process your application.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <style jsx global>{`
        .field-label {
          display: block;
          margin-bottom: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #374151;
        }

        .field-input {
          width: 100%;
          border: 1px solid #d1d5db;
          background: #ffffff;
          padding: 11px 13px;
          font-size: 13px;
          color: #1f2937;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .field-input:focus {
          border-color: #1f6fb2;
          box-shadow: 0 0 0 3px rgba(31, 111, 178, 0.1);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="field-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        required={required}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="field-input"
      />
    </div>
  );
}