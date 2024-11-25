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
    icon: 'Mask',
    label: 'profile'
  },
  {
    title: 'Mapas Delitos',
    href: '/dashboard/geo',
    icon: 'map',
    label: 'Mapas'
  },
  {
    title: 'Registro Organizaciones',
    icon: 'Net',
    subItems: [
      {
        title: 'Gestion organizaciones',
        href: '/dashboard/organizacion',
        icon: 'page'
      },
      {
        title: 'Network',
        href: '/dashboard/oc-networkgraph',
        icon: 'Share'
      }
    ]
  },

  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
