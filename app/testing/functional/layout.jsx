import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Functional",
  description:
    "Functional testing services from LogicSoft Technologies, verifying software behaves correctly against business requirements.",
  path: "/testing/functional",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
