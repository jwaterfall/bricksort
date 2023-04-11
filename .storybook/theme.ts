import { create } from '@storybook/theming/create';
import brandImage from './logo.png';

export default create({
    base: 'dark',
    brandTitle: 'Bricksort',
    brandUrl: 'https://bricksort.jackwaterfall.com',
    brandImage,
    brandTarget: '_self',
});
