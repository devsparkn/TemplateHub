import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, ShieldCheck, RefreshCcw } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-16 px-6 sm:px-10 lg:px-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 "></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Ready to Build{" "}
            <span className="text-yellow-400">Something Amazing?</span>
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto">
            Transform your development workflow with our premium Next.js
            templates.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-20">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Link href="/templates" className="flex items-center gap-2">
              Browse Templates
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg font-semibold border-2 border-slate-200 dark:border-slate-700 hover:border-yellow-300 dark:hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 group"
          >
            <Link
              href="/request-custom-template"
              className="flex items-center gap-2"
            >
              Custom Template
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Rocket className="w-7 h-7" />}
            title="20+ Premium Templates"
            description="Production-ready templates built for performance and scalability"
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<ShieldCheck className="w-7 h-7" />}
            title="24/7 Expert Support"
            description="Dedicated support team ready to help you succeed"
            gradient="from-yellow-400 to-yellow-500"
          />
          <FeatureCard
            icon={<RefreshCcw className="w-7 h-7" />}
            title="Lifetime Updates"
            description="Continuous improvements and new features at no extra cost"
            gradient="from-indigo-500 to-purple-500"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative">
      {/* Card Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group-hover:shadow-xl transition-all duration-500"></div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 p-[1px]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 rounded-2xl`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative p-8 text-center">
        {/* Icon */}
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
