"use client";

import { User, LogOut, ShieldCheck, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import Image from "next/image";

export default function Topbar({ setMobileOpen }: { setMobileOpen: (open: boolean) => void }) {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getUserInitials = (name: string | null | undefined): string => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (status === "loading") {
    return (
      <header className="h-16 flex items-center justify-between px-4">
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
        <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
      </header>
    );
  }

  return (
    <header className="h-16 sticky top-0 z-10 w-full">
      <div className="flex h-16 border-b items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center">
          <button
            className="md:hidden p-2 rounded-md text-primary"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden md:block ">
            <h1 className="text-xl font-semibold  text-yellow-500">
              Welcome {session?.user?.name} 👋
            </h1>
          </div>
          <Link href="/" className="flex md:hidden items-center">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="9able Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <span className="-ml-1 text-xl font-bold">able</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/20 transition-all duration-200"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {getUserInitials(session?.user?.name)}
                  </AvatarFallback>
                </Avatar>
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <ShieldCheck className="text-white text-xs font-bold" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name}
                    </p>
                    {isAdmin && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex w-full cursor-pointer">
                    <User className="mr-3 h-4 w-4" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
