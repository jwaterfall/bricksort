import { FC, PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import * as ToastPrimitive from '@radix-ui/react-toast';

export const SnackbarProvider = ToastPrimitive.Provider;

export const SnackbarDisplay: FC = () => (
    <ToastPrimitive.Viewport className="fixed bottom-0 left-0 w-screen p-4 flex flex-col items-center gap-2 z-50" />
);

interface BaseSnackbarProps {
    showCloseButton?: boolean;
    duration?: number;
}

interface SnackbarPropsWithAction extends BaseSnackbarProps {
    actionText: string;
    actionOnClick: () => void;
}

type SnackbarProps = BaseSnackbarProps | SnackbarPropsWithAction;

export const Snackbar: FC<PropsWithChildren<SnackbarProps>> = ({ showCloseButton = true, children, duration = 2000, ...props }) => {
    const isActionButton = 'actionText' in props && props.actionText;

    return (
        <ToastPrimitive.Root
            duration={duration}
            className={`
        bg-zinc-100 text-zinc-950 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-50 shadow-sm
        h-12 pl-4 ${
            showCloseButton ? 'pr-3' : isActionButton ? 'pr-2' : 'pr-4'
        } flex items-center gap-3 rounded-[0.25rem] w-full max-w-4xl text-sm dark:font-thin 
        data-[state=open]:animate-snackbar-open
        data-[state=closed]:animate-snackbar-close 
        data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
        data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:ease-out
        data-[swipe=end]:animate-snackbar-swipe-end
      `}
        >
            <ToastPrimitive.Description className="flex-1">{children}</ToastPrimitive.Description>
            {'actionText' in props && props.actionText && (
                <ToastPrimitive.Action
                    altText={props.actionText}
                    onClick={props.actionOnClick}
                    className="text-sm rounded-[0.25rem] px-3 py-2 bg-transparent text-red-500 hover:bg-red-100 disabled:hover:bg-transparent
                dark:text-red-400 dark:hover:bg-red-400/20 dark:disabled:hover:bg-transparent"
                >
                    {props.actionText}
                </ToastPrimitive.Action>
            )}
            {showCloseButton && (
                <ToastPrimitive.Close className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700/50">
                    <MdClose size={18} />
                </ToastPrimitive.Close>
            )}
        </ToastPrimitive.Root>
    );
};
