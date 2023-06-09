import React from 'react';
import type { Preview } from '@storybook/react';
import { Lobster, Poppins } from '@next/font/google';

import theme from './theme';
import '../globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const lobster = Lobster({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lobster',
});

const withFonts = (Story: any) => (
  <div className={`font-sans text-zinc-950 dark:text-zinc-50 ${poppins.variable} ${lobster.variable}`}>
    <Story />
  </div>
);

export const decorators = [withFonts];

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
      default: 'dark',
      values: [
        {
          name: 'light',
          value: '#e4e4e7',
        },
        {
          name: 'dark',
          value: '#09090b',
        },
      ],
    },
    docs: {
      theme,
    },
  },
};

export default preview;
