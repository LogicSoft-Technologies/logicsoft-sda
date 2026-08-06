import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Backend",
  description:
    "Backend development services from LogicSoft Technologies - scalable APIs and server-side systems built with Node.js, Python, and Go.",
  path: "/services/web-development/backend",
});

import Backend from "./Backend";

export default function page() {
    return (
        <Backend />
    )
}