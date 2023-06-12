import { Metadata } from 'next';
import { Readex_Pro } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import Topbar from '@/components/Topbar';
import BottomAppBar from './BottomAppBar';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Bricksort',
  description: 'An app to sort your LEGO bricks into sets',
};

const readexPro = Readex_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-readex-pro',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`font-sans ${readexPro.variable}`}>
        <main className="flex flex-col w-full h-screen overflow-hidden bg-blue-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50">
          <Topbar />
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-scroll w-full scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 dark:scrollbar-thumb-zinc-800 dark:scrollbar-track-zinc-900">
            <div className="flex-1">{children}</div>
          </div>
          <div className="md:hidden">
            <BottomAppBar />
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
