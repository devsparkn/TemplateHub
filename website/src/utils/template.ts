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
}

export const templates: Template[] = [
  {
    id: 'cloud-cost-optimisation',
    title: 'Cloud Cost Optimisation',
    description: 'AI based cloud cost optmisation Application with analytics, charts, and user management.',
    imageUrl: '/templates/cloud_cost_optimisation.png',
    demoUrl: 'https://cloud-cost-optimization.vercel.app/',
    category: 'SaaS',
    featured: true,
    price: 79
  },
  {
    id: 'sentinel-ai',
    title: 'Sentinel AI',
    description: 'AI based deepfake detection.',
    imageUrl: '/templates/sentinel-ai.png',
    demoUrl: 'https://sentinel-ai.vercel.app',
    category: 'SaaS',
    featured: true,
    price: 79
  },
  {
    id: 'dashboard-pro',
    title: 'Dashboard Pro',
    description: 'A complete admin dashboard with analytics, charts, and user management.',
    imageUrl: '/templates/dashboard.png',
    demoUrl: '/demos/dashboard',
    category: 'Admin',
    featured: true,
    price: 79
  },
  {
    id: 'saas-starter',
    title: 'SaaS Starter',
    description: 'Everything you need to launch your SaaS product with authentication and billing.',
    imageUrl: '/templates/saas.png',
    demoUrl: '/demos/saas',
    category: 'SaaS',
    featured: true,
    price: 99
  },
  {
    id: 'portfolio-minimal',
    title: 'Portfolio Minimal',
    description: 'A clean, minimalist portfolio template for designers and developers.',
    imageUrl: '/templates/portfolio.png',
    demoUrl: '/demos/portfolio',
    category: 'Portfolio',
    featured: true,
    price: 59
  },
  {
    id: 'blog-modern',
    title: 'Blog Modern',
    description: 'A feature-rich blog template with comment system and newsletter signup.',
    imageUrl: '/templates/blog.png',
    demoUrl: '/demos/blog',
    category: 'Blog',
    featured: true,
    price: 69
  },
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'High-converting marketing landing page with focus on conversion rate.',
    imageUrl: '/templates/landing.png',
    demoUrl: '/demos/landing',
    category: 'Marketing',
    featured: true,
    price: 49
  },
  {
    id: 'simple-store',
    title: 'Simple Store',
    description: 'E-commerce store template with product listings and checkout.',
    imageUrl: '/templates/store.png',
    demoUrl: '/demos/store',
    category: 'E-commerce',
    featured: true,
    price: 89
  },
  {
    id: 'docs-template',
    title: 'Docs Template',
    description: 'Documentation site template with search and version control.',
    imageUrl: '/templates/docs.png',
    demoUrl: '/demos/docs',
    category: 'Documentation',
    featured: false,
    price: 'Free'
  },
  {
    id: 'auth-starter',
    title: 'Auth Starter',
    description: 'Authentication boilerplate with multiple providers.',
    imageUrl: '/templates/auth.png',
    demoUrl: '/demos/auth',
    category: 'Authentication',
    featured: false,
    price: 'Free'
  }
]
