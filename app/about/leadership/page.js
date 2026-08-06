import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Leadership",
  description:
    "Meet the leadership team guiding LogicSoft Technologies' strategy, engineering standards, and client delivery.",
  path: "/about/leadership",
});

import Leadership from "./Leadership";

export default function page() {
    return (
        <Leadership />
    )
}