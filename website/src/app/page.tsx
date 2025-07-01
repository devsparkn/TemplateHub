import HeroSection from "@/components/home/HeroSection";
import { CTASection } from "@/components/home/CTA";
import PopularTemplate from "@/components/PopularTemplate";
import RecentlyAddedTemplates from "@/components/home/RecentlyAddedTemplates";
import HowItWorksSection from "@/components/home/HowItWorks";
import FAQ from "@/components/home/Faq";
// import NewsLetterSection from "@/components/home/NewsLetterSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import TrendingTemplates from "@/components/TrendingTemplates";
import FeaturedTemplates from "@/components/FeaturedTemplates";
import TestimonialSection from "@/components/TestimonialSection";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <PopularTemplate />
        <TrendingTemplates />
        <RecentlyAddedTemplates />
        <FeaturedTemplates />
        <HowItWorksSection />
        <TestimonialSection />
        <FAQ />
        <CTASection />
      </main>
    </div>
  );
}
