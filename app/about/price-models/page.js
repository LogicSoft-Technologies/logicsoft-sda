import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Price Models",
  description:
    "Explore LogicSoft Technologies' engagement and pricing models, including fixed-price, dedicated team, and retainer options.",
  path: "/about/price-models",
});

import PriceModels from "./PriceModels";

export default function page() {
    return (
        <PriceModels />
    )
}