import { FC, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => (
  <div className="flex gap-2 p-3 bg-zinc-200 rounded-md text-sm font-medium text-zinc-800 border border-zinc-300 min-w-0 dark:bg-zinc-700 dark:text-zinc-50 dark:border-zinc-700">
    {label && <label className="text-zinc-400 font-normal capitalize min-w-[2.5rem] whitespace-nowrap dark:text-zinc-400">{label}</label>}
    <input className="bg-transparent outline-none grow placeholder:font-normal placeholder:text-zinc-400 dark:placeholder-zinc-400" {...props} />
  </div>
);

export default Input;
