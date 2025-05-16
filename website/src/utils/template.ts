export type Template = {
  slug: string
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
    slug: 'cloud-cost-optimisation',
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
    slug: 'sentinel-ai',
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
    slug: 'portfolio-site',
    title: 'Portfolio',
    description: 'A clean, minimalist portfolio template for designers and developers.',
    thumbnailUrls: ['https://res.cloudinary.com/dyg4weoem/image/upload/v1747415249/portfolio_wwkrgs.png'],
    demoUrl: 'https://9abel-portfolio.vercel.app/',
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
]
