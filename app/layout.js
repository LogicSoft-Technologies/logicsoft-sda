import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Playfair_Display, Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import GlobalLoader from "@/components/GlobalLoader";
import LiveChatWidget from "@/components/LiveChatWidget";

// ─── Fonts ───────────────────────────────────────────────────────────────────

const playfair = Playfair_Display({
  subsets:  ["latin"],
  weight:   ["400", "500", "600"],
  display:  "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets:  ["latin"],
  display:  "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://www.logicsofttechnologies.com";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a2d4a" },
    { media: "(prefers-color-scheme: dark)",  color: "#1a2d4a" },
  ],
  width:        "device-width",
  initialScale: 1,
};

// ─── Root metadata ──────

export const metadata = {
  title: {
    template: "%s | LogicSoft Technologies",
    default:  "Enterprise Software Development & IT Consulting | LogicSoft Technologies",
  },

  description:
    "LogicSoft Technologies delivers enterprise software development, cybersecurity, cloud engineering, and IT consulting to organisations across Europe, North America, the Middle East, and Africa.",

  keywords: [
    "enterprise software development company",
    "custom software development",
    "cybersecurity consulting",
    "cloud engineering services",
    "DevOps consulting",
    "IT consulting firm",
    "mobile app development",
    "full stack development",
    "software outsourcing company",
    "LogicSoft Technologies",
    "global software company",
    "software development Africa",
  ],

  metadataBase: new URL(SITE_URL),

  // Full absolute URL — relative "/" causes canonical mismatches on some crawlers
  
  alternates: { canonical: SITE_URL },

  robots: {
    index:     true,
    follow:    true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  // Controls link previews on LinkedIn, WhatsApp, Slack, Facebook
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         SITE_URL,
    siteName:    "LogicSoft Technologies",
    title:       "Enterprise Software Development & IT Consulting | LogicSoft Technologies",
    description: "We engineer high-performance software, cloud infrastructure, and cybersecurity solutions for enterprises across 4 continents. 300+ projects delivered.",
    images: [{
      url:    `${SITE_URL}/images/og-image.png`,
      width:  1200,
      height: 630,
      alt:    "LogicSoft Technologies — Enterprise Software Development",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@logicsofttech",
    creator:     "@logicsofttech",
    title:       "Enterprise Software Development & IT Consulting | LogicSoft Technologies",
    description: "High-performance software, cloud infrastructure, and cybersecurity for enterprises worldwide.",
    images:      [`${SITE_URL}/images/og-image.png`],
  },

  // Paste your verification code from https://search.google.com/search-console
  verification: {
    google: "REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_CODE",
  },

  icons: {
    icon:     "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple:    "/apple-touch-icon.png",
    other: [
      { rel: "icon", type: "image/png", sizes: "32x32",   url: "/favicon-32x32.png"         },
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
    ],
  },

  manifest:        "/site.webmanifest",
  applicationName: "LogicSoft Technologies",
  authors:         [{ name: "LogicSoft Technologies", url: SITE_URL }],
  generator:       "Next.js",
  referrer:        "origin-when-cross-origin",
  category:        "technology",

  formatDetection: {
    email:     false,
    address:   false,
    telephone: false,
  },
};

// ─── Structured Data ──────────────────────────────────────────────────────────

const organizationSchema = {
  "@context":    "https://schema.org",
  "@type":       "Organization",
  name:          "LogicSoft Technologies",
  alternateName: "LogicSoft",
  url:           SITE_URL,
  logo: {
    "@type": "ImageObject",
    url:     `${SITE_URL}/images/logicsoft-logo.png`,
    width:   148,
    height:  40,
  },
  description:
    "LogicSoft Technologies is a global software engineering and IT consulting firm delivering custom software development, cybersecurity, cloud engineering, and enterprise IT consulting across Europe, North America, the Middle East, and Africa.",
  foundingLocation: {
    "@type":         "Place",
    addressLocality: "Lagos",
    addressCountry:  "NG",
  },
  address: {
    "@type":         "PostalAddress",
    addressLocality: "Lagos",
    addressRegion:   "Lagos State",
    addressCountry:  "NG",
  },
  contactPoint: [
    {
      "@type":           "ContactPoint",
      telephone:         "+234-901-268-8861",
      contactType:       "sales",
      availableLanguage: ["English"],
    },
    {
      "@type":       "ContactPoint",
      email:         "contact@logicsofttechnologies.online",
      contactType:   "customer support",
    },
  ],
  areaServed: [
    { "@type": "Continent", name: "Africa"         },
    { "@type": "Continent", name: "Europe"         },
    { "@type": "Continent", name: "North America"  },
    { "@type": "Continent", name: "Middle East"    },
    { "@type": "Country",   name: "United Kingdom" },
    { "@type": "Country",   name: "United States"  },
    { "@type": "Country",   name: "Canada"         },
    { "@type": "Country",   name: "Germany"        },
    { "@type": "Country",   name: "UAE"            },
  ],
  sameAs: [
    "https://www.linkedin.com/company/logicsoft-technologies",
    "https://twitter.com/logicsofttech",
    "https://wa.me/2349012688861",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name:    "Software Engineering & IT Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Frontend Development",     url: `${SITE_URL}/services/web-development/frontend`          } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend Development",      url: `${SITE_URL}/services/web-development/backend`           } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Stack Development",   url: `${SITE_URL}/services/web-development/full-stack`        } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "iOS App Development",      url: `${SITE_URL}/services/mobile-apps/ios`                   } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Android App Development",  url: `${SITE_URL}/services/mobile-apps/android`               } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cross-Platform Apps",      url: `${SITE_URL}/services/mobile-apps/cross-platform`        } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cybersecurity Consulting", url: `${SITE_URL}/services/security/cyber-security`           } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Penetration Testing",      url: `${SITE_URL}/services/security/penetration-testing`      } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Compliance Services",      url: `${SITE_URL}/services/security/compliance`               } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SIEM Services",            url: `${SITE_URL}/services/security/siem-services`            } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Engineering",        url: `${SITE_URL}/services/other-services/cloud-engineering`  } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DevOps Consulting",        url: `${SITE_URL}/services/other-services/devops`             } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Analytics",           url: `${SITE_URL}/services/other-services/data-analytics`     } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Consultation",          url: `${SITE_URL}/services/other-services/consultation`       } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cost Optimisation",        url: `${SITE_URL}/services/other-services/cost-optimization`  } },
    ],
  },
};

const websiteSchema = {
  "@context":  "https://schema.org",
  "@type":     "WebSite",
  name:        "LogicSoft Technologies",
  url:         SITE_URL,
  description: "Enterprise software development, cybersecurity, cloud engineering, and IT consulting for organisations worldwide.",
  inLanguage:  "en",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type":     "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Root layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <GlobalLoader />
        <ScrollToTop />
        <Navbar />
        {children}
        <LiveChatWidget />
        <Footer />
        <div id="dropdown-root" />
      </body>
    </html>
  );
}