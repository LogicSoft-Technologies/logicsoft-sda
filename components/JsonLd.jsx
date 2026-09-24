import { SITE_NAME, SITE_URL } from "@/lib/seo-config";

function safeJson(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(schema) }}
    />
  );
}

export function buildServiceSchema({ name, description, url }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Continent", name: "Africa" },
      { "@type": "Continent", name: "Europe" },
      { "@type": "Continent", name: "North America" },
      { "@type": "Continent", name: "Middle East" },
    ],
  };
}

export function buildBreadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, href }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${SITE_URL}${href}`,
    })),
  };
}

export function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function buildArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  authorName,
}) {
  const articleUrl = `${SITE_URL}/blog/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: articleUrl,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: authorName || SITE_NAME,
      url: SITE_URL,
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
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: SITE_NAME,
    url: SITE_URL,
    telephone: "+234-901-268-8861",
    email: "contact@logicsofttechnologies.com",
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressRegion: "Lagos State",
      addressCountry: "NG",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/logicsoft-technologies",
      "https://twitter.com/logicsofttech",
    ],
  };
}

export function buildCaseStudySchema({
  title,
  description,
  slug,
  client,
  completedAt,
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `${SITE_URL}/portfolio/${slug}`,
    dateCreated: completedAt,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(client
      ? {
          sponsor: {
            "@type": "Organization",
            name: client,
          },
        }
      : {}),
  };
}