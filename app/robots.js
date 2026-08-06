import { SITE_URL } from "@/lib/seo-config";

export default function robots() {
  return {
    rules: [
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
          "/*?utm_source=*",
          "/*?utm_medium=*",
          "/*?utm_campaign=*",
          "/*?ref=*",
          "/*?source=*",
          "/_next/",
          "/search?*",
        ],
      },

      { userAgent: "GPTBot",          disallow: "/" },
      { userAgent: "ChatGPT-User",    disallow: "/" },
      { userAgent: "CCBot",           disallow: "/" },
      { userAgent: "anthropic-ai",    disallow: "/" },
      { userAgent: "Claude-Web",      disallow: "/" },
      { userAgent: "ClaudeBot",       disallow: "/" },
      { userAgent: "cohere-ai",       disallow: "/" },
      { userAgent: "PerplexityBot",   disallow: "/" },
      { userAgent: "Omgilibot",       disallow: "/" },
      { userAgent: "FacebookBot",     disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Bytespider",      disallow: "/" },
      { userAgent: "DataForSeoBot",   disallow: "/" },

      { userAgent: "AhrefsBot",  crawlDelay: 10 },
      { userAgent: "SemrushBot", crawlDelay: 10 },
      { userAgent: "MJ12bot",    disallow: "/" },
      { userAgent: "DotBot",     disallow: "/" },
      { userAgent: "BLEXBot",    disallow: "/" },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}