import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TemplateSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const TemplateSearch = ({
  searchQuery,
  setSearchQuery,
}: TemplateSearchProps) => {
  return (
    <div className="relative w-full max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <Search className="h-4 w-4" />
      </span>

      <Input
        type="text"
        placeholder="Search templates..."
        className="pl-10 pr-10 h-11  rounded-full bg-background border border-muted-foreground/20 focus-visible:ring-offset-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {searchQuery && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
};
