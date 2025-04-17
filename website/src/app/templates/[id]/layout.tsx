import { Metadata } from "next";
import { templates } from "@/utils/template";
import { cache } from "react";

// Cached fetch function
const getTemplate = cache((id: string) => {
  return templates.find((t) => t.id === id);
});

// Metadata generation
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const template = getTemplate(params.id);

  if (!template) {
    return {
      title: "Template Not Found",
      description: "The requested template could not be found",
    };
  }

  return {
    title: `${template.title} | Template`,
    description: template.description,
  };
}

// Static params for SSG
export function generateStaticParams() {
  return templates.map((template) => ({
    id: template.id,
  }));
}
