import React, { FC, PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import * as ToastPrimitive from '@radix-ui/react-toast';

import { twMerge } from '@/utils/twMerge';

/**
 * It provides the context for the snackbars.
 */
export const SnackbarProvider = ToastPrimitive.Provider;

/**
 * The container that displays the snackbars at the bottom center of the screen.
 */
export const SnackbarDisplay: FC = () => (
  <ToastPrimitive.Viewport className="fixed bottom-0 left-0 z-50 flex w-screen flex-col items-center gap-2 p-4" />
);

interface BaseSnackbarProps {
  showCloseButton?: boolean;
  duration?: number;
  className?: string;
}

interface SnackbarPropsWithAction extends BaseSnackbarProps {
  actionText: string;
  actionOnClick: () => void;
}

type SnackbarProps = BaseSnackbarProps | SnackbarPropsWithAction;

/**
 * Snackbars provide brief messages about app processes at the bottom of the screen.
 * @param showCloseButton Whether to show the close button or not.
 * @param duration The duration in milliseconds to show the snackbar.
 * @param actionText The text of the action button.
 * @param actionOnClick The function to call when the action button is clicked.
 * @param children The message to display in the snackbar.
 * @param className Any extra classes to add to the snackbar.
 * @returns A Snackbar component.
 */
export const Snackbar: FC<PropsWithChildren<SnackbarProps>> = ({ showCloseButton = true, children, duration, className, ...props }) => {
  const isActionButton = 'actionText' in props && props.actionText;

  return (
    <ToastPrimitive.Root
      duration={duration}
      className={twMerge(
        `flex h-12 w-full max-w-4xl items-center gap-3 rounded-md bg-inverse-surface pl-4 text-body-medium text-inverse-on-surface
        shadow-elevation-3 data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-snackbar-close
        data-[state=open]:animate-snackbar-open data-[swipe=end]:animate-snackbar-swipe-end data-[swipe=cancel]:transition-transform data-[swipe=cancel]:ease-out border border-inverse-on-surface/10
        ${showCloseButton ? 'pr-3' : isActionButton ? 'pr-2' : 'pr-4'}`,
        className
      )}
    >
      <ToastPrimitive.Description className="flex-1">{children}</ToastPrimitive.Description>
      {isActionButton && (
        <ToastPrimitive.Action
          altText={props.actionText}
          onClick={props.actionOnClick}
          className="rounded-sm bg-transparent px-3 py-2 text-label-large text-inverse-primary hover:bg-primary/20 active:bg-primary/30"
        >
          {props.actionText}
        </ToastPrimitive.Action>
      )}
      {showCloseButton && (
        <ToastPrimitive.Close className="rounded-full p-2 text-inverse-on-surface-variant hover:bg-inverse-on-surface/5">
          <MdClose size={20} />
        </ToastPrimitive.Close>
      )}
    </ToastPrimitive.Root>
  );
};
