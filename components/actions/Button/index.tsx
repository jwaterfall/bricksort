import { FC, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'default' | 'ghost' | 'ghost-overlay';
  shape?: 'default' | 'square' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  Icon?: IconType;
  EndIcon?: IconType;
}

const Button: FC<ButtonProps> = ({
  color = 'primary',
  variant = 'default',
  size = 'md',
  shape = 'default',
  isFullWidth = false,
  Icon,
  EndIcon,
  children,
  ...props
}) => {
  const getVariantAndColorStyles = () => {
    switch (variant) {
      case 'default':
        switch (color) {
          case 'primary':
            return 'bg-blue-600 text-gray-50 dark:bg-blue-400 dark:text-gray-950 dark:font-medium';
          case 'secondary':
            return 'bg-blue-200 text-gray-950 font-medium dark:bg-gray-600 dark:text-gray-50 dark:font-normal';
          case 'tertiary':
            return 'bg-blue-100 text-gray-950 font-medium dark:bg-gray-700 dark:text-gray-50 dark:font-normal';
        }
      case 'ghost':
        switch (color) {
          case 'primary':
            return 'bg-transparent text-gray-950 hover:bg-blue-600 hover:text-gray-50 dark:text-gray-50 dark:hover:bg-blue-400 dark:hover:text-gray-950';
          case 'secondary':
            return 'bg-transparent text-gray-950 hover:bg-blue-200 hover:text-gray-950 dark:text-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-50';
          case 'tertiary':
            return 'bg-transparent text-gray-950 hover:bg-blue-100 hover:text-gray-950 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-50';
        }
      case 'ghost-overlay':
        return 'bg-transparent text-gray-50 hover:bg-gray-50/20';
    }
  };

  const getShapeStyles = () => {
    switch (shape) {
      case 'default':
        return 'rounded-full';
      case 'square':
        return 'rounded-xl aspect-square';
      case 'circle':
        return 'rounded-full aspect-square';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return `text-xs h-8 ${shape === 'default' ? 'px-4' : ''}`;
      case 'md':
        return `text-sm h-10 ${shape === 'default' ? 'px-6' : ''}`;
      case 'lg':
        return `text-base h-12 ${shape === 'default' ? 'px-8' : ''}`;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 22;
      case 'lg':
        return 24;
    }
  };

  return (
    <button
      {...props}
      className={`
        flex items-center justify-center gap-2 select-none active:scale-95 shrink-0 transition hover:brightness-95 dark:hover:brightness-110
        disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-500 disabled:hover:brightness-100 disabled:active:scale-100
        ${isFullWidth ? 'w-full' : 'w-fit'}
        ${getVariantAndColorStyles()}
        ${getSizeStyles()}
        ${getShapeStyles()}
      `}
    >
      {Icon && <Icon size={getIconSize()} className="shrink-0" />}
      {children && <span className="truncate">{children}</span>}
      {EndIcon && <EndIcon size={getIconSize()} className="shrink-0" />}
    </button>
  );
};

export default Button;
