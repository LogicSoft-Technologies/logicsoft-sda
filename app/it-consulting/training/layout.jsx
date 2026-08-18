import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Training",
  description:
    "IT training services from LogicSoft Technologies, equipping teams with the skills to manage and scale their technology.",
  path: "/it-consulting/training",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
