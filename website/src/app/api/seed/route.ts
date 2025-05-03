import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';

// Sample templates data
const sampleTemplates = [
  {
    slug: 'portfolio',
    title: 'Portfolio Pro',
    description: 'A modern portfolio template for developers and designers',
    thumbnailUrls: ['/templates/portfolio.png'],
    category: 'Personal',
    price: 49,
    demoUrl: 'https://example.com/preview/portfolio',
    features: [
      'Responsive design',
      'Dark and light mode',
      'Project showcase',
      'Blog section',
      'Contact form',
      'SEO optimized'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    featured: true,
  },
  {
    slug: 'blog',
    title: 'BlogMaster',
    description: 'A feature-rich blog template with modern design',
    thumbnailUrls: ['/templates/blog.png'],
    category: 'Blog',
    price: 39,
    demoUrl: 'https://example.com/preview/blog',
    features: [
      'SEO friendly',
      'Comment system',
      'Newsletter integration',
      'Social sharing',
      'Reading time estimation',
      'Related posts'
    ],
    techStack: ['Next.js', 'MDX', 'Tailwind CSS'],
    featured: false,
  },
  {
    slug: 'store',
    title: 'E-Commerce Plus',
    description: 'A complete e-commerce solution with cart and checkout',
    thumbnailUrls: ['/templates/store.png'],
    category: 'E-commerce',
    price: 79,
    demoUrl: 'https://example.com/preview/store',
    features: [
      'Product catalog',
      'Shopping cart',
      'Secure checkout',
      'Order management',
      'Customer accounts',
      'Wishlist functionality'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Stripe'],
    featured: true,
  },
  {
    slug: 'saas',
    title: 'SaaS Landing',
    description: 'Perfect template for your SaaS product landing page',
    thumbnailUrls: ['/templates/saas.png'],
    category: 'Business',
    price: 59,
    demoUrl: 'https://example.com/preview/saas',
    features: [
      'Feature showcase',
      'Pricing tables',
      'Testimonials section',
      'FAQ accordion',
      'Newsletter signup',
      'Contact section'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    featured: true,
  },
  {
    slug: 'cloud-cost-optimisation',
    title: 'Cloud Cost Dashboard',
    description: 'Monitor and optimize your cloud spending with this template',
    thumbnailUrls: ['/templates/cloud-cost-optimisation.png'],
    category: 'Dashboard',
    price: 69,
    demoUrl: 'https://example.com/preview/cloud-cost',
    features: [
      'Cost visualization',
      'Spending alerts',
      'Resource monitoring',
      'Budget tracking',
      'Optimization suggestions',
      'Admin dashboard'
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Chart.js'],
    featured: false,
  }
];

// Seed database with sample templates
export async function GET() {
  try {
    await dbConnect();
    
    // Check if templates already exist
    const count = await Template.countDocuments({});
    
    if (count > 0) {
      return NextResponse.json({
        success: true,
        message: `Database already has ${count} templates. Skipping seed.`,
        seeded: false
      });
    }
    
    // Insert sample templates
    await Template.insertMany(sampleTemplates);
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded database with ${sampleTemplates.length} templates.`,
      seeded: true
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({
      success: false,
      error: `Failed to seed database: ${(error as Error).message}`
    }, { status: 500 });
  }
} 