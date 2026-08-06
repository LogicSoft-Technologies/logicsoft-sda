import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Project Estimation",
  description:
    "How LogicSoft Technologies scopes and estimates enterprise software projects.",
  path: "/how-we-work/estimate",
});

export default function Layout({ children }) {
  return children;
}
