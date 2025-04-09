"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, Zap } from "lucide-react";
import { recommendations } from "@/utils/dummyData";

export default function OptimizationPage() {
  return (
    <div className="mx-auto px-2 sm:px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">AI Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            Potential monthly savings: $755.75
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          Generate New Recommendations
        </Button>
      </div>

      {/* Recommendations List */}
      <div className="grid gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold">{rec.title}</h3>
                  <Badge
                    variant={rec.status === "New" ? "default" : "secondary"}
                  >
                    {rec.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">{rec.description}</p>
              </div>

              <Badge
                variant="outline"
                className="text-green-500 border-green-500 whitespace-nowrap w-fit"
              >
                ${rec.savings.toFixed(2)} / month
              </Badge>
            </div>

            {/* Impact and Difficulty */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Impact: {rec.impact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Difficulty: {rec.difficulty}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button className="gap-2 w-full sm:w-auto">
                Apply Recommendation
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
