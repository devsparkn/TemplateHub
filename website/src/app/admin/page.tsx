'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAdmin } from '@/lib/slices/userSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminPage() {
  const { data: session, status: sessionStatus } = useSession();
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (sessionStatus === 'unauthenticated') {
      router.push('/login');
    } else if (sessionStatus === 'authenticated' && !isAdmin) {
      router.push('/');
    } else if (sessionStatus === 'authenticated' && isAdmin) {
      setIsLoading(false);
    }
  }, [sessionStatus, isAdmin, router]);
  
  if (sessionStatus === 'loading' || isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>You do not have permission to access this page.</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => router.push('/admin/users')}>Manage Users</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Users</CardDescription>
              <CardTitle className="text-4xl">125</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-4xl">1,457</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-4xl">$12,543</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Subscriptions</CardDescription>
              <CardTitle className="text-4xl">328</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">+7% from last month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest user activities on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">John Doe - 30 minutes ago</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">Subscription upgraded</p>
                  <p className="text-sm text-muted-foreground">Jane Smith - 1 hour ago</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-medium">Template purchased</p>
                  <p className="text-sm text-muted-foreground">Michael Johnson - 2 hours ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button className="justify-start" variant="outline">
                  Create New Template
                </Button>
                <Button className="justify-start" variant="outline">
                  Manage Subscriptions
                </Button>
                <Button className="justify-start" variant="outline">
                  View Reports
                </Button>
                <Button className="justify-start" variant="outline">
                  System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 