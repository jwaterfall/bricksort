import type { StorybookConfig } from '@storybook/nextjs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
    stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm',
        '@storybook/addon-styling',
        {
            name: '@storybook/addon-styling',
            options: {
                postcss: {
                    implementation: require.resolve('postcss'),
                },
            },
        },
    ],
    staticDirs: ['./public'],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    webpackFinal: async (config, { configType }) => {
        config.resolve!.plugins = [new TsconfigPathsPlugin()];
        return config;
    },
};

export default config;
