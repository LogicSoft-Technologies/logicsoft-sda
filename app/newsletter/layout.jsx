import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "LogicSoft Insights Newsletter",
  description:
    "Get practical insights on software engineering, AI, cloud, cybersecurity, and digital transformation from LogicSoft Technologies.",
  path: "/newsletter",
});

export default function NewsletterLayout({ children }) {
  return children;
}