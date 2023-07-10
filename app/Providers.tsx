'use client';

import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { TooltipProvider } from '@/components/containment/Tooltip';

interface ThemeContext {
    isDarkMode: boolean;
    toggleIsDarkMode: () => void;
}

const ThemeContext = createContext({} as ThemeContext);
export const useTheme = () => useContext(ThemeContext);

const queryClient = new QueryClient();

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorage('isDarkMode', true);

    const toggleIsDarkMode = () => setIsDarkMode((prev) => !prev);

    return (
        <html className={`${isDarkMode ? 'dark' : ''}`}>
            <QueryClientProvider client={queryClient}>
                <ThemeContext.Provider value={{ isDarkMode, toggleIsDarkMode }}>
                    <TooltipProvider>{children}</TooltipProvider>
                </ThemeContext.Provider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </html>
    );
};
