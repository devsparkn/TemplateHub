import Template from '../models/Template.js';
import dbConnect from '@/lib/mongodb.js';

const templates = [
  {
    title: "Startup Hero",
    description: "Modern hero section for startups.",
    imageUrl: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/templates/startup-hero.png",
    price: 25,
    isFeatured: true,
    category: "Startup"
  },
  {
    title: "SaaS Landing",
    description: "Clean landing page for SaaS apps.",
    imageUrl: "https://res.cloudinary.com/your-cloud-name/image/upload/v1/templates/saas-landing.png",
    price: 35,
    isFeatured: false,
    category: "Business"
  }
];

async function seed() {
  try {
    await dbConnect();
    // await Template.deleteMany(); // Optional: Clear existing templates
    await Template.insertMany(templates);
    console.log('✅ Templates inserted!');
    process.exit();
  } catch (error) {
    console.error('❌ Failed to insert templates:', error);
    process.exit(1);
  }
}

seed();
