"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterGroupProps<T> {
  label: string;
  options: { value: T; label: string }[];
  selectedValue: T;
  onSelect: (value: T) => void;
  allLabel?: string;
}

export const FilterGroup = <T extends string | null>({
  label,
  options,
  selectedValue,
  onSelect,
  allLabel = "All",
}: FilterGroupProps<T>) => (
  <div className="w-full md:w-auto">
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!selectedValue ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(null as T)}
          className={cn(
            "rounded-full",
            !selectedValue && "bg-primary text-primary-foreground"
          )}
        >
          {allLabel}
        </Button>

        {options.map(({ value, label }) => (
          <Button
            key={value}
            variant={selectedValue === value ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(value)}
            className={cn(
              "rounded-full",
              selectedValue === value && "bg-primary text-primary-foreground"
            )}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  </div>
);
