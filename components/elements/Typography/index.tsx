import { FC, PropsWithChildren } from 'react';

import { H1, H2, H3, H4, P } from './styles';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'p';
export type TypographyAlign = 'left' | 'center' | 'right';

export interface TypographyProps {
  variant?: TypographyVariant;
  align?: TypographyAlign;
}

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  variant = 'p',
  align = 'left',
  ...props
}) => {
  switch (variant) {
    case 'h1':
      return <H1 align={align} {...props} />;
    case 'h2':
      return <H2 align={align} {...props} />;
    case 'h3':
      return <H3 align={align} {...props} />;
    case 'h4':
      return <H4 align={align} {...props} />;
    case 'p':
      return <P align={align} {...props} />;
  }
};

export default Typography;
