import { FC } from 'react';

import Button from '@/components/elements/Button';
import NavLink from '@/components/elements/NavLink';
import Typography from '@/components/elements/Typography';
import useDeleteSet from '@/hooks/mutations/useDeleteSet';
import { Set } from '@/models/Set';

import { Container, Image } from './styles';

const SetCard: FC<{ set: Set }> = ({ set }) => {
  const { mutate: deleteSet } = useDeleteSet();
  return (
    <NavLink href={`/sets/${set._id}`}>
      <Container>
        <Image src={set.image} alt="set" />
        <Typography>
          {set.number} {set.name} {set.percentageComplete}%
        </Typography>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            deleteSet(set._id);
          }}
        >
          delete
        </Button>
      </Container>
    </NavLink>
  );
};

export default SetCard;
