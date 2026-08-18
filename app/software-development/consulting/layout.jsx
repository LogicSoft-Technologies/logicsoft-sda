import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Consulting",
  description:
    "Software development consulting from LogicSoft Technologies, providing strategic guidance on architecture and technical decisions.",
  path: "/software-development/consulting",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
