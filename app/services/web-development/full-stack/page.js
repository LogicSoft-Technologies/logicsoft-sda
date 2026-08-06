import { createMetadata } from "../../../../lib/metadata";

export const metadata = createMetadata({
  title: "Full Stack",
  description:
    "Full-stack web development services from LogicSoft Technologies, delivering complete applications from database to browser.",
  path: "/services/web-development/full-stack",
});

import FullStack from "./FullStack";

export default function page() {
    return (
        <FullStack />
    )
}