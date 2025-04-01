
import { 
    Code, 
    Zap, 
    BarChart, 
    Lock, 
    Globe, 
    Smartphone
  } from 'lucide-react'
  
  interface FeatureProps {
    icon: React.ReactNode
    title: string
    description: string
  }
  
  function Feature({ icon, title, description }: FeatureProps) {
    return (
      <div className="flex flex-col items-center border rounded-lg p-4 text-center md:items-start md:text-left">
        <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    )
  }
  
  export function FeatureSection() {
    const features = [
      {
        icon: <Code className="h-6 w-6" />,
        title: "Modern Tech Stack",
        description: "Built with Next.js, TypeScript, and Tailwind CSS for optimal developer experience."
      },
      {
        icon: <Zap className="h-6 w-6" />,
        title: "Performance Optimized",
        description: "Lightning-fast load times with optimized images and efficient code splitting."
      },
      {
        icon: <BarChart className="h-6 w-6" />,
        title: "SEO Ready",
        description: "Built-in SEO best practices with meta tags and structured data."
      },
      {
        icon: <Lock className="h-6 w-6" />,
        title: "Authentication",
        description: "Secure user authentication with multiple providers and role-based access."
      },
      {
        icon: <Globe className="h-6 w-6" />,
        title: "Internationalization",
        description: "Multi-language support for global applications and markets."
      },
      {
        icon: <Smartphone className="h-6 w-6" />,
        title: "Responsive Design",
        description: "Perfectly adapted for all devices from mobile to desktop."
      }
    ]
    
    return (
      <section className="bg-background py-20 px-8">
        <div className="">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose Our Templates?
            </h2>
            <p className="text-muted-foreground text-lg max-w-[700px]">
              Save weeks of development time with our production-ready templates built with the latest best practices.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }