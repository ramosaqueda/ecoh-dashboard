import Sidebar from '@/components/layout/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Metadata } from 'next';
import Header from '@/components/layout/header';
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
    <div className="flex h-screen overflow-hidden">

      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
