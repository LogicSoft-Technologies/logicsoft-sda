import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Terms of Use governing access to and use of the LogicSoft Technologies website, services, and digital platforms.",
  path: "/terms-of-use",
});

export default function Layout({ children }) {
  return children;
}