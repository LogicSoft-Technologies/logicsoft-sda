import Geography from "@/components/about-company/Geography";
import Guarantee from "@/components/about-company/Guarantee";
import Hero from "@/components/about-company/Hero";
import Industries from "@/components/about-company/Industries";
import PricingPolicy from "@/components/about-company/PricingPolicy";
import ServiceMap from "@/components/about-company/ServiceMap";
import Solutions from "@/components/about-company/Solutions";
import Technologies from "@/components/about-company/Tecnologies";
import Contact from "@/components/about-company/Contact";
import TeamCards from "@/components/about-company/TeamCards";

export default function AboutCompany() {
  return (
    <section className="min-h-screen bg-white">
      <Hero />
      <TeamCards/>
      <Geography />
      <Industries />
      <ServiceMap />
      <Solutions />
      <Technologies />
      <Guarantee />
      <PricingPolicy />
      <Contact />
    </section>
  );
}