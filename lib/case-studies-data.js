// lib/case-studies-data.js
// Single source of truth for both the /portfolio grid and the
// /case-studies/[id] detail page. Keeping this in one file means the
// card preview and the full case study can never drift out of sync.

export const CATEGORIES = [
  "All",
  "Enterprise Platforms",
  "FinTech & Banking",
  "Healthcare",
  "E-Commerce",
  "Data & Analytics",
  "Mobile Apps",
  "UI/UX & Design",
  "Infrastructure",
];

export const CASE_STUDIES = [
  {
    id: 1,
    title: "SafeTrade Gift Card Exchange Platform",
    client: "Owodex",
    category: "FinTech & Banking",
    image: "/images/owodex-desktop.png",
    website: "https://owodex.com",
    // Drop your recorded product-flow video at this path (mp4, ideally
    // 15–30s, muted/looping). Poster falls back to `image` until it loads.
    video: "/videos/owodex.mp4",
    year: "2023",
    duration: "8 months",
    outcome: "40% faster processing",
    tags: ["Node.js", "React.js", "Tailwind CSS", "REST API"],
    description:
      "Exchange your gift cards for cash with confidence. Owodex provides fast transactions, secure verification, and the best exchange rates.",
    featured: true,
    resultBg: "#dbeafe",
    resultText: "#1d4ed8",
    industry: "Banking & FinTech",
    teamSize: "9 engineers · 1 PM · 1 QA lead",
    role: "Systems integration, backend architecture, compliance tooling",
    challenge:
      "Owodex ran six disconnected core banking systems across its branch network. Every night, staff manually reconciled transactions across all six, which pushed regulatory compliance reports out by up to three days and left branch managers working from numbers that were already stale by the time they saw them.",
    solution:
      "We designed a real-time integration layer of Node.js microservices sitting in front of all six legacy systems, normalizing every transaction into a single event stream on arrival. A compliance dashboard now generates the reports regulators need automatically, and branch managers see reconciled balances as they happen instead of the next morning.",
    results: [
      { value: "40%", label: "Faster transaction processing" },
      { value: "6 → 1", label: "Legacy systems unified" },
      { value: "3 days → real-time", label: "Compliance reporting turnaround" },
      { value: "99.98%", label: "Platform uptime since launch" },
    ],
    techStack: ["Node.js", "React.js", "Tailwind CSS", "REST API", "Kafka", "Docker", "Redis"],
    testimonial: {
      quote:
        "Reconciliation used to be the thing our ops team dreaded every night. Now it's not a task at all it just happens. That single change freed up more institutional time than any other project we've run in five years.",
      name: "Director of Technology",
      role: "Owodex",
    },
  },
  {
    id: 2,
    title: "Meeting Workspace",
    client: "Telefya",
    category: "Enterprise Platforms",
    image: "/images/telefya-main.png",
    website: "https://telefya.com",
    video: "/videos/telefya.mp4",
    year: "2026",
    duration: "6 months",
    outcome: "60% efficiency gain",
    tags: ["Vue.js", "Python", "PostgreSQL", "Google Maps API"],
    description:
      "End-to-end meeting workspace integrating real-time collaboration, scheduling, and communication tools across all countries.",
    featured: false,
    resultBg: "#fff7ed",
    resultText: "#d97706",
    industry: "Communications Technology",
    teamSize: "5 engineers · 1 PM",
    role: "Platform build, route optimization, ERP integration",
    challenge:
      "Telefya ran fleet operations across three countries using a mix of spreadsheets and a legacy dispatch tool that didn't talk to their ERP, so dispatchers were routing trucks manually and maintenance was scheduled reactively, after something broke.",
    solution:
      "We built a single fleet platform combining live GPS tracking, driver management, and predictive maintenance scheduling, with a route optimization engine on top of the Google Maps API and a two-way sync back into their ERP so finance always sees current fuel and maintenance costs.",
    results: [
      { value: "60%", label: "Gain in fleet operational efficiency" },
      { value: "3", label: "Countries on one platform" },
      { value: "22%", label: "Reduction in fuel cost per route" },
      { value: "0", label: "Manual ERP re-entry after launch" },
    ],
    techStack: ["Vue.js", "Python", "PostgreSQL", "Google Maps API", "Docker", "AWS"],
    testimonial: {
      quote:
        "Dispatch used to be a phone call and a guess. Now the system tells us the best route before the driver even asks.",
      name: "Operations Director",
      role: "Telefya",
    },
  },
  {
    id: 3,
    title: "Real Estate Investment Platform",
    client: "Proptech Solutions",
    category: "Enterprise Platforms",
    image: "/images/real-estate.png",
    website: null,
    video: "/videos/case-studies/3.mp4",
    year: "2023",
    duration: "5 months",
    outcome: "3× listing conversion",
    tags: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    description:
      "Full-stack property investment platform with fractional ownership, escrow integration, investor dashboards, and automated valuation models for Lagos and Abuja markets.",
    featured: true,
    resultBg: "#fef3c7",
    resultText: "#b45309",
    industry: "Real Estate & Proptech",
    teamSize: "6 engineers · 1 designer · 1 PM",
    role: "Product design, platform build, payments & escrow integration",
    challenge:
      "Proptech Solutions wanted to let everyday investors buy fractional shares of Lagos and Abuja properties, but existing listing sites weren't built for escrow, ownership splits, or ongoing investor reporting and trust was the whole product.",
    solution:
      "We built fractional ownership and escrow directly into the transaction flow via Stripe, paired with an automated valuation model that keeps every listing's price current, and investor dashboards that show real returns, not just a purchase receipt.",
    results: [
      { value: "3×", label: "Listing-to-investment conversion" },
      { value: "₦2.1B+", label: "Transacted through the platform" },
      { value: "5 months", label: "Concept to public launch" },
      { value: "12k+", label: "Registered investors in year one" },
    ],
    techStack: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS", "AWS"],
    testimonial: {
      quote:
        "We needed people to trust a platform for putting real money into property they'd never physically visit. The team designed for that trust at every step, not just the checkout.",
      name: "Co-Founder",
      role: "Proptech Solutions",
    },
  },
  {
    id: 4,
    title: "Multi-Tenant E-Commerce Marketplace",
    client: "RetailChain West Africa",
    category: "E-Commerce",
    image: "/images/e-commerce.png",
    website: null,
    video: "/videos/case-studies/4.mp4",
    year: "2023",
    duration: "7 months",
    outcome: "40+ stores unified",
    tags: ["React", "Node.js", "Redis", "Elasticsearch"],
    description:
      "Scalable multi-vendor marketplace with real-time inventory sync across 40+ physical stores, dynamic pricing engine, and integrated logistics partner API.",
    featured: false,
    resultBg: "#fce7f3",
    resultText: "#db2777",
    industry: "Retail & E-Commerce",
    teamSize: "8 engineers · 1 PM · 1 QA lead",
    role: "Platform architecture, inventory systems, logistics integration",
    challenge:
      "RetailChain's 40+ physical stores each managed their own stock sheets. Online orders regularly sold items that were already gone from the shelf, and the brand had no way to run a single promotion across every location at once.",
    solution:
      "We built a multi-tenant marketplace backed by a real-time inventory sync layer, so every store's stock reflects instantly online. A dynamic pricing engine handles chain-wide and store-level promotions, and a logistics partner API routes each order to the nearest store with stock on hand.",
    results: [
      { value: "40+", label: "Stores unified on one system" },
      { value: "0", label: "Oversell incidents since launch" },
      { value: "2.4×", label: "Online order volume, six months in" },
      { value: "60%", label: "Faster fulfillment routing" },
    ],
    techStack: ["React", "Node.js", "Redis", "Elasticsearch", "PostgreSQL", "AWS"],
    testimonial: {
      quote:
        "We went from spreadsheets deciding what we could sell online to the opposite problem figuring out what to do with all the demand we could finally see.",
      name: "Head of E-Commerce",
      role: "RetailChain West Africa",
    },
  },
  {
    id: 5,
    title: "Bulk Food Emporium",
    client: "AZ-African",
    category: "E-Commerce",
    image: "/images/az-african.png",
    website: "https://azafricanstore.com",
    video: "/videos/az-main.mp4",
    year: "2024",
    duration: "12 months",
    outcome: "5+ stores unified",
    tags: ["React", "Node.js", "Tailwind CSS", "Elasticsearch"],
    description:
      "AZ-African; a one-stop african bulk food marketplace offering grains, groceries, spices, and household essentials at wholesale prices.",
    featured: false,
    resultBg: "#fce7f3",
    resultText: "#db2777",
    industry: "Retail & E-Commerce",
    teamSize: "6 engineers · 1 PM · 1 QA lead",
    role: "Platform architecture, inventory systems, logistics integration",
    challenge:
      "AZ-African's 5+ physical stores each managed their own stock sheets. Online orders regularly sold items that were already gone from the shelf, and the brand had no way to run a single promotion across every location at once.",
    solution:
      "We built a multi-tenant marketplace backed by a real-time inventory sync layer, so every store's stock reflects instantly online. A dynamic pricing engine handles chain-wide and store-level promotions, and a logistics partner API routes each order to the nearest store with stock on hand.",
    results: [
      { value: "5+", label: "Stores unified on one system" },
      { value: "0", label: "Oversell incidents since launch" },
      { value: "2.4×", label: "Online order volume, six months in" },
      { value: "60%", label: "Faster fulfillment routing" },
    ],
    techStack: ["React", "Node.js", "Redis", "Elasticsearch", "PostgreSQL", "AWS"],
    testimonial: {
      quote:
        "We went from spreadsheets deciding what we could sell online to the opposite problem figuring out what to do with all the demand we could finally see.",
      name: "Head of E-Commerce",
      role: "AZ-African",
    },
  },
  {
    id: 6,
    title: "Telecom Customer Analytics Platform",
    client: "AfriTelco Ghana",
    category: "Data & Analytics",
    image: "/images/trading.png",
    video: "/videos/case-studies/5.mp4",
    website: null,
    year: "2023",
    duration: "4 months",
    outcome: "80% AWS cost reduction",
    tags: ["Apache Kafka", "AWS", "Python", "ROLAP"],
    description:
      "Multi-tenant big data platform processing 10+ telemetry sources with real-time churn prediction, customer behaviour analytics across 30+ dimensions, and automated reporting.",
    featured: false,
    resultBg: "#cffafe",
    resultText: "#0891b2",
    industry: "Telecommunications",
    teamSize: "5 engineers · 1 data scientist",
    role: "Data platform architecture, cost optimization, churn modeling",
    challenge:
      "AfriTelco's analytics stack ingested telemetry from 10+ sources but ran on always-on, over-provisioned AWS infrastructure that was both expensive and too slow to catch customers about to churn before they'd already left.",
    solution:
      "We rebuilt the pipeline on Apache Kafka with auto-scaling, right-sized AWS infrastructure, and moved reporting to a ROLAP layer that only computes what's queried. A churn prediction model now flags at-risk customers days before their contract lapses, not after.",
    results: [
      { value: "80%", label: "Reduction in AWS spend" },
      { value: "30+", label: "Behavioural dimensions tracked" },
      { value: "real-time", label: "From next-day reporting" },
      { value: "22%", label: "Improvement in churn prediction accuracy" },
    ],
    techStack: ["Apache Kafka", "AWS", "Python", "ROLAP", "Spark", "Airflow"],
    testimonial: {
      quote:
        "We were paying for infrastructure sized for a peak that happened four hours a day. Now we pay for what we actually use, and it's faster besides.",
      name: "VP of Data & Analytics",
      role: "AfriTelco Ghana",
    },
  },
  {
    id: 7,
    title: "Broker Trading Dashboard & Mobile App",
    client: "Finpay Africa",
    category: "FinTech & Banking",
    image: "/images/fintech.png",
    website : null,
    video: "/videos/case-studies/6.mp4",
    year: "2024",
    duration: "3 months",
    outcome: "PCI compliant, day 1",
    tags: ["React Native", "Node.js", "WebSockets", "PCI DSS"],
    description:
      "Real-time broker trading platform with live market data feeds, portfolio analytics, KYC onboarding flow, and mobile app PCI DSS compliant from launch.",
    featured: false,
    resultBg: "#ede9fe",
    resultText: "#7c3aed",
    industry: "Banking & FinTech",
    teamSize: "6 engineers · 1 compliance consultant",
    role: "Mobile app build, real-time infrastructure, PCI DSS compliance",
    challenge:
      "Finpay needed to launch a broker trading app in three months, with live market data, portfolio analytics, and KYC onboarding and be PCI DSS compliant from the first day it took a deposit, not months after.",
    solution:
      "We built the trading dashboard and React Native app in parallel, streaming market data over WebSockets so prices update the moment they change. Compliance was designed in from the architecture stage rather than audited in afterward, which is what let the PCI DSS certification land before launch.",
    results: [
      { value: "3 months", label: "Concept to public launch" },
      { value: "Day 1", label: "PCI DSS compliant" },
      { value: "<200ms", label: "Live price update latency" },
      { value: "15k+", label: "Accounts onboarded in month one" },
    ],
    techStack: ["React Native", "Node.js", "WebSockets", "PCI DSS", "PostgreSQL", "AWS"],
    testimonial: {
      quote:
        "Compliance is usually the thing that delays launch. Here it was finished on the same day as everything else, because it was never treated as a separate track.",
      name: "COO",
      role: "Finpay Africa",
    },
  },
    {
    id: 8,
    title: "Patient Management & EHR System",
    client: "HealthBridge Nigeria",
    category: "Healthcare",
    image: "/images/saas.png",
    website : null,
    video: "/videos/2.mp4",
    year: "2024",
    duration: "6 months",
    outcome: "18 months zero downtime",
    tags: ["React", "Python", "HIPAA", "PostgreSQL"],
    description:
      "HIPAA-aligned electronic health records platform for a multi-branch hospital network covering patient intake, scheduling, medical records, billing, and regulatory audit trails.",
    featured: true,
    resultBg: "#d1fae5",
    resultText: "#059669",
    industry: "Healthcare",
    teamSize: "7 engineers · 1 clinical consultant · 1 QA lead",
    role: "Product design, full-stack build, HIPAA compliance audit",
    challenge:
      "HealthBridge's four hospital branches each kept patient records differently two still on paper. Referring a patient between branches meant faxing files and re-entering data by hand, and there was no unified audit trail for regulators.",
    solution:
      "We built a single EHR covering intake, scheduling, medical records, and billing across all branches, with role-based access and an immutable audit log built in from day one. Migration ran branch-by-branch over ten weeks so no clinic ever closed its doors during the switch.",
    results: [
      { value: "18 months", label: "Zero unplanned downtime" },
      { value: "4 → 1", label: "Branches on one patient record" },
      { value: "100%", label: "Digital audit trail coverage" },
      { value: "35%", label: "Reduction in patient wait time" },
    ],
    techStack: ["React", "Python", "Django", "PostgreSQL", "HIPAA", "AWS", "Twilio"],
    testimonial: {
      quote:
        "Our clinicians stopped asking for a printout the week we launched. That's the real measure of whether a system works, people just use it.",
      name: "Chief Medical Information Officer",
      role: "HealthBridge Nigeria",
    },
  },
  {
    id: 9,
    title: "Corporate Website & CMS Platform",
    client: "PetroNIG Limited",
    category: "UI/UX & Design",
    image: "/images/real-estate.png",
    website : null,
    video: "/videos/case-studies/8.mp4",
    year: "2024",
    duration: "2 months",
    outcome: "200% organic traffic lift",
    tags: ["Next.js", "Sanity CMS", "Tailwind CSS", "SEO"],
    description:
      "Enterprise corporate website with headless CMS, multilingual support, investor relations portal, and structured data SEO designed to ISO brand guidelines.",
    featured: false,
    resultBg: "#dcfce7",
    resultText: "#16a34a",
    industry: "Oil & Gas",
    teamSize: "3 engineers · 1 designer",
    role: "Brand-compliant design system, headless CMS build, SEO architecture",
    challenge:
      "PetroNIG's existing site was a static, single-language brochure with no way for the comms team to publish updates without a developer, and it wasn't indexing for any of the terms investors and partners were searching.",
    solution:
      "We designed a site to PetroNIG's ISO brand guidelines on a headless Sanity CMS, so comms can publish in English and French without touching code, added an investor relations portal, and rebuilt the site's structured data and technical SEO from the ground up.",
    results: [
      { value: "200%", label: "Lift in organic search traffic" },
      { value: "2", label: "Languages, editable without a developer" },
      { value: "2 months", label: "Design to launch" },
      { value: "98", label: "Lighthouse performance score" },
    ],
    techStack: ["Next.js", "Sanity CMS", "Tailwind CSS", "SEO", "Vercel"],
    testimonial: {
      quote:
        "We used to file a ticket to change a paragraph. Now our comms lead publishes updates the same day news breaks, in both languages.",
      name: "Head of Corporate Communications",
      role: "PetroNIG Limited",
    },
  },
  {
    id: 10,
    title: "Cloud Infrastructure Migration",
    client: "NorthBank Holdings",
    category: "Infrastructure",
    image: "/images/trading.png",
    website: null,
    video: "/videos/case-studies/9.mp4",
    year: "2024",
    duration: "5 months",
    outcome: "Zero-trust architecture",
    tags: ["AWS", "Terraform", "Kubernetes", "ISO 27001"],
    description:
      "Full cloud infrastructure migration from legacy on-premise servers to AWS with zero-trust security model, Kubernetes orchestration, and ISO 27001 compliance.",
    featured: false,
    resultBg: "#fee2e2",
    resultText: "#dc2626",
    industry: "Banking & FinTech",
    teamSize: "6 engineers · 1 security architect",
    role: "Infrastructure architecture, migration execution, ISO 27001 certification",
    challenge:
      "NorthBank's on-premise servers were end-of-life, with a perimeter-based security model that trusted anything already inside the network, a growing liability as the bank pushed toward ISO 27001 certification.",
    solution:
      "We migrated the full stack to AWS on Terraform-managed infrastructure, orchestrated with Kubernetes, and rebuilt access control around a zero-trust model where every request is verified regardless of where it originates. The migration ran in phases so branch systems stayed live throughout.",
    results: [
      { value: "0", label: "Minutes of unplanned downtime during migration" },
      { value: "Zero-trust", label: "Security model, bank-wide" },
      { value: "5 months", label: "Full migration timeline" },
      { value: "ISO 27001", label: "Certified within 60 days of go-live" },
    ],
    techStack: ["AWS", "Terraform", "Kubernetes", "ISO 27001", "Vault", "Datadog"],
    testimonial: {
      quote:
        "Migrating a bank's infrastructure without a single outage sounds like a small thing until you've tried to do it. It wasn't small for us.",
      name: "CTO",
      role: "NorthBank Holdings",
    },
  },
];

export function getCaseStudy(id) {
  const numericId = Number(id);
  return CASE_STUDIES.find((p) => p.id === numericId);
}

export function getRelatedCaseStudies(current, count = 3) {
  const sameCategory = CASE_STUDIES.filter(
    (p) => p.category === current.category && p.id !== current.id
  );
  const rest = CASE_STUDIES.filter(
    (p) => p.category !== current.category && p.id !== current.id
  );
  return [...sameCategory, ...rest].slice(0, count);
}