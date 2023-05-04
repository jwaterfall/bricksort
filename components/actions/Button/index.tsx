import { FC, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'default' | 'primary';
  size?: ButtonSize;
  shape?: 'default' | 'square' | 'circle';
  variant?: 'solid' | 'outline';
  Icon?: IconType;
  isFullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  color = 'default',
  size = 'md',
  shape = 'default',
  variant = 'solid',
  Icon,
  isFullWidth = false,
  children,
  ...props
}) => {
  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return `border-slate-300 group-[.pagination]:bg-slate-100 group-[.pagination]:disabled:bg-slate-200 ${
          variant === 'outline' ? 'hover:bg-slate-200 hover:text-slate-950' : 'bg-slate-200'
        }`;
      case 'primary':
        return `border-red-500 ${variant === 'outline' ? 'text-red-500 hover:bg-red-500' : 'bg-red-500'}`;
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
        return `font-medium ${color === 'default' ? 'text-slate-950 ' : 'text-slate-50'}`;
      case 'outline':
        return 'font-semibold bg-transparent hover:text-slate-50';
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
        disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200
        disabled:border-slate-300 disabled:active:scale-100
        ${isFullWidth ? 'w-full' : 'w-fit'}
        ${getColorStyles()}
        ${getSizeStyles()}
        ${getShapeStyles()}
        ${getVariantStyles()}
      `}
    >
      {Icon && <Icon size={getIconSize()} className="shrink-0" />}
      {children && <span className="truncate">{children}</span>}
    </button>
  );
};

export default Button;
