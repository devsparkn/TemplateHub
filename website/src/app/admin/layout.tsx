import AccountSidebar from '@/components/AccountSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AccountSidebar />
      <main className="flex-1 p-4 md:p-8 transition-all duration-300">
        {children}
      </main>
    </div>
  );
} 