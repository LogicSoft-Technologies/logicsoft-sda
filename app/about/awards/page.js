import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Awards",
  description:
    "Industry awards, certifications, and recognitions earned by LogicSoft Technologies for enterprise software delivery and technical excellence.",
  path: "/about/awards",
});

import Awards from "./Awards";

export default function page() {
    return (
        <Awards />
    )
}