// components/hero-section.tsx - Hero section with animation
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
    <section className="relative overflow-hidden bg-background pt-24 pb-32 md:py-32 px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:30px_30px] opacity-5 dark:opacity-10" />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-300 blur-[150px] opacity-20 dark:bg-purple-800" />
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-300 blur-[150px] opacity-20 dark:bg-blue-800" />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm mb-6 w-fit bg-muted">
              <span className="mr-1">✨</span> Newly Released Templates
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl xl:leading-[1.1] mb-4">
              Beautiful <span className="text-primary">Next.js Templates</span> For Your Next Project
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl mb-8">
              Launch your SaaS, portfolio, or marketing site in minutes with our premium, responsive templates built with Next.js, TypeScript, and Tailwind CSS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="/templates">
                  Browse Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/docs">
                  Learn More
                </Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-2 text-sm font-medium">5.0/5.0 (250+ reviews)</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">2,500+</span> Developers Trust Us
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:row-span-2 relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-lg border bg-background shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
              <Image 
                src="/template-preview.png"
                alt="Next.js Template Preview"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Next.js 14 Ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}