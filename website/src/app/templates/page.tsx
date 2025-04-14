import React from 'react'
import { TemplateGrid } from '@/components/TemplateGrid'

export const metadata = {
  title: 'Templates | Modern UI',
  description: 'Browse our collection of premium templates for your next project',
}

const Page = () => {
  return (
    <div className="container py-12 space-y-8 px-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Premium Templates
        </h1>
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          Browse our collection of high-quality templates for your next project
        </p>
      </div>
      
      <TemplateGrid />
    </div>
  )
}

export default Page
