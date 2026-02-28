import Ceo from "@/components/mission/Ceo";
import CoreForces from "@/components/mission/CoreForces";
import Discuss from "@/components/mission/Discuss";
import Hero from "@/components/mission/Hero";
import Practice from "@/components/mission/Practice";
import TurningObstacles from "@/components/mission/TurningObstacles";

export default function AboutCompany() {
  return (
    <section className="min-h-screen bg-white">
     <Hero />
     <CoreForces />
     <TurningObstacles />
     <Ceo />
     <Practice />
     <Discuss />
    </section>
  );
}