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
    className="group relative inline-flex items-center rounded-full h-8 w-[3.25rem] bg-gray-500 dark:bg-gray-500/30
      data-[state=checked]:bg-indigo-500 data-[state=checked]:text-indigo-500"
  >
    <SwitchPrimitive.Thumb
      className="group absolute rounded-full transition-switch-thumb left-2 aspect-square h-4
        flex items-center justify-center bg-white group-hover:ring-[0.75rem] ring-gray-100/10
        data-[state=checked]:translate-x-4 data-[state=checked]:h-6
      "
    >
      <div className="hidden group-data-[state=checked]:block">
        <MdCheck size={16} />
      </div>
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
);
