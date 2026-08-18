import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Testing",
  description:
    "Application testing services from LogicSoft Technologies, covering functional, performance, and security testing.",
  path: "/application/testing",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
