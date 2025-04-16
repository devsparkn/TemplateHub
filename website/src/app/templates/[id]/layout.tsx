import { templates } from '@/utils/template';
import { Metadata } from 'next';
import { cache } from 'react';

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

// Cache the template lookup with an async function
const getTemplate = cache(async (id: string) => {
  return templates.find(t => t.id === id);
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = await getTemplate(params.id);

  if (!template) {
    return {
      title: 'Template Not Found',
      description: 'The requested template could not be found',
    };
  }

  return {
    title: `${template.title} | Template`,
    description: template.description,
  };
}

export async function generateStaticParams() {
  return templates.map(template => ({
    id: template.id,
  }));
}

export default function TemplateLayout({ children }: Props) {
  return <>{children}</>;
}
