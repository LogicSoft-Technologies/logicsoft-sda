import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Penetration Testing",
  description:
    "Authorised penetration testing services from LogicSoft Technologies across web, mobile, API, network, and cloud environments.",
  path: "/services/security/penetration-testing",
});

import PenetrationTesting from "./PenetrationTesting";

export default function page() {
    return (
        <PenetrationTesting />
    )
}