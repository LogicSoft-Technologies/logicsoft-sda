import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Enterprise",
  description:
    "Enterprise IT consulting services from LogicSoft Technologies, tailored to large-scale organisational technology needs.",
  path: "/it-consulting/enterprise",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
