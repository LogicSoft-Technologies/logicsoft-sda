import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Search",
  description:
    "Search LogicSoft Technologies services, resources, and content.",
  path: "/search",
});

export default function Layout({ children }) {
  return children;
}
