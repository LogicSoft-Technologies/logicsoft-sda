import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Usability",
  description:
    "Usability testing services from LogicSoft Technologies, ensuring your application is intuitive and easy to use.",
  path: "/testing/usability",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
