import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Development",
  description:
    "Custom application development services from LogicSoft Technologies, built for performance, security, and scale.",
  path: "/application/development",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
