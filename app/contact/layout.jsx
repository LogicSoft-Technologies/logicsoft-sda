import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Get in touch with LogicSoft Technologies for enterprise software, cybersecurity, and cloud engineering services.",
  path: "/contact",
});

export default function Layout({ children }) {
  return children;
}
