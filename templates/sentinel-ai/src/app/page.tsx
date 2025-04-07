import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import FeaturesSection from "../components/home/FeatureSection";
import DemoSection from "../components/home/DemoSection";
import TestimonialsSection from "../components/home/TestimonialSection";
import SecuritySection from "../components/home/SecuritySection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <SecuritySection />
      <CTASection />
    </div>
  );
}