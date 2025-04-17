import { templates } from "@/utils/template";
import { Metadata } from "next";
import { cache } from "react";
import { ReactNode } from "react";

const getTemplate = cache((id: string) => {
  return templates.find((t) => t.id === id);
});

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

export function generateStaticParams() {
  return templates.map((template) => ({
    id: template.id,
  }));
}

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  console.log("Template ID:", params.id);
  return <>{children}</>;
}
