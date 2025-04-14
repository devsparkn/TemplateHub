'use client'

import { useState } from 'react'
import { TemplateCard } from './TemplateCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import { templates } from '@/utils/template'

interface TemplateGridProps {
  featured?: boolean
  limit?: number
  category?: string
}

type PriceFilter = 'all' | 'free' | 'premium';

export function TemplateGrid({ featured = false, limit, category }: TemplateGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null)
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')

  const categories = Array.from(new Set(templates.map(t => t.category)))

  const filteredTemplates = templates
    .filter(template => (featured ? template.featured : true))
    .filter(template => (selectedCategory ? template.category === selectedCategory : true))
    .filter(template => {
      if (priceFilter === 'all') return true;
      if (priceFilter === 'free') return template.price === 'Free';
      if (priceFilter === 'premium') return template.price !== 'Free';
      return true;
    })
    .filter(template =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, limit || templates.length)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Price:</span>
            <div className="flex gap-2">
              <Button
                variant={priceFilter === 'all' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter('all')}
              >
                All
              </Button>
              <Button
                variant={priceFilter === 'free' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter('free')}
              >
                Free
              </Button>
              <Button
                variant={priceFilter === 'premium' ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter('premium')}
              >
                Premium
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Category:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'secondary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  )
}
