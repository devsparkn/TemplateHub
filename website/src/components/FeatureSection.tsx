import { Code, Zap, BarChart, Lock, Globe, Smartphone } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Startup-Ready Ideas",
      description:
        "Each template comes with a unique SaaS startup idea — ready to build, validate, and launch.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Modern Tech Stack",
      description:
        "Built with Next.js, TypeScript, and Tailwind CSS for optimal developer experience.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimized",
      description:
        "Lightning-fast load times with optimized images and efficient code splitting.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "SEO Ready",
      description:
        "Built-in SEO best practices with meta tags and structured data.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Authentication",
      description:
        "Secure user authentication with multiple providers and role-based access.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Internationalization",
      description:
        "Multi-language support for global applications and markets.",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive Design",
      description: "Perfectly adapted for all devices from mobile to desktop.",
    },
  ];

  return (
    <section className="bg-background py-20 px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">
          Why Choose Our Templates?
        </h2>
        <p className="text-muted-foreground text-lg max-w-[700px]">
          Save weeks of development time with our production-ready templates
          built with the latest best practices.
        </p>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group transition-all duration-300 ease-in-out bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary/30"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20">
              {feature.icon}
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
