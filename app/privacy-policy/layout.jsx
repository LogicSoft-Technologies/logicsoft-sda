import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "LogicSoft Technologies privacy policy and data handling practices.",
  path: "/privacy-policy",
});

export default function Layout({ children }) {
  return children;
}
