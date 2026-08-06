import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Updates",
  description:
    "Latest updates and news from LogicSoft Technologies.",
  path: "/updates",
});

export default function Layout({ children }) {
  return children;
}
