import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

import { CollectionInventory } from '../models/CollectionInventory';
import useDeleteCollectionInventory from '../mutations/useDeleteCollectionInventory';
import { useAlerts } from './AlertProvider';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './display/Card';
import QuantityFoundTag from './QuantityFoundTag';
import Button from './actions/Button';

interface CollectionInventoryCardProps {
  collectionInventory: CollectionInventory;
}

const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectionInventory }) => {
  const { mutate: deleteCollectionInventory, isLoading: isDeleting } = useDeleteCollectionInventory();
  const { addAlert } = useAlerts();

  const set = collectionInventory.inventory.set;
  const displayId = set._id.endsWith('-1') ? set._id.slice(0, -2) : set._id;

  return (
    <Card href={`/collection/${collectionInventory._id}`}>
      <CardTitle>{set.name}</CardTitle>
      {set.imageUrl && <CardImage src={set.imageUrl} alt={set.name} />}
      <CardBody>{`#${displayId} • ${set.year}`}</CardBody>
      <CardFooter>
        <QuantityFoundTag quantity={collectionInventory.partQuantity} quantityFound={collectionInventory.partQuantityFound} showPercentage />
        <Button
          shape="circle"
          Icon={FaTrash}
          disabled={isDeleting}
          onClick={(e) => {
            e.preventDefault();
            addAlert('Are you sure you want to delete this set?', 'warning', () => deleteCollectionInventory(collectionInventory._id));
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default CollectionInventoryCard;
