"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFeaturedTemplates } from "@/hooks/useFeaturedTemplates";
import TemplateCard from "./templates/TemplateCard";
const FeaturedTemplates = () => {
  const { templates, loading } = useFeaturedTemplates();

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Browse Our <span className="text-yellow-400">Featured Picks</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Handcrafted templates for every type of business or SaaS. Just pick,
            customize and launch
          </p>
        </div>

        {/* Grid or Loader */}
        {loading ? (
          <div className="text-center text-muted-foreground text-lg">
            Loading templates...
          </div>
        ) : templates.length > 0 ? (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.slug} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground text-lg">
            No featured templates found.
          </div>
        )}

        {/* Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500"
          >
            <Link href="/templates">View All Templates</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTemplates;
