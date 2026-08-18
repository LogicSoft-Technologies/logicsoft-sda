import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Project Management",
  description:
    "How LogicSoft Technologies manages enterprise software projects end to end, from scoping through delivery.",
  path: "/how-we-work/project-management",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
