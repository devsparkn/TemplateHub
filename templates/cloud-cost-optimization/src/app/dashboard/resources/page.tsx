/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";

const resources = [
  {
    id: "i-1234567890",
    name: "prod-api-server",
    type: "EC2",
    provider: "AWS",
    region: "us-east-1",
    cost: 245.50,
    utilization: 35,
    status: "Running"
  },
  {
    id: "vm-abcdef123",
    name: "staging-db",
    type: "Virtual Machine",
    provider: "Azure",
    region: "eastus",
    cost: 189.75,
    utilization: 65,
    status: "Running"
  },
  {
    id: "gce-xyz789",
    name: "dev-environment",
    type: "Compute Engine",
    provider: "GCP",
    region: "us-central1",
    cost: 123.25,
    utilization: 15,
    status: "Stopped"
  }
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cloud Resources</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10 w-[300px]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="aws">AWS</SelectItem>
              <SelectItem value="azure">Azure</SelectItem>
              <SelectItem value="gcp">GCP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Cost (MTD)</TableHead>
              <TableHead>Utilization</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell className="font-medium">{resource.name}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.provider}</TableCell>
                <TableCell>{resource.region}</TableCell>
                <TableCell>${resource.cost.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="w-full max-w-[100px]">
                    <Progress value={resource.utilization} className="h-2" />
                    <span className="text-xs text-muted-foreground">
                      {resource.utilization}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={resource.status === "Running" ? "default" : "secondary"}
                  >
                    {resource.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}