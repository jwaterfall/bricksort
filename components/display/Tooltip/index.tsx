import { FC, PropsWithChildren } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

interface TooltipProps {
  text: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({ text, side = 'top', align = 'center', children }) => (
  <TooltipPrimitive.Root delayDuration={0}>
    <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={4}
        side={side}
        align={align}
        className="h-6 px-2 text-xs flex items-center rounded-md shadow-sm font-medium dark:font-normal bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
      >
        {text}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
);

export const TooltipProvider = TooltipPrimitive.Provider;
