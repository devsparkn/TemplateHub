// app/templates/[id]/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { cache } from "react";

// Cached fetch function
const getTemplate = cache(async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.success ? data.data : null;
});

// ✅ Required Layout Component
export default function TemplateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

// 📦 Dynamic Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const template = await getTemplate(params.id);

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

// 🏗️ For Static Site Generation
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates`);
  const data = await res.json();
  const templates = data.success ? data.data : [];

  return templates.map((template: { _id: string }) => ({
    id: template._id,
  }));
}
