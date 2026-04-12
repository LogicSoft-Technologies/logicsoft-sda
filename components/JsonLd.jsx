// components/JsonLd.jsx
// Usage: import JsonLd, { buildServiceSchema } from "@/components/JsonLd";
//        <JsonLd schema={buildServiceSchema({ name, description, url })} />

const SITE_URL = "https://www.logicsofttechnologies.com";

// ─── Base component ───────────────────────────────────────────────────────────

export default function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Schema builders ──────────────────────────────────────────────────────────

/**
 * Individual service page schema.
 * Use on every /services/** route.
 */
export function buildServiceSchema({ name, description, url }) {
  return {
    "@context":  "https://schema.org",
    "@type":     "Service",
    serviceType: name,
    name,
    description,
    url:         `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name:    "LogicSoft Technologies",
      url:     SITE_URL,
    },
    areaServed: [
      { "@type": "Continent", name: "Africa"        },
      { "@type": "Continent", name: "Europe"        },
      { "@type": "Continent", name: "North America" },
      { "@type": "Continent", name: "Middle East"   },
    ],
    offers: {
      "@type":      "Offer",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name:    "LogicSoft Technologies",
      },
    },
  };
}

/**
 * Breadcrumb trail.
 * crumbs: [{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, ...]
 */
export function buildBreadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: crumbs.map(({ name, href }, i) => ({
      "@type":  "ListItem",
      position: i + 1,
      name,
      item:     `${SITE_URL}${href}`,
    })),
  };
}

/**
 * FAQ accordion schema.
 * faqs: [{ question: "...", answer: "..." }, ...]
 * Renders as rich result (expandable Q&A) in Google SERPs.
 */
export function buildFaqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name:    question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    answer,
      },
    })),
  };
}

/**
 * Blog / news article schema.
 * FIX: mainEntityOfPage was malformed — corrected to proper @id reference.
 */
export function buildArticleSchema({ title, description, slug, publishedAt, updatedAt, authorName }) {
  const articleUrl = `${SITE_URL}/blog/${slug}`;
  return {
    "@context":    "https://schema.org",
    "@type":       "Article",
    headline:      title,
    description,
    url:           articleUrl,
    datePublished: publishedAt,
    dateModified:  updatedAt ?? publishedAt,
    author: {
      "@type": "Person",
      name:    authorName ?? "LogicSoft Technologies",
    },
    publisher: {
      "@type": "Organization",
      name:    "LogicSoft Technologies",
      logo: {
        "@type": "ImageObject",
        url:     `${SITE_URL}/images/logicsoft-logo.png`,
      },
    },
    // FIX: was { "@type": "@id", "@id": url } — @type should never be "@id"
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":   articleUrl,
    },
  };
}

/**
 * Local business / office schema.
 * Use on /about/location or /contact to strengthen local pack signals.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context":    "https://schema.org",
    "@type":       ["LocalBusiness", "ProfessionalService"],
    name:          "LogicSoft Technologies",
    url:           SITE_URL,
    telephone:     "+234-901-268-8861",
    email:         "contact@logicsofttechnologies.com",
    image:         `${SITE_URL}/images/og-image.png`,
    priceRange:    "$$",
    currenciesAccepted: "USD, EUR, GBP, NGN",
    paymentAccepted:    "Bank Transfer, Wire Transfer",
    address: {
      "@type":         "PostalAddress",
      addressLocality: "Lagos",
      addressRegion:   "Lagos State",
      addressCountry:  "NG",
    },
    geo: {
      "@type":     "GeoCoordinates",
      latitude:    6.5244,
      longitude:   3.3792,
    },
    openingHoursSpecification: [
      {
        "@type":     "OpeningHoursSpecification",
        dayOfWeek:   ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens:       "08:00",
        closes:      "18:00",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/logicsoft-technologies",
      "https://twitter.com/logicsofttech",
    ],
  };
}

/**
 * Portfolio / case study schema.
 * Use on individual /portfolio/[slug] pages.
 */
export function buildCaseStudySchema({ title, description, slug, client, completedAt }) {
  return {
    "@context":    "https://schema.org",
    "@type":       "CreativeWork",
    name:          title,
    description,
    url:           `${SITE_URL}/portfolio/${slug}`,
    dateCreated:   completedAt,
    creator: {
      "@type": "Organization",
      name:    "LogicSoft Technologies",
      url:     SITE_URL,
    },
    ...(client && {
      sponsor: {
        "@type": "Organization",
        name:    client,
      },
    }),
  };
}