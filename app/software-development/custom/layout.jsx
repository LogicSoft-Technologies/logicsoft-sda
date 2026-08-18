import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Custom",
  description:
    "Custom software development services from LogicSoft Technologies, built around your organisation's specific requirements.",
  path: "/software-development/custom",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
