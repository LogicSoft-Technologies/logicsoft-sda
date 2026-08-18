import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Outsourcing",
  description:
    "QA outsourcing services from LogicSoft Technologies, providing dedicated testing teams for your software projects.",
  path: "/qa/outsourcing",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
