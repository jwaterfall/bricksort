import { create } from '@storybook/theming/create';
import brandImage from './logo.png';

export default create({
  base: 'dark',

  colorPrimary: '#ef4444',
  colorSecondary: '#ef4444',

  appBg: '#09090b',
  appContentBg: '#09090b',
  appBorderColor: '#27272a',
  appBorderRadius: 2,

  fontBase: '"Poppins", sans-serif',
  fontCode: 'monospace',
  textColor: '#fafafa',
  textInverseColor: '#09090b',
  textMutedColor: '#a1a1aa',

  barTextColor: '#fafafa',
  barSelectedColor: '#ef4444',
  barBg: '#18181b',

  buttonBg: '#ef4444',
  buttonBorder: '#ef4444',
  booleanBg: '#27272a',
  booleanSelectedBg: '#ef4444',

  inputBg: '#27272a',
  inputBorder: '#3f3f46',
  inputTextColor: '#d4d4d8',
  inputBorderRadius: 2,

  brandTitle: 'Bricksort',
  brandUrl: 'https://bricksort.jackwaterfall.com',
  brandImage,
  brandTarget: '_self',

  gridCellSize: 12,
});
