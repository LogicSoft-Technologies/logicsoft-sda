import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Platform",
  description:
    "Platform consulting services from LogicSoft Technologies, helping organisations select and implement the right technology platforms.",
  path: "/it-consulting/platform",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
