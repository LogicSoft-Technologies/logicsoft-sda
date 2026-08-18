import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Services",
  description:
    "An overview of LogicSoft Technologies' software development services, from custom builds to staff augmentation.",
  path: "/software-development/services",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
