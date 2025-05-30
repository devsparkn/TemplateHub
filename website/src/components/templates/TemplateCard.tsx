/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Eye, Star, Download, ArrowRight, Info } from "lucide-react";
import { Template } from "@/types/templates";
import Image from "next/image";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
          <button className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-full font-semibold shadow hover:bg-gray-100 transition hover:scale-105">
            <Eye className="w-5 h-5" />
            Live Preview
          </button>
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
            className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
              template.price === "Free"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            }`}
          >
            {template.price === "Free" ? "Free" : `$${template.price}`}
          </span>
        </div>

        {/* Downloads */}
        {/* <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
          <Download className="w-4 h-4" />
          <span>{template.downloads.toLocaleString()}+ downloads</span>
        </div> */}

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
        <div className="flex gap-3">
          {/* Purchase Button */}
          <button className="flex-grow flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-2xl shadow-md transition-all duration-200 min-w-[140px]">
            <span className="text-sm sm:text-base">Purchase</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Details Button */}
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl transition-all duration-200 shadow-sm min-w-[120px]">
            <Info className="w-5 h-5" />
            <span className="text-sm font-medium whitespace-nowrap">
              Details
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
