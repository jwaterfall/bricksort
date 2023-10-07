import { FC, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const variantStyles = cva(
  `h-9 px-3 text-sm flex items-center justify-center gap-2 select-none active:scale-95 shrink-0 transition
disabled:bg-zinc-200 disabled:text-zinc-400 disabled:border-zinc-300 disabled:active:scale-100`,
  {
    variants: {
      color: {
        default: '',
        primary: '',
        info: '',
        success: '',
        error: '',
        warning: '',
      },
      variant: {
        primary: 'hover:brightness-110',
        secondary: 'font-medium hover:brightness-95',
      },
      shape: {
        default: 'rounded-sm',
        square: 'rounded-sm aspect-square',
        circle: 'rounded-full aspect-square',
      },
      isFullWidth: {
        true: 'w-full',
        false: 'w-fit',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        color: 'default',
        class: 'bg-transparent text-zinc-950 border border-zinc-300 hover:text-green-600 hover:border-current',
      },
      {
        variant: 'primary',
        color: 'primary',
        class: 'bg-green-600 text-white',
      },
      {
        variant: 'primary',
        color: 'info',
        class: 'bg-blue-600 text-white',
      },
      {
        variant: 'primary',
        color: 'success',
        class: 'bg-green-600 text-white',
      },
      {
        variant: 'primary',
        color: 'error',
        class: 'bg-red-600 text-white',
      },
      {
        variant: 'primary',
        color: 'warning',
        class: 'bg-amber-600 text-white',
      },
      {
        variant: 'secondary',
        color: 'default',
        class: 'bg-zinc-200 text-zinc-950',
      },
      {
        variant: 'secondary',
        color: 'primary',
        class: 'bg-green-100 text-green-600',
      },
      {
        variant: 'secondary',
        color: 'info',
        class: 'bg-blue-100 text-blue-600',
      },
      {
        variant: 'secondary',
        color: 'success',
        class: 'bg-green-100 text-green-600',
      },
      {
        variant: 'secondary',
        color: 'error',
        class: 'bg-red-100 text-red-600',
      },
      {
        variant: 'secondary',
        color: 'warning',
        class: 'bg-amber-100 text-amber-600',
      },
    ],
    defaultVariants: {
      color: 'default',
      variant: 'primary',
      shape: 'default',
      isFullWidth: false,
    },
  }
);

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, VariantProps<typeof variantStyles> {
  Icon?: IconType;
  EndIcon?: IconType;
}

const Button: FC<ButtonProps> = ({ color, variant, shape, isFullWidth, Icon, EndIcon: EndIcon, children, ...props }) => (
  <button {...props} className={twMerge(variantStyles({ color, variant, shape, isFullWidth }), props.className)}>
    {Icon && <Icon size={16} className="shrink-0" />}
    {children && <span className="truncate">{children}</span>}
    {EndIcon && <EndIcon size={16} className="shrink-0" />}
  </button>
);

export default Button;
