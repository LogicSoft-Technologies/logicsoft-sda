// lib/seo-config.js
// Single source of truth for LogicSoft Technologies branding & SEO.
// When you buy logicsofttechnologies.com, only update SITE_URL.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://logicsofttechnologies.online";

export const SITE_NAME = "LogicSoft Technologies";

export const SITE_DESCRIPTION =
  "LogicSoft Technologies delivers enterprise software development, cybersecurity, cloud engineering, AI solutions, and IT consulting to organisations across Europe, North America, the Middle East, and Africa.";

export const THEME_COLOR = "#1a2d4a";

// X (formerly Twitter)
export const TWITTER_HANDLE = "@logicsofttech";

export const CONTACT = {
  phone: "+234-901-268-8861",
  email: "contact@logicsofttechnologies.online",
  whatsapp: "https://wa.me/2349012688861",
};

export const SOCIAL = {
  linkedin: {
    name: "LogicSoft Technologies",
    url: "https://www.linkedin.com/company/logicsoft-technologies",
  },

  twitter: {
    name: "LogicSoft Technologies",
    username: "logicsofttech",
    url: "https://twitter.com/logicsofttech",
  },

  instagram: {
    name: "LogicSoft Technologies",
    username: "logicsoft.sdc",
    url: "https://www.instagram.com/logicsoft.sdc",
  },

  tiktok: {
    name: "LogicSoft",
    username: "logicsoft.sdc",
    url: "https://www.tiktok.com/@logicsoft.sdc",
  },

  whatsapp: {
    name: "WhatsApp",
    url: CONTACT.whatsapp,
  },
};

// Used by JSON-LD (sameAs), metadata, footer, sitemap, etc.
export const SOCIAL_LINKS = Object.values(SOCIAL).map(
  (platform) => platform.url
);

// Helper to build absolute URLs consistently across metadata, sitemap, robots
export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}