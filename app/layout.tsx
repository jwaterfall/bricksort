import { Metadata } from 'next';
import { Readex_Pro, Lobster } from 'next/font/google';
import { FC, PropsWithChildren } from 'react';

import { HTMLWithThemeProvider } from './HTMLWithThemeProvider';
import { CustomTopBar } from './CustomTopBar';
import { CustomNavigationDrawer } from './CustomNavigationDrawer';

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

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HTMLWithThemeProvider>
      <body
        className={`
            flex flex-col w-full h-screen bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 font-sans ${readexPro.variable} ${lobster.variable}
            scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-zinc-400 scrollbar-track-zinc-300 dark:scrollbar-thumb-zinc-800 dark:scrollbar-track-zinc-900 
        `}
      >
        <CustomTopBar />
        <div className="flex flex-1 w-full">
          <CustomNavigationDrawer />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </HTMLWithThemeProvider>
  );
};

export default RootLayout;
