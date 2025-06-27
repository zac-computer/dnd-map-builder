import Toolbar from '@/components/core/Toolbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mobile-full-height flex h-screen flex-col">
      <Toolbar />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
