import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Software Testing",
  description:
    "Software testing services from LogicSoft Technologies, covering functional, performance, security, and usability testing.",
  path: "/software-testing",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
