import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Where To Start",
  description:
    "Not sure where to begin? A guided overview to help you choose the right LogicSoft Technologies service for your project.",
  path: "/about/where-to-start",
});

import WhereToStart from "./WhereToStart";

export default function page() {
    return (
        <WhereToStart />
    )
}