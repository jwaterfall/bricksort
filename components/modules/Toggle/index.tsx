import { FC } from 'react';

import { Flexbox } from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';

import { Thumb, ToggleContainer } from './styles';

export interface ButtonProps {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}

const Toggle: FC<ButtonProps> = ({ toggled, setToggled }) => (
  <Flexbox alignItems="center" padding="1rem" marginTop="0.5rem" gap="1rem">
    <ToggleContainer toggled={toggled} onClick={() => setToggled(!toggled)}>
      <Thumb toggled={toggled} />
    </ToggleContainer>
    <Typography variant="h4">{toggled ? 'All Parts' : 'Missing Parts'}</Typography>
  </Flexbox>
);

export default Toggle;
