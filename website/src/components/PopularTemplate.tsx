import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TemplateGrid } from '@/components/TemplateGrid'
const PopularTemplate = () => {
  return (
           <section className="py-20 px-8">
             <div className="flex flex-col items-center text-center mb-16">
               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                 Our Most Popular Templates
               </h2>
               <p className="text-muted-foreground text-lg max-w-[700px]">
                 Premium, responsive Next.js templates with built-in best practices and optimized performance.
               </p>
             </div>
             <TemplateGrid featured={true} limit={6} />
             <div className="mt-12 text-center">
               <Button asChild size="lg">
                 <Link href="/templates">View All Templates</Link>
               </Button>
             </div>
           </section>
  )
}

export default PopularTemplate
