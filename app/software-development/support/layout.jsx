import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Support",
  description:
    "Ongoing software support services from LogicSoft Technologies, keeping your applications maintained, secure, and up to date.",
  path: "/software-development/support",
});

export default function RouteMetadataLayout({ children }) {
  return children;
}
