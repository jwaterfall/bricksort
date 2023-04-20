import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

import { CollectionInventory } from '../models/CollectionInventory';
import useDeleteCollectionInventory from '../mutations/useDeleteCollectionInventory';
import { useAlerts } from './AlertProvider';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import QuantityFoundBadge from './QuantityFoundBadge';
import Button from './actions/Button';

interface CollectionInventoryCardProps {
    collectionInventory: CollectionInventory;
}

const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectionInventory }) => {
    const { mutate: deleteCollectionInventory, isLoading: isDeleting } = useDeleteCollectionInventory();
    const { addAlert } = useAlerts();

    const set = collectionInventory.inventory.set;

    return (
        <Card href={`/collection/${collectionInventory._id}/missing-parts`}>
            {set.imageUrl && <CardImage src={set.imageUrl} alt={set.name} />}
            <CardTitle>{set.name}</CardTitle>
            <CardBody>{`${set.theme.name} • ${set.year}`}</CardBody>
            <CardFooter>
                <div className="flex gap-2 items-end justify-between">
                    <QuantityFoundBadge quantity={collectionInventory.totalPartQuantity} quantityFound={collectionInventory.totalPartQuantityFound} />
                    <Button
                        shape="circle"
                        Icon={FaTrash}
                        disabled={isDeleting}
                        onClick={(e) => {
                            e.preventDefault();
                            addAlert('Are you sure you want to delete this set?', 'warning', () =>
                                deleteCollectionInventory(collectionInventory._id)
                            );
                        }}
                    />
                </div>
            </CardFooter>
        </Card>
    );
};

export default CollectionInventoryCard;
