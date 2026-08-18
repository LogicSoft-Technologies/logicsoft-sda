import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Crisis",
  description:
    "Crisis IT consulting from LogicSoft Technologies, providing rapid-response support during critical technology incidents.",
  path: "/it-consulting/crisis",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
