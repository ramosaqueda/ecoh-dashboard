import Sidebar from '@/components/layout/sidebar';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Ecoh Tools',
  description: 'Set de herramientas ECOH'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-screen overflow-hidden">

      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
