import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Automation",
  description:
    "Test automation services from LogicSoft Technologies, building reliable automated testing pipelines for faster releases.",
  path: "/testing/automation",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
