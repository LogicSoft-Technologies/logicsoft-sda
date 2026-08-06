import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Change Request Process",
  description:
    "How LogicSoft Technologies manages change requests across enterprise projects.",
  path: "/how-we-work/change-request",
});

export default function Layout({ children }) {
  return children;
}
