import React, { FC, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { twMerge } from '@/utils/twMerge';

export const badgeVariantStyles = cva('text-label-small flex min-h-[0.5rem] w-fit items-center gap-1 rounded-full px-1', {
  variants: {
    color: {
      primary: 'bg-primary text-on-primary',
      info: 'bg-info text-on-info',
      success: 'bg-success text-on-success',
      warning: 'bg-warning text-on-warning',
      error: 'bg-error text-on-error',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export type BadgeColor = 'primary' | 'info' | 'success' | 'warning' | 'error';

interface BadgeProps extends VariantProps<typeof badgeVariantStyles> {
  color?: BadgeColor;
  className?: string;
}

/**
 * Badges convey dynamic information, such as counts or status. A badge can include labels or numbers.
 * @param children The text to display inside the badge.
 */
export const Badge: FC<PropsWithChildren<BadgeProps>> = ({ color, className, children }) => (
  <div className={twMerge(badgeVariantStyles({ color }), className)}>{children}</div>
);
