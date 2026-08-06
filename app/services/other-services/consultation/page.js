import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Consultation",
  description:
    "Vendor-neutral technology consultation from LogicSoft Technologies, including architecture reviews and strategic advisory.",
  path: "/services/other-services/consultation",
});

import Consultation from "./Consultation";

export default function page() {
    return (
        <Consultation />
    )
}