import {
  SITE_NAME,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  absoluteUrl,
} from "./seo-config";

const DEFAULT_OG_IMAGE = "/og-image.jpg";

function stripSiteName(title = "") {
  return String(title)
    .replace(
      new RegExp(`\\s*[|–—-]\\s*${SITE_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i"),
      ""
    )
    .trim();
}

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
  article,
} = {}) {
  const pageTitle = title ? stripSiteName(title) : undefined;
  const fullTitle = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    // The root layout template adds “| LogicSoft Technologies” once.
    title: pageTitle,
    description,

    alternates: {
      canonical: url,
    },

    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },

    openGraph: {
      type,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      ...(type === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
          }
        : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}