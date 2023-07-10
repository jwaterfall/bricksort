import { Metadata } from 'next';
import { Readex_Pro, Lobster } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { FC, PropsWithChildren } from 'react';

import { Providers } from './Providers';
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
    <Providers>
      <UserProvider>
        <body
          className={`
            flex flex-col w-full h-screen bg-background font-sans ${readexPro.variable} ${lobster.variable}
            scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-on-surface/20 scrollbar-track-background hover:scrollbar-thumb-on-surface/30
          `}
        >
          <CustomTopBar />
          <div className="flex flex-1 w-full">
            <CustomNavigationDrawer />
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </UserProvider>
    </Providers>
  );
};

export default RootLayout;
