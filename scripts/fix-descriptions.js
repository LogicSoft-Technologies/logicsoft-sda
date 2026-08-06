const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");

const DESCRIPTIONS = {
  "/": "Enterprise software development, cybersecurity, cloud engineering, and IT consulting for organisations across Africa, Europe, North America, and the Middle East.",
  "/about/about-company": "Learn about LogicSoft Technologies - our company profile, engineering capabilities, and track record delivering enterprise software across four continents.",
  "/about/awards": "Industry awards, certifications, and recognitions earned by LogicSoft Technologies for enterprise software delivery and technical excellence.",
  "/about/client-review": "Read testimonials and client reviews from organisations that have partnered with LogicSoft Technologies on enterprise software and IT projects.",
  "/about/faq": "Answers to common questions about working with LogicSoft Technologies, including our process, pricing, timelines, and support.",
  "/about/founders-story": "The story behind LogicSoft Technologies - why we were founded and the vision driving our approach to enterprise software.",
  "/about/leadership": "Meet the leadership team guiding LogicSoft Technologies' strategy, engineering standards, and client delivery.",
  "/about/location": "Find LogicSoft Technologies' office locations, addresses, and contact details.",
  "/about/mission": "LogicSoft Technologies' mission and vision - our commitment to reliable, secure, and scalable enterprise technology.",
  "/about/our-journey": "The LogicSoft Technologies story from founding to today - key milestones in our growth as an enterprise software partner.",
  "/about/our-team": "Meet the engineers, designers, and consultants at LogicSoft Technologies who build and deliver enterprise software solutions.",
  "/about/portfolio": "Browse LogicSoft Technologies' portfolio of enterprise software, cybersecurity, and cloud engineering projects.",
  "/about/price-models": "Explore LogicSoft Technologies' engagement and pricing models, including fixed-price, dedicated team, and retainer options.",
  "/about/software-approach": "LogicSoft Technologies' software engineering approach - agile delivery, sprint-based development, and quality-first practices.",
  "/about/support": "Technical support and account management services available to LogicSoft Technologies clients.",
  "/about/sustainability-policy": "LogicSoft Technologies' sustainability policy - our commitments to responsible technology and social impact.",
  "/about/where-to-start": "Not sure where to begin? A guided overview to help you choose the right LogicSoft Technologies service for your project.",
  "/application/cloud": "Cloud application services from LogicSoft Technologies - architecture, deployment, and management for cloud-hosted applications.",
  "/application/development": "Custom application development services from LogicSoft Technologies, built for performance, security, and scale.",
  "/application/intergration": "Application integration services from LogicSoft Technologies - connecting systems, APIs, and data across your technology stack.",
  "/application/management": "Ongoing application management services from LogicSoft Technologies, covering monitoring, maintenance, and performance optimisation.",
  "/application/modernization": "Application modernization services from LogicSoft Technologies - migrating legacy systems to modern, scalable architectures.",
  "/application/security": "Application security services from LogicSoft Technologies, including vulnerability assessment and secure development practices.",
  "/application/services": "An overview of LogicSoft Technologies' application services - development, integration, modernization, security, and support.",
  "/application/support": "Ongoing application support services from LogicSoft Technologies, keeping your business-critical applications running reliably.",
  "/application/testing": "Application testing services from LogicSoft Technologies, covering functional, performance, and security testing.",
  "/digital-transformation": "Digital transformation consulting and delivery from LogicSoft Technologies, helping enterprises modernize processes and technology.",
  "/how-we-work/project-management": "How LogicSoft Technologies manages enterprise software projects end to end, from scoping through delivery.",
  "/industries": "Industries served by LogicSoft Technologies, including fintech, healthcare, logistics, retail, and government.",
  "/it-consulting": "IT consulting services from LogicSoft Technologies - strategic technology advisory for enterprise organisations.",
  "/it-consulting/crisis": "Crisis IT consulting from LogicSoft Technologies, providing rapid-response support during critical technology incidents.",
  "/it-consulting/enterprise": "Enterprise IT consulting services from LogicSoft Technologies, tailored to large-scale organisational technology needs.",
  "/it-consulting/platform": "Platform consulting services from LogicSoft Technologies, helping organisations select and implement the right technology platforms.",
  "/it-consulting/solution": "Solution consulting from LogicSoft Technologies, designing technology solutions aligned to specific business challenges.",
  "/it-consulting/training": "IT training services from LogicSoft Technologies, equipping teams with the skills to manage and scale their technology.",
  "/itsm": "IT Service Management (ITSM) consulting and implementation from LogicSoft Technologies, streamlining how your organisation delivers IT services.",
  "/portfolio": "Explore 200+ project case studies delivered by LogicSoft Technologies across fintech, healthcare, logistics, and more.",
  "/project-management": "Project management services from LogicSoft Technologies, ensuring enterprise software projects are delivered on time and on budget.",
  "/qa/consulting": "QA consulting services from LogicSoft Technologies, helping organisations build effective quality assurance strategies.",
  "/qa/outsourcing": "QA outsourcing services from LogicSoft Technologies, providing dedicated testing teams for your software projects.",
  "/robot": "PLACEHOLDER - confirm what this page is about, then update this description manually.",
  "/services/mobile-apps/android": "Native Android app development services from LogicSoft Technologies, built for performance across all device types.",
  "/services/mobile-apps/cross-platform": "Cross-platform mobile app development from LogicSoft Technologies using React Native and Flutter - one codebase, iOS and Android.",
  "/services/mobile-apps/ios": "Native iOS app development services from LogicSoft Technologies, built with Swift and SwiftUI for the Apple ecosystem.",
  "/services/other-services/cloud-engineering": "Cloud engineering services from LogicSoft Technologies - architecture, migration, and managed cloud on AWS, Azure, and GCP.",
  "/services/other-services/consultation": "Vendor-neutral technology consultation from LogicSoft Technologies, including architecture reviews and strategic advisory.",
  "/services/other-services/cost-optimization": "Cloud and infrastructure cost optimization services from LogicSoft Technologies, reducing spend without compromising performance.",
  "/services/other-services/data-analytics": "Data analytics services from LogicSoft Technologies, including BI dashboards, data pipelines, and machine learning infrastructure.",
  "/services/other-services/devops": "DevOps consulting and implementation from LogicSoft Technologies, covering CI/CD pipelines, Kubernetes, and infrastructure automation.",
  "/services/security/compliance": "Compliance services from LogicSoft Technologies, supporting ISO 27001, GDPR, NDPR, and PCI DSS certification readiness.",
  "/services/security/cyber-security": "Full-spectrum cybersecurity services from LogicSoft Technologies - offensive testing, threat modelling, and defensive architecture.",
  "/services/security/penetration-testing": "Authorised penetration testing services from LogicSoft Technologies across web, mobile, API, network, and cloud environments.",
  "/services/security/security-testing": "Security testing services from LogicSoft Technologies, including SAST, DAST, and manual vulnerability analysis.",
  "/services/security/siem-services": "24/7 SIEM services from LogicSoft Technologies, providing real-time threat detection and automated incident alerting.",
  "/services/web-development/backend": "Backend development services from LogicSoft Technologies - scalable APIs and server-side systems built with Node.js, Python, and Go.",
  "/services/web-development/frontend": "Frontend development services from LogicSoft Technologies, building accessible, high-performance interfaces with React and Next.js.",
  "/services/web-development/full-stack": "Full-stack web development services from LogicSoft Technologies, delivering complete applications from database to browser.",
  "/software-development/consulting": "Software development consulting from LogicSoft Technologies, providing strategic guidance on architecture and technical decisions.",
  "/software-development/custom": "Custom software development services from LogicSoft Technologies, built around your organisation's specific requirements.",
  "/software-development/outsourcing": "Software development outsourcing from LogicSoft Technologies, giving you dedicated engineering teams without the overhead of hiring.",
  "/software-development/product": "Product software development services from LogicSoft Technologies, taking your idea from concept to a market-ready application.",
  "/software-development/services": "An overview of LogicSoft Technologies' software development services, from custom builds to staff augmentation.",
  "/software-development/staff-augmentation": "Staff augmentation services from LogicSoft Technologies, extending your engineering team with experienced developers.",
  "/software-development/support": "Ongoing software support services from LogicSoft Technologies, keeping your applications maintained, secure, and up to date.",
  "/software-testing": "Software testing services from LogicSoft Technologies, covering functional, performance, security, and usability testing.",
  "/technologies": "The technologies and tools LogicSoft Technologies works with, including React, Node.js, AWS, and Kubernetes.",
  "/testing/automation": "Test automation services from LogicSoft Technologies, building reliable automated testing pipelines for faster releases.",
  "/testing/functional": "Functional testing services from LogicSoft Technologies, verifying software behaves correctly against business requirements.",
  "/testing/penetration": "Penetration testing services from LogicSoft Technologies, simulating real-world attacks to uncover security vulnerabilities.",
  "/testing/performance": "Performance testing services from LogicSoft Technologies, ensuring your application performs reliably under real-world load.",
  "/testing/security": "Security testing services from LogicSoft Technologies, identifying vulnerabilities before they reach production.",
  "/testing/usability": "Usability testing services from LogicSoft Technologies, ensuring your application is intuitive and easy to use.",
};

