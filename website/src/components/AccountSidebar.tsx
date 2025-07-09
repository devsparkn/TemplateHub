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
} from "lucide-react";

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
    href: "/admin",
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

  const renderLinks = (
    links: typeof sidebarLinks,
    showLabel: boolean,
    onClick?: () => void
  ) =>
    links.map(({ href, label, icon: Icon }) => {
      const isActive = pathname === href;
      return (
        <div key={href} className="relative group">
          <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            {showLabel && label}
          </Link>

          {/* Tooltip when collapsed */}
          {!showLabel && (
            <span className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-muted px-2 py-1 text-xs text-foreground opacity-0 shadow-md group-hover:opacity-100 transition-opacity duration-300">
              {label}
            </span>
          )}
        </div>
      );
    });

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 bg-background border shadow-md p-2 rounded-full"
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
        className={`fixed top-16 left-0 z-50 h-full w-72 bg-background border-r shadow-lg transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold">Account</span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {renderLinks(filteredSidebarLinks, true, () => setMobileOpen(false))}
          {filteredAdminLinks.length > 0 && (
            <>
              {/* <div className="text-xs font-semibold text-muted-foreground uppercase mt-4">
                Admin
              </div> */}
              {renderLinks(filteredAdminLinks, true, () =>
                setMobileOpen(false)
              )}
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
        className={`hidden md:fixed md:top-16 md:left-0 md:h-[calc(100vh-5rem)] bg-background border-r shadow-sm md:flex md:flex-col transition-all duration-300 ${
          open ? "md:w-64" : "md:w-16"
        }`}
      >
        <nav className="flex flex-col gap-2 px-2 py-4">
          {/* Sidebar Header */}
          {open ? (
            <div className="flex items-center justify-between px-3 py-2 rounded-md">
              <Link
                href="/account"
                className="text-sm font-semibold text-muted-foreground"
              >
                Logo
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Collapse sidebar"
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="group relative">
              <Link
                href="#"
                onClick={() => setOpen(true)}
                className="flex items-center justify-center h-10 w-10 text-muted-foreground hover:bg-muted rounded-md"
              >
                <Menu className="h-5 w-5" />
              </Link>
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap bg-muted px-2 py-1 text-xs text-foreground rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                Expand
              </span>
            </div>
          )}

          {/* Sidebar Links */}
          {renderLinks(filteredSidebarLinks, open)}

          {filteredAdminLinks.length > 0 && (
            <>
              {/* <div
                className={`text-xs font-semibold uppercase text-muted-foreground px-2 ${
                  !open ? "hidden" : ""
                }`}
              >
                Admin
              </div> */}
              {renderLinks(filteredAdminLinks, open)}
            </>
          )}

          {/* Sign Out */}
          <div className="relative group">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted w-full rounded-md mt-4"
            >
              <LogOut className="h-5 w-5" />
              {open && "Sign Out"}
            </button>
            {!open && (
              <span className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded bg-muted px-2 py-1 text-xs text-foreground opacity-0 shadow-md group-hover:opacity-100 transition-opacity duration-300">
                Sign Out
              </span>
            )}
          </div>
        </nav>
      </aside>

      {/* Content shift for sidebar */}
      <div className={open ? "md:ml-64" : "md:ml-16"} />
    </>
  );
}
