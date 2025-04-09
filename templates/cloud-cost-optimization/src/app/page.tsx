import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Cloud,
  DollarSign,
  CheckCircle2,
  X,
  ArrowRightLeft,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Optimize Cloud Costs with AI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Reduce your cloud spending by up to 40% with our AI-powered cost
          optimization platform. Supporting AWS, Azure, and Google Cloud.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <DollarSign className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cost Analytics</h3>
            <p className="text-muted-foreground">
              Real-time monitoring and analysis of your cloud spending across
              all providers.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Cloud className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Resource Optimization
            </h3>
            <p className="text-muted-foreground">
              AI-powered recommendations for optimal resource allocation and
              scaling.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <BarChart3 className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Reporting</h3>
            <p className="text-muted-foreground">
              Detailed insights and forecasting to help you make informed
              decisions.
            </p>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-4xl font-bold text-primary mb-2">40%</h4>
            <p className="text-muted-foreground">Average Cost Reduction</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-primary mb-2">24/7</h4>
            <p className="text-muted-foreground">Continuous Monitoring</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-primary mb-2">3+</h4>
            <p className="text-muted-foreground">Cloud Providers Supported</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Cloud className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Connect</h3>
            <p className="text-muted-foreground">
              Securely connect your cloud accounts with just a few clicks
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Analyze</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your usage patterns and identifies optimization
              opportunities
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ArrowRightLeft className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Optimize</h3>
            <p className="text-muted-foreground">
              Implement our recommendations automatically or manually
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">4. Save</h3>
            <p className="text-muted-foreground">
              Watch your cloud costs decrease while maintaining performance
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">
                    CTO, TechStart Inc.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                &quot;We reduced our AWS bill by 35% in the first month. The AI
                recommendations were spot-on and implementation was
                seamless.&quot;
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Mark Williams</h4>
                  <p className="text-sm text-muted-foreground">
                    Cloud Architect, Enterprise Solutions
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                &quot;Managing multi-cloud environments was a nightmare until we
                found this platform. Now we have complete visibility and
                control.&quot;
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-sm text-muted-foreground">
                    DevOps Lead, ScaleUp
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                &quot;The predictive analytics have helped us avoid cost spikes
                before they happen. It&#39;s like having a financial crystal
                ball for our cloud infrastructure.&quot;
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Seamless Integrations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-items-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#FF9900]/10 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path d="M7.5 12.5L4.5 14V10L7.5 11.5V12.5Z" fill="#FF9900" />
                <path d="M9 13.5L12 15V11L9 12.5V13.5Z" fill="#FF9900" />
                <path
                  d="M13.5 13.5L16.5 15V11L13.5 12.5V13.5Z"
                  fill="#FF9900"
                />
                <path d="M18 12.5L21 14V10L18 11.5V12.5Z" fill="#FF9900" />
              </svg>
            </div>
            <span className="text-sm font-medium">AWS</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#0078D4]/10 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L4 8V16L12 20L20 16V8L12 4Z" fill="#0078D4" />
              </svg>
            </div>
            <span className="text-sm font-medium">Azure</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#4285F4]/10 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path d="M12 11L6 7V15L12 19L18 15V7L12 11Z" fill="#4285F4" />
              </svg>
            </div>
            <span className="text-sm font-medium">Google Cloud</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#326CE5]/10 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L4 8V16L12 20L20 16V8L12 4Z" fill="#326CE5" />
                <circle cx="12" cy="12" r="2" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-medium">Kubernetes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#2496ED]/10 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 5C15.2091 5 17 6.79086 17 9C17 11.2091 15.2091 13 13 13H7V5H13Z"
                  fill="#2496ED"
                />
                <path d="M7 15V19H11V15H7Z" fill="#2496ED" />
              </svg>
            </div>
            <span className="text-sm font-medium">Docker</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#7B42BC]/10 rounded-lg flex items-center justify-center mb-2">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L4 8V16L12 20L20 16V8L12 4Z" fill="#7B42BC" />
                <path d="M12 12L8 10V14L12 16L16 14V10L12 12Z" fill="white" />
              </svg>
            </div>
            <span className="text-sm font-medium">Terraform</span>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <Tabs defaultValue="manual" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="manual">vs. Manual Optimization</TabsTrigger>
              <TabsTrigger value="competitors">vs. Competitors</TabsTrigger>
            </TabsList>
            <TabsContent
              value="manual"
              className="border rounded-lg p-6 bg-background"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Our AI Platform
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Continuous 24/7 monitoring and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        AI-powered recommendations based on usage patterns
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        Automated implementation of cost-saving measures
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Predictive analytics to forecast future costs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Multi-cloud support in a single dashboard</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-muted-foreground">
                    Manual Optimization
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Time-consuming manual reviews
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Limited visibility into optimization opportunities
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Requires specialized knowledge of each cloud provider
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Reactive rather than proactive approach
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Difficult to maintain consistency across platforms
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="competitors"
              className="border rounded-lg p-6 bg-background"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    Our Platform
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        Advanced AI with 95% accuracy in recommendations
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>
                        Seamless integration with all major cloud providers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Transparent pricing with no hidden fees</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Dedicated customer success team</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <span>Open API for custom integrations</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-muted-foreground">
                    Competitors
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Basic algorithms with limited learning capabilities
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Limited support for certain cloud providers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Complex pricing structures with additional charges
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Self-service support only
                      </span>
                    </li>
                    <li className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                      <span className="text-muted-foreground">
                        Closed ecosystem with limited extensibility
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How quickly will I see cost savings?
            </AccordionTrigger>
            <AccordionContent>
              Most customers see initial cost savings within the first billing
              cycle. Our platform identifies quick wins immediately upon
              connection, with deeper optimizations developing over time as our
              AI learns your usage patterns.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Is it safe to give access to my cloud accounts?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. We use read-only access by default and implement
              bank-level security measures. All data is encrypted both in
              transit and at rest. We&#39;re SOC 2 Type II certified and GDPR
              compliant.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Can I customize which recommendations to implement?
            </AccordionTrigger>
            <AccordionContent>
              Yes, you have full control. You can set our platform to
              automatically implement certain types of recommendations while
              requiring approval for others. You can also set custom policies
              and guardrails.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Do you support hybrid cloud environments?
            </AccordionTrigger>
            <AccordionContent>
              Yes, our platform supports hybrid cloud environments, including
              on-premises infrastructure when connected through supported
              monitoring tools. This gives you a complete view of your entire
              infrastructure.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How is your pricing structured?</AccordionTrigger>
            <AccordionContent>
              Our pricing is based on a percentage of the savings we generate
              for you. If you don&#39;t save, you don&#39;t pay. This aligns our
              incentives with your success. We also offer fixed-price enterprise
              plans for larger organizations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Final CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Cloud Costs?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of companies saving millions on their cloud
            infrastructure.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </div>
  );
}
