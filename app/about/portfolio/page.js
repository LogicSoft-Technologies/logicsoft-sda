import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "Browse LogicSoft Technologies' portfolio of enterprise software, cybersecurity, and cloud engineering projects.",
  path: "/about/portfolio",
});

import Portfolio from "./Portfolio";

export default function page() {
    return (
        <Portfolio />
    )
}