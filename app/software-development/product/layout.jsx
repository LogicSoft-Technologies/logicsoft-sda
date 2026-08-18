import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Product",
  description:
    "Product software development services from LogicSoft Technologies, taking your idea from concept to a market-ready application.",
  path: "/software-development/product",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
