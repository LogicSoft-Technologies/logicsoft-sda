// app/sitemap.js
import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/seo-config";
import { CASE_STUDIES } from "@/lib/case-studies-data";

const APP_DIR = path.join(process.cwd(), "app");

// Folders that shouldn't appear in the sitemap
const EXCLUDE = ["api", "admin", "dashboard", "login", "register", "account", "search"];

function isDynamicSegment(segment) {
  return segment.startsWith("[") && segment.endsWith("]");
}

function walkRoutes(dir, baseSegments = []) {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const hasPage = entries.some((e) => /^page\.(js|jsx)$/.test(e.name));
  if (hasPage && !baseSegments.some(isDynamicSegment)) {
    const routePath = "/" + baseSegments.join("/");
    routes.push(routePath === "/" ? "/" : routePath.replace(/\/$/, ""));
  }

  for (const entry of entries) {
    if (entry.isDirectory() && !EXCLUDE.includes(entry.name) && !entry.name.startsWith("_")) {
      routes = routes.concat(walkRoutes(path.join(dir, entry.name), [...baseSegments, entry.name]));
    }
  }

  return routes;
}

export default function sitemap() {
  const now = new Date().toISOString();
  const routes = walkRoutes(APP_DIR);

  const staticEntries = routes.map((url) => ({
    url: `${SITE_URL}${url}`,
    lastModified: now,
    changeFrequency: url === "/" ? "weekly" : "monthly",
    priority: url === "/" ? 1.0 : url.split("/").length <= 2 ? 0.8 : 0.7,
  }));

  const caseStudyEntries = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/case-studies/${study.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...caseStudyEntries];
}