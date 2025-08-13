import React from "react";
import { TemplateGrid } from "@/components/templates/Templates";

export const metadata = {
  title: "Templates | Modern UI",
  description:
    "Browse our collection of premium templates for your next project",
};

const Page = () => {
  return (
    <div className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Browse Our{" "}
            <span className="text-yellow-400">Popular Templates</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore modern, ready-to-use website templates for any business or
            idea.
          </p>
        </div>
        <TemplateGrid />
      </div>
    </div>
  );
};

export default Page;
