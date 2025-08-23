import AccountSidebar from "@/components/AccountSidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AccountSidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 md:p-8 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
