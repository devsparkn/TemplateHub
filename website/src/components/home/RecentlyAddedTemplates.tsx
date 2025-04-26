import { HoverEffect } from "../ui/card-hover-effect";
import { templates } from "@/utils/template";
export default function RecentlyAddedTemplates() {
  return (
    <div className="px-6 sm:px-10 lg:px-20">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">New Arrivals</h2>
        <p className="text-muted-foreground">
          Check out our latest template additions
        </p>
      </div>
      <HoverEffect templates={templates} />
    </div>
  );
}
