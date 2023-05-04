import { FC, PropsWithChildren } from 'react';

interface BadgeProps {
  color?: 'default' | 'primary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
}

const Badge: FC<PropsWithChildren<BadgeProps>> = ({ color = 'default', size = 'md', variant = 'solid', children }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return `border-zinc-300 dark:border-zinc-700 ${variant === 'outline' ? '' : 'bg-zinc-200 dark:bg-zinc-800'}`;
      case 'primary':
        return `border-red-500 ${variant === 'outline' ? 'text-red-500' : 'bg-red-500'}`;
      case 'success':
        return `border-green-500 ${variant === 'outline' ? 'text-green-500' : 'bg-green-500'}`;
      case 'error':
        return `border-red-500 ${variant === 'outline' ? 'text-red-500' : 'bg-red-500'}`;
      case 'info':
        return `border-blue-500 ${variant === 'outline' ? 'text-blue-500' : 'bg-blue-500'}`;
      case 'warning':
        return `border-amber-500 ${variant === 'outline' ? 'text-amber-500' : 'bg-amber-500'}`;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs h-4 px-1';
      case 'md':
        return 'text-xs h-6 px-2';
      case 'lg':
        return 'text-base h-8 px-3';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        return color === 'default' ? 'text-zinc-950 dark:text-zinc-50 font-medium' : 'text-zinc-50';
      case 'outline':
        return 'font-semibold bg-transparent';
    }
  };

  return (
    <span
      className={`
        rounded-md border flex items-center w-fit
        ${getColorStyles()}
        ${getSizeStyles()}
        ${getVariantStyles()}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
