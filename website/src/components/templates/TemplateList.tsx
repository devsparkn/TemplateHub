"use client";

import { motion } from "framer-motion";
import { HoverEffect } from "../ui/card-hover-effect";
import { Template, PriceFilter } from "@/types/templates";

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
  >
    <div className="mb-4">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{templates.length}</span>{" "}
        templates
        {selectedCategory && (
          <span>
            {" "}in{" "}
            <span className="font-medium text-foreground">
              {selectedCategory}
            </span>
          </span>
        )}
        {priceFilter !== "all" && (
          <span>
            {" "}that are{" "}
            <span className="font-medium text-foreground">{priceFilter}</span>
          </span>
        )}
      </p>
    </div>
    <HoverEffect templates={templates} />
  </motion.div>
);