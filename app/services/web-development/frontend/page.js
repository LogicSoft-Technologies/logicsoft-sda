import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Frontend",
  description:
    "Frontend development services from LogicSoft Technologies, building accessible, high-performance interfaces with React and Next.js.",
  path: "/services/web-development/frontend",
});

import Frontend from "./Frontend";

export default function page() {
    return (
        <Frontend />
    )
}