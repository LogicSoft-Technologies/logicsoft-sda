import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Itsm",
  description:
    "IT Service Management (ITSM) consulting and implementation from LogicSoft Technologies, streamlining how your organisation delivers IT services.",
  path: "/itsm",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
