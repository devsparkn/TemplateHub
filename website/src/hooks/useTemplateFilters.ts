import { useState } from "react";
import { Template, PriceFilter } from "@/types/templates";

export const useTemplateFilters = (
  templates: Template[],
  initialCategory?: string
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [priceFilter, setPriceFilter] = useState<PriceFilter | null>(null);

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  const filteredTemplates = templates
    // Category filter
    .filter((template) =>
      selectedCategory ? template.category === selectedCategory : true
    )
    // Price filter
    .filter((template) => {
      const price = Number(template.price) || 0;
      if (!priceFilter) return true; // null means "all"
      if (priceFilter === "free") return price === 0;
      if (priceFilter === "premium") return price > 0;
      return true;
    })

    // Search filter
    .filter(
      (template) =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const hasActiveFilters =
    Boolean(searchQuery) || Boolean(selectedCategory) || priceFilter !== null;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceFilter(null);
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
