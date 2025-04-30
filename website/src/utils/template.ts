export type Template = {
  id: string
  title: string
  description: string
  thumbnailUrls: string[]
  demoUrl: string
  category: string
  featured: boolean
  price: number | 'Free'
  features: string[]
  techStack?: string[]
  tags?: string[]
  authorId?: string | null
}

export const templates: Template[] = [
  {
    id: 'cloud-cost-optimisation',
    title: 'Cloud Cost Optimisation',
    description: 'AI based cloud cost optmisation Application with analytics, charts, and user management.',
    thumbnailUrls: ['https://res.cloudinary.com/dyg4weoem/image/upload/v1746024691/cloud-cost-optimization_axehri.png'],
    demoUrl: 'https://cloud-cost-optimization.vercel.app/',
    category: 'SaaS',
    featured: true,
    price: 'Free',
    features: [
      'AI-powered cost optimization recommendations',
      'Real-time cloud spending analytics',
      'Custom dashboards and reporting',
      'Multi-cloud provider support',
      'Budget alerts and notifications',
      'Resource utilization insights',
      'Automated cost saving actions'
    ],
    techStack: ['React', 'Tailwind', 'Chart.js', 'Node.js'],
    tags: ['AI', 'Cloud', 'SaaS'],
    authorId: null
  },
  {
    id: 'sentinel-ai',
    title: 'Sentinel AI',
    description: 'AI based deepfake detection.',
    thumbnailUrls: ['https://res.cloudinary.com/dyg4weoem/image/upload/v1746024916/sentinel-ai_xsmr4b.png'],
    demoUrl: 'https://sentinel-ai-eight.vercel.app',
    category: 'SaaS',
    featured: true,
    price: 20,
    features: [
      'Advanced deepfake detection algorithms',
      'Multi-media analysis (images, videos, audio)',
      'Real-time scanning capabilities',
      'Confidence scoring system',
      'Detailed forensic reports',
      'API integration for third-party apps',
      'Regular algorithm updates'
    ],
    techStack: ['Next.js', 'TensorFlow', 'TypeScript'],
    tags: ['AI', 'Security', 'Detection'],
    authorId: null
  },
  {
    id: 'saas-starter',
    title: 'SaaS Starter',
    description: 'Everything you need to launch your SaaS product with authentication and billing.',
    thumbnailUrls: ['/templates/saas.png'],
    demoUrl: '/demos/saas',
    category: 'SaaS',
    featured: true,
    price: 'Free',
    features: [
      'User authentication and authorization',
      'Subscription management',
      'Stripe integration for payments',
      'User dashboard',
      'Team collaboration features',
      'Email notification system',
      'Usage analytics and reporting'
    ],
    techStack: ['Next.js', 'Stripe', 'MongoDB'],
    tags: ['SaaS', 'Startup', 'Subscription'],
    authorId: null
  },
  {
    id: 'portfolio-minimal',
    title: 'Portfolio Minimal',
    description: 'A clean, minimalist portfolio template for designers and developers.',
    thumbnailUrls: ['/templates/portfolio.png'],
    demoUrl: '/demos/portfolio',
    category: 'Portfolio',
    featured: true,
    price: 'Free',
    features: [
      'Minimalist design aesthetic',
      'Project showcase with filters',
      'Responsive image gallery',
      'Contact form integration',
      'SEO optimized structure',
      'Performance optimized assets',
      'Easy customization options'
    ],
    techStack: ['React', 'Tailwind', 'EmailJS'],
    tags: ['Portfolio', 'Minimal', 'Developer'],
    authorId: null
  },
  {
    id: 'blog-modern',
    title: 'Blog Modern',
    description: 'A feature-rich blog template with comment system and newsletter signup.',
    thumbnailUrls: ['/templates/blog.png'],
    demoUrl: '/demos/blog',
    category: 'Blog',
    featured: true,
    price: 'Free',
    features: [
      'SEO optimized article structure',
      'Comment system with moderation',
      'Newsletter subscription form',
      'Social sharing integration',
      'Related posts suggestions',
      'Reading time estimation',
      'Markdown support for easy writing'
    ],
    techStack: ['Next.js', 'MDX', 'Tailwind'],
    tags: ['Blog', 'Content', 'SEO'],
    authorId: null
  },
  {
    id: 'simple-store',
    title: 'Simple Store',
    description: 'E-commerce store template with product listings and checkout.',
    thumbnailUrls: ['/templates/store.png'],
    demoUrl: '/demos/store',
    category: 'E-commerce',
    featured: true,
    price: 'Free',
    features: [
      'Product catalog with filtering',
      'Shopping cart functionality',
      'Secure checkout process',
      'Product image gallery',
      'Inventory management',
      'Customer reviews system',
      'Order tracking functionality'
    ],
    techStack: ['React', 'Redux', 'Node.js', 'MongoDB'],
    tags: ['E-commerce', 'Store', 'Shopping'],
    authorId: null
  },
]
