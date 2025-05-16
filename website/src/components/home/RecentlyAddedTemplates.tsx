import React from "react";
import { TemplateGrid } from "@/components/TemplateGrid";

const RecentlyAddedTemplates = () => {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Recently Added Templates
        </h2>
        <p className="text-muted-foreground text-lg max-w-[700px]">
          Check out our latest additions to the template collection.
        </p>
      </div>
      <TemplateGrid limit={4} />
    </section>
  );
};

export default RecentlyAddedTemplates;
