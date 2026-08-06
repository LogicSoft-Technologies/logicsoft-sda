import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Client Review",
  description:
    "Read testimonials and client reviews from organisations that have partnered with LogicSoft Technologies on enterprise software and IT projects.",
  path: "/about/client-review",
});

import ClientsReviews from "./ClientsReviews";

export default function page() {
    return (
        <ClientsReviews />
    )
}