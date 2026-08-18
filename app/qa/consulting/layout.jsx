import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Consulting",
  description:
    "QA consulting services from LogicSoft Technologies, helping organisations build effective quality assurance strategies.",
  path: "/qa/consulting",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
