import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import PostCard from "@/components/blog/PostCard";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import {
  getCategories,
  getFeaturedPost,
  getPosts,
} from "@/lib/blog-api";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Practical insights on software engineering, AI, cloud, cybersecurity, and digital transformation from LogicSoft Technologies.",
  path: "/blog",
});

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params?.page || 1);
  const category = typeof params?.category === "string"
    ? params.category
    : "";
  const query = typeof params?.q === "string" ? params.q : "";

  const [postResponse, categoryResponse, featuredResponse] =
    await Promise.all([
      getPosts({ page, category, query }),
      getCategories(),
      getFeaturedPost(),
    ]);

  const { posts, pagination } = postResponse;
  const categories = categoryResponse.categories || [];
  const featured = featuredResponse.post;

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-[#17345f] bg-[#07111f]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(196,85,0,0.18),transparent_24%),radial-gradient(circle_at_74%_88%,rgba(31,111,178,0.24),transparent_35%),linear-gradient(118deg,#07111f_0%,#0a1c35_52%,#123b66_100%)]" />

        <div className="relative mx-auto grid max-w-[82rem] gap-12 px-6 pb-16 pt-40 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end lg:pb-20 lg:pt-44">
          <div className="max-w-3xl">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#ffd1ae]">
              LogicSoft Insights
            </p>

            <div className="mt-4 h-px w-14 bg-gradient-to-r from-[#FF7A00] to-[#ffb27a]" />

            <h1 className="mt-6 font-serif text-[44px] leading-[1.06] text-white sm:text-[58px]">
              Better technology decisions start with clearer thinking.
            </h1>

            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/70">
              Practical insight on software engineering, AI, cloud, cybersecurity,
              and digital transformation from the LogicSoft team.
            </p>

            <form
              action="/blog"
              className="mt-8 flex max-w-2xl overflow-hidden border border-white/20 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.20)]"
            >
              <label htmlFor="blog-search" className="sr-only">
                Search LogicSoft Insights
              </label>

              <input
                id="blog-search"
                name="q"
                defaultValue={query}
                placeholder="Search insights"
                className="min-w-0 flex-1 px-4 py-3.5 text-[14px] text-[#1a2d4a] outline-none"
              />

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#7A2E00] via-[#C45500] to-[#FF7A00] px-5 text-[13px] font-bold text-white transition-all hover:from-[#8F3600] hover:via-[#D46000] hover:to-[#FF8C1A]"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </form>
          </div>

          <div className="border-l border-[#ffb27a]/35 pl-6 lg:pb-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffd1ae]">
              What we cover
            </p>

            <ul className="mt-5 space-y-3">
              {[
                "Software engineering and architecture",
                "AI and business automation",
                "Cloud, DevOps, and cybersecurity",
                "Digital-product strategy and delivery",
              ].map((topic) => (
                <li
                  key={topic}
                  className="border-b border-white/10 pb-3 text-[13px] leading-relaxed text-white/70"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e8eef6] bg-[#f5f8fc]">
        <div className="mx-auto flex max-w-[82rem] gap-2 overflow-x-auto px-6 py-5">
          <Link
            href="/blog"
            className={`shrink-0 border px-4 py-2 text-[12px] font-bold transition-colors ${
              !category
                ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
                : "border-[#d8e4f0] bg-white text-slate-600 hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
            }`}
          >
            All insights
          </Link>

          {categories.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/category/${item.slug}`}
              className={`shrink-0 border px-4 py-2 text-[12px] font-bold transition-colors ${
                category === item.slug
                  ? "border-[#1f6fb2] bg-[#1f6fb2] text-white"
                  : "border-[#d8e4f0] bg-white text-slate-600 hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      {!query && !category && featured && (
        <section className="border-b border-[#e8eef6] bg-white py-16">
          <div className="mx-auto max-w-[82rem] px-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                  Featured insight
                </p>
                <h2 className="mt-2 font-serif text-[30px] text-[#1f3a5f]">
                  Start here
                </h2>
              </div>
            </div>

            <div className="grid overflow-hidden border border-[#e2eaf3] lg:grid-cols-2">
              <div
                className="min-h-[270px]"
                style={{
                  background: featured.coverImage
                    ? `center / cover no-repeat url(${featured.coverImage})`
                    : "linear-gradient(135deg, #0b1b33 0%, #123963 56%, #1f6fb2 100%)",
                }}
              />

              <div className="flex flex-col p-8 lg:p-12">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                  {featured.category?.name || "Insights"} ·{" "}
                  {featured.readingMinutes || 1} min read
                </p>

                <h2 className="mt-5 font-serif text-[33px] leading-tight text-[#1f3a5f]">
                  {featured.title}
                </h2>

                <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-slate-600">
                  {featured.excerpt}
                </p>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 text-[13px] font-bold text-[#1f6fb2]"
                >
                  Read the article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[82rem] px-6">
          <div className="mb-9">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
              {query ? `Search results for “${query}”` : category ? "Category insights" : "Latest insights"}
            </p>

            <h2 className="mt-2 font-serif text-[31px] text-[#1f3a5f]">
              {posts.length ? "Useful ideas for your next move." : "No matching articles yet."}
            </h2>
          </div>

          {posts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  priority={index < 3}
                />
              ))}
            </div>
          )}

          {pagination.totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-3">
              {pagination.page > 1 && (
                <Link
                  href={`/blog?page=${pagination.page - 1}${category ? `&category=${category}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  className="border border-[#d8e4f0] px-4 py-2.5 text-[12px] font-bold text-[#1f3a5f] hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
                >
                  Previous
                </Link>
              )}

              <span className="text-[12px] text-slate-500">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              {pagination.page < pagination.totalPages && (
                <Link
                  href={`/blog?page=${pagination.page + 1}${category ? `&category=${category}` : ""}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                  className="border border-[#d8e4f0] px-4 py-2.5 text-[12px] font-bold text-[#1f3a5f] hover:border-[#1f6fb2] hover:text-[#1f6fb2]"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>

      <section className="border-t border-[#e8eef6] bg-[#f5f8fc] py-16">
        <div className="mx-auto grid max-w-[82rem] gap-10 px-6 lg:grid-cols-[1fr_470px] lg:items-center">
          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
              LogicSoft Insights
            </p>

            <h2 className="mt-3 max-w-xl font-serif text-[32px] leading-tight text-[#1f3a5f]">
              Get useful technology intelligence in your inbox.
            </h2>

            <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-slate-600">
              Software engineering, AI, cloud, cybersecurity, and practical
              digital strategy sent only when it is worth reading.
            </p>
          </div>

          <NewsletterForm source="blog-index" sourcePage="/blog" compact />
        </div>
      </section>
    </main>
  );
}