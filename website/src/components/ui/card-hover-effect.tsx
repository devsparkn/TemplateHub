// components/hover-effect.tsx
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ArrowRight } from "lucide-react";

type Template = {
  slug: string;
  title: string;
  description: string;
  thumbnailUrls: string[];
  demoUrl: string;
  category: string;
  featured: boolean;
  price: number | "Free";
};

interface HoverEffectProps {
  templates: Template[];
  className?: string;
}

export const HoverEffect = ({ templates, className }: HoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {templates.map((template, idx) => (
        <div
          key={template.slug}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.5 },
                }}
              />
            )}
          </AnimatePresence>

          <Card>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={template.thumbnailUrls[0]}
                alt={template.title}
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={template.price === "Free" ? "secondary" : "default"}
                >
                  {template.price === "Free" ? "Free" : `$${template.price}`}
                </Badge>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <CardTitle>{template.title}</CardTitle>
              <Badge variant="outline" className="bg-background/50">
                {template.category}
              </Badge>
            </div>

            <CardDescription className="line-clamp-2">
              {template.description}
            </CardDescription>

            <div className="flex w-full justify-between gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hover:bg-primary/10"
              >
                <Link href={template.demoUrl} target="_blank">
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Link>
              </Button>
              <Button
                asChild
                className="dark:bg-primary dark:hover:bg-primary/90"
              >
                <Link href={`/templates/${template.slug}`}>
                  Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-background border border-neutral-200 dark:border-slate-800 group-hover:border-neutral-300 dark:group-hover:border-slate-600 relative z-20 transition-colors",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-foreground font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-muted-foreground tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
