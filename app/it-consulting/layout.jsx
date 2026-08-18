import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "It Consulting",
  description:
    "IT consulting services from LogicSoft Technologies - strategic technology advisory for enterprise organisations.",
  path: "/it-consulting",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
