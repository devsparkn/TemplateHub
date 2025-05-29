import React from 'react'
import { TemplateGrid } from '@/components/templates/Templates'

export const metadata = {
  title: 'Templates | Modern UI',
  description: 'Browse our collection of premium templates for your next project',
}

const Page = () => {
  return (
    <div className="container py-12 space-y-8 px-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          Browse Our{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Premium Templates
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Handcrafted templates for every type of business or SaaS. Just pick, customize and launch!
        </p>
      </div>
      
      <TemplateGrid />
    </div>
  )
}

export default Page