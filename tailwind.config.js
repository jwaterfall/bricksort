/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', '.storybook/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsla(var(--color-primary), <alpha-value>)',
        'on-primary': 'hsla(var(--color-on-primary), <alpha-value>)',
        'inverse-primary': 'hsla(var(--color-inverse-primary), <alpha-value>)',
        info: 'hsla(var(--color-info), <alpha-value>)',
        'on-info': 'hsla(var(--color-on-info), <alpha-value>)',
        success: 'hsla(var(--color-success), <alpha-value>)',
        'on-success': 'hsla(var(--color-on-success), <alpha-value>)',
        warning: 'hsla(var(--color-warning), <alpha-value>)',
        'on-warning': 'hsla(var(--color-on-warning), <alpha-value>)',
        error: 'hsla(var(--color-error), <alpha-value>)',
        'on-error': 'hsla(var(--color-on-error), <alpha-value>)',
        background: 'hsla(var(--color-background), <alpha-value>)',
        'surface-low': 'hsla(var(--color-surface-low), <alpha-value>)',
        surface: 'hsla(var(--color-surface), <alpha-value>)',
        'surface-high': 'hsla(var(--color-surface-high), <alpha-value>)',
        'surface-highest': 'hsla(var(--color-surface-highest), <alpha-value>)',
        'on-surface': 'hsla(var(--color-on-surface), <alpha-value>)',
        'on-surface-variant': 'hsla(var(--color-on-surface-variant), <alpha-value>)',
        'inverse-surface': 'hsla(var(--color-inverse-surface), <alpha-value>)',
        'inverse-on-surface': 'hsla(var(--color-inverse-on-surface), <alpha-value>)',
        'inverse-on-surface-variant': 'hsla(var(--color-inverse-on-surface-variant), <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-readex-pro)', 'sans-serif'],
        logo: ['var(--font-lobster)', 'cursive'],
      },
      boxShadow: {
        'elevation-1': '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        'elevation-2': '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        'elevation-3': '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
      },
      screens: {
        'hide-scrollbar': { max: '767px' },
      },
      borderRadius: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.75rem',
        full: '9999px',
      },
      fontSize: {
        'body-small': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: 400,
            letterSpacing: '0.4px',
          },
        ],
        'body-medium': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: 400,
            letterSpacing: '0.25px',
          },
        ],
        'body-large': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: 400,
            letterSpacing: '0.5px',
          },
        ],
        'label-small': [
          '11px',
          {
            lineHeight: '16px',
            fontWeight: 500,
            letterSpacing: '0.5px',
          },
        ],
        'label-medium': [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: 500,
            letterSpacing: '0.5px',
          },
        ],
        'label-large': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: 400,
            letterSpacing: '0.1px',
          },
        ],
        'title-small': [
          '14px',
          {
            lineHeight: '20px',
            fontWeight: 500,
            letterSpacing: '0.1px',
          },
        ],
        'title-medium': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: 500,
            letterSpacing: '0.15px',
          },
        ],
        'title-large': [
          '22px',
          {
            lineHeight: '28px',
            fontWeight: 400,
            letterSpacing: '0px',
          },
        ],
      },
      animation: {
        'snackbar-open': 'slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'snackbar-close': 'fade-out 100ms ease-in',
        'snackbar-swipe-end': 'snackbar-swipe-out 150ms ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(50vw)' },
          '100%': { transform: 'translateX(0)' },
        },
        'snackbar-swipe-out': {
          '0%': { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          '100%': { transform: 'translateX(50vw)' },
        },
      },
      transitionProperty: {
        'switch-thumb': 'box-shadow, transform',
      },
      data: {
        checked: 'state="checked"',
        unchecked: 'state="unchecked"',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
