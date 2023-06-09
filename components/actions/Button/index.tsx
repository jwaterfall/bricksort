import { FC, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'primary' | 'info' | 'success' | 'error' | 'warning';
  variant?: 'default' | 'secondary' | 'tertiary';
  shape?: 'default' | 'rounded' | 'square' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  Icon?: IconType;
  EndIcon?: IconType;
}

const Button: FC<ButtonProps> = ({
  color = 'default',
  variant = 'default',
  size = 'md',
  shape = 'default',
  isFullWidth = false,
  Icon,
  EndIcon: EndIcon,
  children,
  ...props
}) => {
  const getColorStyles = () => {
    switch (variant) {
      case 'default':
        switch (color) {
          case 'default':
            return 'text-zinc-50';
          default:
            return 'text-zinc-950';
        }
      default:
        switch (color) {
          case 'default':
            return 'text-zinc-50';
          case 'primary':
            return 'text-primary-100';
          case 'info':
            return 'text-info-100';
          case 'success':
            return 'text-success-100';
          case 'error':
            return 'text-error-100';
          case 'warning':
            return 'text-warning-100';
        }
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        switch (color) {
          case 'default':
            return 'bg-zinc-700';
          case 'primary':
            return 'bg-primary-100';
          case 'info':
            return 'bg-info-100';
          case 'success':
            return 'bg-success-100';
          case 'error':
            return 'bg-error-100';
          case 'warning':
            return 'bg-warning-100';
        }
      case 'secondary':
        switch (color) {
          case 'default':
            return 'bg-zinc-700';
          case 'primary':
            return 'bg-primary-200';
          case 'info':
            return 'bg-info-200';
          case 'success':
            return 'bg-success-200';
          case 'error':
            return 'bg-error-200';
          case 'warning':
            return 'bg-warning-200';
        }
      case 'tertiary':
        return 'bg-transparent hover:bg-zinc-700';
    }
  };

  const getShapeStyles = () => {
    switch (shape) {
      case 'default':
        return 'rounded-sm';
      case 'rounded':
        return 'rounded-full';
      case 'square':
        return 'rounded-sm aspect-square';
      case 'circle':
        return 'rounded-full aspect-square';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return `text-xs h-8 ${shape === 'default' || shape === 'rounded' ? 'px-2' : ''}`;
      case 'md':
        return `text-sm h-10 ${shape === 'default' || shape === 'rounded' ? 'px-3' : ''}`;
      case 'lg':
        return `text-base h-12 ${shape === 'default' || shape === 'rounded' ? 'px-4' : ''}`;
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
        flex items-center justify-center gap-2 select-none active:scale-95 shrink-0 transition
        disabled:bg-zinc-200 disabled:text-zinc-400 disabled:border-zinc-300 disabled:active:scale-100
        dark:disabled:bg-zinc-800 dark:disabled:text-zinc-400 dark:disabled:border-zinc-700 hover:brightness-110
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
