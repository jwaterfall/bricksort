import { FC } from 'react';
import { FaHammer } from 'react-icons/fa';

import { Set } from '../models/Set';
import useCreateCollectionInventory from '../mutations/useCreateCollectionInventory';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './display/Card';
import Tag from './display/Tag';
import Button from './actions/Button';

interface SetCardProps {
  set: Set;
}

const SetCard: FC<SetCardProps> = ({ set }) => {
  const { mutate: createCollectionInventory, isLoading: isCreating } = useCreateCollectionInventory();
  const displayId = set._id.endsWith('-1') ? set._id.slice(0, -2) : set._id;

  return (
    <Card>
      <CardTitle>{set.name}</CardTitle>
      {set.imageUrl && <CardImage src={set.imageUrl} alt={set.name} />}
      <CardBody>
        #{displayId} • {set.year}
      </CardBody>
      <CardFooter>
        <Tag>{`${set.partCount > 1 ? `${set.partCount} Pieces` : '1 Piece'}`}</Tag>
        <Button shape="circle" Icon={FaHammer} disabled={isCreating} onClick={() => createCollectionInventory(set._id)} />
      </CardFooter>
    </Card>
  );
};

export default SetCard;
