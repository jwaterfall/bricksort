import { FC, ButtonHTMLAttributes, forwardRef } from 'react';
import { IconType } from 'react-icons';

import { ButtonVariant, getSizeStyles, getVariantStyles } from '@/components/actions/Button';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon: IconType;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ variant = 'filled', icon: Icon, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={`
    flex items-center justify-center transition-colors duration-100 rounded-2xl disabled:opacity-25 aspect-square
    ${getVariantStyles(variant)} ${getSizeStyles(variant)}
    `}
  >
    <Icon size={24} />
  </button>
));
