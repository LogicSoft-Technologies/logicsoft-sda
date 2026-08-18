import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Performance",
  description:
    "Performance testing services from LogicSoft Technologies, ensuring your application performs reliably under real-world load.",
  path: "/testing/performance",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
