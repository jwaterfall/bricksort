import { FC } from 'react';
import { MdCheckCircle, MdClose, MdError, MdInfo, MdWarning } from 'react-icons/md';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const variantStyles = cva('border max-w-xl py-4 px-6 rounded-sm shadow-lg pointer-events-auto w-full flex justify-between gap-2 text-zinc-950', {
  variants: {
    variant: {
      info: 'bg-blue-100 border-blue-200',
      success: 'bg-green-100 border-green-200',
      error: 'bg-red-100 border-red-200',
      warning: 'bg-amber-100 border-amber-200',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export type AlertVariant = 'info' | 'success' | 'error' | 'warning';

interface AlertProps extends VariantProps<typeof variantStyles> {
  title: string;
  description: string;
  className?: string;
}

const Alert: FC<AlertProps> = ({ variant = 'info', title, description, className }) => {
  function getVariantIcon() {
    switch (variant) {
      case 'info':
        return <MdInfo size={20} className="text-blue-400" />;
      case 'success':
        return <MdCheckCircle size={20} className="text-green-400" />;
      case 'error':
        return <MdError size={20} className="text-red-400" />;
      case 'warning':
        return <MdWarning size={20} className="text-amber-400" />;
    }
  }

  return (
    <div className={twMerge(variantStyles({ variant }), className)}>
      {getVariantIcon()}
      <div className="flex-1">
        <h4 className="font-medium mb-2">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Alert;
