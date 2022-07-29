import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // General
    background: string;
    text: string;
    textSecondary: string;
    foreground: string;
    overlay: string;
    shadow: string;
    primary: string;
    secondary: string;
    tertiary: string;
    transition: string;
    borderRadius: string;

    // Navbar
    navbar: string;
    navbarIcon: string;
    navbarIconHover: string;

    // Button
    buttonHover: string;
    buttonDisabled: string;
    buttonText: string;
    buttonTextDisabled: string;

    // Font
    fontFamily: string;
    fontSizeXxxs: string;
    fontSizeXxs: string;
    fontSizeXs: string;
    fontSizeSm: string;
    fontSizeMd: string;
    fontSizeLg: string;
    fontSizeXl: string;
    fontSizeXxl: string;
    fontSizeXxxl: string;
    fontWeightLight: string;
    fontWeightRegular: string;
    fontWeightMedium: string;
    fontWeightSemiBold: string;
    fontWeightBold: string;
    fontWeightExtraBold: string;
    fontWeightBlack: string;

    colors: {
      alerts: {
        info: string;
        warning: string;
        error: string;
        success: string;
        text: string;
        progressBar: string;
      };
    };
  }
}
