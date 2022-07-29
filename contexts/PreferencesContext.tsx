import React, { FC, PropsWithChildren, createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import useLocalStorage from '@/hooks/useLocalStorage';
import { darkTheme, lightTheme } from '@/styles/themes';

interface PreferencesContextValue {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  showAlerts: boolean;
  toggleShowAlerts: () => void;
}

const defaultState = {
  isDarkTheme: true,
};

const PreferencesContext = createContext(defaultState as PreferencesContextValue);

export const PreferencesProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('isDarkTheme', true);
  const [showAlerts, setShowAlerts] = useLocalStorage('showAlerts', true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleShowAlerts = () => {
    setShowAlerts(!showAlerts);
  };

  return (
    <PreferencesContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        showAlerts,
        toggleShowAlerts,
      }}
    >
      <StyledThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>{children}</StyledThemeProvider>
    </PreferencesContext.Provider>
  );
};

const usePreferences = () => useContext(PreferencesContext);

export default usePreferences;
