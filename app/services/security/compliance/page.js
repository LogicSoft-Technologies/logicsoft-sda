import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Compliance",
  description:
    "Compliance services from LogicSoft Technologies, supporting ISO 27001, GDPR, NDPR, and PCI DSS certification readiness.",
  path: "/services/security/compliance",
});

import Compliance from "./Compliance";

export default function page() {
    return (
        <Compliance />
    )
}