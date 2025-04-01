import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with cloud cost monitoring",
    features: [
      "Basic cost monitoring",
      "Single cloud provider",
      "7-day data retention",
      "Email support",
      "Basic recommendations"
    ],
    cta: "Get Started",
    href: "/auth/signup",
    highlighted: false
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "Ideal for growing businesses with multiple cloud providers",
    features: [
      "Everything in Free",
      "Multi-cloud support",
      "30-day data retention",
      "Priority support",
      "AI-powered recommendations",
      "Custom reports",
      "Cost anomaly detection"
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=pro",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations requiring advanced features",
    features: [
      "Everything in Pro",
      "Unlimited data retention",
      "24/7 phone support",
      "Custom AI models",
      "API access",
      "SSO integration",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 flex flex-col ${
                plan.highlighted
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href}>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}