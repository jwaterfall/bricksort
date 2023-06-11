import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

import { CollectionInventory } from '../models/CollectionInventory';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './display/Card';
import QuantityFoundBadge from './QuantityFoundBadge';
import Button from './actions/Button';

interface CollectionInventoryCardProps {
  collectionInventory: CollectionInventory;
}

const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectionInventory }) => {
  const set = collectionInventory.inventory.set;

  return (
    <Card href={`/collection/${collectionInventory._id}`} hoverable>
      {set.imageUrl && <CardImage src={set.imageUrl} alt={set.name} />}
      <CardTitle>{set.name}</CardTitle>
      <CardBody>{`${set.theme.name} • ${set.year}`}</CardBody>
      <CardFooter>
        <div className="flex-1 flex gap-2 items-end justify-between">
          <QuantityFoundBadge quantity={collectionInventory.partQuantity} quantityFound={collectionInventory.partQuantityFound} showPercentage />
          <Button shape="square" color="secondary" Icon={FaTrash} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default CollectionInventoryCard;
