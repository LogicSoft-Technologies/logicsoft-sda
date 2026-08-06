import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Devops",
  description:
    "DevOps consulting and implementation from LogicSoft Technologies, covering CI/CD pipelines, Kubernetes, and infrastructure automation.",
  path: "/services/other-services/devops",
});

import DevOps from "./DevOps";

export default function page() {
    return (
        <DevOps />
    )
}