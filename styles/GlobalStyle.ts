import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.overlay} transparent;
  }

  :root {
    font-size: 16px;
    font-family: ${({ theme }) => theme.font.family};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.3;
      
    @media (max-width: 992px) {
        font-size: 17px;
    }
  }

  body {
    background: ${({ theme }) => theme.colors.background};
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    @media (max-width: 992px) {
        display: none;
    }
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.overlay};
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  ::-webkit-scrollbar-corner{
    background: transparent;
  }
`;

export default GlobalStyle;
