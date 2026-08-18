import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Project Management",
  description:
    "Project management services from LogicSoft Technologies, ensuring enterprise software projects are delivered on time and on budget.",
  path: "/project-management",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
