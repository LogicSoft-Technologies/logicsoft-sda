import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Project Management Office",
  description:
    "LogicSoft Technologies PMO practices for enterprise project delivery.",
  path: "/how-we-work/pmo",
});

export default function Layout({ children }) {
  return children;
}
