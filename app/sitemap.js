// app/sitemap.js
// Next.js auto-generates /sitemap.xml from this file.
// After deploying, submit https://www.logicsofttechnologies.com/sitemap.xml
// to Google Search Console → Sitemaps.

const SITE_URL = "https://www.logicsofttechnologies.com";

// ─── Priority guide ───────────────────────────────────────────────────────────
//   1.0  — Homepage
//   0.9  — Top-level service pages
//   0.85 — Sub-service / industry pages
//   0.8  — About, portfolio, contact
//   0.7  — Blog posts, supporting about pages
//   0.5  — Low-signal about pages
//   0.3  — Legal pages

const CORE_ROUTES = [
  { url: "/",          priority: 1.0, changeFrequency: "weekly"  },
  // FIX: was "/service" (404) — corrected to match actual route structure
  { url: "/services",  priority: 0.9, changeFrequency: "monthly" },
  { url: "/about",     priority: 0.8, changeFrequency: "monthly" },
  { url: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
  { url: "/contact",   priority: 0.8, changeFrequency: "monthly" },
  { url: "/blog",      priority: 0.7, changeFrequency: "weekly"  },
];

const ABOUT_ROUTES = [
  { url: "/about/about-company",         priority: 0.8 },
  { url: "/about/mission",               priority: 0.7 },
  { url: "/about/leadership",            priority: 0.7 },
  { url: "/about/our-team",              priority: 0.7 },
  { url: "/about/client-review",         priority: 0.8 },
  { url: "/about/where-to-start",        priority: 0.7 },
  { url: "/about/price-models",          priority: 0.8 },
  { url: "/about/software-approach",     priority: 0.7 },
  { url: "/about/sustainability-policy", priority: 0.5 },
  { url: "/about/faq",                   priority: 0.7 },
  { url: "/about/our-journey",           priority: 0.7 },
  { url: "/about/awards",                priority: 0.6 },
  { url: "/about/founders-story",        priority: 0.6 },
  { url: "/about/location",              priority: 0.6 },
  { url: "/about/support",               priority: 0.7 },
];

const SERVICE_ROUTES = [
  // Web Development
  { url: "/services/web-development",               priority: 0.9  },
  { url: "/services/web-development/frontend",      priority: 0.9  },
  { url: "/services/web-development/backend",       priority: 0.9  },
  { url: "/services/web-development/full-stack",    priority: 0.9  },

  // Mobile Apps
  { url: "/services/mobile-apps",                   priority: 0.9  },
  { url: "/services/mobile-apps/ios",               priority: 0.9  },
  { url: "/services/mobile-apps/android",           priority: 0.9  },
  { url: "/services/mobile-apps/cross-platform",    priority: 0.9  },

  // Security
  { url: "/services/security",                          priority: 0.9  },
  { url: "/services/security/cyber-security",           priority: 0.9  },
  { url: "/services/security/compliance",               priority: 0.9  },
  { url: "/services/security/security-testing",         priority: 0.85 },
  { url: "/services/security/penetration-testing",      priority: 0.9  },
  { url: "/services/security/siem-services",            priority: 0.85 },

  // Other Services
  { url: "/services/other-services",                        priority: 0.85 },
  { url: "/services/other-services/devops",                 priority: 0.9  },
  { url: "/services/other-services/cloud-engineering",      priority: 0.9  },
  { url: "/services/other-services/data-analytics",         priority: 0.85 },
  { url: "/services/other-services/consultation",           priority: 0.85 },
  { url: "/services/other-services/cost-optimization",      priority: 0.8  },
];

const LEGAL_ROUTES = [
  { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { url: "/terms",          priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const now = new Date().toISOString();

  const staticEntries = [
    ...CORE_ROUTES,
    ...ABOUT_ROUTES,
    ...SERVICE_ROUTES,
    ...LEGAL_ROUTES,
  ].map((route) => ({
    url:             `${SITE_URL}${route.url}`,
    lastModified:    now,
    changeFrequency: route.changeFrequency ?? "monthly",
    priority:        route.priority,
  }));

  // ── Dynamic blog / case study entries (uncomment when CMS is live) ─────────
  //
  // const posts = await fetch(`${process.env.CMS_API_URL}/posts`).then(r => r.json());
  // const blogEntries = posts.map((post) => ({
  //   url:             `${SITE_URL}/blog/${post.slug}`,
  //   lastModified:    new Date(post.updatedAt).toISOString(),
  //   changeFrequency: "monthly",
  //   priority:        0.7,
  // }));
  //
  // const portfolioItems = await fetch(`${process.env.CMS_API_URL}/portfolio`).then(r => r.json());
  // const portfolioEntries = portfolioItems.map((item) => ({
  //   url:             `${SITE_URL}/portfolio/${item.slug}`,
  //   lastModified:    new Date(item.updatedAt).toISOString(),
  //   changeFrequency: "monthly",
  //   priority:        0.8,
  // }));
  //
  // return [...staticEntries, ...blogEntries, ...portfolioEntries];

  return staticEntries;
}