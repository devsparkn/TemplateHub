"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TemplateCard from "./templates/TemplateCard";
import { useTemplates } from "@/hooks/useTemplate";
import { Template } from "@/types/templates";

const TrendingTemplates = () => {
  const { templates, isLoading } = useTemplates();

  // Filter popular templates — assuming there's a "popular" boolean field
  const TrendingTemplates = templates.filter(
    (template: Template) => template.featured
  );

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Browse Our{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Trending Picks
          </span>
        </h2>
        <p className="textbase sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Handcrafted templates for every type of business or SaaS. Just pick,
          customize and launch!
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground text-lg">
          Loading templates...
        </div>
      ) : TrendingTemplates.length > 0 ? (
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {TrendingTemplates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground text-lg">
          No trending templates found.
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

export default TrendingTemplates;
