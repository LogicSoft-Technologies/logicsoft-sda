import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import BlogEngagement from "@/components/blog/BlogEngagement";

import ArticleContent from "@/components/blog/ArticleContent";
import ArticleJsonLd from "@/components/blog/ArticleJsonLd";
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
    <main className="bg-white">
      <ArticleJsonLd post={post} />

      <section className="border-b border-[#e8eef6] bg-[#f5f8fc]">
        <div className="mx-auto max-w-[58rem] px-6 py-6">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11.5px] text-slate-500"
          >
            <Link href="/" className="hover:text-[#1f6fb2]">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#1f6fb2]">
              Insights
            </Link>
            <span>/</span>
            {post.category && (
              <>
                <Link href={categoryHref} className="hover:text-[#1f6fb2]">
                  {post.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="truncate text-slate-400">{post.title}</span>
          </nav>
        </div>
      </section>

      <article>
        <header className="mx-auto max-w-[58rem] px-6 pb-12 pt-16">
          <Link
            href={categoryHref}
            className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]"
          >
            {post.category?.name || "LogicSoft Insights"}
          </Link>

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

        {post.coverImage && (
          <div className="mx-auto max-w-[82rem] px-6">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </div>
        )}

        <div className="mx-auto max-w-[48rem] px-6 py-14">
          <ArticleContent content={post.content} />

          <BlogEngagement postTitle={post.title} />

          <section className="mt-16 border border-[#dbe7f3] bg-[#f5f8fc] p-7 sm:p-9">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-[#1f6fb2]" />

              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
                  More LogicSoft Insights
                </p>

                <h2 className="mt-2 font-serif text-[26px] text-[#1f3a5f]">
                  Keep learning with us.
                </h2>

                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                  Get useful technology and business insight when we publish it.
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
          </section>

          <section className="mt-12 border-l-4 border-[#1f6fb2] bg-[#f5f8fc] px-7 py-7">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
              Build with LogicSoft
            </p>

            <h2 className="mt-3 font-serif text-[27px] text-[#1f3a5f]">
              Need a similar solution for your business?
            </h2>

            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-600">
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
            className="mt-12 inline-flex items-center gap-2 text-[13px] font-bold text-[#1f6fb2]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all insights
          </Link>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[#e8eef6] bg-[#f5f8fc] py-16">
          <div className="mx-auto max-w-[82rem] px-6">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#1f6fb2]">
              Keep reading
            </p>

            <h2 className="mt-2 font-serif text-[31px] text-[#1f3a5f]">
              Related insights
            </h2>

            <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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