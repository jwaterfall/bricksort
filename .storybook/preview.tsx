import React from 'react';
import type { Preview } from '@storybook/react';
import { Readex_Pro } from 'next/font/google';

import '../globals.css';

const readexPro = Readex_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-readex-pro',
});

const withFonts = (Story: any) => (
  <div
    className={`bg-slate-200 text-slate-950 dark:bg-slate-900 dark:text-slate-50 py-4 px-6 rounded-xl font-sans flex justify-center ${readexPro.variable}`}
  >
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
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#f8fafc',
        },
      ],
    },
  },
};

export default preview;
