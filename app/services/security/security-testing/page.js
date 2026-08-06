import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Security Testing",
  description:
    "Security testing services from LogicSoft Technologies, including SAST, DAST, and manual vulnerability analysis.",
  path: "/services/security/security-testing",
});

import SecurityTesting from "./SecurityTesting";

export default function page() {
    return (
        <SecurityTesting />
    )
}