'use client';

import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { DashboardNav } from '@/components/dashboard-nav';
import Logo from '@/components/ui/logo';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Menu, ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const { isMinimized, toggle } = useSidebar();

  return (
    <>
      {/* Mobile Sidebar using Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <ScrollArea className="h-full px-2">
            <div className="p-5 pt-8">
              <Link href="#">
                <Logo />
              </Link>
            </div>
            <DashboardNav items={navItems} />
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 z-20 flex h-screen flex-col border-r bg-card transition-all duration-300 ease-in-out md:relative',
          isMinimized ? 'w-[72px]' : 'w-72',
          className
        )}
      >
        {/* Toggle Button - Moved outside the content area */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-background shadow-md',
            isMinimized ? 'rotate-180' : 'rotate-0'
          )}
          onClick={toggle}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Header with Logo */}
        <div className="flex h-16 items-center px-4">
          <div
            className={cn(
              'w-full transition-all duration-300 ease-in-out',
              isMinimized ? 'opacity-0' : 'opacity-100'
            )}
          >
            <Link href="#">
              <Logo />
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2">
          <nav className="flex flex-col gap-2">
            <DashboardNav
              items={navItems}
              isMinimized={isMinimized}
              className={cn(
                'transition-all duration-300 ease-in-out',
                isMinimized ? 'items-center' : ''
              )}
            />
          </nav>
        </ScrollArea>

        {/* User Profile Section */}
        <div
          className={cn(
            'border-t p-4 transition-all duration-300 ease-in-out',
            isMinimized ? 'items-center' : ''
          )}
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div
              className={cn(
                'flex flex-col transition-all duration-300 ease-in-out',
                isMinimized ? 'w-0 opacity-0' : 'w-auto opacity-100'
              )}
            >
              <span className="truncate text-sm font-medium">Usuario</span>
              <span className="truncate text-xs text-muted-foreground">
                admin@example.com
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
