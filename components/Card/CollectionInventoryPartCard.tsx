import { FC } from "react";

import Card from ".";
import { ExtendedCollectionInventoryPart } from "../../models/CollectionInventoryPart";

interface CollectionInventoryPartCardProps {
    collectionInventoryPart: ExtendedCollectionInventoryPart;
}

const CollectionInventoryPartCard: FC<CollectionInventoryPartCardProps> = ({ collectionInventoryPart }) => {
    const inventoryPart = collectionInventoryPart.inventoryPart;
    const part = inventoryPart.part;
    const color = inventoryPart.color;

    return (
        <Card
            title={part.name}
            body={`${color.name} • ${collectionInventoryPart.quantityFound} of ${collectionInventoryPart.quantity} found`}
            imgSrc={inventoryPart.imageUrl}
            imgAlt={part.name}
        />
    );
};

export default CollectionInventoryPartCard;
