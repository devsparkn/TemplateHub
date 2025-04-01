// components/cta-section.tsx - Call to action section
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="bg-background py-20 px-8">
      <div className="">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Ready to Build Your Next Project?
          </h2>
          <p className="text-lg mb-8 max-w-[700px]">
            Join thousands of developers who are shipping faster with our premium Next.js templates.
            Get started today and transform your development workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/templates">
                Browse Templates
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs">
                Read Documentation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex items-center">
              <div className=" h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <span className=" font-bold text-purple-700">20+</span>
              </div>
              <span className="">Premium Templates</span>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <span className=" font-bold text-xs text-purple-700">24/7</span>
              </div>
              <span className="">Customer Support</span>
            </div>
            <div className="flex items-center">
              <div className=" h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                <span className="font-bold text-purple-700">∞</span>
              </div>
              <span className="">Lifetime Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}