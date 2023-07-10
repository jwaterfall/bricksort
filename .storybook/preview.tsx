import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-styling';
import { Readex_Pro, Lobster } from 'next/font/google';

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

export const decorators = [
    withThemeByClassName({
        themes: {
            light: 'light',
            dark: 'dark',
        },
        defaultTheme: 'dark',
    }),
    (Story: any) => (
        <>
            <div className="bg-background absolute inset-0" />
            <div className={`relative flex items-center justify-center gap-4 font-sans ${readexPro.variable} ${lobster.variable}`}>
                <Story />
            </div>
        </>
    ),
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
    },
};

export default preview;
