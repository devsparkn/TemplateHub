'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Star } from 'lucide-react'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-36 px-6 sm:px-10 lg:px-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-5 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-purple-300 blur-[140px] opacity-25 dark:bg-purple-900" />
      <div className="absolute bottom-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-blue-300 blur-[140px] opacity-25 dark:bg-blue-900" />

      <div className="relative  mx-auto grid lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center bg-muted border border-border px-4 text-sm py-1.5 rounded-full w-fit mb-6 shadow-sm">
            <span className="">🚀</span> Launched New Templates
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight text-foreground">
            Launch Your Next <span className="text-primary">SaaS Startup</span> in Minutes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
            Get access to beautifully designed, production-ready Next.js templates. Built with Tailwind CSS and TypeScript, optimized for startups and indie hackers.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/templates">
                Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/docs">Learn More</Link>
            </Button>
          </div>

          {/* Reviews & Trust */}
          <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mt-4">
            <div className="flex items-center">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              <span className="ml-2 text-sm font-medium text-foreground">5.0 / 5.0</span>
            </div>
            <span className="text-muted-foreground">★ 250+ Reviews</span>
            <span className="text-muted-foreground">👨‍💻 Trusted by 2,500+ Developers</span>
          </div>
        </motion.div>

        {/* Right Side: Image Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-border bg-background">
            <Image
              src="https://res.cloudinary.com/dyg4weoem/image/upload/v1746024916/sentinel-ai_xsmr4b.png"
              alt="Next.js Template Preview"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 right-4 backdrop-blur-md bg-background/80 border border-border px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Next.js 14 Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
