import { ButtonHTMLAttributes, FC } from 'react';

import { PrimaryButton, SecondaryButton } from './styles';

export type ButtonColor = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  isFullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({ color = 'primary', ...props }) => {
  switch (color) {
    case 'primary':
      return <PrimaryButton {...props} />;
    case 'secondary':
      return <SecondaryButton {...props} />;
  }
};

export default Button;
