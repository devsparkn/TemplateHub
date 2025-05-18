// app/templates/[slug]/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

// Cached fetch function with proper error handling
const getTemplate = cache(async (slug: string) => {
  console.log(`Attempting to fetch template with slug: ${slug}`);

  try {
    await dbConnect();
    console.log("Database connected successfully");

    const template = await Template.findOne({ slug });

    if (template) {
      console.log(`Template found: ${template.title}`);
    } else {
      console.log(`No template found with slug: ${slug}`);
    }

    return template;
  } catch (error) {
    console.error(`Error fetching template for slug ${slug}:`, error);
    return null;
  }
});

// ✅ Updated Layout Component with Promise-based params
export default async function TemplateLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    console.log(`Layout rendering for slug: ${slug}`);

    const template = await getTemplate(slug);

    if (!template) {
      console.log(`Template not found for slug: ${slug}, showing 404`);
      notFound();
    }

    return <>{children}</>;
  } catch (error) {
    console.error("Error in template layout:", error);
    notFound();
  }
}

// ✅ Updated Metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const template = await getTemplate(slug);

    if (!template) {
      return {
        title: "Template Not Found",
        description: "The requested template could not be found.",
      };
    }

    return {
      title: template.title,
      description: template.description,
      openGraph: {
        title: template.title,
        description: template.description,
        images: template.thumbnailUrls,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error Loading Template",
      description: "There was an error loading the template data.",
    };
  }
}

// ✅ Updated Static Site Generation
export async function generateStaticParams() {
  try {
    await dbConnect();
    const templates = await Template.find({}).select("slug");

    console.log(`generateStaticParams found ${templates.length} templates`);

    return templates.map((template: { slug: string }) => ({
      params: Promise.resolve({ slug: template.slug }),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
