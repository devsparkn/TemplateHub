"use client";

import { useState } from "react";
import { Eye, Star, ArrowRight } from "lucide-react";
import { Template } from "@/types/templates";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/slices/cartSlice";
import { toast } from "sonner";
import { RootState } from "@/lib/store";
import { useSession, signIn } from "next-auth/react";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some((item) => item._id === template._id);
  const { data: session, status } = useSession();
  const [downloading, setDownloading] = useState(false);

  const handleAddToCart = () => {
    if (isInCart) {
      toast.info("Already in cart");
      return;
    }

    if (template.price === "Free") {
      toast.info("Free templates cannot be added to the cart.");
      return;
    } else {
      dispatch(addToCart(template));
      toast.success("Template added to cart");
    }
  };

  // Download handler for free templates
  const handleFreeDownload = async () => {
    if (status === "loading") return;
    if (status !== "authenticated") {
      signIn(undefined, { callbackUrl: `/templates/${template.slug}` });
      return;
    }
    setDownloading(true);
    try {
      // Assign template to user (if not already assigned)
      const res = await fetch(`/api/templates/${template.slug}/assign`, { method: "POST" });
      const data = await res.json();
      if (!data.success) {
        toast.error(data.message || "Failed to assign template to your account.");
        setDownloading(false);
        return;
      }
      // Now fetch download URL
      const downloadRes = await fetch(`/api/templates/${template.slug}/can-download`);
      const downloadData = await downloadRes.json();
      if (!downloadData.allowed || !downloadData.template?.downloadUrl) {
        toast.error("You do not have access to download this template.");
        setDownloading(false);
        return;
      }
      // Trigger file download
      const link = document.createElement("a");
      link.href = downloadData.template.downloadUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Template added to your account and download started!");
    } catch {
      toast.error("Failed to download template.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="relative group rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {template.featured && (
        <div className="absolute top-4 left-4 z-20 animate-pulse">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full text-xs font-semibold shadow-lg">
            <Star className="w-4 h-4 fill-current stroke-none" />
            Featured
          </div>
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={template.thumbnailUrls[0]}
          alt={template.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button variant="outline" size="sm" asChild>
            <Link href={template.demoUrl} target="_blank">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title + Price */}
        <div className="flex items-start justify-between mb-4">
          <div className="max-w-[75%]">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {template.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {template.category}
            </p>
          </div>
          <span
            className={`px-3 py-1 text-base font-medium rounded-full whitespace-nowrap ${
              template.price === "Free"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            }`}
          >
            {template.price === "Free" ? "Free" : `$${template.price}`}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-4">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {template.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex w-full justify-between gap-2">
          {template.price === "Free" ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleFreeDownload}
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Download"}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? "Added" : "Add to Cart"}
            </Button>
          )}
          <Button asChild>
            <Link href={`/templates/${template.slug}`}>
              Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
