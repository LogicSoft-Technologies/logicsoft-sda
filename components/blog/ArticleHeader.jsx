import { Clock3 } from "lucide-react";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function ArticleHeader({ post }) {
  return (
    <header className="mx-auto max-w-[58rem] px-6 pb-12 pt-16">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
        {post.category?.name || "LogicSoft Insights"}
      </p>

      <h1 className="mt-5 font-serif text-[41px] leading-[1.1] text-[#1f3a5f] sm:text-[56px]">
        {post.title}
      </h1>

      <p className="mt-6 max-w-3xl text-[18px] leading-relaxed text-slate-600">
        {post.excerpt}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[#e8eef6] py-5 text-[12px] text-slate-500">
        <span className="font-semibold text-[#1f3a5f]">
          {post.author?.name || "LogicSoft Technologies"}
        </span>

        <time dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>

        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" />
          {post.readingMinutes || 1} min read
        </span>
      </div>
    </header>
  );
}