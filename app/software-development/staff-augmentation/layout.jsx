import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Staff Augmentation",
  description:
    "Staff augmentation services from LogicSoft Technologies, extending your engineering team with experienced developers.",
  path: "/software-development/staff-augmentation",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
