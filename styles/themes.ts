import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  // General
  background: 'hsl(0, 0%, 100%)',
  text: 'hsl(0, 0%, 0%)',
  textSecondary: 'hsla(0, 0%, 0%, 0.5)',
  overlay: 'hsla(0, 0%, 0%, 0.1)',
  shadow: 'hsla(0, 0%, 0%, 0.125)',
  foreground: 'hsl(0, 0%, 100%)',
  primary: 'hsl(356, 73%, 50%)',
  secondary: 'hsl(27, 59.7%, 47.6%)',
  tertiary: 'hsl(90, 59.7%, 47.6%)',
  transition: 'all 150ms ease-in-out',
  borderRadius: '0.25rem',

  // Navbar
  navbar: 'hsl(51, 100%, 50%)',
  navbarIcon: '#151A2E90',
  navbarIconHover: '#151A2E',

  // Button
  buttonHover: 'hsl(356, 73%, 55%)',
  buttonDisabled: 'hsl(356, 73%, 40%)',
  buttonText: 'hsl(0, 0%, 100%)',
  buttonTextDisabled: 'hsla(0, 0%, 100%, 0.5)',

  // Font
  fontFamily: `'Montserrat', sans-serif`,
  fontSizeXxxs: '0.65rem',
  fontSizeXxs: '0.75rem',
  fontSizeXs: '0.8125rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.25rem',
  fontSizeXl: '1.5rem',
  fontSizeXxl: '2rem',
  fontSizeXxxl: '4rem',
  fontWeightLight: '300',
  fontWeightRegular: '500',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  fontWeightExtraBold: '800',
  fontWeightBlack: '900',

  colors: {
    alerts: {
      info: 'hsl(204, 59.7%, 47.6%)',
      warning: 'hsl(27, 59.7%, 47.6%)',
      error: 'hsl(356, 73%, 50%)',
      success: 'hsl(90, 59.7%, 47.6%)',
      text: 'hsl(0, 0%, 100%)',
      progressBar: 'hsla(0, 0%, 100%, 0.5)',
    },
  },
};

export const darkTheme: DefaultTheme = {
  // General
  background: '#18191D',
  text: 'hsl(0, 0%, 100%)',
  textSecondary: 'hsla(0, 0%, 100%, 0.5)',
  overlay: 'hsla(0, 0%, 100%, 0.05)',
  shadow: 'hsla(0, 0%, 0%, 0.25)',
  foreground: '#2A2B31',
  primary: 'hsl(356, 73%, 50%)',
  secondary: 'hsl(27, 59.7%, 47.6%)',
  tertiary: 'hsl(90, 59.7%, 47.6%)',
  transition: 'all 150ms ease-in-out',
  borderRadius: '0.25rem',

  // Navbar
  navbar: 'hsl(51, 100%, 50%)',
  navbarIcon: '#151A2E90',
  navbarIconHover: '#151A2E',

  // Button
  buttonHover: 'hsl(356, 73%, 55%)',
  buttonDisabled: 'hsl(356, 73%, 40%)',
  buttonText: 'hsl(0, 0%, 100%)',
  buttonTextDisabled: 'hsla(0, 0%, 100%, 0.5)',

  // Font
  fontFamily: `'Montserrat', sans-serif`,
  fontSizeXxxs: '0.65rem',
  fontSizeXxs: '0.75rem',
  fontSizeXs: '0.8125rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.25rem',
  fontSizeXl: '1.5rem',
  fontSizeXxl: '2rem',
  fontSizeXxxl: '4rem',
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  fontWeightExtraBold: '800',
  fontWeightBlack: '900',

  colors: {
    alerts: {
      info: 'hsl(204, 59.7%, 47.6%)',
      warning: 'hsl(27, 59.7%, 47.6%)',
      error: 'hsl(356, 73%, 50%)',
      success: 'hsl(90, 59.7%, 47.6%)',
      text: 'hsl(0, 0%, 100%)',
      progressBar: 'hsla(0, 0%, 100%, 0.5)',
    },
  },
};
