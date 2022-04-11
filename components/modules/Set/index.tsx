import { FC } from 'react';
import useDeleteSet from '../../../hooks/mutations/useDeleteSet';
import { Set } from '../../../models/Set';
import Button from '../../elements/Button';

import NavLink from '../../elements/NavLink';
import Typography from '../../elements/Typography';
import { Container, Image } from './styles';

const Set: FC<{set: Set}> = ({set}) => {
  const {mutate: deleteSet} = useDeleteSet()
  return (
    <NavLink href={`/sets/${set._id}`}>
      <Container>
      <Image src={set.image} alt="set"/>
      <Typography>{set.number} {set.name}</Typography>
      <Button
        style={{ padding: '1rem' }} onClick = {(e) => {e.stopPropagation();deleteSet(set._id)}}>delete</Button>
      </Container>
    </NavLink>
  );
};

export default Set;
