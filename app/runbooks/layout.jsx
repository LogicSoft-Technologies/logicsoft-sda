import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Runbooks",
  description:
    "Operational runbooks from LogicSoft Technologies.",
  path: "/runbooks",
});

export default function Layout({ children }) {
  return children;
}
