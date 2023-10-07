import { FC, PropsWithChildren } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const variantStyles = cva('flex items-center w-fit truncate border text-xs rounded-sm h-7 px-2', {
  variants: {
    color: {
      default: 'bg-zinc-200 text-zinc-950 border-zinc-300',
      primary: 'bg-green-100 text-green-600 border-green-200',
      info: 'bg-blue-100 text-blue-600 border-blue-200',
      success: 'bg-green-100 text-green-600 border-green-200',
      error: 'bg-red-100 text-red-600 border-red-200',
      warning: 'bg-amber-100 text-amber-600 border-amber-200',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

interface TagProps extends VariantProps<typeof variantStyles> {
  className?: string;
}

const Tag: FC<PropsWithChildren<TagProps>> = ({ children, className, ...props }) => (
  <span className={twMerge(variantStyles(props), className)}>{children}</span>
);

export default Tag;
