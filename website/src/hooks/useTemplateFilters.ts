import { useState } from "react";
import { Template, PriceFilter } from "@/types/templates";

export const useTemplateFilters = (templates: Template[], initialCategory?: string) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  const filteredTemplates = templates
    .filter((template) =>
      selectedCategory ? template.category === selectedCategory : true
    )
    .filter((template) => {
      if (priceFilter === "all") return true;
      if (priceFilter === "free") return template.price === 0;
      return Number(template.price) > 0;
    })
    .filter(
      (template) =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const hasActiveFilters = searchQuery || selectedCategory || priceFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceFilter("all");
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceFilter,
    setPriceFilter,
    categories,
    filteredTemplates,
    hasActiveFilters,
    clearFilters,
  };
};