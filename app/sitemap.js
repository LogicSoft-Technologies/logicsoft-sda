import fs from "fs";
import path from "path";

import { getBlogSitemapEntries } from "@/lib/blog-api";
import { CASE_STUDIES } from "@/lib/case-studies-data";
import { SITE_URL } from "@/lib/seo-config";

const APP_DIR = path.join(process.cwd(), "app");

const EXCLUDE = [
  "api",
  "admin",
  "dashboard",
  "login",
  "register",
  "account",
  "search",
];

function isDynamicSegment(segment) {
  return segment.startsWith("[") && segment.endsWith("]");
}

function walkRoutes(directory, baseSegments = []) {
  let routes = [];

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  const hasPage = entries.some((entry) =>
    /^page\.(js|jsx)$/.test(entry.name)
  );

  if (hasPage && !baseSegments.some(isDynamicSegment)) {
    const route = `/${baseSegments.join("/")}`.replace(/\/$/, "") || "/";
    routes.push(route);
  }

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      !EXCLUDE.includes(entry.name) &&
      !entry.name.startsWith("_")
    ) {
      routes = routes.concat(
        walkRoutes(path.join(directory, entry.name), [
          ...baseSegments,
          entry.name,
        ])
      );
    }
  }

  return routes;
}

export default async function sitemap() {
  const now = new Date();
  const staticRoutes = walkRoutes(APP_DIR);

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route === "/blog" || route === "/newsletter"
          ? 0.9
          : route.split("/").length <= 2
            ? 0.8
            : 0.7,
  }));

  const caseStudyEntries = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  try {
    const { posts, categories } = await getBlogSitemapEntries();

    const articleEntries = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || now,
      changeFrequency: "monthly",
      priority: 0.85,
    }));

    const categoryEntries = categories.map((category) => ({
      url: `${SITE_URL}/blog/category/${category.slug}`,
      lastModified: category.updatedAt || now,
      changeFrequency: "weekly",
      priority: 0.75,
    }));

    return [
      ...staticEntries,
      ...caseStudyEntries,
      ...articleEntries,
      ...categoryEntries,
    ];
  } catch (error) {
    console.error("[Sitemap] Blog API unavailable:", error.message);

    return [...staticEntries, ...caseStudyEntries];
  }
}