const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");

const PAGES = [
  { dir: "contact", title: "Contact Us", description: "Get in touch with LogicSoft Technologies for enterprise software, cybersecurity, and cloud engineering services." },
  { dir: "docs", title: "Documentation", description: "Documentation and resources from LogicSoft Technologies." },
  { dir: "how-we-work/architecture-coe", title: "Architecture Center of Excellence", description: "How LogicSoft Technologies structures enterprise architecture governance and best practices." },
  { dir: "how-we-work/change-request", title: "Change Request Process", description: "How LogicSoft Technologies manages change requests across enterprise projects." },
  { dir: "how-we-work/collaboration", title: "Collaboration", description: "How LogicSoft Technologies collaborates with clients throughout the engagement." },
  { dir: "how-we-work/competency-coe", title: "Competency Center of Excellence", description: "LogicSoft Technologies competency centers and technical excellence programs." },
  { dir: "how-we-work/estimate", title: "Project Estimation", description: "How LogicSoft Technologies scopes and estimates enterprise software projects." },
  { dir: "how-we-work/pmo", title: "Project Management Office", description: "LogicSoft Technologies PMO practices for enterprise project delivery." },
  { dir: "how-we-work/project-management", title: "Project Management", description: "How LogicSoft Technologies manages enterprise software projects end to end." },
  { dir: "how-we-work/reporting", title: "Reporting", description: "How LogicSoft Technologies reports project progress to enterprise clients." },
  { dir: "how-we-work/resources", title: "Resource Management", description: "How LogicSoft Technologies allocates and manages project resources." },
  { dir: "how-we-work/risk-management", title: "Risk Management", description: "How LogicSoft Technologies identifies and manages project risk." },
  { dir: "how-we-work/scoping", title: "Project Scoping", description: "How LogicSoft Technologies scopes enterprise software engagements." },
  { dir: "how-we-work/success-measurement", title: "Success Measurement", description: "How LogicSoft Technologies measures project and delivery success." },
  { dir: "portal", title: "Client Portal", description: "LogicSoft Technologies client portal access." },
  { dir: "privacy-policy", title: "Privacy Policy", description: "LogicSoft Technologies privacy policy and data handling practices." },
  { dir: "runbooks", title: "Runbooks", description: "Operational runbooks from LogicSoft Technologies." },
  { dir: "search", title: "Search", description: "Search LogicSoft Technologies services, resources, and content." },
  { dir: "service", title: "Service", description: "LogicSoft Technologies service overview." },
  { dir: "updates", title: "Updates", description: "Latest updates and news from LogicSoft Technologies." },
];

let created = 0;
let skipped = 0;

PAGES.forEach(({ dir, title, description }) => {
  const folderPath = path.join(APP_DIR, ...dir.split("/"));
  const layoutPath = path.join(folderPath, "layout.jsx");
  const routePath = "/" + dir;

  if (!fs.existsSync(folderPath)) {
    console.log("  SKIP (folder not found): " + dir);
    skipped++;
    return;
  }

  if (fs.existsSync(layoutPath)) {
    console.log("  SKIP (layout.jsx already exists): " + dir);
    skipped++;
    return;
  }

  const relImportPath = path.relative(folderPath, path.join(APP_DIR, "..", "lib")).split(path.sep).join("/");
  const importPath = (relImportPath.startsWith(".") ? relImportPath : "./" + relImportPath) + "/metadata";

  const content = "import { createMetadata } from \"" + importPath + "\";\n\nexport const metadata = createMetadata({\n  title: \"" + title + "\",\n  description:\n    \"" + description + "\",\n  path: \"" + routePath + "\",\n});\n\nexport default function Layout({ children }) {\n  return children;\n}\n";

  fs.writeFileSync(layoutPath, content, "utf8");
  console.log("  OK created: " + dir + "/layout.jsx");
  created++;
});

console.log("\nCreated " + created + " layout files, skipped " + skipped + ".\n");
