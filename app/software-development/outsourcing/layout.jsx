import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Outsourcing",
  description:
    "Software development outsourcing from LogicSoft Technologies, giving you dedicated engineering teams without the overhead of hiring.",
  path: "/software-development/outsourcing",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
