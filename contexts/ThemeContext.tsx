import React, { FC, PropsWithChildren, createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import useLocalStorage from '@/hooks/useLocalStorage';
import { darkTheme, lightTheme } from '@/styles/themes';

interface State {
  isDarkTheme: boolean;
  toggleTheme?: () => void;
}

const defaultState = {
  isDarkTheme: true,
};

const ThemeContext = createContext<State>(defaultState);

export const ThemeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('isDarkTheme', true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
      }}
    >
      <StyledThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default useTheme;
