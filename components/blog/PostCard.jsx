import Image from "next/image";
import Link from "next/link";

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function PostCard({ post, priority = false }) {
  const category = post.category?.name || "Insights";
  const author = post.author?.name || "LogicSoft Technologies";

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#e2eaf3] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#1f6fb2]/35 hover:shadow-xl hover:shadow-[#1f6fb2]/10">
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-[#eaf2fa]"
        aria-label={`Read ${post.title}`}
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0b1b33 0%, #123963 56%, #1f6fb2 100%)",
            }}
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/15" />
            <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full border border-white/10" />
            <span className="absolute bottom-6 left-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
              LogicSoft Insights
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link
            href={`/blog/category/${post.category?.slug || "insights"}`}
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1f6fb2]"
          >
            {category}
          </Link>

          <span className="text-[11px] text-slate-400">
            {post.readingMinutes || 1} min read
          </span>
        </div>

        <h2 className="font-serif text-[23px] leading-[1.2] text-[#1f3a5f] transition-colors group-hover:text-[#1f6fb2]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="mt-4 text-[13.5px] leading-relaxed text-slate-500">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between gap-3 border-t border-[#edf2f7] pt-4">
            <span className="text-[11.5px] text-slate-500">{author}</span>

            <time
              dateTime={post.publishedAt}
              className="text-[11.5px] text-slate-400"
            >
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </div>
    </article>
  );
}