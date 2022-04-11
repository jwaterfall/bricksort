import { FC, InputHTMLAttributes } from 'react';

import { PrimaryInput, SecondaryInput, TertiaryInput } from './styles';

export type InputVariant = 'primary' | 'secondary' | 'tertiary';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = ({ variant = 'primary', ...props }) => {
  switch (variant) {
    case 'primary':
      return <PrimaryInput {...props} />;
    case 'secondary':
      return <SecondaryInput {...props} />;
    case 'tertiary':
      return <TertiaryInput {...props} />;
  }
};

export default Input;
