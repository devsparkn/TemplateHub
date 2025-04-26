import { Download, Code, Zap } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Download className="h-12 w-12 text-primary" />,
      title: "1. Choose & Purchase",
      description: "Browse our collection of templates and select the one that fits your project needs.",
    },
    {
      icon: <Code className="h-12 w-12 text-primary" />,
      title: "2. Customize & Develop",
      description: "Download the source code and customize it to match your brand and requirements.",
    },
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "3. Deploy & Launch",
      description: "Deploy your customized template to your preferred hosting platform and go live.",
    },
  ]

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-20 bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your project up and running in minutes with our easy-to-use templates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm">
              <div className="mb-4 p-3 rounded-full bg-primary/10">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
