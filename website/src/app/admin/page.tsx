"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "@/lib/slices/userSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminPage() {
  const { data: session, status: sessionStatus } = useSession();
  const isAdmin = useSelector(selectIsAdmin);
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Handle authentication and admin check
  useEffect(() => {
    if (sessionStatus === "loading") return;

    if (!session) {
      router.push("/login");
    } else if (session && isAdmin === false) {
      router.push("/");
    } else if (session && isAdmin === true) {
      setIsChecking(false);
    }
  }, [session, sessionStatus, isAdmin, router]);

  // Still checking session/admin status
  if (sessionStatus === "loading" || isChecking) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Fallback check (shouldn't be hit with router.push)
  if (!isAdmin) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>
            You do not have permission to access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            {session?.user?.name && (
              <p className="text-muted-foreground text-sm mt-1">
                Welcome, {session.user.name}
              </p>
            )}
          </div>
          <Button onClick={() => router.push("/admin/users")}>
            Manage Users
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Active Users", value: "125", note: "+5% from last week" },
            {
              title: "Total Users",
              value: "1,457",
              note: "+12% from last month",
            },
            {
              title: "Total Revenue",
              value: "$12,543",
              note: "+23% from last month",
            },
            {
              title: "Active Subscriptions",
              value: "328",
              note: "+7% from last month",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader className="pb-2">
                <CardDescription>{item.title}</CardDescription>
                <CardTitle className="text-4xl">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
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
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {[
                "Create New Template",
                "Manage Subscriptions",
                "View Reports",
                "System Settings",
              ].map((action) => (
                <Button
                  key={action}
                  className="justify-start mb-2"
                  variant="outline"
                >
                  {action}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
