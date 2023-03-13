import { FC, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    Icon?: IconType;
}

const Input: FC<InputProps> = ({ Icon, ...props }) => (
    <div className="h-12 px-4 rounded-lg bg-gray-900 text-sm text-gray-400 flex items-center gap-2 border border-gray-700">
        {Icon && <Icon className="h-6 w-6 text-gray-50" />}
        <input className="bg-transparent focus:text-gray-50 focus:outline-none" {...props} />
    </div>
);

export default Input;
