import { Metadata } from 'next';
import Head from 'next/head';

import Navbar from '@/app/Navbar';
import Footer from '@/app/Footer';
import Providers from './Providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bricksort',
  description: 'An app to sort your LEGO bricks into sets',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </head>
    <body className="font-sans">
      <Providers>
        <main className="flex flex-col w-full h-screen overflow-hidden bg-background text-foreground">
          <Navbar />
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-scroll w-full scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-zinc-400 scrollbar-track-zinc-300">
            <div className="flex-1 container py-4">{children}</div>
            <Footer />
          </div>
        </main>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
