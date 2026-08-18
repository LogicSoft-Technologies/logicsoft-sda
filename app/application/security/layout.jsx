import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Security",
  description:
    "Application security services from LogicSoft Technologies, including vulnerability assessment and secure development practices.",
  path: "/application/security",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
