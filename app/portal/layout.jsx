import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Client Portal",
  description:
    "LogicSoft Technologies client portal access.",
  path: "/portal",
});

export default function Layout({ children }) {
  return children;
}
