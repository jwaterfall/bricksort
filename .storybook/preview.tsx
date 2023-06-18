import React from 'react';
import type { Preview } from '@storybook/react';
import { Readex_Pro, Lobster } from 'next/font/google';
import { withThemeByClassName } from '@storybook/addon-styling';

import '../globals.css';

const readexPro = Readex_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-readex-pro',
});

const lobster = Lobster({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lobster',
});

const withFonts = (Story: any) => (
  <div
    className={`bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50 py-4 px-6 rounded-xl font-sans flex justify-center ${readexPro.variable} ${lobster.variable}`}
  >
    <Story />
  </div>
);

export const decorators = [
  withFonts, // Adds theme switching support.
  // NOTE: requires setting "darkMode" to "class" in your tailwind config
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#eff6ff',
        },
      ],
    },
  },
};

export default preview;
