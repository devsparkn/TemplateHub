import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Code,
  CreditCard,
  Settings,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    iconColor: "text-blue-500",
    bg: "bg-blue-100",
    title: "Launch Quickly",
    description:
      "Deploy your project in minutes, not weeks. Every template is ready to go out of the box.",
  },
  {
    icon: Code,
    iconColor: "text-green-500",
    bg: "bg-green-100",
    title: "Modern Tech Stack",
    description:
      "Built with Next.js, TypeScript, and Tailwind CSS for maximum performance and flexibility.",
  },
  {
    icon: Settings,
    iconColor: "text-purple-500",
    bg: "bg-purple-100",
    title: "Fully Customizable",
    description:
      "Tweak styles, components, and logic to perfectly align with your brand and goals.",
  },
  {
    icon: Star,
    iconColor: "text-yellow-500",
    bg: "bg-yellow-100",
    title: "Premium Quality",
    description:
      "Professionally crafted UI/UX with a strong focus on visual clarity and user experience.",
  },
  {
    icon: CreditCard,
    iconColor: "text-pink-500",
    bg: "bg-pink-100",
    title: "Affordable Pricing",
    description:
      "Access high-quality templates at a fraction of the cost of custom development.",
  },
  {
    icon: CheckCircle,
    iconColor: "text-indigo-500",
    bg: "bg-indigo-100",
    title: "SEO Optimized",
    description:
      "Built with best practices for fast loading times and excellent search engine performance.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to{" "}
            <span className="text-yellow-400">Launch Fast</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto">
            Launch your SaaS or business effortlessly with our production-ready
            templates.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-all hover:shadow-2xl hover:scale-[1.02] duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.bg} ${feature.iconColor} transition-transform group-hover:rotate-6`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-10 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Trusted by innovative teams at{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Fortune 500 companies
            </span>{" "}
            and{" "}
            <span className="font-semibold text-yellow-400">
              fast-growing startups
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
