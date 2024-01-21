'use client';

import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </UserProvider>
);

export default Providers;
