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
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
