import { FC } from 'react';
import { MdCheck } from 'react-icons/md';
import * as SwitchPrimitive from '@radix-ui/react-switch';

interface SwitchProps {
  value?: boolean;
  onChange?: (enabled: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({ value, onChange }) => (
  <SwitchPrimitive.Root
    checked={value}
    onCheckedChange={onChange}
    className="group relative inline-flex items-center rounded-full h-8 w-[3.25rem] bg-zinc-500 dark:bg-zinc-500/30
      data-[state=checked]:bg-red-500 data-[state=checked]:text-red-500 dark:data-[state=checked]:bg-red-400 dark:data-[state=checked]:text-red-400"
  >
    <SwitchPrimitive.Thumb
      className="group absolute rounded-full transition-switch-thumb left-2 aspect-square h-4
        flex items-center justify-center bg-zinc-50 group-hover:ring-[0.75rem] ring-zinc-100/10
        data-[state=checked]:translate-x-4 data-[state=checked]:h-6
      "
    >
      <div className="hidden group-data-[state=checked]:block">
        <MdCheck size={16} />
      </div>
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
);
