import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(currentFile), "..");
const appRoot = path.join(projectRoot, "app");
const applyChanges = process.argv.includes("--apply");
const backupRoot = path.join(
  projectRoot,
  `.metadata-client-backup-${new Date().toISOString().replace(/[:.]/g, "-")}`,
);

const clientDirectivePattern = /^\s*(['"])use client\1\s*;?/m;

const metadataBlockPattern =
  /^\s*import\s*\{\s*createMetadata\s*\}\s*from\s*["'][^"']+["'];\s*\r?\n\s*\r?\n\s*export\s+const\s+metadata\s*=\s*createMetadata\(\{[\s\S]*?\}\);\s*(?:\r?\n)?/m;

async function getFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && /^page\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

const pages = await getFiles(appRoot);
const affected = [];

for (const pagePath of pages) {
  const source = await fs.readFile(pagePath, "utf8");
  const clientMatch = source.match(clientDirectivePattern);
  const metadataMatch = source.match(metadataBlockPattern);

  if (
    !clientMatch ||
    !metadataMatch ||
    metadataMatch.index === undefined ||
    clientMatch.index === undefined ||
    metadataMatch.index > clientMatch.index
  ) {
    continue;
  }

  affected.push({ pagePath, source, metadataMatch });
}

console.log(`Found ${affected.length} affected page(s):`);

for (const item of affected) {
  console.log(`- ${path.relative(projectRoot, item.pagePath)}`);
}

if (!applyChanges) {
  console.log("\nDry run only. No files changed.");
  console.log("Run again with --apply when the list looks correct.");
  process.exit(0);
}

await fs.mkdir(backupRoot, { recursive: true });

for (const { pagePath, source, metadataMatch } of affected) {
  const pageDirectory = path.dirname(pagePath);
  const layoutPath = path.join(pageDirectory, "layout.jsx");

  try {
    await fs.access(layoutPath);
    console.warn(
      `Skipped ${path.relative(projectRoot, pagePath)} because layout.jsx already exists.`,
    );
    continue;
  } catch {
    // No existing layout: safe to create one.
  }

  const relativePagePath = path.relative(projectRoot, pagePath);
  const backupPath = path.join(backupRoot, relativePagePath);

  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  await fs.copyFile(pagePath, backupPath);

  const metadataBlock = metadataMatch[0].trimEnd();

  const withoutMetadata =
    source.slice(0, metadataMatch.index) +
    source.slice(metadataMatch.index + metadataMatch[0].length);

  const clientMatch = withoutMetadata.match(clientDirectivePattern);

  if (!clientMatch || clientMatch.index === undefined) {
    console.warn(`Skipped ${relativePagePath}: client directive was not found.`);
    continue;
  }

  const withoutClientDirective =
    withoutMetadata.slice(0, clientMatch.index) +
    withoutMetadata.slice(clientMatch.index + clientMatch[0].length);

  const updatedPage = `"use client";\n${withoutClientDirective.trimStart()}`;

  const layout = `${metadataBlock}

export default function RouteMetadataLayout({ children }) {
  return children;
}
`;

  await fs.writeFile(layoutPath, layout, "utf8");
  await fs.writeFile(pagePath, updatedPage, "utf8");

  console.log(`Fixed ${relativePagePath}`);
}

console.log(`\nDone. Originals were backed up in:\n${backupRoot}`);