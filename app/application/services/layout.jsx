import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Services",
  description:
    "An overview of LogicSoft Technologies' application services - development, integration, modernization, security, and support.",
  path: "/application/services",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
