"use client";

import { useTemplates } from "@/hooks/useTemplate";
import { useTemplateFilters } from "@/hooks/useTemplateFilters";
import { TemplateSearch } from "./TemplateSearch";
import { TemplateList } from "./TemplateList";
import { NoTemplatesFound } from "./NoTemplatesFound";
import { TemplateGridProps } from "@/types/templates";
import { TemplateFilters } from "./TemplateFilters";
import { Skeleton } from "@/components/ui/skeleton";

export function TemplateGrid({ limit, category }: TemplateGridProps) {
  const { templates, isLoading } = useTemplates();
  const filter = useTemplateFilters(templates, category);

  const processedTemplates = filter.filteredTemplates.slice(
    0,
    limit || templates.length
  );

  return (
    <div className="space-y-8 w-full mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          <TemplateSearch
            searchQuery={filter.searchQuery}
            setSearchQuery={filter.setSearchQuery}
          />

          {/* Filters panel */}
          <TemplateFilters
            priceFilter={filter.priceFilter}
            setPriceFilter={filter.setPriceFilter}
            categories={filter.categories}
            selectedCategory={filter.selectedCategory ?? ""}
            setSelectedCategory={filter.setSelectedCategory}
          />
        </div>
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
