import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "About Company",
  description:
    "Learn about LogicSoft Technologies - our company profile, engineering capabilities, and track record delivering enterprise software across four continents.",
  path: "/about/about-company",
});

import AboutCompany from "./AboutCompany";

export default function page() {
    return (
        <AboutCompany />
    )
}