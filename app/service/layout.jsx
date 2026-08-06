import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Service",
  description:
    "LogicSoft Technologies service overview.",
  path: "/service",
});

export default function Layout({ children }) {
  return children;
}
