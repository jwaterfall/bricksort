import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva('flex items-center w-fit truncate border text-xs rounded-sm h-7 px-2', {
  variants: {
    color: {
      default: 'bg-primary text-primary-foreground',
      success: 'bg-success text-success-foreground border-success-border',
      error: 'bg-error text-error-foreground border-error-border',
      warning: 'bg-warning text-warning-foreground border-warning-border',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof badgeVariants> {}

function Badge({ className, color, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ color }), className)} {...props} />;
}

export { Badge, badgeVariants };
