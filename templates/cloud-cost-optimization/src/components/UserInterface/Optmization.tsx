"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface OptimizationPageProps {
  recommendations: string;
}

export default function OptimizationPage({ recommendations }: OptimizationPageProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Recommendations</h1>
          <p className="text-muted-foreground mt-1">
            {recommendations
              ? "Below are your AI-generated recommendations:"
              : "No recommendations available at the moment."}
          </p>
        </div>
        <Button>Generate New Recommendations</Button>
      </div>

      <Card className="p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
            <pre className="text-muted-foreground whitespace-pre-wrap">
              {recommendations || "No recommendations available."}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
}
