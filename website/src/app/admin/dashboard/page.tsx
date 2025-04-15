'use client';

import { useEffect, useState ,useCallback} from 'react';
import { format } from 'date-fns';
import { 
  DollarSign, 
  Users, 
  Download, 
  TrendingUp, 
  RefreshCw,
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardMetric } from '@/components/ui/card-metric';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { event as trackEvent } from '@/lib/analytics';

// Type definitions
interface DashboardData {
  salesData: {
    date: string;
    amount: number;
    orders: number;
  }[];
  totalSales: number;
  totalOrders: number;
  downloadsData: {
    total: number;
    free: number;
    paid: number;
    byCategory: {
      name: string;
      downloads: number;
    }[];
  };
  trafficData: {
    date: string;
    pageViews: number;
    uniqueVisitors: number;
  }[];
  totalPageViews: number;
  totalUniqueVisitors: number;
  bounceRate: number;
  popularTemplates: {
    id: string;
    title: string;
    category: string;
    downloads: number;
    revenue: number;
  }[];
  lastUpdated: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [timeframe, setTimeframe] = useState('7d');

 // Memoize fetchDashboardData to avoid re-creating it on each render
 const fetchDashboardData = useCallback(async () => {
  try {
    setRefreshing(true);
    // Track the dashboard refresh as an analytics event
    trackEvent({
      action: 'dashboard_refresh',
      category: 'admin_dashboard',
      label: `timeframe_${timeframe}`,
    });

    const response = await fetch(`/api/admin/dashboard?timeframe=${timeframe}`);
    const data = await response.json();
    setDashboardData(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  } finally {
    setRefreshing(false);
  }
}, [timeframe]);  // Memoized to only re-create when 'timeframe' changes

// Fetch data when 'timeframe' changes
useEffect(() => {
  fetchDashboardData();
}, [fetchDashboardData]);

// Track when timeframe is changed and loading is false
useEffect(() => {
  if (!loading) {
    trackEvent({
      action: 'timeframe_change',
      category: 'admin_dashboard',
      label: timeframe,
    });
  }
}, [timeframe, loading]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format large numbers
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  if (loading) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Analytics overview of your templates marketplace
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Tabs defaultValue="7d" className="w-[250px]" onValueChange={setTimeframe}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
              <TabsTrigger value="90d">90D</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={fetchDashboardData} disabled={refreshing}>
            {refreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>
      </div>

      {dashboardData && (
        <>
          {/* Key Metrics */}
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <CardMetric
              title="Total Revenue"
              value={formatCurrency(dashboardData.totalSales)}
              icon={<DollarSign />}
              change={12}
              trend="up"
              subtitle="vs prev period"
            />
            <CardMetric
              title="Total Downloads"
              value={formatNumber(dashboardData.downloadsData.total)}
              icon={<Download />}
              change={8}
              trend="up"
              subtitle="vs prev period"
            />
            <CardMetric
              title="Unique Visitors"
              value={formatNumber(dashboardData.totalUniqueVisitors)}
              icon={<Users />}
              change={5}
              trend="up"
              subtitle="vs prev period"
            />
            <CardMetric
              title="Bounce Rate"
              value={`${dashboardData.bounceRate}%`}
              icon={<TrendingUp />}
              change={2}
              trend="down"
              subtitle="vs prev period"
            />
          </div>

          {/* Sales Chart */}
          <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue & Orders</CardTitle>
                <CardDescription>
                  Daily revenue and order count over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dashboardData.salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === 'amount') return formatCurrency(value);
                        return formatNumber(value);
                      }}
                      labelFormatter={(label) => format(new Date(label), 'MMMM dd, yyyy')}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      name="Revenue"
                      stroke="#0088FE"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      yAxisId="left"
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      name="Orders"
                      stroke="#FF8042"
                      yAxisId="right"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Downloads by Category */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Downloads by Category</CardTitle>
                <CardDescription>
                  Distribution of template downloads across categories
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={dashboardData.downloadsData.byCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="downloads"
                    >
                      {dashboardData.downloadsData.byCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Chart & Popular Templates */}
          <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription>
                  Page views and unique visitors over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dashboardData.trafficData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => formatNumber(Number(value))}
                      labelFormatter={(label) => format(new Date(label), 'MMMM dd, yyyy')}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pageViews"
                      name="Page Views"
                      stroke="#0088FE"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uniqueVisitors"
                      name="Unique Visitors"
                      stroke="#00C49F"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Popular Templates</CardTitle>
                <CardDescription>
                  Top performing templates by downloads
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Template</div>
                    <div>Downloads</div>
                    <div>Revenue</div>
                  </div>
                  <div className="space-y-2">
                    {dashboardData.popularTemplates.map((template) => (
                      <div key={template.id} className="grid grid-cols-4 items-center">
                        <div className="col-span-2">
                          <div className="font-medium">{template.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {template.category}
                          </div>
                        </div>
                        <div>{formatNumber(template.downloads)}</div>
                        <div>{formatCurrency(template.revenue)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Free vs Paid Downloads */}
          <div className="grid gap-6 mb-8 grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Free vs Paid Downloads</CardTitle>
                <CardDescription>
                  Comparison of free and paid template downloads
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Free', value: dashboardData.downloadsData.free },
                      { name: 'Paid', value: dashboardData.downloadsData.paid },
                    ]}
                    margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatNumber(Number(value))} />
                    <Legend />
                    <Bar dataKey="value" name="Downloads" fill="#8884d8">
                      <Cell fill="#00C49F" />
                      <Cell fill="#0088FE" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Last updated timestamp */}
          <div className="text-center text-sm text-muted-foreground">
            Last updated: {format(new Date(dashboardData.lastUpdated), 'MMMM dd, yyyy HH:mm:ss')}
          </div>
        </>
      )}
    </div>
  );
} 