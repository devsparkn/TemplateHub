"use client";

import { motion } from "framer-motion";
import { Template, PriceFilter } from "@/types/templates";
import TemplateCard from "./TemplateCard";
import { Badge } from "@/components/ui/badge";

interface TemplateListProps {
  templates: Template[];
  selectedCategory: string | null;
  priceFilter: PriceFilter;
}

export const TemplateList = ({
  templates,
  selectedCategory,
  priceFilter,
}: TemplateListProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="space-y-6"
  >
    <div className="flex flex-wrap items-center gap-3 pb-2">
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{templates.length}</span>{" "}
        templates
      </p>

      {selectedCategory && (
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          Category: {selectedCategory}
        </Badge>
      )}

      {priceFilter && (
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {priceFilter === "free"
            ? "Free Only"
            : priceFilter === "premium"
            ? "Premium Only"
            : ""}
        </Badge>
      )}
    </div>

    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {templates?.map((template) => (
        <TemplateCard key={template.slug} template={template} />
      ))}
    </div>
  </motion.div>
);
