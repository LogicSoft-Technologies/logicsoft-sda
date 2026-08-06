import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Our Journey",
  description:
    "The LogicSoft Technologies story from founding to today - key milestones in our growth as an enterprise software partner.",
  path: "/about/our-journey",
});

import OurJourney from "./OurJourney";

export default function page() {
    return (
        <OurJourney />
    )
}