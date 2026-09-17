"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { adminApi } from "@/lib/admin-api";
import RobotMascot from "@/components/robot/RobotMascot";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await adminApi.login(email, password);
      router.replace(params.get("next") || "/admin");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || "Unable to sign in.");
      setStatus("idle");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f8fc] lg:grid lg:grid-cols-2">
  {/* Decorative background blobs — these create the color the glass panels blur */}
  <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#065bad]/20 blur-3xl" />
  <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#0a7d3e]/15 blur-3xl" />
  <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#FF7A00]/10 blur-3xl" />
      {/* Left panel — now white, separated from the right panel by a thin border */}
     <section className="relative hidden overflow-hidden bg-white/40 backdrop-blur-xl lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-white/60 lg:p-12 xl:p-16">
        <div className="relative">
          <Image
            src="/images/logicsoft-logo.png"
            alt="LogicSoft Technologies"
            width={320}
            height={66}
            priority
            className="h-auto w-[260px] xl:w-[320px]"
          />
        </div>

        <div className="relative max-w-lg">
          <span className="inline-flex items-center gap-2 bg-[#eaf3fb] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#065bad]">
            <Sparkles className="h-3.5 w-3.5" />
            Content management system
          </span>

          <h1
            className="mt-6 text-5xl leading-[1.05] text-[#111827] xl:text-6xl"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
          >
            Ideas engineered to make an impact.
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#4b5563]">
            Create, refine, and publish the expert insights that power the
            LogicSoft voice.
          </p>
        </div>

        <div className="relative flex items-end justify-between">
          <div className="flex items-center gap-3 text-[12px] text-slate-500">
            <ShieldCheck className="h-4 w-4 text-[#0a7d3e]" />
            Protected admin workspace
          </div>

          <div
            className="pointer-events-none absolute -bottom-20 right-0 origin-bottom-right scale-[0.62] xl:scale-75"
            aria-hidden="true"
          >
            <RobotMascot autoCycle={false} expression="neutral" />
          </div>
        </div>
      </section>

      {/* Right panel — also white, card gets its own border/shadow to stand out */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white/30 backdrop-blur-xl px-5 py-10 sm:px-8">
        <div className="relative w-full max-w-md">
            <div className="relative">
          <Image
            src="/images/logicsoft-logo.png"
            alt="LogicSoft Technologies"
            width={320}
            height={66}
            priority
            className="h-auto w-[260px] xl:w-[320px] py-6 lg:hidden"
          />
        </div>

          <div className="border border-white/60 bg-white/50 backdrop-blur-2xl p-7 shadow-[0_8px_30px_rgba(6,91,173,0.15)] ring-1 ring-white/40 ring-inset sm:p-10">
            <span className="grid h-11 w-11 place-items-center text-[#0a7d3e]">
              <LockKeyhole className="h-5 w-5" />
            </span>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.17em] text-[#065bad]">
              Welcome back
            </p>

            <h2
              className="mt-3 text-4xl leading-tight text-[#111827]"
              style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600 }}
            >
              Sign in to CMS
            </h2>

            <p className="mt-3 text-[13.5px] leading-relaxed text-[#4b5563]">
              Enter your credentials to manage LogicSoft Insights.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[12px] font-bold text-[#111827]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@logicsofttechnologies.com"
                  className="w-full border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3.5 text-[14px] text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[12px] font-bold text-[#111827]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full border border-[#cfe3f2] bg-[#fbfdff] px-4 py-3.5 pr-12 text-[14px] text-[#111827] outline-none transition focus:border-[#065bad] focus:bg-white focus:ring-2 focus:ring-[#065bad]/15"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-0 top-0 grid h-full w-12 place-items-center text-slate-400 transition hover:text-[#065bad]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="border-l-4 border-red-500 bg-red-50 px-4 py-3 text-[12px] leading-relaxed text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 px-4 py-3.5 text-[13px] font-bold text-white transition  bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]"
              >
                {status === "loading" ? "Signing in…" : "Sign in"}
                {status !== "loading" && <ArrowRight className="h-4 w-4 animate-pulse" />}
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400">
              Authorized LogicSoft team members only.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}