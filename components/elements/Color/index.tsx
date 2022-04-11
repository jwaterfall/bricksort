import { FC, PropsWithChildren } from 'react';

import { Primary, Secondary, Tertiary } from './styles';

export type ColorVariant = 'primary' | 'secondary' | 'tertiary';

export interface ColorProps {
  variant?: ColorVariant;
}

const Color: FC<PropsWithChildren<ColorProps>> = ({ variant = 'primary', ...props }) => {
  switch (variant) {
    case 'primary':
      return <Primary {...props} />;
    case 'secondary':
      return <Secondary {...props} />;
    case 'tertiary':
      return <Tertiary {...props} />;
  }
};

export default Color;
