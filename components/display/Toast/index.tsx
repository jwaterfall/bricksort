import { FC, PropsWithChildren } from 'react';
import { MdCheckCircle, MdClose, MdError, MdInfo, MdWarning } from 'react-icons/md';
import * as ToastPrimitive from '@radix-ui/react-toast';

import { Button } from '@/components/actions/Button';

export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

interface ToastProps {
  variant?: ToastVariant;
  showCloseButton?: boolean;
  showIcon?: boolean;
}

export const ToastProvider = ToastPrimitive.Provider;

export const ToastDisplay: FC = () => <ToastPrimitive.Viewport className="fixed bottom-4 right-4 flex flex-col gap-4 z-50" />;

export const Toast: FC<PropsWithChildren<ToastProps>> = ({ variant = 'info', showCloseButton = true, showIcon = true, children }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return 'bg-blue-600 dark:bg-blue-500';
      case 'success':
        return 'bg-green-6600 dark:bg-green-500';
      case 'error':
        return 'bg-red-600 dark:bg-red-500';
      case 'warning':
        return 'bg-amber-600 dark:bg-amber-500';
    }
  };

  function getVariantIcon() {
    switch (variant) {
      case 'info':
        return MdInfo;
      case 'success':
        return MdCheckCircle;
      case 'error':
        return MdError;
      case 'warning':
        return MdWarning;
    }
  }

  const Icon = getVariantIcon();

  return (
    <ToastPrimitive.Root
      className={`
        max-w-sm p-4 rounded-xl shadow-lg pointer-events-auto w-full flex items-center gap-4 text-gray-50
        data-[state=open]:animate-toast-open
        data-[state=closed]:animate-toast-close 
        data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
        data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:ease-out
        data-[swipe=end]:animate-toast-swipe-end
        ${getVariantStyles()}
      `}
    >
      {showIcon && <Icon size={20} />}
      <ToastPrimitive.Description className="flex-1 text-xs font-thin">{children}</ToastPrimitive.Description>
      {showCloseButton && (
        <ToastPrimitive.Close asChild>
          <Button variant="ghost-overlay" shape="square" iconLeft={MdClose} />
        </ToastPrimitive.Close>
      )}
    </ToastPrimitive.Root>
  );
};
