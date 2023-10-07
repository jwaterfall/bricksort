import { create } from '@storybook/theming/create';
import brandImage from './logo.png';

export default create({
  base: 'light',
  colorPrimary: '#ef4444',
  colorSecondary: '#ef4444',
  brandTitle: 'Bricksort',
  brandUrl: 'https://bricksort.jackwaterfall.com',
  brandImage,
  brandTarget: '_self',
  gridCellSize: 12,
});
