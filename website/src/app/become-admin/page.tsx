'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, LockIcon, Loader2 } from 'lucide-react';

export default function BecomeAdminPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Handle the become admin action
  const handleBecomeAdmin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/user/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update role');
      }
      
      // Success - force a complete auth refresh
      setSuccess(true);
      
      // Start countdown for UI feedback
      let count = 5;
      setCountdown(count);
      
      const timer = setInterval(() => {
        count -= 1;
        setCountdown(count);
        
        if (count <= 0) {
          clearInterval(timer);
          // Force a session refresh with sign out and sign in
          handleForceRefresh();
        }
      }, 1000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setLoading(false);
    }
  };
  
  // Force a complete session refresh by signing out and in
  const handleForceRefresh = async () => {
    // First sign out
    await signOut({ redirect: false });
    
    // Then redirect to admin page (which will trigger login)
    window.location.href = '/admin';
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LockIcon className="h-5 w-5" />
            Become an Admin
          </CardTitle>
          <CardDescription>
            Activate administrator privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-6">
              <div className="mx-auto bg-green-500/15 text-green-600 p-5 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Role Activated!</h3>
              <p className="mb-4">You have successfully been granted admin privileges.</p>
              
              <div className="flex items-center justify-center mb-4">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="font-bold">{countdown}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Refreshing your session... You&#39;ll be redirected to the admin dashboard in {countdown} second{countdown !== 1 ? 's' : ''}.
              </p>
              
              <div className="mt-4 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                <span className="text-sm">Updating session</span>
              </div>
            </div>
          ) : (
            <>
              <p className="mb-4">
                Click the button below to upgrade your account to admin status. This will give you access to the 
                admin dashboard and all administrative features.
              </p>
              
              {error && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          {!success && (
            <Button 
              onClick={handleBecomeAdmin} 
              disabled={loading || success}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Make Me an Admin'
              )}
            </Button>
          )}
          
          {success && (
            <Button 
              onClick={handleForceRefresh}
              className="w-full"
            >
              Go to Admin Dashboard Now
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
} 