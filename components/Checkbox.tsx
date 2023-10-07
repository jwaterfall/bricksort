import { FC } from 'react';
import { FaCheck } from 'react-icons/fa';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => Promise<void> | void;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => (
  <div
    className={`w-6 h-6 rounded-sm cursor-pointer border text-red-50 flex items-center justify-center ${
      checked ? 'bg-red-500 border-red-500' : 'bg-zinc-200 border-zinc-300'
    }`}
    onClick={() => onChange(!checked)}
  >
    {checked && <FaCheck size={12} />}
  </div>
);

export default Checkbox;
