import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PostCard from "@/components/blog/PostCard";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { getPosts } from "@/lib/blog-api";

export default async function LatestInsights() {
  try {
    const response = await getPosts({
      page: 1,
      pageSize: 3,
    });
    const posts = Array.isArray(response?.posts) ? response.posts : [];

    if (!posts.length) return null;

    return (
      <section className="border-y border-[#e8eef6] bg-[#f5f8fc] py-20">
        <div className="mx-auto max-w-[82rem] px-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                LogicSoft Insights
              </p>

              <h2 className="mt-3 font-serif text-[34px] text-[#1f3a5f]">
                Useful ideas for your next move.
              </h2>

              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-600">
                Practical insight on software engineering, AI, cloud,
                cybersecurity, and digital transformation.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 text-[13px] font-bold text-[#1f6fb2]"
            >
              Explore all insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post, index) => (
              <PostCard
                key={post.id ?? post.slug ?? `post-${index}`}
                post={post}
                priority={index === 0}
              />
            ))}
          </div>

          <div className="mt-12 grid gap-6 border border-[#dbe7f3] bg-white p-7 lg:grid-cols-[1fr_460px] lg:items-center">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                Stay informed
              </p>

              <h3 className="mt-2 font-serif text-[27px] text-[#1f3a5f]">
                Get the next LogicSoft Insight.
              </h3>
            </div>

            <NewsletterForm source="homepage" sourcePage="/" compact />
          </div>
        </div>
      </section>
    );
  } catch {
    // Homepage must remain available even while the blog API is unavailable.
    return null;
  }
}