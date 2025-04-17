// templatesData.ts
export type Template = {
  id: string
  title: string
  description: string
  imageUrl: string
  demoUrl: string
  category: string
  featured: boolean
  price: number | 'Free'
  features: string[]
}

export const templates: Template[] = [
  {
    id: 'cloud-cost-optimisation',
    title: 'Cloud Cost Optimisation',
    description: 'AI based cloud cost optmisation Application with analytics, charts, and user management.',
    imageUrl: '/templates/cloud-cost-optimization.png',
    demoUrl: 'https://cloud-cost-optimization.vercel.app/',
    category: 'SaaS',
    featured: true,
    price: 79,
    features: [
      'AI-powered cost optimization recommendations',
      'Real-time cloud spending analytics',
      'Custom dashboards and reporting',
      'Multi-cloud provider support',
      'Budget alerts and notifications',
      'Resource utilization insights',
      'Automated cost saving actions'
    ]
  },
  {
    id: 'sentinel-ai',
    title: 'Sentinel AI',
    description: 'AI based deepfake detection.',
    imageUrl: '/templates/sentinel-ai.png',
    demoUrl: 'https://sentinel-ai-eight.vercel.app',
    category: 'SaaS',
    featured: true,
    price: 79,
    features: [
      'Advanced deepfake detection algorithms',
      'Multi-media analysis (images, videos, audio)',
      'Real-time scanning capabilities',
      'Confidence scoring system',
      'Detailed forensic reports',
      'API integration for third-party apps',
      'Regular algorithm updates'
    ]
  },
  {
    id: 'dashboard-pro',
    title: 'Dashboard Pro',
    description: 'A complete admin dashboard with analytics, charts, and user management.',
    imageUrl: '/templates/dashboard.png',
    demoUrl: '/demos/dashboard',
    category: 'Admin',
    featured: true,
    price: 79,
    features: [
      'Responsive admin interface',
      'Real-time data visualization',
      'User management system',
      'Role-based access control',
      'Customizable dashboard widgets',
      'Dark and light theme support',
      'Export capabilities (CSV, PDF, Excel)'
    ]
  },
  {
    id: 'saas-starter',
    title: 'SaaS Starter',
    description: 'Everything you need to launch your SaaS product with authentication and billing.',
    imageUrl: '/templates/saas.png',
    demoUrl: '/demos/saas',
    category: 'SaaS',
    featured: true,
    price: 99,
    features: [
      'User authentication and authorization',
      'Subscription management',
      'Stripe integration for payments',
      'User dashboard',
      'Team collaboration features',
      'Email notification system',
      'Usage analytics and reporting'
    ]
  },
  {
    id: 'portfolio-minimal',
    title: 'Portfolio Minimal',
    description: 'A clean, minimalist portfolio template for designers and developers.',
    imageUrl: '/templates/portfolio.png',
    demoUrl: '/demos/portfolio',
    category: 'Portfolio',
    featured: true,
    price: 59,
    features: [
      'Minimalist design aesthetic',
      'Project showcase with filters',
      'Responsive image gallery',
      'Contact form integration',
      'SEO optimized structure',
      'Performance optimized assets',
      'Easy customization options'
    ]
  },
  {
    id: 'blog-modern',
    title: 'Blog Modern',
    description: 'A feature-rich blog template with comment system and newsletter signup.',
    imageUrl: '/templates/blog.png',
    demoUrl: '/demos/blog',
    category: 'Blog',
    featured: true,
    price: 69,
    features: [
      'SEO optimized article structure',
      'Comment system with moderation',
      'Newsletter subscription form',
      'Social sharing integration',
      'Related posts suggestions',
      'Reading time estimation',
      'Markdown support for easy writing'
    ]
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'High-converting marketing landing page with focus on conversion rate.',
    imageUrl: '/templates/landing.png',
    demoUrl: '/demos/landing',
    category: 'Marketing',
    featured: true,
    price: 49,
    features: [
      'Conversion-optimized layout',
      'A/B testing ready components',
      'Lead capture forms',
      'Testimonial carousel',
      'Feature showcase sections',
      'Call-to-action optimization',
      'Analytics integration points'
    ]
  },
  {
    id: 'simple-store',
    title: 'Simple Store',
    description: 'E-commerce store template with product listings and checkout.',
    imageUrl: '/templates/store.png',
    demoUrl: '/demos/store',
    category: 'E-commerce',
    featured: true,
    price: 89,
    features: [
      'Product catalog with filtering',
      'Shopping cart functionality',
      'Secure checkout process',
      'Product image gallery',
      'Inventory management',
      'Customer reviews system',
      'Order tracking functionality'
    ]
  },
  {
    id: 'auth-starter',
    title: 'Auth Starter',
    description: 'Authentication boilerplate with multiple providers.',
    imageUrl: '/templates/auth.png',
    demoUrl: '/demos/auth',
    category: 'Authentication',
    featured: false,
    price: 'Free',
    features: [
      'Multiple authentication providers',
      'Social login integration',
      'JWT authentication',
      'Password reset workflow',
      'Email verification system',
      'Protected routes implementation',
      'User profile management'
    ]
  }
]
