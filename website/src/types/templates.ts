export type PriceFilter = "all" | "free" | "premium";

export interface Template {
  _id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrls: string[];
  category: string;
  price: number | "Free";
  demoUrl: string;
  features: string[];
  techStack: string[];
  featured: boolean;
  views: number;
  downloads: number;
  lastViewed: string;
  isActive: boolean;
  tags: string[];
  authorId: string | null;
  isPublished: boolean;
}

export interface TemplateGridProps {
  featured?: boolean;
  limit?: number;
  category?: string;
}
