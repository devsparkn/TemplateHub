// app/pricing/page.tsx - Pricing page
import { CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PricingPage() {
  return (
    <div className="container py-24 px-4">
      <div className="flex flex-col items-center text-center mb-16">
        <Badge variant="outline" className="mb-2">Pricing</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Choose the Perfect Plan
        </h1>
        <p className="text-muted-foreground text-lg max-w-[800px]">
          Get unlimited access to premium Next.js templates and jumpstart your development process.
          All plans include lifetime updates and 6 months of support.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="ml-1 text-muted-foreground">/forever</span>
            </div>
            <CardDescription className="mt-4">
              Perfect for experimenting and small projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                'Access to 3 free templates',
                'Community support',
                'Basic documentation',
                'GitHub source code',
                'TypeScript & Tailwind CSS'
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border-primary">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <Badge variant="default" className="px-3 py-1">
              Most Popular
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Pro</CardTitle>
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold">$99</span>
              <span className="ml-1 text-muted-foreground">/one-time</span>
            </div>
            <CardDescription className="mt-4">
              Everything you need for professional projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                'Access to all 20+ templates',
                '6 months priority support',
                'Premium documentation',
                'GitHub source code',
                'TypeScript & Tailwind CSS',
                'Authentication integration',
                'Advanced components',
                'Free lifetime updates'
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Buy Pro
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <div className="flex items-baseline mt-4">
              <span className="text-4xl font-bold">$499</span>
              <span className="ml-1 text-muted-foreground">/one-time</span>
            </div>
            <CardDescription className="mt-4">
              Custom solutions for larger teams and businesses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                'Everything in Pro plan',
                '1 year priority support',
                'Custom template development',
                'White-labeling options',
                'Multiple project license',
                'Dedicated Slack channel',
                'Implementation assistance',
                'Future concepts early access',
                'Monthly consultation call'
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Contact Sales
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          {[
            {
              q: "Can I use templates for client projects?",
              a: "Yes! All our Pro and Enterprise licenses allow you to use templates in unlimited client projects."
            },
            {
              q: "Do you offer refunds?",
              a: "We offer a 14-day money-back guarantee if you're not satisfied with our templates."
            },
            {
              q: "How long do I get updates?",
              a: "All purchases include lifetime updates to the templates you've purchased."
            },
            {
              q: "Can I customize the templates?",
              a: "Absolutely! All our templates are fully customizable with clean, well-documented code."
            }
          ].map((faq, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-medium">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}