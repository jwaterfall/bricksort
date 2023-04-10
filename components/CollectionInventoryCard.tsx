import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

import useDeleteCollectionInventory from '../mutations/useDeleteCollectionInventory';
import { ExtendedCollectionInventory } from '../models/CollectionInventory';
import { AlertType, useAlerts } from './AlertProvider';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import Badge from './Badge';
import Button from './Button';

interface CollectionInventoryCardProps {
    collectionInventory: ExtendedCollectionInventory;
}

const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectionInventory }) => {
    const { mutate: deleteCollectionInventory, isLoading: isDeleting } = useDeleteCollectionInventory();
    const { addAlert } = useAlerts();

    const set = collectionInventory.inventory.set;
    const percentComplete = (collectionInventory.totalPartQuantityFound / collectionInventory.totalPartQuantity) * 100;

    const getBadgeVariant = () => {
        if (percentComplete === 100) {
            return 'success';
        } else if (percentComplete === 0) {
            return 'error';
        } else {
            return 'warning';
        }
    };

    return (
        <Card href={`/collection/${collectionInventory._id}/missing-parts`}>
            {set.imageUrl && <CardImage src={set.imageUrl} alt={set.name} />}
            <CardTitle>{set.name}</CardTitle>
            <CardBody>{`${set.theme.name} • ${set.year}`}</CardBody>
            <CardFooter>
                <div className="flex gap-2 items-end justify-between">
                    <Badge variant={getBadgeVariant()}>{`${percentComplete.toFixed(2)}% Complete`}</Badge>
                    <Button
                        shape="circle"
                        Icon={FaTrash}
                        disabled={isDeleting}
                        onClick={(e) => {
                            e.preventDefault();
                            addAlert('Are you sure you want to delete this set?', AlertType.Warning, () =>
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
