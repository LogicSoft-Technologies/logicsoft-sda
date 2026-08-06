import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Faq",
  description:
    "Answers to common questions about working with LogicSoft Technologies, including our process, pricing, timelines, and support.",
  path: "/about/faq",
});

import Faq from "./Faq";

export default function page() {
    return (
        <Faq />
    )
}