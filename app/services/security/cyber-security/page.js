import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Cyber Security",
  description:
    "Full-spectrum cybersecurity services from LogicSoft Technologies - offensive testing, threat modelling, and defensive architecture.",
  path: "/services/security/cyber-security",
});

import CyberSecurity from "./CyberSecurity";

export default function page() {
    return (
        <CyberSecurity/>
    )
}