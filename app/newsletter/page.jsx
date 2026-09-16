import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";

import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "LogicSoft Insights Newsletter",
  description:
    "Get practical insights on software engineering, AI, cloud, cybersecurity, and digital transformation from LogicSoft Technologies.",
  path: "/newsletter",
});

const topics = [
  "Enterprise software engineering and architecture",
  "AI automation and practical business applications",
  "Cloud engineering, DevOps, and cybersecurity",
  "Digital-product strategy, delivery, and case studies",
];

export default async function NewsletterPage({ searchParams }) {
  const params = await searchParams;

  const confirmationSuccess = params?.confirmation === "success";
  const confirmationInvalid = params?.confirmation === "invalid";
  const unsubscribeSuccess = params?.unsubscribe === "success";
  const unsubscribeInvalid = params?.unsubscribe === "invalid";

  return (
    <main className="bg-white">
      <section
        className="relative overflow-hidden border-b border-[#17345f]"
        style={{
          background:
            "linear-gradient(145deg, #07111f 0%, #0d2448 58%, #123a69 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#1f6fb2] blur-3xl" />
          <div className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[#2563eb] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-[82rem] px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1.5">
              <Mail className="h-3.5 w-3.5 text-[#60a8dc]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#a9d5f5]">
                LogicSoft Insights
              </span>
            </div>

            <h1 className="max-w-3xl font-serif text-[42px] leading-[1.08] text-white sm:text-[56px]">
              Technology insight for better business decisions.
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65">
              Practical perspectives from the LogicSoft team on software
              engineering, AI, cloud, cybersecurity, and building digital
              products that move businesses forward.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e8eef6] bg-[#f5f8fc] py-14">
        <div className="mx-auto grid max-w-[82rem] gap-12 px-6 lg:grid-cols-[1fr_480px] lg:items-center">
          <div>
            <p className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
              Built for leaders and builders
            </p>

            <h2 className="max-w-xl font-serif text-[32px] leading-tight text-[#1f3a5f]">
              Useful ideas. No inbox noise.
            </h2>

            <ul className="mt-7 space-y-4">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 text-[14px] leading-relaxed text-slate-600"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1f6fb2]" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[#dbe7f3] bg-white p-7 shadow-sm sm:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1f6fb2]">
              Subscribe
            </p>

            <h2 className="mt-3 font-serif text-[28px] leading-tight text-[#1f3a5f]">
              Stay ahead of the technology curve.
            </h2>

            <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
              Receive focused insights from LogicSoft Technologies directly in
              your inbox.
            </p>

            <div className="mt-7">
              <NewsletterForm
                source="newsletter-page"
                sourcePage="/newsletter"
              />
            </div>
          </div>
        </div>
      </section>

      {(confirmationSuccess ||
        confirmationInvalid ||
        unsubscribeSuccess ||
        unsubscribeInvalid) && (
        <section className="border-b border-[#e8eef6] bg-white py-8">
          <div className="mx-auto max-w-[82rem] px-6">
            <div
              className={`flex items-start gap-3 border px-5 py-4 text-[13px] ${
                confirmationSuccess || unsubscribeSuccess
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />

              <p>
                {confirmationSuccess &&
                  "Your subscription is confirmed. Welcome to LogicSoft Insights."}
                {confirmationInvalid &&
                  "This confirmation link is invalid or has already been used."}
                {unsubscribeSuccess &&
                  "You have been unsubscribed from LogicSoft Insights."}
                {unsubscribeInvalid &&
                  "This unsubscribe link is invalid or has already been used."}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[82rem] px-6">
          <div className="flex flex-col justify-between gap-6 border border-[#e8eef6] p-8 md:flex-row md:items-center">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                Read first
              </p>

              <h2 className="mt-2 font-serif text-[26px] text-[#1f3a5f]">
                Explore the latest LogicSoft Insights.
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 bg-[#1f6fb2] px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#1a5a96]"
            >
              Read the blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}