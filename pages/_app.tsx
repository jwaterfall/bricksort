import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Normalize } from 'styled-normalize';

import { ThemeProvider } from '@/contexts/ThemeContext';
import GlobalStyle from '@/styles/GlobalStyle';

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => (
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Normalize />
        <GlobalStyle />
        <Component {...pageProps} />
        <div id="menus" />
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </UserProvider>
);

export default App;
