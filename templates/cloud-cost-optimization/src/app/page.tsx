import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart3, Cloud, DollarSign } from "lucide-react";
import Link from "next/link";

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
     
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Optimize Cloud Costs with AI
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Reduce your cloud spending by up to 40% with our AI-powered cost optimization platform. Supporting AWS, Azure, and Google Cloud.
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
              Real-time monitoring and analysis of your cloud spending across all providers.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Cloud className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Resource Optimization</h3>
            <p className="text-muted-foreground">
              AI-powered recommendations for optimal resource allocation and scaling.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <BarChart3 className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Reporting</h3>
            <p className="text-muted-foreground">
              Detailed insights and forecasting to help you make informed decisions.
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
    </div>
  );
}