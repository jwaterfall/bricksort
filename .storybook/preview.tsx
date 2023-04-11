import React from 'react';
import type { Preview } from '@storybook/react';
import { Lobster, Poppins } from '@next/font/google';

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
    <div className={`font-sans ${poppins.variable} ${lobster.variable}`}>
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
    },
};

export default preview;
