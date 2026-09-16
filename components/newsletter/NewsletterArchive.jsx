import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterArchive({ editions = [] }) {
  if (!editions.length) {
    return (
      <section className="border border-[#e2eaf3] bg-white p-8 text-center">
        <Mail className="mx-auto h-5 w-5 text-[#1f6fb2]" />
        <h2 className="mt-4 font-serif text-[25px] text-[#1f3a5f]">
          LogicSoft Insights is just getting started.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[13.5px] leading-relaxed text-slate-600">
          Subscribe to receive the first edition and practical technology
          insights from the LogicSoft team.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {editions.map((edition) => (
        <article
          key={edition.id}
          className="flex flex-col justify-between gap-4 border border-[#e2eaf3] bg-white p-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#1f6fb2]">
              LogicSoft Insights
            </p>
            <h2 className="mt-2 font-serif text-[23px] text-[#1f3a5f]">
              {edition.title}
            </h2>
            {edition.previewText && (
              <p className="mt-2 text-[13px] text-slate-600">
                {edition.previewText}
              </p>
            )}
          </div>

          {edition.url && (
            <Link
              href={edition.url}
              className="inline-flex shrink-0 items-center gap-2 text-[12px] font-bold text-[#1f6fb2]"
            >
              Read edition
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </article>
      ))}
    </section>
  );
}