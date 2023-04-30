import { FC, PropsWithChildren } from 'react';

export type BadgeColor = 'default' | 'primary' | 'success' | 'error' | 'info' | 'warning';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'solid' | 'outline';

export interface BadgeProps {
  color?: BadgeColor;
  size?: BadgeSize;
  variant?: BadgeVariant;
}

const Badge: FC<PropsWithChildren<BadgeProps>> = ({ color = 'default', size = 'md', variant = 'solid', children }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return `border-slate-300 ${variant === 'outline' ? '' : 'bg-slate-200'}`;
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
        return color === 'default' ? 'text-slate-950 font-medium' : 'text-slate-50';
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
