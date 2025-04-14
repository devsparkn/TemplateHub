import { templates } from '@/utils/template'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

type Props = {
  params: { id: string }
  children: React.ReactNode
}

// Cache the template lookup to avoid repeated lookups
const getTemplate = cache((id: string) => {
  return templates.find(t => t.id === id)
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Access params safely by using the id as a parameter to a function
  const template = getTemplate(params.id)
  
  if (!template) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found'
    }
  }
  
  return {
    title: `${template.title} | Template`,
    description: template.description
  }
}

export async function generateStaticParams() {
  return templates.map(template => ({
    id: template.id,
  }))
}

export default function TemplateLayout({ params, children }: Props) {
  return <>{children}</>
}