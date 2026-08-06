import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Cost Optimization",
  description:
    "Cloud and infrastructure cost optimization services from LogicSoft Technologies, reducing spend without compromising performance.",
  path: "/services/other-services/cost-optimization",
});

import CostOptimization from "./CostOptimization";

export default function page() {
    return (
        <CostOptimization />
    )
}