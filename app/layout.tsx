import { Metadata } from 'next';
import { Poppins as FontSans, Lobster as FontLogo } from 'next/font/google';

import Navbar from '@/app/Navbar';
import Providers from './Providers';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bricksort',
  description: 'An app to sort your LEGO bricks into sets',
};

const fontSans = FontSans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

const fontLogo = FontLogo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-logo',
});

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
    </head>
    <body
      className={`font-sans bg-background text-foreground scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-accent scrollbar-track-accent/50 ${fontSans.variable} ${fontLogo.variable}`}
    >
      <Providers>
        <div className="flex flex-col w-screen h-[100svh]">
          <main className="flex-1 container p-4 overflow-y-auto">{children}</main>
          <Navbar />
        </div>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
