export interface Template {
  _id: string;
  name: string;
  description: string;
  category: 'landing-page' | 'dashboard' | 'ecommerce' | 'portfolio' | 'blog';
  price: number;
  thumbnail: string;
  previewUrl: string;
  features: string[];
  techStack: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
} 