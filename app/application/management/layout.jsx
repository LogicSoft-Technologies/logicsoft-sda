import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Management",
  description:
    "Ongoing application management services from LogicSoft Technologies, covering monitoring, maintenance, and performance optimisation.",
  path: "/application/management",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
