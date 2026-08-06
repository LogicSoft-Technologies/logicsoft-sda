import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Support",
  description:
    "Technical support and account management services available to LogicSoft Technologies clients.",
  path: "/about/support",
});

import Support from "./Support";

export default function page() {
    return (
        <Support />
    )
}