import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Siem Services",
  description:
    "24/7 SIEM services from LogicSoft Technologies, providing real-time threat detection and automated incident alerting.",
  path: "/services/security/siem-services",
});

import SiemServices from "./SiemServices";

export default function page() {
    return (
        <SiemServices />
    )
}