import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Resource Management",
  description:
    "How LogicSoft Technologies allocates and manages project resources.",
  path: "/how-we-work/resources",
});

export default function Layout({ children }) {
  return children;
}
