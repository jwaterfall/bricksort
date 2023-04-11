import { FC, useState, useRef } from 'react';
import Image from 'next/image';
import { useOnClickOutside } from 'usehooks-ts';

import { ExtendedCollectionInventoryPart } from '../models/CollectionInventoryPart';
import useAddCollectionInventoryPart from '../mutations/useAddCollectionInventoryPart';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import Badge from './Badge';
import Button from './Button';
import Input from './Input';
import QuantityFoundBadge from './QuantityFoundBadge';

interface CollectionInventoryPartCardProps {
    collectionInventoryPart: ExtendedCollectionInventoryPart;
}

const CollectionInventoryPartCard: FC<CollectionInventoryPartCardProps> = ({ collectionInventoryPart }) => {
    const { mutate: addCollectionInventoryPart, isLoading } = useAddCollectionInventoryPart(collectionInventoryPart);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setIsModalOpen(false));

    const inventoryPart = collectionInventoryPart.inventoryPart;
    const part = inventoryPart.part;
    const color = inventoryPart.color;

    return (
        <>
            <Card onClick={() => setIsModalOpen(true)}>
                {inventoryPart.imageUrl && <CardImage src={inventoryPart.imageUrl} alt={part.name} />}
                <CardTitle>{part.name}</CardTitle>
                <CardBody>{color.name}</CardBody>
                <CardFooter>
                    <QuantityFoundBadge quantityFound={collectionInventoryPart.quantityFound} quantity={collectionInventoryPart.quantity} />
                </CardFooter>
            </Card>
            <div
                className={`bg-black/20 transition-opacity fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center p-4 ${
                    isModalOpen ? '' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div ref={ref}>
                    <Card>
                        {inventoryPart.imageUrl && <CardImage src={inventoryPart.imageUrl} alt={part.name} />}
                        <CardTitle>{part.name}</CardTitle>
                        <CardBody>{color.name}</CardBody>
                        <CardFooter>
                            <QuantityFoundBadge quantityFound={collectionInventoryPart.quantityFound} quantity={collectionInventoryPart.quantity} />
                            <Input
                                label="Quantity to add or remove"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />

                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    isFullWidth
                                    color="primary"
                                    disabled={collectionInventoryPart.quantityFound + quantity > collectionInventoryPart.quantity || isLoading}
                                    onClick={() => {
                                        addCollectionInventoryPart(quantity);
                                        setQuantity(1);
                                        setIsModalOpen(false);
                                    }}
                                >
                                    Add
                                </Button>
                                <Button
                                    isFullWidth
                                    color="primary"
                                    disabled={collectionInventoryPart.quantityFound <= 0}
                                    onClick={() => {
                                        addCollectionInventoryPart(-quantity);
                                        setQuantity(1);
                                        setIsModalOpen(false);
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                            <Button
                                isFullWidth
                                disabled={collectionInventoryPart.quantityFound >= collectionInventoryPart.quantity || isLoading}
                                onClick={() => addCollectionInventoryPart(collectionInventoryPart.quantity - collectionInventoryPart.quantityFound)}
                            >
                                Found All
                            </Button>
                            <Button color="primary" onClick={() => setIsModalOpen(false)}>
                                Close
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CollectionInventoryPartCard;
