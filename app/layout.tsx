import { Metadata } from 'next';
import { Readex_Pro, Lobster } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { FC, PropsWithChildren } from 'react';

import { Providers } from './Providers';
import { CustomTopAppBar } from './CustomTopAppBar';
import { CustomNavigationBar } from './CustomNavigationBar';

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
    <html>
      <Providers>
        <UserProvider>
          <body className={`flex flex-col w-full h-screen bg-background scrollbar-none font-sans ${readexPro.variable} ${lobster.variable}`}>
            <CustomTopAppBar />
            <main className="flex-1 w-full overflow-x-hidden overflow-y-auto">{children}</main>
            <CustomNavigationBar />
          </body>
        </UserProvider>
      </Providers>
    </html>
  );
};

export default RootLayout;
