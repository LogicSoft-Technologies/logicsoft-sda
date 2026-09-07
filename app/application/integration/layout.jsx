import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Intergration",
  description:
    "Application integration services from LogicSoft Technologies - connecting systems, APIs, and data across your technology stack.",
  path: "/application/intergration",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
