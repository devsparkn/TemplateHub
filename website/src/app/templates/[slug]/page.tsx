"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  ExternalLink,
  ShoppingCart,
  Clock,
  ArrowRight,
  Star,
  LayoutTemplate,
  Smartphone,
  Palette,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TemplateCard from "@/components/templates/TemplateCard";
import { addToCart } from "@/lib/slices/cartSlice";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Template } from "@/types/templates";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";

// Utility function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Page = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [relatedTemplates, setRelatedTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = template
    ? cartItems.some((item) => item._id === template._id)
    : false;

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`/api/templates/${slug}`);
        if (!response.ok) {
          throw new Error("Template not found");
        }
        const data = await response.json();
        setTemplate(data);

        // Fetch related templates
        if (data.category) {
          const allTemplatesResponse = await fetch("/api/templates");
          if (allTemplatesResponse.ok) {
            const allTemplatesData = await allTemplatesResponse.json();
            const allTemplates = allTemplatesData.data || [];

            let related = allTemplates.filter(
              (t: Template) =>
                t.category === data.category && t._id !== data._id
            );

            if (related.length > 0) {
              related = shuffleArray(related).slice(0, 3);
            }

            setRelatedTemplates(related);
          }
        }
      } catch (error) {
        console.error("Failed to fetch template:", error);
        setTemplate(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchTemplate();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (!template) return; // safely return if null

    if (isInCart) {
      toast.info("Template already in cart");
      return;
    }

    dispatch(addToCart(template));
    toast.success("Added to cart", {
      description: `${template.title} has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    if (!template) return;

    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "buy_now_item",
        JSON.stringify({ ...template, templateId: template._id })
      );
    }

    router.push("/checkout?buyNow=1");
  };

  if (isLoading) {
    return (
      <div className="container py-12 space-y-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Skeleton className="aspect-video rounded-xl" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-video rounded-md" />
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-10 w-48" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-40 rounded-lg" />
              <Skeleton className="h-12 w-40 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!template) {
    return notFound();
  }

  return (
    <div className="py-12 space-y-16 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery Section */}
        <div className="space-y-6">
          <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg">
            <Image
              src={template.thumbnailUrls[activeImage]}
              alt={template.title}
              fill
              className="object-fit object-center"
              priority
            />
            {template.featured && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                <Star className="h-4 w-4 mr-1" />
                FEATURED
              </div>
            )}
          </div>

          {/* Thumbnail Grid */}
          {template.thumbnailUrls.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {template.thumbnailUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-video rounded-md overflow-hidden border transition-all ${
                    activeImage === index
                      ? "ring-2 ring-yellow-500 ring-offset-2"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2"
              asChild
            >
              <Link href={template.demoUrl} target="_blank">
                <ExternalLink className="h-5 w-5" />
                Live Preview
              </Link>
            </Button>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1.5 text-sm">
                {template.category}
              </Badge>
              {template.tags?.map((tag: string, i: number) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="px-3 py-1.5 text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              {template.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {template.description}
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-muted to-background rounded-xl border">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {template.price === "Free" ? "Free" : `$${template.price}`}
              </span>
              {template.price !== "Free" && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  One-time
                </span>
              )}
            </div>
            <div className="mt-6 space-y-4">
              {template.price === "Free" ? (
                <Button
                  size="lg"
                  className="w-full gap-2 font-bold py-6 text-base cursor-pointer"
                >
                  <ArrowRight className="h-5 w-5" />
                  Download Now
                </Button>
              ) : (
                <>
                  {isInCart ? (
                    <Link
                      href="/cart"
                      className="flex items-center justify-center w-full py-4 px-6 font-semibold text-base text-white bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Go to Cart
                    </Link>
                  ) : (
                    <Button
                      size="lg"
                      className="flex items-center justify-center w-full gap-2 font-semibold py-4 px-6 text-base"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </Button>
                  )}

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-2 font-bold py-6 text-base cursor-pointer"
                    onClick={handleBuyNow}
                  >
                    <ArrowRight className="h-5 w-5" />
                    Buy Now
                  </Button>
                </>
              )}

              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>Instant delivery • Free support</span>
              </div>
            </div>
          </div>

          {/* Tech Specs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <LayoutTemplate className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Framework</p>
                <p className="font-medium">
                  {template.techStack?.join(" , ") || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Palette className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Design</p>
                <p className="font-medium">Fully Responsive</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Smartphone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Devices</p>
                <p className="font-medium">Mobile & Desktop</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8 border-t">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Powerful Features</h2>
          <p className="text-lg text-muted-foreground mt-4">
            Everything you need to launch your project quickly and efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {template.features.map((feature, i) => (
            <div
              key={i}
              className="p-6 bg-gradient-to-b from-background to-muted/30 border rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related templates section */}
      <div className="pt-10 border-t">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">
              More {template.category} Templates
            </h2>
            <p className="text-muted-foreground mt-1">
              Discover other premium templates in this collection
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/templates" className="flex items-center">
              Browse all templates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {relatedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedTemplates.map((template) => (
              <TemplateCard key={template._id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gradient-to-b from-background to-muted/30 rounded-xl border">
            <p className="text-muted-foreground">
              No other templates found in this category.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/templates">Explore Templates</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
