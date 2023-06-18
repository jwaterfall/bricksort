'use client';

import { FC, PropsWithChildren, useState, createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface ThemeContext {
  isDarkMode: boolean;
  toggleIsDarkMode: () => void;
}

const ThemeContext = createContext({} as ThemeContext);

export const useTheme = () => useContext(ThemeContext);

export const HTMLWithThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('isDarkMode', true);

  const toggleIsDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <html className={`${isDarkMode ? 'dark' : ''}`}>
      <ThemeContext.Provider value={{ isDarkMode, toggleIsDarkMode }}>{children}</ThemeContext.Provider>
    </html>
  );
};
