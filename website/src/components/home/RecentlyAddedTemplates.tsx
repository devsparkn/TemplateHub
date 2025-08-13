"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TemplateCard from "../templates/TemplateCard";
import { useTemplates } from "@/hooks/useTemplate";
import { Template } from "@/types/templates";

const RecentlyAddedTemplates = () => {
  const { templates, isLoading } = useTemplates();

  // Filter popular templates — assuming there's a "popular" boolean field
  const RecentlyAddedTemplatess = templates.filter(
    (template: Template) => template.featured
  );

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Browse Our <span className="text-yellow-400">Recently Added</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Handcrafted templates for every type of business or SaaS. Just pick,
          customize and launch!
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground text-lg">
          Loading templates...
        </div>
      ) : RecentlyAddedTemplatess.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {RecentlyAddedTemplatess?.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground text-lg">
          No recent templates found.
        </div>
      )}

      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/templates">View All Templates</Link>
        </Button>
      </div>
    </section>
  );
};

export default RecentlyAddedTemplates;
