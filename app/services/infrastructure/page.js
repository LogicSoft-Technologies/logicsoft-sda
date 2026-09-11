import { createMetadata } from "../../../lib/metadata";
import Infrastructure from "./infrastructure";

export const metadata = createMetadata({
  title: "Infrastructure Services",
  description:
    "Infrastructure services from LogicSoft Technologies: cloud engineering, DevOps, platform reliability, security, and cost optimisation.",
  path: "/services/infrastructure",
});

export default function Page() {
  return <Infrastructure />;
}