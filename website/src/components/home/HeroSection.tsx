"use client";
import React from "react";
import Link from "next/link";
import BrandMarquee from "./BrandMarquee";
import { GradientFlowLines } from "./GradientLines";
import { ArrowRight } from "lucide-react";
const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden text-black dark:text-white bg-gradient-to-b from-[#f4f4f4] via-white to-[#eaeaea] dark:from-[#0e1117] dark:via-[#0a0e14] dark:to-black">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-16 sm:mt-28 px-6 text-center">
        {/* Tagline */}
        <div className="text-gray-500 dark:text-slate-400 text-xs tracking-widest uppercase mb-6">
          ( the best template provider )
        </div>

        {/* Headline */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-black dark:text-white">
            Launch Your Business in{" "}
            <span className="text-yellow-400">Minutes</span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-700 dark:text-zinc-400 max-w-3xl mx-auto">
          Affordable pre-built NextJS templates to kickstart your startup or
          business. Production-ready and professionally designed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-4 sm:gap-6 mt-12 mb-20 px-4">
          {/* Primary CTA */}
          <Link
            href="/templates"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-6 sm:px-8 text-lg font-semibold text-black bg-yellow-400 rounded-lg shadow-lg transition-all duration-300 hover:bg-yellow-500 group"
          >
            Start for Free
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/request-custom-template"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-6 sm:px-8 text-lg font-semibold border-2 border-slate-200 dark:border-slate-700 text-black dark:text-white rounded-lg transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500 group"
          >
            Request a Custom Build
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Decorative Background */}
      <GradientFlowLines />
      {/* Brand Marquee */}
      <BrandMarquee />
    </div>
  );
};

export default HeroSection;
