"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "@/lib/slices/userSlice";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Shield,
  User,
  BarChart3,
  FileText,
  Layout,
} from "lucide-react";

export default function AdminPage() {
  const { data: session, status: sessionStatus } = useSession();
  const isAdmin = useSelector(selectIsAdmin);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Special admin check to allow our specific admin email
  const isAdminEmail = session?.user?.email === "nadeemchaudhary808@gmail.com";
  const hasAccess = isAdmin || isAdminEmail;

  // Handle authentication and admin check
  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (!session) {
      router.push("/login");
    } else {
      setIsChecking(false);
    }
  }, [session, sessionStatus, router]);

  // Still checking session
  if (sessionStatus === "loading" || isChecking) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p>Loading...</p>
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

  // Admin needs to activate their role, but still can see the dashboard
  if (isAdminEmail && !isAdmin) {
    return (
      <div className="container py-10">
        <div className="mx-auto max-w-6xl">
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

          {renderDashboardContent(session)}
        </div>
      </div>
    );
  }

  // Full admin access
  return (
    <div className="py-10 px-4">
      <div className="max-w-7xl mx-auto">{renderDashboardContent(session)}</div>
    </div>
  );
}

// Extract dashboard content to reuse
import { Session } from "next-auth";

function renderDashboardContent(session: Session | null) {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {session?.user?.name && (
            <p className="text-muted-foreground text-sm mt-1">
              Welcome, {session.user.name}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/templates">Manage Templates</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/users">Manage Users</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Active Users",
            value: "125",
            note: "+5% from last week",
            icon: <User className="h-8 w-8 text-blue-500" />,
            color: "bg-blue-50 dark:bg-blue-950/50",
          },
          {
            title: "Total Users",
            value: "1,457",
            note: "+12% from last month",
            icon: <User className="h-8 w-8 text-violet-500" />,
            color: "bg-violet-50 dark:bg-violet-950/50",
          },
          {
            title: "Total Revenue",
            value: "$12,543",
            note: "+23% from last month",
            icon: <BarChart3 className="h-8 w-8 text-green-500" />,
            color: "bg-green-50 dark:bg-green-950/50",
          },
          {
            title: "Active Subscriptions",
            value: "328",
            note: "+7% from last month",
            icon: <FileText className="h-8 w-8 text-amber-500" />,
            color: "bg-amber-50 dark:bg-amber-950/50",
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader className={`rounded-t-lg ${item.color}`}>
              <div className="flex items-center justify-between">
                <CardDescription>{item.title}</CardDescription>
                {item.icon}
              </div>
              <CardTitle className="text-4xl">{item.value}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-xs text-muted-foreground">{item.note}</p>
            </CardContent>
          </Card>
        ))}
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
    </div>
  );
}
