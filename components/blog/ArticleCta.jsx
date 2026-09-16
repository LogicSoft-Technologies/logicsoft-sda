import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ArticleCta() {
  return (
    <section className="mt-12 border-l-4 border-[#1f6fb2] bg-[#f5f8fc] px-7 py-7">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
        Build with LogicSoft
      </p>

      <h2 className="mt-3 font-serif text-[27px] text-[#1f3a5f]">
        Need a similar solution for your business?
      </h2>

      <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-600">
        Talk to LogicSoft Technologies about designing, building, and scaling
        your next digital product.
      </p>

      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-2 bg-[#1f6fb2] px-5 py-3 text-[13px] font-bold text-white hover:bg-[#1a5a96]"
      >
        Discuss a project
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}