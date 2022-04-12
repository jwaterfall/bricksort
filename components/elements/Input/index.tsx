import { FC, InputHTMLAttributes } from 'react';

import { PrimaryInput } from './styles';

export type InputVariant = 'primary';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = ({ variant = 'primary', ...props }) => {
  switch (variant) {
    case 'primary':
      return <PrimaryInput {...props} />;
  }
};

export default Input;
