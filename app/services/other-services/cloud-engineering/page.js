import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Cloud Engineering",
  description:
    "Cloud engineering services from LogicSoft Technologies - architecture, migration, and managed cloud on AWS, Azure, and GCP.",
  path: "/services/other-services/cloud-engineering",
});

import CloudEngineering from "./CloudEngineering";

export default function page() {
    return (
        <CloudEngineering />
    )
}