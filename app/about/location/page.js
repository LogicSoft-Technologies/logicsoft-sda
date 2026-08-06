import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Location",
  description:
    "Find LogicSoft Technologies' office locations, addresses, and contact details.",
  path: "/about/location",
});

import Location from "./Location";

export default function page() {
    return (
        <Location />
    )
}