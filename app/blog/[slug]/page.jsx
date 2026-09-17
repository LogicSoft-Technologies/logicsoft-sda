import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Mail,
} from "lucide-react";
import { notFound } from "next/navigation";

import ArticleContent from "@/components/blog/ArticleContent";
import ArticleJsonLd from "@/components/blog/ArticleJsonLd";
import BlogEngagement from "@/components/blog/BlogEngagement";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import PostCard from "@/components/blog/PostCard";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog-api";
import { createMetadata } from "@/lib/metadata";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const { post } = await getPostBySlug(slug);

    return createMetadata({
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.coverImage || "/og-image.jpg",
      type: "article",
      article: {
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author?.name || "LogicSoft Technologies"],
      },
    });
  } catch {
    return createMetadata({
      title: "Article Not Found",
      noIndex: true,
    });
  }
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;

  let post;
  let relatedPosts = [];

  try {
    const [postResponse, relatedResponse] = await Promise.all([
      getPostBySlug(slug),
      getRelatedPosts(slug),
    ]);

    post = postResponse.post;
    relatedPosts = relatedResponse.posts || [];
  } catch (error) {
    if (error.status === 404) notFound();
    throw error;
  }

  const categoryHref = post.category
    ? `/blog/category/${post.category.slug}`
    : "/blog";

  return (
    <main className="bg-white pt-[64px] md:pt-[92px]">
      <ArticleJsonLd post={post} />

      <section className="relative isolate overflow-hidden border-b border-[#17345f] bg-[#07111f] text-white">
        {post.coverImage && (
          <div className="absolute inset-0 -z-20">
            <img
              src={post.coverImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        <div
          className={`absolute inset-0 -z-10 ${
            post.coverImage
              ? "bg-[linear-gradient(90deg,rgba(7,17,31,0.99)_0%,rgba(7,17,31,0.95)_32%,rgba(7,17,31,0.72)_58%,rgba(7,17,31,0.30)_100%)]"
              : "bg-[radial-gradient(circle_at_82%_15%,rgba(196,85,0,0.20),transparent_28%),radial-gradient(circle_at_72%_88%,rgba(31,111,178,0.22),transparent_34%),linear-gradient(120deg,#07111f_0%,#0b1f3c_58%,#153d68_100%)]"
          }`}
        />

        <div className="mx-auto max-w-[82rem] px-6 pb-16 pt-10 lg:pb-20 lg:pt-14">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11.5px] text-white/55"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-colors hover:text-white">
              Insights
            </Link>
            {post.category && (
              <>
                <span>/</span>
                <Link
                  href={categoryHref}
                  className="transition-colors hover:text-white"
                >
                  {post.category.name}
                </Link>
              </>
            )}
          </nav>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div className="max-w-5xl">
              <Link
                href={categoryHref}
                className="inline-flex border border-[#ffb27a]/45 bg-[#7A2E00]/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffd1ae] transition-colors hover:border-[#ffb27a] hover:bg-[#7A2E00]/45 hover:text-white"
              >
                {post.category?.name || "LogicSoft Insights"}
              </Link>

              <div className="mt-6 h-px w-14 bg-gradient-to-r from-[#FF7A00] to-[#ffb27a]" />

              <h1 className="mt-6 max-w-5xl font-serif text-[42px] leading-[1.06] text-white sm:text-[56px] xl:text-[66px]">
                {post.title}
              </h1>

              <p className="mt-7 max-w-4xl text-[17px] leading-relaxed text-white/75 sm:text-[19px]">
                {post.excerpt}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-[12px] text-white/60">
                <span className="font-semibold text-white">
                  {post.author?.name || "LogicSoft Technologies"}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-[#ffb27a]" />
                  {formatDate(post.publishedAt)}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-[#ffb27a]" />
                  {post.readingMinutes || 1} min read
                </span>
              </div>
            </div>

            <div className="border-l border-[#ffb27a]/35 pl-6 lg:pb-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffd1ae]">
                LogicSoft Insights
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-white/65">
                Practical perspectives on technology, delivery, and digital
                growth for ambitious organisations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto grid max-w-[82rem] gap-14 px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="max-w-[52rem]">
              <ArticleContent content={post.content} />

              <BlogEngagement slug={post.slug} postTitle={post.title} />

              <section className="mt-14 border-l-4 border-[#1f6fb2] bg-[#f5f8fc] px-7 py-8">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                  Build with LogicSoft
                </p>

                <h2 className="mt-3 font-serif text-[29px] leading-tight text-[#1f3a5f]">
                  Need a similar solution for your business?
                </h2>

                <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-600">
                  Talk to LogicSoft Technologies about designing, building, and
                  scaling your next digital product.
                </p>

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 bg-[#1f6fb2] px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#1a5a96]"
                >
                  Discuss a project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>

              <Link
                href="/blog"
                className="mt-12 inline-flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2] transition-colors hover:text-[#1f3a5f]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all insights
              </Link>
            </div>
          </div>

          <aside className="lg:pt-3">
            <div className="lg:sticky lg:top-[116px]">
              <div className="border border-[#dbe7f3] bg-[#f5f8fc] p-6">
                <Mail className="h-5 w-5 text-[#1f6fb2]" />

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                  Stay informed
                </p>

                <h2 className="mt-3 font-serif text-[25px] leading-tight text-[#1f3a5f]">
                  Get the next useful insight.
                </h2>

                <p className="mt-4 text-[13px] leading-relaxed text-slate-600">
                  Software, AI, cloud, security, and practical digital strategy
                  from LogicSoft Technologies.
                </p>

                <div className="mt-6">
                  <NewsletterForm
                    source="blog-article"
                    sourcePage={`/blog/${post.slug}`}
                    compact
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[#e8eef6] bg-[#f5f8fc] py-16 lg:py-20">
          <div className="mx-auto max-w-[82rem] px-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
              Keep reading
            </p>

            <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <h2 className="font-serif text-[34px] text-[#1f3a5f]">
                Related insights
              </h2>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2] transition-colors hover:text-[#1f3a5f]"
              >
                Explore all insights
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}