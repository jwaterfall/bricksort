import { FC } from 'react';

import Typography from '../Typography';
import { Container, Thumb, ToggleContainer } from './styles';

export interface ButtonProps {
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
}

const Toggle: FC<ButtonProps> = ({ toggled, setToggled }) => (
  <Container>
    <ToggleContainer toggled={toggled} onClick={() => setToggled(!toggled)}>
      <Thumb toggled={toggled} />
    </ToggleContainer>
    <Typography variant="h2">
      {toggled ? 'All Parts' : 'Missing Parts'}
    </Typography>
  </Container>
);

export default Toggle;
