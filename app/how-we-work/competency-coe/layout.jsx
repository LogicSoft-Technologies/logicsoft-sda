import { createMetadata } from "../../../lib/metadata";

export const metadata = createMetadata({
  title: "Competency Center of Excellence",
  description:
    "LogicSoft Technologies competency centers and technical excellence programs.",
  path: "/how-we-work/competency-coe",
});

export default function Layout({ children }) {
  return children;
}
