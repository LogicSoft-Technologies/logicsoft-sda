import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Sustainability Policy",
  description:
    "LogicSoft Technologies' sustainability policy - our commitments to responsible technology and social impact.",
  path: "/about/sustainability-policy",
});

import Sustainability from "./Sustainability";

export default function page() {
    return (
        <Sustainability />
    )
}