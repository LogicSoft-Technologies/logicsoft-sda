import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Android",
  description:
    "Native Android app development services from LogicSoft Technologies, built for performance across all device types.",
  path: "/services/mobile-apps/android",
});

import Android from "./Android";

export default function page() {
    return (
        <Android />
    )
}