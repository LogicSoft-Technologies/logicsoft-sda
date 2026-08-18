import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Support",
  description:
    "Ongoing application support services from LogicSoft Technologies, keeping your business-critical applications running reliably.",
  path: "/application/support",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
