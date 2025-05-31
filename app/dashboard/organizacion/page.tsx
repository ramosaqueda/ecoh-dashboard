// app/dashboard/organizacion/page.tsx
import { Metadata } from 'next';
import OrganizationDashboard from '@/components/dashboard/OrganizationDashboard';

export const metadata: Metadata = {
  title: 'Gestión de Organizaciones | ECOH Dashboard',
  description: 'Gestión y seguimiento de organizaciones delictuales'
};

export default function OrganizacionPage() {
  return (
    <main>
      <OrganizationDashboard onClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </main>
  );
}