let updated = 0;
let skipped = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/^page\.(js|jsx)$/.test(entry.name) || /^layout\.(js|jsx)$/.test(entry.name)) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  if (!content.includes("TODO: replace with a real")) {
    return;
  }

  const pathMatch = content.match(/path:\s*"([^"]*)"/);
  if (!pathMatch) {
    skipped++;
    console.log("  SKIP (no path found): " + path.relative(APP_DIR, filePath));
    return;
  }

  const routePath = pathMatch[1];
  const newDescription = DESCRIPTIONS[routePath];

  if (!newDescription) {
    skipped++;
    console.log("  SKIP (no description mapped for " + routePath + "): " + path.relative(APP_DIR, filePath));
    return;
  }

  const newContent = content.replace(
    /description:\s*\n?\s*"[^"]*TODO[^"]*"/,
    "description:\n    \"" + newDescription + "\""
  );

  if (newContent === content) {
    skipped++;
    console.log("  SKIP (regex did not match): " + path.relative(APP_DIR, filePath));
    return;
  }

  fs.writeFileSync(filePath, newContent, "utf8");
  updated++;
  console.log("  OK updated: " + path.relative(APP_DIR, filePath) + "  [" + routePath + "]");
}

walk(APP_DIR);

console.log("\nUpdated " + updated + " files, skipped " + skipped + ".\n");
