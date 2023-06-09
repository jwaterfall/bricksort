import { FC } from 'react';
import * as Switch from '@radix-ui/react-switch';

interface ToggleProps {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle: FC<ToggleProps> = ({ enabled, size = 'md', ...props }) => {
  const getToggleStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-5 w-9';
      case 'md':
        return 'h-6 w-11';
      case 'lg':
        return 'h-7 w-[3.25rem]';
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

  return (
    <Switch.Root
      checked={enabled}
      onCheckedChange={props.onChange}
      className={`relative inline-flex items-center rounded-full ${enabled ? 'bg-red-500' : 'bg-zinc-500'} ${getToggleStyles()}`}
    >
      <Switch.Thumb
        className={`absolute transform rounded-full bg-zinc-50 transition border-2 left-0.5 aspect-square ${
          enabled ? 'translate-x-full' : ''
        } ${getThumbStyles()}`}
      />
    </Switch.Root>
  );
};

export default Toggle;
