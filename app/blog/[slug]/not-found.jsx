import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogArticleNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center bg-[#f5f8fc]">
      <section className="mx-auto max-w-[82rem] px-6 py-20">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
          LogicSoft Insights
        </p>

        <h1 className="mt-4 max-w-xl font-serif text-[42px] leading-tight text-[#1f3a5f]">
          This article is unavailable.
        </h1>

        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600">
          The article may have moved, been unpublished, or the link may be
          incorrect. Explore the latest insights from LogicSoft instead.
        </p>

        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 bg-[#1f6fb2] px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#1a5a96]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights
        </Link>
      </section>
    </main>
  );
}