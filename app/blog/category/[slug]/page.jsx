import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import PostCard from "@/components/blog/PostCard";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import { getCategories, getPosts } from "@/lib/blog-api";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const { categories } = await getCategories();

    const category = categories.find((item) => item.slug === slug);

    if (!category) {
      return createMetadata({
        title: "Category Not Found",
        noIndex: true,
      });
    }

    return createMetadata({
      title: `${category.name} Insights`,
      description:
        category.description ||
        `LogicSoft Technologies insights on ${category.name}.`,
      path: `/blog/category/${category.slug}`,
    });
  } catch {
    return createMetadata({
      title: "Insights",
      path: "/blog",
    });
  }
}

export default async function BlogCategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const query = await searchParams;
  const page = Number(query?.page || 1);

  const [{ categories }, postResponse] = await Promise.all([
    getCategories(),
    getPosts({
      category: slug,
      page,
    }),
  ]);

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const { posts, pagination } = postResponse;

  return (
    <main className="bg-white">
      <section
        className="border-b border-[#17345f]"
        style={{
          background:
            "linear-gradient(145deg, #07111f 0%, #0d2448 58%, #123a69 100%)",
        }}
      >
        <div className="mx-auto max-w-[82rem] px-6 py-20">
          <Link
            href="/blog"
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8ac8f2] hover:text-white"
          >
            ← All insights
          </Link>

          <p className="mt-8 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#8ac8f2]">
            LogicSoft Insights
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-[46px] leading-[1.08] text-white sm:text-[60px]">
            {category.name}
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/65">
            {category.description ||
              `Practical LogicSoft perspectives on ${category.name}.`}
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[82rem] px-6">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                {pagination.total} article
                {pagination.total === 1 ? "" : "s"}
              </p>

              <h2 className="mt-2 font-serif text-[31px] text-[#1f3a5f]">
                Latest {category.name} insights
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2]"
            >
              All insights
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  priority={index < 3}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[#cbd9e7] bg-[#f5f8fc] px-6 py-16 text-center">
              <p className="font-serif text-[25px] text-[#1f3a5f]">
                New insights are on the way.
              </p>

              <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-slate-600">
                Subscribe to be notified when LogicSoft publishes the next
                article in this category.
              </p>
            </div>
          )}

          {pagination.totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-3">
              {pagination.page > 1 && (
                <Link
                  href={`/blog/category/${slug}?page=${pagination.page - 1}`}
                  className="border border-[#d8e4f0] px-4 py-2.5 text-[12px] font-bold text-[#1f3a5f] hover:border-[#1f6fb2]"
                >
                  Previous
                </Link>
              )}

              <span className="text-[12px] text-slate-500">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              {pagination.page < pagination.totalPages && (
                <Link
                  href={`/blog/category/${slug}?page=${pagination.page + 1}`}
                  className="border border-[#d8e4f0] px-4 py-2.5 text-[12px] font-bold text-[#1f3a5f] hover:border-[#1f6fb2]"
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
              Stay informed
            </p>

            <h2 className="mt-3 font-serif text-[32px] text-[#1f3a5f]">
              Get the next LogicSoft Insight.
            </h2>
          </div>

          <NewsletterForm
            source="blog-category"
            sourcePage={`/blog/category/${slug}`}
            compact
          />
        </div>
      </section>
    </main>
  );
}