import { FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => (
  <div className="flex gap-2 p-3 bg-slate-200 rounded-md text-sm font-medium text-slate-900">
    {label && <label className="text-slate-400 capitalize min-w-[2.5rem]">{label}</label>}
    <input className="bg-transparent outline-none grow placeholder:font-medium placeholder:text-slate-400" {...props} />
  </div>
);

export default Input;
