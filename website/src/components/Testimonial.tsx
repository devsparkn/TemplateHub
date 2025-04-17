'use client'

import Image from 'next/image'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export function TestimonialSection() {
  const testimonials = [
    {
      content: "These templates saved us at least 3 weeks of development time. The code is clean, well-structured, and easy to customize. Highly recommended for any Next.js project.",
      author: "Sarah Johnson",
      role: "CTO",
      company: "Acme Inc",
      avatar: "https://github.com/shadcn.png",
      rating: 5
    },
    {
      content: "I've tried several template providers, but TemplateHub's Next.js templates are by far the best. The attention to detail and performance optimizations are impressive.",
      author: "Michael Chen",
      role: "Frontend Developer",
      company: "TechStart",
      avatar: "https://github.com/shadcn.png",
      rating: 5
    },
    {
      content: "The dashboard template we purchased had everything we needed right out of the box. The documentation was clear and comprehensive, making customization a breeze.",
      author: "Emily Rodriguez",
      role: "Product Manager",
      company: "DataViz",
      avatar: "https://github.com/shadcn.png",
      rating: 5
    },
    {
      content: "As a solo developer, these templates have been a game-changer for my client projects. Professional quality, modern design, and excellent support.",
      author: "David Kim",
      role: "Freelance Developer",
      company: "Self-employed",
      avatar: "https://github.com/shadcn.png",
      rating: 5
    }
  ]

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-[700px]">
            Thousands of developers trust our templates to build beautiful, functional websites.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="flex">
            {testimonials.map(({ content, author, role, company, avatar, rating }, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-background h-full flex flex-col justify-between">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg flex-grow">{content}</blockquote>
                    <div className="flex items-center mt-6">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={avatar}
                          alt={author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{author}</div>
                        <div className="text-sm text-muted-foreground">{role}, {company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
