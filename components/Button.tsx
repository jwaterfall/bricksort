import { FC, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: IconType;
}

const Button: FC<ButtonProps> = ({ Icon, children, ...props }) => (
  <button
    {...props}
    className="bg-red-500 text-red-50 flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors hover:bg-red-400 disabled:bg-red-700 disabled:hover:bg-red-700"
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </button>
);

export default Button;
