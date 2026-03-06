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
