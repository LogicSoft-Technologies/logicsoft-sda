import { createMetadata } from "../lib/metadata";

export const metadata = createMetadata({
  title: "Home",
  description:
    "Enterprise software development, cybersecurity, cloud engineering, and IT consulting for organisations across Africa, Europe, North America, and the Middle East.",
  path: "/",
});

import Hero from "@/components/home/Hero";
import KeyFacts from "@/components/home/KeyFacts";
import Offering from "@/components/home/Offering";
import Expertise from "@/components/home/Expertise";
import Technologies from "@/components/home/Technologies";
import FAQ from "@/components/home/FAQ";
import DifferenceCard from "@/components/home/DifferenceCard";
import Contact from "@/components/home/Contact";
import Secure from "@/components/home/Secure";
import SuccessStories from "@/components/home/SuccessStories";

export default function Home() {
  return (
    <>
      <Hero />
      <KeyFacts />
      <Offering />
      <Expertise />
      <SuccessStories />
      <DifferenceCard />
      <Technologies />
      <Secure />
      <Contact />
      <FAQ />
    </>
  );
}
