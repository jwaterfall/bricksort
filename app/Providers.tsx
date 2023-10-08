'use client';

import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import AlertProvider from '@/components/AlertProvider';

const queryClient = new QueryClient();

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <AlertProvider>{children}</AlertProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </UserProvider>
  );
};

export default Providers;
