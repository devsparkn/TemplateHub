"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowRight, Zap } from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Rightsize underutilized EC2 instances",
    description: "3 instances in us-east-1 are consistently using less than 20% CPU",
    impact: "High",
    savings: 420.50,
    difficulty: "Easy",
    status: "New"
  },
  {
    id: 2,
    title: "Delete unused Azure Disks",
    description: "5 unattached disks found in eastus region",
    impact: "Medium",
    savings: 85.25,
    difficulty: "Easy",
    status: "In Progress"
  },
  {
    id: 3,
    title: "Optimize GCP Network Usage",
    description: "Consider using a CDN to reduce egress costs",
    impact: "Medium",
    savings: 250.00,
    difficulty: "Medium",
    status: "New"
  }
];

export default function OptimizationPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            Potential monthly savings: $755.75
          </p>
        </div>
        <Button>
          Generate New Recommendations
        </Button>
      </div>

      <div className="grid gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{rec.title}</h3>
                  <Badge
                    variant={rec.status === "New" ? "default" : "secondary"}
                  >
                    {rec.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{rec.description}</p>
              </div>
              <Badge
                variant="outline"
                className="text-green-500 border-green-500"
              >
                ${rec.savings.toFixed(2)} / month
              </Badge>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Impact: {rec.impact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Difficulty: {rec.difficulty}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <Button className="gap-2">
                Apply Recommendation
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}