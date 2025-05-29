"use client";

import { useState } from "react";
import { useTemplates } from "@/hooks/useTemplate";
import { useTemplateFilters } from "@/hooks/useTemplateFilters";
import { TemplateSearch } from "./TemplateSearch";
import { TemplateList } from "./TemplateList";
import { NoTemplatesFound } from "./NoTemplatesFound";
import { TemplateGridProps } from "@/types/templates";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TemplateFilters } from "./TemplateFilters";

export function TemplateGrid({
  featured = false,
  limit,
  category,
}: TemplateGridProps) {
  const { templates, isLoading } = useTemplates();
  const filter = useTemplateFilters(templates, category);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const processedTemplates = filter.filteredTemplates
    .filter((t) => (featured ? t.featured : true))
    .slice(0, limit || templates.length);

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-8 w-full mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <TemplateSearch
            searchQuery={filter.searchQuery}
            setSearchQuery={filter.setSearchQuery}
          />

          {/* Mobile Filters Toggle */}
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                showMobileFilters && "rotate-180"
              )}
            />
          </Button>

          {/* Desktop Clear Button */}
          {filter.hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-1 text-muted-foreground"
              onClick={filter.clearFilters}
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Filters Container */}
        <AnimatePresence>
          {(showMobileFilters || !filter.hasActiveFilters) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 py-2">
                <TemplateFilters
                  priceFilter={filter.priceFilter}
                  setPriceFilter={filter.setPriceFilter}
                  categories={filter.categories}
                  selectedCategory={filter.selectedCategory ?? ""}
                  setSelectedCategory={filter.setSelectedCategory}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {processedTemplates.length === 0 ? (
        <NoTemplatesFound
          hasActiveFilters={Boolean(filter.hasActiveFilters)}
          clearFilters={filter.clearFilters}
        />
      ) : (
        <TemplateList
          templates={processedTemplates}
          selectedCategory={filter.selectedCategory}
          priceFilter={filter.priceFilter}
        />
      )}
    </div>
  );
}

const LoadingState = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);