import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Documentation",
  description:
    "Documentation and resources from LogicSoft Technologies.",
  path: "/docs",
});

export default function Layout({ children }) {
  return children;
}
