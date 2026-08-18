import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Solution",
  description:
    "Solution consulting from LogicSoft Technologies, designing technology solutions aligned to specific business challenges.",
  path: "/it-consulting/solution",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
