import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <section className="border-b border-[#e8eef6] bg-white py-16">
      <div className="mx-auto max-w-[82rem] px-6">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
          Featured insight
        </p>

        <div className="mt-5 grid overflow-hidden border border-[#e2eaf3] lg:grid-cols-2">
          <div
            className="min-h-[270px]"
            style={{
              background: post.coverImage
                ? `center / cover no-repeat url(${post.coverImage})`
                : "linear-gradient(135deg, #0b1b33 0%, #123963 56%, #1f6fb2 100%)",
            }}
          />

          <div className="flex flex-col p-8 lg:p-12">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
              {post.category?.name || "Insights"} · {post.readingMinutes || 1} min read
            </p>

            <h2 className="mt-5 font-serif text-[33px] leading-tight text-[#1f3a5f]">
              {post.title}
            </h2>

            <p className="mt-5 text-[14px] leading-relaxed text-slate-600">
              {post.excerpt}
            </p>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-8 inline-flex w-fit items-center gap-2 text-[13px] font-bold text-[#1f6fb2]"
            >
              Read the article
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}