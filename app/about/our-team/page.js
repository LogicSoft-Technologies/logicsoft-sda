import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Our Team",
  description:
    "Meet the engineers, designers, and consultants at LogicSoft Technologies who build and deliver enterprise software solutions.",
  path: "/about/our-team",
});

import OurTeam from "./OurTeam";

export default function page() {
    return (
        <OurTeam />
    )
}