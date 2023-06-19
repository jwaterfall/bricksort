import { FC, ButtonHTMLAttributes, forwardRef } from 'react';
import { IconType } from 'react-icons';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'elavated' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  iconLeft?: IconType;
  iconRight?: IconType;
  children?: string;
}

export const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'filled':
      return `text-zinc-50 bg-red-500 hover:bg-red-700 disabled:hover:bg-red-500
        dark:text-red-950 dark:bg-red-400 dark:hover:bg-red-300 dark:disabled:hover:bg-red-400`;
    case 'tonal':
      return `text-red-500 bg-red-100 hover:bg-red-200 disabled:hover:bg-red-100
        dark:text-red-400 dark:bg-red-400/20 dark:hover:bg-red-400/25 dark:disabled:hover:bg-red-400/20`;
    case 'outlined':
      return `bg-transparent border text-red-500 border-red-500 hover:bg-red-200 disabled:hover:bg-transparent
        dark:text-red-400 dark:border-red-400 dark:hover:bg-red-400/20 dark:disabled:hover:bg-transparent`;
    case 'elavated':
      return `shadow-md text-red-500 bg-zinc-50 hover:bg-red-100 disabled:hover:bg-zinc-50
        dark:text-red-300 dark:bg-zinc-800 dark:hover:bg-red-400/25 dark:disabled:hover:bg-zinc-800`;
    case 'text':
      return `bg-transparent text-red-500 hover:bg-red-100 disabled:hover:bg-transparent
        dark:text-red-400 dark:hover:bg-red-400/20 dark:disabled:hover:bg-transparent`;
  }
};

export const getSizeStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'outlined':
      return 'h-[2.375rem]';
    default:
      return 'h-10';
  }
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'filled', iconLeft: IconLeft, iconRight: IconRight, children, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2 select-none transition-colors duration-100 rounded-full disabled:opacity-25 text-sm
        ${IconLeft ? 'pl-4' : 'pl-6'} ${IconRight ? 'pr-4' : 'pr-6'}
        ${getVariantStyles(variant)} ${getSizeStyles(variant)}
      `}
    >
      {IconLeft && <IconLeft size={18} className="shrink-0" />}
      {children && <span className="truncate">{children}</span>}
      {IconRight && <IconRight size={18} className="shrink-0" />}
    </button>
  )
);
