import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket, ShieldCheck, RefreshCcw } from 'lucide-react'

export function CTASection() {
  return (
    <section className="bg-background py-24 px-6 sm:px-10 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
          Ready to Build Your Next Project?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          Join thousands of developers shipping faster with our premium Next.js templates. 
          Get started today and transform your development workflow.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Button asChild size="lg" variant="default" className="w-full sm:w-auto">
            <Link href="/templates">
              Browse Templates
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto group">
            <Link href="/docs" className="flex items-center">
              Read Documentation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-left">
          <div className="flex items-center gap-3">
            <div className="bg-background p-2 rounded-full shadow-sm">
              <Rocket className="text-purple-600 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">20+ Premium Templates</div>
              <div className="text-xs text-muted-foreground">Crafted for speed & performance</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-background p-2 rounded-full shadow-sm">
              <ShieldCheck className="text-purple-600 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">24/7 Customer Support</div>
              <div className="text-xs text-muted-foreground">Always here to help you</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-background p-2 rounded-full shadow-sm">
              <RefreshCcw className="text-purple-600 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">Lifetime Updates</div>
              <div className="text-xs text-muted-foreground">Pay once, use forever</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
