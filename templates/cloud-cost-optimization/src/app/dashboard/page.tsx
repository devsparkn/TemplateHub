/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  AlertCircle, 
  ArrowDown, 
  ArrowUp, 
  Cloud, 
  DollarSign, 
  Server, 
  Settings 
} from "lucide-react";
import CostChart from "@/components/charts/CostChart";
import Resource from "@/components/UserInterface/Resource";
import Optimization from "@/components/UserInterface/Optmization";

// Sample data for demonstration purposes.
// For cost prediction, each item includes a date (ds) and a cost value (y).
const sampleData = [
  { ds: "2024-01-01", y: 100 },
  { ds: "2024-02-01", y: 120 },
  { ds: "2024-03-01", y: 110 },
];

export default function DashboardPage() {
  const [predictedCosts, setPredictedCosts] = useState<Array<{ ds: string; yhat: number }>>([]);
  const [anomalies, setAnomalies] = useState<number[]>([]);
  const [recommendations, setRecommendations] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Cost Prediction API call
        const resPredict = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ costs: sampleData }),
        });
        const prediction = await resPredict.json();
        setPredictedCosts(prediction);

        // Anomaly Detection API call
        // Here, we pass just the numeric cost values.
        const resAnomalies = await fetch("/api/anomalies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ costs: sampleData.map((d) => d.y) }),
        });
        const anomalyData = await resAnomalies.json();
        setAnomalies(anomalyData.anomalies);

        // AI Recommendations API call
        const resInsights = await fetch("/api/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ costs: sampleData }),
        });
        const insightsData = await resInsights.json();
        setRecommendations(insightsData.recommendations);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cloud Cost Dashboard</h1>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Cost (MTD)</p>
              <h3 className="text-2xl font-bold">$12,458</h3>
            </div>
            <DollarSign className="text-primary w-8 h-8" />
          </div>
          <div className="flex items-center mt-2 text-sm text-red-500">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span>8.2% vs last month</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Resources</p>
              <h3 className="text-2xl font-bold">284</h3>
            </div>
            <Server className="text-primary w-8 h-8" />
          </div>
          <div className="flex items-center mt-2 text-sm text-green-500">
            <ArrowDown className="w-4 h-4 mr-1" />
            <span>3.1% vs last month</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Optimization Score</p>
              <h3 className="text-2xl font-bold">76/100</h3>
            </div>
            <Settings className="text-primary w-8 h-8" />
          </div>
          <Progress value={76} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Potential Savings</p>
              <h3 className="text-2xl font-bold">$2,845</h3>
            </div>
            <Cloud className="text-primary w-8 h-8" />
          </div>
          <div className="flex items-center mt-2 text-sm text-emerald-500">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span>New savings detected</span>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <div className="mb-6">
        <div className="flex items-center gap-2 p-4 border border-red-500 rounded">
          <AlertCircle className="h-4 w-4" />
          <div>
            <AlertTitle>Cost Anomaly Detected</AlertTitle>
            <AlertDescription className="text-sm">
              Unusual spike in EC2 spending detected in us-east-1. Click to investigate.
            </AlertDescription>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-4">Cost Trends</h3>
            {/* Pass the predicted cost data and anomalies to your chart */}
            <CostChart data={predictedCosts} anomalies={anomalies} />
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card className="p-4">
            <Resource />
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card className="p-4">
            <Optimization recommendations={recommendations} />
          </Card>
        </TabsContent>

        <TabsContent value="forecasting">
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-4">Cost Forecasting</h3>
            {/* Add forecasting details or charts here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
