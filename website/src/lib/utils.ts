import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatPrice(price: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(typeof price === "string" ? parseFloat(price) : price)
}

// Placeholder for analytics
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  console.log(`[Analytics] ${event}`, properties)
  // This would integrate with your analytics provider
}

// Global site configuration
export const siteConfig = {
  name: "TemplateHub",
  description: "Premium Next.js templates for developers and businesses",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Templates",
      href: "/templates",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  links: {
    twitter: "https://twitter.com/templatehub",
    github: "https://github.com/templatehub",
    docs: "/docs",
  },
}

// Global metadata for SEO
export const siteMetadata = {
  title: "TemplateHub - Premium Next.js Templates",
  description: "Discover professionally crafted Next.js templates for your next project",
  keywords: ["next.js", "templates", "tailwind css", "typescript", "react"],
  authors: [
    {
      name: "TemplateHub",
      url: "https://templatehub.com",
    },
  ],
  creator: "TemplateHub",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://templatehub.com",
    title: "TemplateHub - Premium Next.js Templates",
    description: "Discover professionally crafted Next.js templates for your next project",
    siteName: "TemplateHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "TemplateHub - Premium Next.js Templates",
    description: "Discover professionally crafted Next.js templates for your next project",
    creator: "@templatehub",
  },
}