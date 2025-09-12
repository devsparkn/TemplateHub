"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import {
  DollarSign,
  Users,
  Download,
  RefreshCw,
  Loader2,
  Shield,
  Layout,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardMetric } from "@/components/ui/card-metric";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

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
  totalUsers: number;
  popularTemplates: {
    id: string;
    title: string;
    category: string;
    downloads: number;
    revenue: number;
  }[];
  lastUpdated: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [timeframe, setTimeframe] = useState("7d");

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Special admin check to allow our specific admin email
  const isAdminEmail = session?.user?.email === "nadeemchaudhary808@gmail.com";
  const hasAccess = session?.user?.role === "admin" || isAdminEmail;

  // Handle authentication check
  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (!session) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [session, sessionStatus, router]);

  // Memoize fetchDashboardData to avoid re-creating it on each render
  const fetchDashboardData = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `/api/admin/dashboard?timeframe=${timeframe}`
      );
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [timeframe]); // Memoized to only re-create when 'timeframe' changes

  // Fetch data when 'timeframe' changes
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format large numbers
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  // Access check - show an alert if user has admin email but not admin role
  if (sessionStatus === "loading" || isChecking) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  // No access page for non-admin, non-admin-email users
  if (!hasAccess) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="max-w-md w-full">
          <Alert variant="destructive" className="mb-4">
            <AlertDescription className="py-2">
              You do not have permission to access this page.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between gap-4">
            <Button onClick={() => router.push("/")} variant="outline">
              Back to Home
            </Button>
            <Button onClick={() => router.push("/account")}>
              Go to Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show admin activation notice if needed
  const AdminActivationAlert =
    isAdminEmail && session?.user?.role !== "admin" ? (
      <Alert className="mb-8 border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
        <AlertDescription className="flex items-center py-2">
          <Shield className="mr-2 h-5 w-5" />
          Your admin status is not fully activated.
          <Button
            variant="link"
            className="text-yellow-800 dark:text-yellow-200"
            asChild
          >
            <Link href="/become-admin">Activate admin privileges now</Link>
          </Button>
        </AlertDescription>
      </Alert>
    ) : null;

  if (loading) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {AdminActivationAlert}

      <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-8">
        <div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Analytics overview of your templates marketplace
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Tabs
            defaultValue="7d"
            className="w-[250px]"
            onValueChange={setTimeframe}
          >
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
          <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
              title="Total Users"
              value={formatNumber(dashboardData.totalUsers)}
              icon={<Users />}
              change={5}
              trend="up"
              subtitle="vs prev period"
              onClick={() => (window.location.href = "/admin/users")}
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
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#0088FE"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0088FE"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) => format(new Date(date), "MMM dd")}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                      formatter={(value: number, name: string) => {
                        if (name === "amount") return formatCurrency(value);
                        return formatNumber(value);
                      }}
                      labelFormatter={(label) =>
                        format(new Date(label), "MMMM dd, yyyy")
                      }
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
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="downloads"
                    >
                      {dashboardData.downloadsData.byCategory.map(
                        (entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatNumber(Number(value))}
                    />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
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
                      { name: "Free", value: dashboardData.downloadsData.free },
                      { name: "Paid", value: dashboardData.downloadsData.paid },
                    ]}
                    margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => formatNumber(Number(value))}
                    />
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

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest user activities on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      activity: "New user registered",
                      user: "John Doe",
                      time: "30 minutes ago",
                    },
                    {
                      activity: "Subscription upgraded",
                      user: "Jane Smith",
                      time: "1 hour ago",
                    },
                    {
                      activity: "Template purchased",
                      user: "Michael Johnson",
                      time: "2 hours ago",
                    },
                  ].map((item, idx) => (
                    <div className="border-b pb-2" key={idx}>
                      <p className="font-medium">{item.activity}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.user} - {item.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Overview of your templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Templates</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Templates</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Featured Templates</span>
                    <span className="font-medium">6</span>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4">
                    <Link href="/admin/templates">
                      <Layout className="mr-2 h-4 w-4" />
                      Manage Templates
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
