import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    textSecondary: string;
    navbar: string;
    navbarText: string;
    navbarTextSecondary: string;
    foreground: string;
    overlay: string;
    shadow: string;
    buttonText: string;
    primary: string;
    buttonPrimaryHover: string;
    buttonPrimaryDisabled: string;
    fontFamily: string;
    borderRadius: string;
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
    transition: string;
  }
}
