"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { HoverEffect } from "./ui/card-hover-effect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Template {
  slug: string;
  title: string;
  description: string;
  thumbnailUrls: string[];
  category: string;
  price: number;
  demoUrl: string;
  features: string[];
  techStack: string[];
  featured: boolean;
}

interface TemplateGridProps {
  featured?: boolean;
  limit?: number;
  category?: string;
}

type PriceFilter = "all" | "free" | "premium";

export function TemplateGrid({
  featured = false,
  limit,
  category,
}: TemplateGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    category || null
  );
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        const data = await response.json();
        if (data.success) {
          setTemplates(data.data);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const categories = Array.from(new Set(templates.map((t) => t.category)));

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const filteredTemplates = templates
    .filter((template) => (featured ? template.featured : true))
    .filter((template) =>
      selectedCategory ? template.category === selectedCategory : true
    )
    .filter((template) => {
      if (priceFilter === "all") return true;
      if (priceFilter === "free") return template.price === 0;
      if (priceFilter === "premium") return template.price > 0;
      return true;
    })
    .filter(
      (template) =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, limit || templates.length);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceFilter("all");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || priceFilter !== "all";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10 h-11 bg-background border-muted-foreground/20 focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>

          {isMobile ? (
            <Button
              variant="outline"
              className="flex items-center gap-2 h-11"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  showFilters && "rotate-180"
                )}
              />
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-muted-foreground"
                  onClick={clearFilters}
                >
                  <X className="h-3.5 w-3.5" />
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>

        <AnimatePresence>
          {(!isMobile || showFilters) && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : false}
              animate={isMobile ? { height: "auto", opacity: 1 } : false}
              exit={isMobile ? { height: 0, opacity: 0 } : undefined}
              className="overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 py-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs font-normal py-0 px-2"
                    >
                      Price
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={priceFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriceFilter("all")}
                      className={cn(
                        "h-8 rounded-full",
                        priceFilter === "all"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      )}
                    >
                      All
                    </Button>
                    <Button
                      variant={priceFilter === "free" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriceFilter("free")}
                      className={cn(
                        "h-8 rounded-full",
                        priceFilter === "free"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      )}
                    >
                      Free
                    </Button>
                    <Button
                      variant={
                        priceFilter === "premium" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setPriceFilter("premium")}
                      className={cn(
                        "h-8 rounded-full",
                        priceFilter === "premium"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      )}
                    >
                      Premium
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs font-normal py-0 px-2"
                    >
                      Category
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={
                        selectedCategory === null ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "h-8 rounded-full",
                        selectedCategory === null
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      )}
                    >
                      All
                    </Button>
                    {isMobile ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-full"
                          >
                            {selectedCategory || "Select category"}{" "}
                            <ChevronDown className="ml-1 h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          {categories.map((cat) => (
                            <DropdownMenuItem
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                            >
                              {cat}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      categories.map((cat) => (
                        <Button
                          key={cat}
                          variant={
                            selectedCategory === cat ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "h-8 rounded-full",
                            selectedCategory === cat
                              ? "bg-primary text-primary-foreground"
                              : "bg-background"
                          )}
                        >
                          {cat}
                        </Button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        {filteredTemplates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 px-4 rounded-lg border border-dashed"
          >
            <div className="max-w-md mx-auto space-y-4">
              <Search className="h-12 w-12 text-muted-foreground/50 mx-auto" />
              <h3 className="text-xl font-medium">No templates found</h3>
              <p className="text-muted-foreground">
                We couldn&apos;t find any templates matching your current
                filters. Try adjusting your search or filters.
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredTemplates.length}
                </span>{" "}
                templates
                {selectedCategory && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="font-medium text-foreground">
                      {selectedCategory}
                    </span>
                  </span>
                )}
                {priceFilter !== "all" && (
                  <span>
                    {" "}
                    that are{" "}
                    <span className="font-medium text-foreground">
                      {priceFilter}
                    </span>
                  </span>
                )}
              </p>
            </div>
            <HoverEffect templates={filteredTemplates} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
