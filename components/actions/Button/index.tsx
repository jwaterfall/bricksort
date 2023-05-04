import { FC, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'primary';
  size?: ButtonSize;
  shape?: 'default' | 'square' | 'circle';
  variant?: 'solid' | 'outline';
  Icon?: IconType;
  EndIcon?: IconType;
  isFullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  color = 'default',
  size = 'md',
  shape = 'default',
  variant = 'solid',
  Icon,
  EndIcon: EndIcon,
  isFullWidth = false,
  children,
  ...props
}) => {
  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return `border-zinc-300 group-[.pagination]:bg-zinc-100 group-[.pagination]:disabled:bg-zinc-200 dark:border-zinc-600 dark:group-[.pagination]:bg-zinc-900 dark:group-[.pagination]:disabled:bg-zinc-800 ${
          variant === 'outline' ? 'text-zinc-950 dark:text-zinc-50' : 'bg-zinc-200 dark:bg-zinc-700'
        }`;
      case 'primary':
        return `border-red-500 ${variant === 'outline' ? 'text-red-500' : 'bg-red-500'}`;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return `text-xs h-8 ${shape === 'default' ? 'px-2' : ''}`;
      case 'md':
        return `text-sm h-10 ${shape === 'default' ? 'px-3' : ''}`;
      case 'lg':
        return `text-base h-12 ${shape === 'default' ? 'px-4' : ''}`;
    }
  };

  const getShapeStyles = () => {
    switch (shape) {
      case 'default':
        return 'rounded-md';
      case 'square':
        return 'rounded-md aspect-square';
      case 'circle':
        return 'rounded-full px-0 aspect-square';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        return `font-medium ${color === 'default' ? 'text-zinc-950 dark:text-zinc-50' : 'text-zinc-50'}`;
      case 'outline':
        return 'font-semibold bg-transparent';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 12;
      case 'md':
        return 16;
      case 'lg':
        return 28;
    }
  };

  return (
    <button
      {...props}
      className={`
        flex items-center justify-center gap-2 select-none active:scale-95 shrink-0 border transition
        disabled:bg-zinc-200 disabled:text-zinc-400 disabled:border-zinc-300 disabled:active:scale-100
        dark:disabled:bg-zinc-800 dark:disabled:text-zinc-400 dark:disabled:border-zinc-700
        ${isFullWidth ? 'w-full' : 'w-fit'}
        ${getColorStyles()}
        ${getSizeStyles()}
        ${getShapeStyles()}
        ${getVariantStyles()}
      `}
    >
      {Icon && <Icon size={getIconSize()} className="shrink-0" />}
      {children && <span className="truncate">{children}</span>}
      {EndIcon && <EndIcon size={getIconSize()} className="shrink-0" />}
    </button>
  );
};

export default Button;
