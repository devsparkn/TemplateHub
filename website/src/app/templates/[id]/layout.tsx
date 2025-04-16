import { templates } from '@/utils/template'
import { Metadata } from 'next'
import { cache } from 'react'

type LayoutProps = {
  children: React.ReactNode
  params: { id: string }
}

// Async-cached template getter
const getTemplate = cache(async (id: string) => {
  return templates.find(t => t.id === id)
})

// Generate metadata for the template
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const template = await getTemplate(params.id)

  if (!template) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found',
    }
  }

  return {
    title: `${template.title} | Template`,
    description: template.description,
  }
}

// Generate static params for pre-rendering
export async function generateStaticParams() {
  return templates.map(template => ({
    id: template.id,
  }))
}

// Layout wrapper for each template page
export default function TemplateLayout({ children }: LayoutProps) {
  return <>{children}</>
}
