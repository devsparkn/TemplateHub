"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, Zap, Diamond } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-black dark:via-gray-950 dark:to-slate-900
 transition-colors duration-500"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 text-center">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-6 right-6 bg-gradient-to-r from-green-400 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
        >
          🎉 Free Forever Plan
        </motion.div>

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Launch Your Business in{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
              Minutes
            </span>
          </h1>
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-white max-w-3xl mx-auto"
        >
          Affordable pre-built NextJS templates to kickstart your startup or
          business. Production-ready and professionally designed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          {/* Primary CTA */}
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 text-white text-base md:text-lg font-semibold shadow-md transition-all duration-300 hover:scale-[1.05] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
          >
            🚀 Explore Templates
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/why-us"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-300/40 bg-white/60 dark:bg-white/5 px-7 py-3 text-indigo-800 dark:text-white text-base md:text-lg font-semibold backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-indigo-50/70 dark:hover:bg-white/10 hover:border-indigo-500/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
          >
            💡 Why Choose Us?
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <Rocket className="h-6 w-6" />,
              title: "Lightning Fast",
              description: "Optimized for speed and performance",
            },
            {
              icon: <Diamond className="h-6 w-6" />,
              title: "Premium Design",
              description: "Stunning visuals that impress visitors",
            },
            {
              icon: <Zap className="h-6 w-6" />,
              title: "Easy Setup",
              description: "Deploy in minutes with zero configuration",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
              className="group relative overflow-hidden rounded-xl bg-white/80 p-6 shadow-md backdrop-blur-sm transition-all hover:shadow-xl dark:bg-slate-800/80"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-violet-500/10 to-blue-500/10 dark:from-violet-500/20 dark:to-blue-500/20" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center p-3 rounded-lg bg-slate-100 text-indigo-600 dark:bg-slate-700 dark:text-indigo-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Animated Background Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => {
          const left = `${Math.random() * 100}%`;
          const width = `${Math.random() * 100 + 50}px`;
          const top = `${Math.random() * 100}%`;
          return (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-400"
              style={{ left, top, width }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0], x: [-100, 100] }}
              transition={{
                duration: 4 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
