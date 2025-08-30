"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  User,
  Settings,
  LogOut,
  Users as UsersIcon,
  LayoutDashboard,
  Download,
  FileText,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Layout,
} from "lucide-react";
import Image from "next/image";

const sidebarLinks = [
  { href: "/account", label: "Account", icon: User, roles: ["user", "admin"] },
  {
    href: "/account/orders",
    label: "Orders",
    icon: FileText,
    roles: ["user", "admin"],
  },
  {
    href: "/account/downloads",
    label: "Downloads",
    icon: Download,
    roles: ["user", "admin"],
  },
  {
    href: "/account/settings",
    label: "Settings",
    icon: Settings,
    roles: ["user", "admin"],
  },
];

const adminLinks = [
  {
    href: "/admin/dashboard",
    label: "Admin Dashboard",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    href: "/admin/users",
    label: "Manage Users",
    icon: UsersIcon,
    roles: ["admin"],
  },
  {
    href: "/admin/templates",
    label: "Manage Templates",
    icon: Layout,
    roles: ["admin"],
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role === "admin" ? "admin" : "user";

  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Persist desktop sidebar toggle state
  useEffect(() => {
    const persisted = localStorage.getItem("accountSidebarOpen");
    if (persisted !== null) setOpen(persisted === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("accountSidebarOpen", open ? "true" : "false");
  }, [open]);

  const filteredSidebarLinks = sidebarLinks.filter((link) =>
    link.roles.includes(userRole)
  );
  const filteredAdminLinks = adminLinks.filter((link) =>
    link.roles.includes(userRole)
  );

  const renderDesktopLinks = (links: typeof sidebarLinks, showLabel: boolean) =>
    links.map(({ href, label, icon: Icon }) => {
      const isActive = pathname === href;
      return (
        <div key={href} className="relative group">
          <Link
            href={href}
            className={`flex items-center h-10 px-3 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted text-muted-foreground"
            }`}
          >
            {/* Icon wrapper - fixed width to prevent shifting */}
            <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            {/* Text label with smooth transition */}
            <span
              className={`ml-3 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                showLabel ? "opacity-100 w-auto" : "opacity-0 w-0"
              }`}
            >
              {label}
            </span>
          </Link>

          {/* Tooltip on collapsed sidebar */}
          {!showLabel && (
            <div className="absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-popover border px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {label}
            </div>
          )}
        </div>
      );
    });

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden absolute top-3 left-4 z-10 bg-background border shadow-md p-2 rounded-full"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 z-50 h-full w-72 bg-background border-r shadow-lg transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Image
            src="/images/logo.png"
            alt="9able Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {filteredSidebarLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
          {filteredAdminLinks.length > 0 && (
            <>
              {filteredAdminLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </Link>
                );
              })}
            </>
          )}
          <button
            onClick={() => {
              setMobileOpen(false);
              signOut({ callbackUrl: "/login" });
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted w-full rounded-md mt-4"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:fixed  md:left-0 md:h-screen bg-background border-r shadow-sm md:flex md:flex-col transition-all duration-300 ease-in-out ${
          open ? "md:w-64" : "md:w-16"
        }`}
      >
        {/* Sidebar Header with Toggle Button */}
        <div className="flex items-center justify-between p-3">
          {open ? (
            <>
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
                {/* <span className="-ml-1 text-xl font-bold">able</span> */}
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Collapse sidebar"
                className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-1 p-2 flex-1">
          {/* Main Navigation Links */}
          {renderDesktopLinks(filteredSidebarLinks, open)}

          {/* Admin Links */}
          {filteredAdminLinks.length > 0 && (
            <>
              <div className="border-t my-2" />
              {renderDesktopLinks(filteredAdminLinks, open)}
            </>
          )}

          {/* Sign Out Button */}
          <div className="mt-auto pt-2">
            <div className="relative group">
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex items-center h-10 cursor-pointer px-3 text-sm bg-red-500 hover:bg-red-600 text-white w-full rounded-md transition-colors"
              >
                <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                  <LogOut className="h-5 w-5" />
                </div>
                <span
                  className={`ml-3 font-semibold transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                    open ? "opacity-100 w-auto" : "opacity-0 w-0"
                  }`}
                >
                  Sign Out
                </span>
              </button>
              {!open && (
                <div className="absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-popover border px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Sign Out
                </div>
              )}
            </div>
          </div>
        </nav>
      </aside>

      {/* Content shift for sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "md:ml-64" : "md:ml-16"
        }`}
      />
    </>
  );
}
