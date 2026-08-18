import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Cloud",
  description:
    "Cloud application services from LogicSoft Technologies - architecture, deployment, and management for cloud-hosted applications.",
  path: "/application/cloud",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
