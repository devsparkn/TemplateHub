
import { HeroSection } from '@/components/HeroSection'
import { FeatureSection } from '@/components/FeatureSection'
import { TestimonialSection } from '@/components/Testimonial'
import { CTASection } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import PopularTemplate from '@/components/PopularTemplate'
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col">
        <HeroSection />
        <FeatureSection />
        <PopularTemplate />
        <TestimonialSection />
        <CTASection />
      </main>
    </div>
  )
}