"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { resources } from "@/utils/dummyData";

export default function ResourcesPage() {
  return (
    <div className="mx-auto px-2 sm:px-4 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center sm:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Cloud Resources</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-10 w-full" />
          </div>
          <div className="w-full sm:w-[180px]">
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
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
      </div>

      {/* Table */}
      <Card className="mb-6 overflow-x-auto">
        <div className="min-w-[800px]">
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
                      variant={
                        resource.status === "Running" ? "default" : "secondary"
                      }
                    >
                      {resource.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
