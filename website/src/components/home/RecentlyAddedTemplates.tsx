"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "../ui/card-hover-effect";
import { useTemplates } from "@/hooks/useTemplate";
import { Template } from "@/types/templates";

const RecentlyAddedTemplates = () => {
  const { templates, isLoading } = useTemplates();

  // Filter popular templates — assuming there's a "popular" boolean field
  const RecentlyAddedTemplatess = templates.filter(
    (template: Template) => template.featured
  );

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Browse Our{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Recently Added
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Handcrafted templates for every type of business or SaaS. Just pick,
          customize and launch!
        </p>
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground text-lg">
          Loading templates...
        </div>
      ) : RecentlyAddedTemplatess.length > 0 ? (
        <HoverEffect templates={RecentlyAddedTemplatess} />
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
