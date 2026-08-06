const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");
const LIB_METADATA = path.join(__dirname, "..", "lib", "metadata.js");
const DRY_RUN = process.argv.includes("--dry-run");

const SKIPPED = [];
const UPDATED = [];

function toTitleCase(slug) {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function isDynamicSegment(segment) {
  return segment.startsWith("[") && segment.endsWith("]");
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/^page\.(js|jsx)$/.test(entry.name)) {
      processPage(fullPath);
    }
  }
}

function processPage(filePath) {
  const relFromApp = path.relative(APP_DIR, filePath);
  const routeSegments = relFromApp.split(path.sep).slice(0, -1);
  const routePath = "/" + routeSegments.join("/");
  const hasDynamic = routeSegments.some(isDynamicSegment);
  const content = fs.readFileSync(filePath, "utf8");

  if (hasDynamic) {
    SKIPPED.push({ filePath, reason: "dynamic route - needs generateMetadata() with params" });
    return;
  }
  if (/["']use client["']/.test(content.split("\n")[0])) {
    SKIPPED.push({ filePath, reason: "use client - metadata not allowed here" });
    return;
  }
  if (/export const metadata|export (async )?function generateMetadata/.test(content)) {
    SKIPPED.push({ filePath, reason: "already has metadata" });
    return;
  }

  const lastSegment = routeSegments[routeSegments.length - 1] || "Home";
  const title = toTitleCase(lastSegment);
  const description = "LogicSoft Technologies - " + title + ". TODO: replace with a real 1-2 sentence description for this page.";

  const relImportPath = path.relative(path.dirname(filePath), path.dirname(LIB_METADATA)).split(path.sep).join("/");
  const importPath = (relImportPath.startsWith(".") ? relImportPath : "./" + relImportPath) + "/metadata";

  const injection = "import { createMetadata } from \"" + importPath + "\";\n\nexport const metadata = createMetadata({\n  title: \"" + title + "\",\n  description:\n    \"" + description + "\",\n  path: \"" + routePath + "\",\n});\n\n";

  const newContent = injection + content;

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, newContent, "utf8");
  }

  UPDATED.push({ filePath: relFromApp, title, routePath });
}

walk(APP_DIR);

console.log("\n" + (DRY_RUN ? "[DRY RUN] " : "") + "Updated " + UPDATED.length + " files:\n");
UPDATED.forEach((u) => console.log("  OK " + u.filePath + "  ->  title: \"" + u.title + "\", path: \"" + u.routePath + "\""));

console.log("\nSkipped " + SKIPPED.length + " files:\n");
SKIPPED.forEach((s) => console.log("  - " + path.relative(APP_DIR, s.filePath) + "  (" + s.reason + ")"));

console.log("\nDone. " + (DRY_RUN ? "Run again without --dry-run to apply changes." : "Files written.") + "\n");
