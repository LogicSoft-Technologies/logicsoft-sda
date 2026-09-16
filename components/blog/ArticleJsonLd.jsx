import { SITE_NAME, SITE_URL } from "@/lib/seo-config";

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function ArticleJsonLd({ post }) {
  const articleUrl =
    post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`;

  const image = post.coverImage
    ? [post.coverImage]
    : [`${SITE_URL}/og-image.jpg`];

  const authorName = post.author?.name || SITE_NAME;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: authorName,
      ...(post.author?.slug
        ? { url: `${SITE_URL}/blog/authors/${post.author.slug}` }
        : {}),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logicsoft-logo.png`,
      },
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${SITE_URL}/blog`,
      },
      ...(post.category
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: post.category.name,
              item: `${SITE_URL}/blog/category/${post.category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: post.category ? 4 : 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJson(blogPosting),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJson(breadcrumb),
        }}
      />
    </>
  );
}