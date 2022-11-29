import { FC, ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: IconType;
}

const Button: FC<ButtonProps> = ({ Icon, children, ...props }) => (
  <button
    {...props}
    className="bg-primary flex items-center gap-1 px-3 py-2 text-sm font-light rounded-md text-text-dark hover:bg-button-hover transition-colors"
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </button>
);

export default Button;
