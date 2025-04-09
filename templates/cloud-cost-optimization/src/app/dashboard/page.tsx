/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Cloud,
  DollarSign,
  Server,
  Settings,
} from "lucide-react";
import CostChart from "@/components/charts/CostChart";
import Resource from "@/components/UserInterface/Resource";
import Optimization from "@/components/UserInterface/Optmization";
import Forcasting from "@/components/charts/Forcasting";
export default function DashboardPage() {
  return (
    <div className="mx-auto p-6 pb-12">
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
              <p className="text-sm text-muted-foreground">
                Optimization Score
              </p>
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
              Unusual spike in EC2 spending detected in us-east-1. Click to
              investigate.
            </AlertDescription>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        {/* Scrollable tab container */}
        <div className="overflow-x-auto pb-2 max-sm:-mx-4 max-sm:px-4">
          <TabsList className="w-[600px] sm:w-full bg-muted/50 h-12 rounded-lg p-1 flex gap-2 sm:grid sm:grid-cols-4">
            <TabsTrigger
              value="overview"
              className="flex-1 text-sm px-3 py-2 rounded-md transition-all duration-200
                   data-[state=active]:bg-background data-[state=active]:shadow-sm
                   data-[state=active]:border-b-2 data-[state=active]:border-primary
                   hover:bg-muted whitespace-nowrap"
            >
              <span className="max-sm:hidden">📊</span> Overview
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="flex-1 text-sm px-3 py-2 rounded-md transition-all duration-200
                   data-[state=active]:bg-background data-[state=active]:shadow-sm
                   data-[state=active]:border-b-2 data-[state=active]:border-primary
                   hover:bg-muted whitespace-nowrap"
            >
              <span className="max-sm:hidden">💻</span> Resources
            </TabsTrigger>
            <TabsTrigger
              value="optimization"
              className="flex-1 text-sm px-3 py-2 rounded-md transition-all duration-200
                   data-[state=active]:bg-background data-[state=active]:shadow-sm
                   data-[state=active]:border-b-2 data-[state=active]:border-primary
                   hover:bg-muted whitespace-nowrap"
            >
              <span className="max-sm:hidden">⚡</span> Optimization
            </TabsTrigger>
            <TabsTrigger
              value="forecasting"
              className="flex-1 text-sm px-3 py-2 rounded-md transition-all duration-200
                   data-[state=active]:bg-background data-[state=active]:shadow-sm
                   data-[state=active]:border-b-2 data-[state=active]:border-primary
                   hover:bg-muted whitespace-nowrap"
            >
              <span className="max-sm:hidden">🔮</span> Forecasting
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content areas */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-4 max-sm:rounded-none shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cost Trends</h3>
            <div className="h-64 sm:h-80">
              <CostChart />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card className="p-4 max-sm:rounded-none shadow-lg">
            <Resource />
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card className="p-4 max-sm:rounded-none shadow-lg">
            <Optimization />
          </Card>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card className="p-4 max-sm:rounded-none shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cost Forecasting</h3>
            <div className="h-64 sm:h-80">
              <Forcasting />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
