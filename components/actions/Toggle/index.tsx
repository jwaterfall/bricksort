import { FC } from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import * as SwitchPrimitive from '@radix-ui/react-switch';

interface ToggleProps {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle: FC<ToggleProps> = ({ enabled, size = 'md', ...props }) => {
  const getToggleStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-6 w-9';
      case 'md':
        return 'h-7 w-[2.75rem]';
      case 'lg':
        return 'h-8 w-[3.125rem]';
    }
  };

  const getThumbStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4';
      case 'md':
        return 'h-5 w-5';
      case 'lg':
        return 'h-6 w-6';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 12;
      case 'md':
        return 14;
      case 'lg':
        return 16;
    }
  };

  const Icon = enabled ? MdCheck : MdClose;

  return (
    <SwitchPrimitive.Root
      checked={enabled}
      onCheckedChange={props.onChange}
      className={`relative inline-flex items-center rounded-full ${
        enabled ? 'bg-blue-600 text-blue-600 dark:bg-blue-400 dark:text-blue-400' : 'bg-slate-700 text-slate-700'
      } ${getToggleStyles()}`}
    >
      <SwitchPrimitive.Thumb
        className={`absolute transform rounded-full transition left-1 aspect-square flex items-center justify-center ${
          enabled ? 'translate-x-3/4 bg-blue-300 dark:bg-blue-600' : 'bg-slate-400 dark:bg-slate-300'
        } ${getThumbStyles()}`}
      >
        <Icon size={getIconSize()} />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
};

export default Toggle;
