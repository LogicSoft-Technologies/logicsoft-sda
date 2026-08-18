import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Digital Transformation",
  description:
    "Digital transformation consulting and delivery from LogicSoft Technologies, helping enterprises modernize processes and technology.",
  path: "/digital-transformation",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
