"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import {
  Users,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  Loader2,
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  // Fetch users data
  const fetchUsers = useCallback(
    async (page = 1) => {
      try {
        setRefreshing(true);
        const response = await fetch(
          `/api/admin/users?page=${page}&limit=${pagination.limit}`
        );
        const data = await response.json();

        if (data.success) {
          setUsers(data.users);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [pagination.limit]
  );

  // Initial data fetch
  useEffect(() => {
    if (hasAccess && !isChecking) {
      fetchUsers();
    }
  }, [hasAccess, isChecking, fetchUsers]);

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      fetchUsers(newPage);
    }
  };

  // Auth checking
  if (sessionStatus === "loading" || isChecking) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-[600px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Checking permissions...
            </p>
          </div>
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

  // Loading UI
  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Registered Users
          </h1>
          <Skeleton className="h-10 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      {AdminActivationAlert}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Registered Users
          </h1>
          <p className="text-muted-foreground">
            Manage and view all registered users
          </p>
        </div>
        <Button
          onClick={() => fetchUsers(pagination.page)}
          disabled={refreshing}
        >
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Users ({pagination.total})
          </CardTitle>
          <CardDescription>
            Complete list of registered users in the system
          </CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <User className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                    <p className="text-lg font-medium">No users found</p>
                    <p className="text-sm text-muted-foreground">
                      There are no registered users matching your criteria.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                users
                  .filter(
                    (user) =>
                      searchQuery === "" ||
                      user.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      user.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.image} />
                            <AvatarFallback>
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ID: {user._id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin" ? "destructive" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(user.updatedAt), "MMM d, yyyy")}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-sm">
                Page {pagination.page} of {pagination.pages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
