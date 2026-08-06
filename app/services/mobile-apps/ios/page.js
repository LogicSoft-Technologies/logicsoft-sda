import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Ios",
  description:
    "Native iOS app development services from LogicSoft Technologies, built with Swift and SwiftUI for the Apple ecosystem.",
  path: "/services/mobile-apps/ios",
});

import Ios from "./Ios";

export default function page() {
    return (
        <Ios />
    )
}