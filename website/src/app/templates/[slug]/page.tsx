'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, ShoppingCart, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TemplateCard } from '@/components/TemplateCard';
import { addToCart } from '@/lib/slices/cartSlice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Template } from '@/lib/slices/cartSlice';

// Utility function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Page = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [relatedTemplates, setRelatedTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`/api/templates/${slug}`);
        if (!response.ok) {
          throw new Error('Template not found');
        }
        const data = await response.json();
        setTemplate(data);
        
        // Fetch related templates
        if (data.category) {
          // Fetch all templates
          const allTemplatesResponse = await fetch('/api/templates');
          if (allTemplatesResponse.ok) {
            const allTemplatesData = await allTemplatesResponse.json();
            const allTemplates = allTemplatesData.data || [];
            
            // Filter templates of the same category, excluding current template
            let related = allTemplates
              .filter((t: Template) => 
                t.category === data.category && t._id !== data._id
              );
              
            // Shuffle and limit to 3 related templates
            if (related.length > 0) {
              related = shuffleArray(related).slice(0, 3);
            }
              
            setRelatedTemplates(related);
          }
        }
      } catch (error) {
        console.error('Failed to fetch template:', error);
        setTemplate(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchTemplate();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (template) {
      dispatch(addToCart(template));
      toast.success('Added to cart', {
        description: `${template.title} has been added to your cart`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading template...</span>
      </div>
    );
  }

  if (!template) {
    return notFound();
  }

  const faqs = [
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with your purchase.',
    },
    {
      question: 'What\'s included in the template?',
      answer: 'All templates include the full source code, documentation, and free updates for 6 months.',
    },
    {
      question: 'Can I use this for client projects?',
      answer: 'Yes, you can use our templates for both personal and client projects with a single license.',
    },
    {
      question: 'Do you offer support?',
      answer: 'Yes, we offer 6 months of support with each template purchase to help you get up and running.',
    },
  ];

  return (
    <div className="container py-12 space-y-16 px-8">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left column - Image and preview */}
        <div className="space-y-6">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
            <Image
              src={template.thumbnailUrls[0]}
              alt={template.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href={template.demoUrl} target="_blank">
                <ExternalLink className="mr-2 h-5 w-5" />
                Live Preview
              </Link>
            </Button>
          </div>
        </div>

        {/* Right column - Details */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1">
                {template.category}
              </Badge>
              {template.featured && (
                <Badge variant="secondary" className="px-3 py-1">
                  Featured
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight">{template.title}</h1>
            <p className="text-lg text-muted-foreground">{template.description}</p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">
              {template.price === 'Free' ? 'Free' : `$${template.price}`}
            </span>
            {template.price !== 'Free' && (
              <span className="text-muted-foreground">one-time payment</span>
            )}
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>Instant delivery • Lifetime access • Free updates</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2">
              {template.features.slice(0, Math.ceil(template.features.length / 2)).map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {template.features.slice(Math.ceil(template.features.length / 2)).map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="details" className="pt-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3>What&#39;s included</h3>
            <p>This template includes everything you need to get started with your project:</p>
            <ul>
              <li>Complete source code with comprehensive comments</li>
              <li>Detailed documentation with setup instructions</li>
              <li>6 months of support and updates</li>
              <li>Fully responsive design optimized for all devices</li>
              <li>Cross-browser compatibility</li>
            </ul>

            <h3>Technology stack</h3>
            <p>This template is built with modern technologies:</p>
            <ul>
              {template.techStack.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="faq" className="pt-6">
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related templates section */}
      <div className="pt-10 border-t">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">More {template.category} Templates</h2>
            <p className="text-muted-foreground mt-1">Discover other templates in the same category</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/templates" className="flex items-center">
              View all templates <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {relatedTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTemplates.map((template) => (
              <TemplateCard key={template._id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground">No other templates found in this category.</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/templates">Browse all templates</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
