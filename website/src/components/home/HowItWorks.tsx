import { Download, Code, Zap } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Download className="h-8 w-8 text-white" />,
      title: "Choose & Purchase",
      description:
        "Browse our curated collection of premium templates and select the perfect foundation for your project needs.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: "Customize & Develop",
      description:
        "Download the complete source code and customize every aspect to perfectly match your brand identity and requirements.",
      color: "from-yellow-400 to-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/10",
      borderColor: "border-yellow-300 dark:border-yellow-600",
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Deploy & Launch",
      description:
        "Seamlessly deploy your customized solution to your preferred hosting platform and launch with confidence.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            How it <span className="text-yellow-400">Works</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into reality with our streamlined three-step
            process designed for developers and businesses of all sizes.
          </p>
        </div>

        {/* Steps with Arrows */}
        <div className="relative">
          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl ${step.bgColor} ${step.borderColor} border-2 p-8 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2`}
              >
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                {/* Icon with Glow */}
                <div
                  className={`relative mb-6 w-16 h-16 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Shimmer Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 dark:from-white/0 dark:via-white/5 dark:to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
