import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Software Approach",
  description:
    "LogicSoft Technologies' software engineering approach - agile delivery, sprint-based development, and quality-first practices.",
  path: "/about/software-approach",
});

import SoftwareApproach from "./SoftwareApproach";

export default function page() {
    return (
        <SoftwareApproach />
    )
}