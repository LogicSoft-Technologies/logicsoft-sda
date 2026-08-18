import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Security",
  description:
    "Security testing services from LogicSoft Technologies, identifying vulnerabilities before they reach production.",
  path: "/testing/security",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
