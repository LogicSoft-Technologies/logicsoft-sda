import { createMetadata } from "../../lib/metadata";

export const metadata = createMetadata({
  title: "Technologies",
  description:
    "The technologies and tools LogicSoft Technologies works with, including React, Node.js, AWS, and Kubernetes.",
  path: "/technologies",
});

import Technologies from "./Technologies";


export default function page() {
    return (
        <Technologies />
    ) 
}