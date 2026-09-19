import { createMetadata } from "../../lib/metadata";
import Technologies from "./Technologies";

export const metadata = createMetadata({
  title: "Technologies & Platforms",
  description:
    "Explore LogicSoft Technologies' production engineering capabilities across frontend, backend, mobile, data, cloud, DevOps, observability, security, and quality engineering.",
  path: "/technologies",
});

export default function TechnologiesPage() {
  return <Technologies />;
}