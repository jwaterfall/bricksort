import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Normalize } from 'styled-normalize';

import { AlertProvider } from '@/components/modules/AlertProvider';
import { PreferencesProvider } from '@/contexts/PreferencesContext';
import GlobalStyle from '@/styles/GlobalStyle';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <AlertProvider>
          <Normalize />
          <GlobalStyle />
          <Component {...pageProps} />
          <div id="menus" />
        </AlertProvider>
      </PreferencesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </UserProvider>
);

export default App;
