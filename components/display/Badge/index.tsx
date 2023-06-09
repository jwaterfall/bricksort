import { FC, PropsWithChildren } from 'react';

interface BadgeProps {
  color?: 'default' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'solid' | 'outline';
  shape?: 'default' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
}

const Badge: FC<PropsWithChildren<BadgeProps>> = ({ color = 'default', variant = 'solid', shape = 'default', size = 'md', children }) => {
  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return 'text-zinc-300';
      case 'info':
        return 'text-info-100';
      case 'success':
        return 'text-success-100';
      case 'error':
        return 'text-error-100';
      case 'warning':
        return 'text-warning-100';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        switch (color) {
          case 'default':
            return 'bg-zinc-800 border-transparent';
          case 'info':
            return 'bg-info-200 border-transparent';
          case 'success':
            return 'bg-success-200 border-transparent';
          case 'error':
            return 'bg-error-200 border-transparent';
          case 'warning':
            return 'bg-warning-200 border-transparent';
        }
      case 'outline':
        switch (color) {
          case 'default':
            return 'bg-transparent border-zinc-800';
          case 'info':
            return 'bg-transparent border-info-200';
          case 'success':
            return 'bg-transparent border-success-200';
          case 'error':
            return 'bg-transparent border-error-200';
          case 'warning':
            return 'bg-transparent border-warning-200';
        }
    }
  };

  const getShapeStyles = () => {
    switch (shape) {
      case 'default':
        return 'rounded-sm';
      case 'rounded':
        return 'rounded-full';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs h-5 px-1';
      case 'md':
        return 'text-xs h-6 px-2';
      case 'lg':
        return 'text-sm h-7 px-3';
    }
  };

  return (
    <span className={`flex items-center w-fit border ${getColorStyles()} ${getVariantStyles()} ${getShapeStyles()} ${getSizeStyles()}`}>
      {children}
    </span>
  );
};

export default Badge;
