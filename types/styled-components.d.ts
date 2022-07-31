import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      text: string;
      textSecondary: string;
      overlay: string;
      shadow: string;
      primary: string;
      red: string;
      green: string;
      blue: string;
      amber: string;
      navbar: {
        background: string;
        icon: string;
        iconActive: string;
      };
      button: {
        background: string;
        backgroundHover: string;
        backgroundDisabled: string;
        text: string;
        textDisabled: string;
      };
      alerts: {
        text: string;
        progressBar: string;
      };
    };
    font: {
      family: string;
      size: {
        xxxs: string;
        xxs: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        xxxl: string;
      };
      weight: {
        light: string;
        regular: string;
        medium: string;
        semiBold: string;
        bold: string;
        extraBold: string;
        black: string;
      };
    };
    transition: string;
    borderRadius: string;
  }
}
