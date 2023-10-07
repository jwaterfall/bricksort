import { Metadata } from 'next';
import { Lobster, Poppins } from 'next/font/google';
import Head from 'next/head';

import Topbar from '@/app/Topbar';
import Footer from '@/app/Footer';
import Providers from './Providers';

import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const lobster = Lobster({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lobster',
});

export const metadata: Metadata = {
  title: 'Bricksort',
  description: 'An app to sort your LEGO bricks into sets',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <Head>
      <meta name="application-name" content="Bricksort" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Bricksort" />
      <meta name="description" content="An app to sort your LEGO bricks into sets" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#0F172A" />
      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167x167.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <body className={`font-sans ${poppins.variable} ${lobster.variable}`}>
      <Providers>
        <main className="flex flex-col w-full h-screen overflow-hidden bg-zinc-100 text-zinc-950">
          <Topbar />
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-scroll w-full scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-zinc-400 scrollbar-track-zinc-300">
            <div className="flex-1 container p-4 mx-auto">{children}</div>
            <Footer />
          </div>
        </main>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
