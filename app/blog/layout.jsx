import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Insights",
  description:
    "Practical software engineering, AI, cloud, cybersecurity, and digital transformation insights from LogicSoft Technologies.",
  path: "/blog",
});

export default function BlogLayout({ children }) {
  return children;
}