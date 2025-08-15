"use client";

import { PriceFilter } from "@/types/templates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}: TemplateFiltersProps) => {
  return (
    <div className="flex gap-4">
      {/* Price filter */}
      <div className="w-full max-w-[320px] ">
        <Select
          value={priceFilter || "all"}
          onValueChange={(value) =>
            setPriceFilter(value === "all" ? null : (value as PriceFilter))
          }
        >
          <SelectTrigger className="w-full !h-11 truncate rounded-full bg-background border border-muted-foreground/20">
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category filter */}
      <div className="w-full max-w-[320px]">
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value) =>
            setSelectedCategory(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-full !h-11 truncate rounded-full bg-background border border-muted-foreground/20">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
