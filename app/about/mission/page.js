import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Mission",
  description:
    "LogicSoft Technologies' mission and vision - our commitment to reliable, secure, and scalable enterprise technology.",
  path: "/about/mission",
});

import Mission from "./Mission";

export default function page() {
    return (
        <Mission />
    )
}