import React, { FC } from "react";
import { MdCheck } from "react-icons/md";
import * as SwitchPrimitive from "@radix-ui/react-switch";

interface SwitchProps {
  value?: boolean;
  onChange?: (enabled: boolean) => void;
  disabled?: boolean;
}

/**
 * Switches toggle the state of a single item on or off.
 * @param value The current value of the switch.
 * @param onChange A function that will be called when the switch is toggled.
 * @param disabled Whether the switch is disabled or not.
 */
export const Switch: FC<SwitchProps> = ({ value, onChange, disabled = false }) => (
  <SwitchPrimitive.Root
    checked={value}
    disabled={disabled}
    onCheckedChange={onChange}
    className="data border-outline group relative inline-flex h-8 w-[3.25rem] items-center rounded-full border-2 bg-surface-highest disabled:opacity-10
      data-checked:border-primary data-checked:bg-primary data-checked:disabled:border-on-surface data-checked:disabled:bg-on-surface"
  >
    <SwitchPrimitive.Thumb
      className="bg-outline group absolute left-1.5 flex aspect-square h-4 items-center justify-center rounded-full text-primary ring-on-surface/5
        transition-['box-shadow,transform'] ease-in-out group-hover:ring-[0.75rem] group-active:h-7 group-disabled:bg-on-surface
        group-disabled:text-on-surface group-disabled:group-hover:ring-0 data-checked:h-6 data-checked:translate-x-4 data-checked:bg-on-primary
        data-checked:group-active:translate-x-3.5 data-checked:group-disabled:bg-surface data-checked:group-disabled:group-active:h-6
        data-checked:group-disabled:group-active:translate-x-4 data-unchecked:group-active:-translate-x-1.5
        data-unchecked:group-disabled:translate-x-0 data-unchecked:group-disabled:group-active:h-4"
    >
      <div className="hidden group-data-checked:block">
        <MdCheck size={16} />
      </div>
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
);
