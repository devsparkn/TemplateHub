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
import { Skeleton } from "@/components/ui/skeleton";

export function TemplateGrid({ limit, category }: TemplateGridProps) {
  const { templates, isLoading } = useTemplates();
  const filter = useTemplateFilters(templates, category);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const processedTemplates = filter.filteredTemplates.slice(
    0,
    limit || templates.length
  );

  return (
    <div className="space-y-8 w-full mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <TemplateSearch
            searchQuery={filter.searchQuery}
            setSearchQuery={filter.setSearchQuery}
          />

          <div className="flex gap-2 w-full md:w-auto">
            {/* Filters toggle button*/}
            <Button
              variant="outline"
              className="md:hidden flex items-center gap-2 flex-1"
              onClick={() => setShowMobileFilters((v) => !v)}
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

            {/* Clear filters button*/}
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
        </div>

        {/* Filters panel */}
        <AnimatePresence initial={false}>
          {/* Mobile */}
          {showMobileFilters && (
            <motion.div
              key="mobile-filters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden border-t"
            >
              <div className="flex flex-col gap-6 py-4">
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
          {/* Desktop */}
          <div className="hidden md:flex md:flex-row md:items-center gap-6 py-4 border-t">
            <TemplateFilters
              priceFilter={filter.priceFilter}
              setPriceFilter={filter.setPriceFilter}
              categories={filter.categories}
              selectedCategory={filter.selectedCategory ?? ""}
              setSelectedCategory={filter.setSelectedCategory}
            />
          </div>
        </AnimatePresence>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : processedTemplates.length === 0 ? (
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
  <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="h-48 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    ))}
  </div>
);
