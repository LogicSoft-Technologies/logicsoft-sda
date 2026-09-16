"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import { adminApi } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <main className="grid min-h-screen place-items-center bg-[#07111f] px-6">
      <section className="w-full max-w-md border border-white/10 bg-white p-8 shadow-2xl sm:p-10">
        <div className="grid h-11 w-11 place-items-center bg-[#1f6fb2]">
          <LockKeyhole className="h-5 w-5 text-white" />
        </div>

        <p className="mt-7 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
          LogicSoft Technologies
        </p>

        <h1 className="mt-3 font-serif text-[34px] leading-tight text-[#1f3a5f]">
          Content CMS
        </h1>

        <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
          Sign in to publish and manage LogicSoft Insights.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-[12px] font-bold text-[#1f3a5f]">
              Email address
            </label>

            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full border border-[#cbd9e7] px-4 py-3 text-[14px] outline-none focus:border-[#1f6fb2] focus:ring-2 focus:ring-[#1f6fb2]/15"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-bold text-[#1f3a5f]">
              Password
            </label>

            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-[#cbd9e7] px-4 py-3 text-[14px] outline-none focus:border-[#1f6fb2] focus:ring-2 focus:ring-[#1f6fb2]/15"
              required
            />
          </div>

          {error && (
            <p className="border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#1f6fb2] px-4 py-3.5 text-[13px] font-bold text-white hover:bg-[#1a5a96] disabled:opacity-70"
          >
            {status === "loading" ? "Signing in…" : "Sign in securely"}
          </button>
        </form>
      </section>
    </main>
  );
}