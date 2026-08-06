import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Cross Platform",
  description:
    "Cross-platform mobile app development from LogicSoft Technologies using React Native and Flutter - one codebase, iOS and Android.",
  path: "/services/mobile-apps/cross-platform",
});

import CrossPlatform from "./CrossPlatform";

export default function page() {
    return (
        <CrossPlatform />
    )
}