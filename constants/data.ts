import { NavItem } from '@/types';

 



export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Cauas',
    href: '/dashboard/causas',
    icon: 'briefcase',
    label: 'causas'
  },

  {
    title: 'Imputados o Sujetos de interés',
    href: '/dashboard/imputado',
    icon: 'profile',
    label: 'profile'
  },

  {
    title: 'Comparativa Rostros',
    href: '/dashboard/compare',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
