'use client';

import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { TooltipProvider } from '@/components/containment/Tooltip';

const queryClient = new QueryClient();

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>{children}</TooltipProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
