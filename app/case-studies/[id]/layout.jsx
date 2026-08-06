import { getCaseStudy } from "@/lib/case-studies-data";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getCaseStudy(id);

  if (!project) {
    return createMetadata({
      title: "Case Study Not Found",
      description: "This case study could not be found.",
      path: "/case-studies/" + id,
    });
  }

  const description =
    project.description ||
    "A case study from LogicSoft Technologies: " + project.title + " for " + project.client + ".";

  return createMetadata({
    title: project.title + " - Case Study",
    description: description,
    path: "/case-studies/" + project.id,
    image: project.image || "/og-image.jpg",
  });
}

export default function CaseStudyLayout({ children }) {
  return children;
}
