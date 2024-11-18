// app/layout.tsx
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs';

import { Providers } from '@/app/providers/providers';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecoh Tools',
  description: 'Set de herramientas ECOH'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <Providers>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>{children}</SignedIn>
              <Toaster />
            </Providers>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
