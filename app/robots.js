// app/robots.js
// Next.js auto-generates /robots.txt from this file.

const SITE_URL = "https://www.logicsofttechnologies.com";

export default function robots() {
  return {
    rules: [
      // ── Good crawlers ─────────────────────────────────────────────────────
      // Allow everything except internal / private routes.
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/login/",
          "/register/",
          "/account/",
          "/api/",
          "/thank-you/",
          // Block tracking-parameter URLs — prevents duplicate-content dilution
          "/*?utm_source=*",
          "/*?utm_medium=*",
          "/*?utm_campaign=*",
          "/*?ref=*",
          "/*?source=*",
          // Block Next.js internals — no crawl-budget value
          "/_next/",
          // Block search result pages if you ever add site search
          "/search?*",
        ],
      },

      // ── AI training scrapers ──────────────────────────────────────────────
      // No SEO value — only waste crawl budget and server resources.
      { userAgent: "GPTBot",            disallow: "/" },
      { userAgent: "ChatGPT-User",      disallow: "/" },
      { userAgent: "CCBot",             disallow: "/" },
      { userAgent: "anthropic-ai",      disallow: "/" },
      { userAgent: "Claude-Web",        disallow: "/" },
      { userAgent: "ClaudeBot",         disallow: "/" },
      { userAgent: "cohere-ai",         disallow: "/" },
      { userAgent: "PerplexityBot",     disallow: "/" },
      { userAgent: "Omgilibot",         disallow: "/" },
      { userAgent: "FacebookBot",       disallow: "/" },
      { userAgent: "Google-Extended",   disallow: "/" },
      { userAgent: "Bytespider",        disallow: "/" },
      { userAgent: "DataForSeoBot",     disallow: "/" },

      // ── SEO audit bots ────────────────────────────────────────────────────
      // Throttle rather than ban — useful for your own audits, burn crawl
      // budget when left unthrottled.
      { userAgent: "AhrefsBot",  crawlDelay: 10 },
      { userAgent: "SemrushBot", crawlDelay: 10 },
      { userAgent: "MJ12bot",    disallow: "/"  },
      { userAgent: "DotBot",     disallow: "/"  },
      { userAgent: "BLEXBot",    disallow: "/"  },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
    host:    SITE_URL,
  };
}