import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Industries",
  description:
    "Industries served by LogicSoft Technologies, including fintech, healthcare, logistics, retail, and government.",
  path: "/industries",
});

import Industries from "./Industries";

export default function page() {
    return (
        <Industries />
    )
}