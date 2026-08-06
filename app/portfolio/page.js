import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Portfolio",
  description:
    "Explore 200+ project case studies delivered by LogicSoft Technologies across fintech, healthcare, logistics, and more.",
  path: "/portfolio",
});

import Portfolio from "./Portfolio";

export default function page() {
    return (
        <Portfolio />
    )
}