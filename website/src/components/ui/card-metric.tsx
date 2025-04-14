'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface CardMetricProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  className?: string;
}

export function CardMetric({
  title,
  value,
  icon,
  change,
  trend = 'neutral',
  subtitle,
  className,
}: CardMetricProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="h-8 w-8 text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2">
          <h2 className="text-3xl font-bold">{value}</h2>
          {change !== undefined && (
            <div className="mt-1 flex items-center text-sm">
              <span
                className={cn("flex items-center font-medium", {
                  "text-green-500": trend === "up",
                  "text-red-500": trend === "down",
                  "text-muted-foreground": trend === "neutral",
                })}
              >
                {trend === "up" && <ArrowUpIcon className="mr-1 h-3 w-3" />}
                {trend === "down" && <ArrowDownIcon className="mr-1 h-3 w-3" />}
                {change > 0 ? '+' : ''}{change}%
              </span>
              {subtitle && (
                <span className="ml-2 text-muted-foreground">{subtitle}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 