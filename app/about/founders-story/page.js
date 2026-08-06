import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Founders Story",
  description:
    "The story behind LogicSoft Technologies - why we were founded and the vision driving our approach to enterprise software.",
  path: "/about/founders-story",
});

import FoundersStory from "./FoundersStory";

export default function page() {
    return (
        <FoundersStory />
    )
}