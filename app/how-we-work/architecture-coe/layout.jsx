import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Architecture Center of Excellence",
  description:
    "How LogicSoft Technologies structures enterprise architecture governance and best practices.",
  path: "/how-we-work/architecture-coe",
});

export default function Layout({ children }) {
  return children;
}
