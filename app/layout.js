import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Playfair_Display, Inter } from "next/font/google";
import ScrollToTop from "@/components/ScrollToTop";
import GlobalLoader from "@/components/GlobalLoader";
import LiveChatWidget from "@/components/LiveChatWidget";
import MascotPeekaboo from "@/components/robot/MascotPeekaboo";
import MascotHideout from "@/components/robot/MascotHideout";
import Script from "next/script";

import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  THEME_COLOR,
  CONTACT,
  SOCIAL_LINKS,
} from "@/lib/seo-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default:
      "Custom Software Development Company | Web, Mobile, AI & Cloud | LogicSoft Technologies",
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "software development company",
    "custom software development",
    "website development company",
    "web development company",
    "mobile app development company",
    "enterprise software development",
    "React development company",
    "Next.js development",
    "Node.js development",
    "AI software development",
    "AI development company",
    "cloud engineering",
    "DevOps consulting",
    "cybersecurity company",
    "penetration testing",
    "UI UX design",
    "startup MVP development",
    "ecommerce development",
    "IT consulting",
    "software outsourcing",
    "LogicSoft Technologies",
  ],

  metadataBase: new URL(SITE_URL),

  alternates: { canonical: SITE_URL },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "Custom Software Development Company | Web, Mobile, AI & Cloud | LogicSoft Technologies",
    description:
      "We engineer high-performance software, cloud infrastructure, and cybersecurity solutions for enterprises across 4 continents. 300+ projects delivered.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title:
      "Custom Software Development Company | Web, Mobile, AI & Cloud | LogicSoft Technologies",
    description:
      "High-performance software, cloud infrastructure, and cybersecurity for enterprises worldwide.",
    images: [`${SITE_URL}/og-image.jpg`],
  },

  verification: {
    google: "6f6N8jwJZu1qRuxVeTXhwF6b6vP5cpxdJV2bhIUucHg",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
    ],
  },

  manifest: "/site.webmanifest",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "technology",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: "LogicSoft",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logicsoft-logo.png`,
    width: 148,
    height: 40,
  },
  description: SITE_DESCRIPTION,
  foundingLocation: {
    "@type": "Place",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressRegion: "Lagos State",
    addressCountry: "NG",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      contactType: "sales",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      email: CONTACT.email,
      contactType: "customer support",
    },
  ],
  areaServed: [
    { "@type": "Continent", name: "Africa" },
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Continent", name: "Middle East" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "UAE" },
  ],
  sameAs: SOCIAL_LINKS,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Engineering & IT Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Frontend Development",
          url: `${SITE_URL}/services/web-development/frontend`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Backend Development",
          url: `${SITE_URL}/services/web-development/backend`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Full Stack Development",
          url: `${SITE_URL}/services/web-development/full-stack`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "iOS App Development",
          url: `${SITE_URL}/services/mobile-apps/ios`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Android App Development",
          url: `${SITE_URL}/services/mobile-apps/android`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cross-Platform Apps",
          url: `${SITE_URL}/services/mobile-apps/cross-platform`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cybersecurity Consulting",
          url: `${SITE_URL}/services/security/cyber-security`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Penetration Testing",
          url: `${SITE_URL}/services/security/penetration-testing`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Compliance Services",
          url: `${SITE_URL}/services/security/compliance`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SIEM Services",
          url: `${SITE_URL}/services/security/siem-services`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud Engineering",
          url: `${SITE_URL}/services/other-services/cloud-engineering`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "DevOps Consulting",
          url: `${SITE_URL}/services/other-services/devops`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Data Analytics",
          url: `${SITE_URL}/services/other-services/data-analytics`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "IT Consultation",
          url: `${SITE_URL}/services/other-services/consultation`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cost Optimisation",
          url: `${SITE_URL}/services/other-services/cost-optimization`,
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <GlobalLoader />
        <ScrollToTop />
        <Navbar />
        {children}
        <MascotPeekaboo />
        <MascotHideout />
        <LiveChatWidget />
        <Footer />
        <div id="dropdown-root" />
      </body>
    </html>
  );
}