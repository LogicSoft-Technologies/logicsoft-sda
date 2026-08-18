import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Penetration",
  description:
    "Penetration testing services from LogicSoft Technologies, simulating real-world attacks to uncover security vulnerabilities.",
  path: "/testing/penetration",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
