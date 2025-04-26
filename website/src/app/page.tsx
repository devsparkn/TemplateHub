import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { TestimonialSection } from "@/components/Testimonial";
import { CTASection } from "@/components/CTA";
import PopularTemplate from "@/components/PopularTemplate";
import RecentlyAddedTemplates from "@/components/home/RecentlyAddedTemplates";
import HowItWorksSection from "@/components/home/HowItWorks";
import FAQ from "@/components/home/Faq";
import NewsLetterSection from "@/components/home/NewsLetterSection";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col">
        <HeroSection />
        <FeatureSection />
        <PopularTemplate />
        <RecentlyAddedTemplates />
        <HowItWorksSection />
        <TestimonialSection />
        <FAQ />
        <NewsLetterSection />
        <CTASection />
      </main>
    </div>
  );
}
