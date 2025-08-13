"use client";

import { FilterGroup } from "./FilterGroup";
import { PriceFilter } from "@/types/templates";

type TemplateFiltersProps = {
  priceFilter: PriceFilter;
  setPriceFilter: (value: PriceFilter) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

export const TemplateFilters = ({
  priceFilter,
  setPriceFilter,
  categories,
  selectedCategory,
  setSelectedCategory,
}: TemplateFiltersProps) => (
  <>
    <FilterGroup
      label="Price"
      options={[
        { value: "free", label: "Free" },
        { value: "premium", label: "Premium" },
      ]}
      selectedValue={priceFilter}
      onSelect={setPriceFilter}
      allLabel="All"
    />

    <FilterGroup
      label="Category"
      options={categories.map((c) => ({ value: c, label: c }))}
      selectedValue={selectedCategory}
      onSelect={setSelectedCategory}
      allLabel="All"
    />
  </>
);
