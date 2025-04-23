"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserStatus,
  updateUserProfile,
} from "@/lib/slices/userSlice";
import { AppDispatch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status: sessionStatus } = useSession();
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isAdminEmail = session?.user?.email === 'nadeemchaudhary808@gmail.com';
  const isAdmin = session?.user?.role === 'admin';

  // Redirect if not logged in
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login");
    }
  }, [sessionStatus, router]);

  // Set form values from user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image || "");
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!name || !image) {
        throw new Error("Name and Image URL are required.");
      }
      await dispatch(updateUserProfile({ name, image })).unwrap();
      setSuccess("Profile updated successfully");
      toast.success("Profile updated successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Failed to update profile");
      } else {
        setError("Failed to update profile");
      }
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  };

  if (sessionStatus === "loading" || !user) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Account Settings</h1>
        {session?.user?.name && (
          <p className="text-muted-foreground text-sm mt-1">
            Welcome, {session.user.name}
          </p>
        )}

        {/* Admin Section */}
        {isAdminEmail && !isAdmin && (
          <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800 rounded-lg">
            <h2 className="text-lg font-medium mb-2 flex items-center">
              <span className="mr-2">🔑</span> Admin Access
            </h2>
            <p className="mb-3 text-sm">
              You have been identified as the site owner. Activate your admin privileges to access the admin dashboard.
            </p>
            <Button asChild variant="outline" className="bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-300 dark:hover:bg-yellow-700">
              <Link href="/become-admin">Become Admin</Link>
            </Button>
          </div>
        )}

        {/* Admin Dashboard Link */}
        {isAdmin && (
          <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-800 rounded-lg">
            <h2 className="text-lg font-medium mb-2 flex items-center">
              <span className="mr-2">👑</span> Admin Dashboard
            </h2>
            <p className="mb-3 text-sm">
              You have admin privileges. Access the admin dashboard to manage users and site settings.
            </p>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700">
                <Link href="/admin">Admin Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/users">Manage Users</Link>
              </Button>
            </div>
          </div>
        )}

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate}>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {success && (
                    <Alert className="mb-4 border-green-500 bg-green-50 text-green-800">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} disabled />
                      <p className="text-xs text-muted-foreground">
                        Your email cannot be changed.
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="image">Profile Image URL</Label>
                      <Input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/your-avatar.jpg"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button type="submit" disabled={userStatus === "loading"}>
                      {userStatus === "loading" ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your password to keep your account secure.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => router.push("/account/change-password")}
                  >
                    Change Password
                  </Button>
                </div>

                <div className="mt-6 border-t pt-6">
                  <div>
                    <h3 className="text-lg font-medium">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account.
                    </p>
                  </div>

                  <Button variant="outline" className="mt-2" disabled>
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
