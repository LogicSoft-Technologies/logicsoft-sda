import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Data Analytics",
  description:
    "Data analytics services from LogicSoft Technologies, including BI dashboards, data pipelines, and machine learning infrastructure.",
  path: "/services/other-services/data-analytics",
});

import DataAnalytics from "./DataAnalytics";

export default function page() {
    return (
        <DataAnalytics />
    )
}