// components/layout/header.tsx
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Logo from '@/components/ui/logo';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

// components/layout/header.tsx
export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/70 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/70">
      <nav className="h-16 px-2">
        {' '}
        {/* Reducimos el padding */}
        <div className="flex h-full items-center justify-between">
          {/* Logo y título + Mobile Sidebar */}
          <div className="flex items-center">
            <div className={cn('mr-2 block lg:!hidden')}>
              <MobileSidebar />
            </div>
            <div className="flex items-center pl-0">
              {' '}
              {/* Eliminamos el padding izquierdo */}
              <Logo className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                ECOHInsight {/* Cambiamos el nombre a "ECOHInsight" */}
              </span>
            </div>
          </div>

          {/* Botones de la derecha */}
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-600 hover:shadow-xl active:scale-95">
                  Iniciar Sesión
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserNav />
            </SignedIn>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
