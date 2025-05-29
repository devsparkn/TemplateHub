"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NoTemplatesFoundProps {
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export const NoTemplatesFound = ({
  hasActiveFilters,
  clearFilters,
}: NoTemplatesFoundProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16 px-4 rounded-lg border border-dashed"
  >
    <div className="max-w-md mx-auto space-y-4">
      <Search className="h-12 w-12 text-muted-foreground/50 mx-auto" />
      <h3 className="text-xl font-medium">No templates found</h3>
      <p className="text-muted-foreground">
        We couldn&apos;t find any templates matching your current filters.
        Try adjusting your search or filters.
      </p>
      {hasActiveFilters && (
        <Button onClick={clearFilters} variant="outline">
          Clear all filters
        </Button>
      )}
    </div>
  </motion.div>
);