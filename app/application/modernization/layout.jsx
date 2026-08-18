import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Modernization",
  description:
    "Application modernization services from LogicSoft Technologies - migrating legacy systems to modern, scalable architectures.",
  path: "/application/modernization",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
