// components/template-card.tsx - Individual template card
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, ArrowRight } from "lucide-react";

type Template = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  category: string;
  featured: boolean;
  price: number | "Free";
};

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={template.imageUrl}
          alt={template.title}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-2 right-2">
          <Badge variant={template.price === "Free" ? "secondary" : "default"}>
            {template.price === "Free" ? "Free" : `$${template.price}`}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{template.title}</CardTitle>
          <Badge variant="outline">{template.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <div className="flex w-full justify-between gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={template.demoUrl} target="_blank">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/templates/${template.id}`}>
              Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
