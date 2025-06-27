import Toolbar from '@/components/core/Toolbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen max-h-screen flex-col">
      <Toolbar />
      <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
