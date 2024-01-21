import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Bricksort',
  description: 'A tool for sorting your mixed Lego collection back into sets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <TooltipProvider>
          <main className="container p-4 bg-background">{children}</main>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
