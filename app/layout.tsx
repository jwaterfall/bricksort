import { Metadata } from 'next';
import { Readex_Pro } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from './ThemeProvider';
import { CustomNavigationDrawer } from './Drawer';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Bricksort',
  description: 'A web app for sorting LEGO bricks into sets',
};

const readexPro = Readex_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-readex-pro',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <ThemeProvider>
        <main
          className={`flex flex-col w-full h-screen overflow-hidden bg-blue-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50 font-sans ${readexPro.variable}`}
        >
          <CustomNavigationDrawer />
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-scroll w-full scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 dark:scrollbar-thumb-zinc-800 dark:scrollbar-track-zinc-900">
            <div className="flex-1">{children}</div>
          </div>
        </main>
      </ThemeProvider>
    </html>
  );
};

export default RootLayout;
