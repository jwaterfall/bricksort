import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app';
import { Lobster, Poppins } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import AlertProvider from '../components/AlertProvider';

import '../globals.css';

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

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <div className={`font-sans ${poppins.variable} ${lobster.variable}`}>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>
          <div className="flex flex-col w-full h-screen overflow-hidden bg-slate-200 text-slate-950">
            <Topbar />
            <main className="flex flex-col flex-1 overflow-x-hidden w-full scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-slate-400 scrollbar-track-slate-300">
              <div className="w-full max-w-screen-2xl mx-auto p-4 flex-1">
                <Component {...pageProps} />
              </div>
              <Footer />
            </main>
          </div>
        </AlertProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserProvider>
  </div>
);

export default App;
