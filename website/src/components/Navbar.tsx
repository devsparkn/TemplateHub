"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { CartButton } from "./CartButton";
import { Menu, User, ShieldCheck, LogOut, ChevronRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = session?.user?.role === "admin";

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/templates",
      label: "Templates",
      active: pathname === "/templates",
    },
    {
      href: "/docs",
      label: "Documentation",
      active: pathname === "/docs",
    },
  ];

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
    setIsMobileMenuOpen(false);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6 max-w-[83rem] mx-auto justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center group">
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

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {routes.map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "relative font-medium hover:bg-accent/50",
                        route.active && "bg-accent text-accent-foreground"
                      )}
                    >
                      {route.label}
                      {route.active && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full" />
                      )}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <CartButton />
          <ThemeToggle />

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {status === "loading" ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/20 transition-all duration-200"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session.user?.image || ""}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getUserInitials(session.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    {isAdmin && (
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <ShieldCheck className=" text-white text-xs font-bold" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.name}
                        </p>
                        {isAdmin && (
                          <Badge variant="secondary" className="text-xs">
                            Admin
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/account"
                        className="flex w-full cursor-pointer"
                      >
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
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="border-2 border-slate-200 dark:border-slate-700 text-black dark:text-white rounded-lg transition-all duration-300 hover:border-yellow-400 dark:hover:border-yellow-500"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-yellow-400 text-black hover:bg-yellow-500 shadow-sm"
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="block md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <SheetHeader className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center group">
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

                    {/* Mobile User Profile */}
                    {session && (
                      <div className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg mt-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={session.user?.image || ""}
                            alt={session.user?.name || "User"}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getUserInitials(session.user?.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">
                              {session.user?.name}
                            </p>
                            {isAdmin && (
                              <Badge variant="secondary" className="text-xs">
                                Admin
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </SheetHeader>

                  {/* Navigation */}
                  <div className="flex-1 overflow-y-auto">
                    <nav className="p-6 space-y-2">
                      {routes.map((route) => (
                        <SheetClose key={route.href} asChild>
                          <Link
                            href={route.href}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent group",
                              route.active
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <span>{route.label}</span>
                            <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 border-t bg-muted/30">
                    {status === "loading" ? (
                      <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
                    ) : session ? (
                      <div className="space-y-3">
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            asChild
                          >
                            <Link href="/account">
                              <User className="mr-2 h-4 w-4" />
                              Account Settings
                            </Link>
                          </Button>
                        </SheetClose>
                        <Button
                          onClick={handleSignOut}
                          variant="ghost"
                          className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/login">Sign In</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black" asChild>
                            <Link href="/register">Sign Up</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    description: string;
  }
>(({ className, title, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
