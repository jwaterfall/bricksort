import { FC } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import * as SwitchPrimitive from '@radix-ui/react-switch';

interface ToggleProps {
  value?: boolean;
  onChange?: (enabled: boolean) => void;
}

const Toggle: FC<ToggleProps> = ({ value, ...props }) => (
  <SwitchPrimitive.Root
    checked={value}
    onCheckedChange={props.onChange}
    className={`group relative inline-flex items-center rounded-full ${
      value ? 'bg-indigo-500 text-indigo-500' : 'bg-gray-500 dark:bg-gray-500/30'
    } h-8 w-[3.25rem]`}
  >
    <SwitchPrimitive.Thumb
      className={`absolute rounded-full transition-all left-2 aspect-square h-4 w-4 bg-white group-hover:ring-[0.75rem] ring-gray-100/10
        ${value ? 'translate-x-[1.25rem]' : ''}
      `}
    />
  </SwitchPrimitive.Root>
);

export default Toggle;
