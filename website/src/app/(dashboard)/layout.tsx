"use client";

import { useState } from "react";
import AccountSidebar from "@/components/AccountSidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <AccountSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <Topbar setMobileOpen={setMobileOpen} />
        <main className="flex-1 p-4 md:p-8 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
