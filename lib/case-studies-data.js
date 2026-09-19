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
    title: "Legal Consulting Firm",
    client: "Experts Legal Institute",
    category: "Enterprise Platforms",
    image: "/images/expertslegal.png",
    website: "https://expertlegalinstitute.com",
    video: "/videos/expertslegal.mp4",
    year: "2026",
    duration: "6 months",
    outcome: "100% Better Outcomes",
    tags: ["Next.js", "Typescript", "REST API", "Tailwaind CSS"],
    description:
      "A centralized legal services platform designed to streamline client consultations, matter management, documentation, legal research, and professional training.",
    featured: false,
    resultBg: "#051b45",
    resultText: "#b68208",
    industry: "Legal Services & Professional Education",
    teamSize: "12 legal professionals · 4 support staff",
    role: "Legal advisory, case management, client representation",
    challenge: "Experts Legal Institute needed a more structured approach to managing client matters, legal documentation, consultations, and professional legal training. Information was spread across emails, physical files, and separate administrative processes, making it difficult to maintain consistency, track matters, and provide clients with timely updates.",
    solution: "We established an integrated legal services and professional support framework that brings client consultations, case documentation, legal research, matter tracking, and professional training into a more organized workflow. The approach gives legal professionals a clearer view of active matters while helping clients receive timely communication and well-structured legal guidance.",
results: [
  { value: "40%", label: "Improvement in matter management efficiency" },
  { value: "3x", label: "Faster access to client documentation" },
  { value: "85%", label: "Reduction in administrative delays" },
  { value: "100%", label: "Centralized legal matter records" },
],
techStack: [ ""],
testimonial: {
  quote:
    "Experts Legal Institute has given us a more structured way to manage legal matters, support our clients, and deliver professional legal services with greater efficiency.",
  name: "Managing Partner",
},
      role: "Experts Legal Institute",
    },
  {
  id: 4,
  title: "Technology & Gadget Media Platform",
  client: "GadgetsWW",
  category: "E-Commerce",
  image: "/images/gadgetsww.png",
  website: "https://gadgetsww.com/",
  video: "/videos/gadgetsww.mp4",
  year: "2024",
  duration: "8 months",
  outcome: "Tech media platform",
  tags: ["WordPress", "CMS", "SEO", "Content Management"],
  description:
    "Modern technology media platform delivering gadget reviews, buying guides, technology news, device specifications, and insights across AI, smartphones, laptops, smart-home devices, and consumer technology.",
  featured: false,
  resultBg: "#e0f2fe",
  resultText: "#0284c7",
  industry: "Technology & Media",
  teamSize: "3 engineers · 1 designer",
  role: "Website development, CMS implementation, content architecture",
  challenge:
    "GadgetsWW needed a modern digital platform where technology enthusiasts could easily discover gadget reviews, buying guides, technology news, device information, and insights across a rapidly changing consumer technology landscape.",
  solution:
    "We developed a content-driven technology platform with structured article publishing, technology and gadget categories, device pages, author profiles, search-friendly content architecture, and responsive layouts designed for an engaging reading experience across desktop and mobile.",
  results: [
    { value: "Tech", label: "Dedicated technology content platform" },
    { value: "Multi", label: "Content categories and technology topics"},
    { value: "SEO", label: "Search-friendly article architecture"},
    { value: "Responsive", label: "Optimized across desktop and mobile"},
  ],
  techStack: [
    "WordPress",
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML",
    "CSS"
  ],
  testimonial: {
    quote:
      "GadgetsWW gives readers a central platform to discover practical technology insights, gadget reviews, buying guides, and the latest developments across the consumer tech ecosystem.",
    name: "GadgetsWW",
    role: "Technology Media Platform",
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