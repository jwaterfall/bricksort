import { FC, useState, useRef } from 'react';
import Image from 'next/image';
import { useOnClickOutside } from 'usehooks-ts';

import { ExtendedCollectionInventoryPart } from '../models/CollectionInventoryPart';
import useAddCollectionInventoryPart from '../mutations/useAddCollectionInventoryPart';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import Badge from './Badge';
import Button from './Button';
import Input from './Input';

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

    const getBadgeVariant = () => {
        if (collectionInventoryPart.quantityFound === collectionInventoryPart.quantity) {
            return 'success';
        } else if (collectionInventoryPart.quantityFound === 0) {
            return 'error';
        } else {
            return 'warning';
        }
    };

    return (
        <>
            <Card onClick={() => setIsModalOpen(true)}>
                {inventoryPart.imageUrl && <CardImage src={inventoryPart.imageUrl} alt={part.name} />}
                <CardTitle>{part.name}</CardTitle>
                <CardBody>{color.name}</CardBody>
                <CardFooter>
                    <Badge
                        variant={getBadgeVariant()}
                    >{`${collectionInventoryPart.quantityFound} of ${collectionInventoryPart.quantity} Found`}</Badge>
                </CardFooter>
            </Card>
            <div
                className={`bg-black/20 transition-opacity fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center ${
                    isModalOpen ? '' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div ref={ref} className="bg-slate-50 border border-slate-300 rounded-md p-4 max-w-md w-full">
                    <h3 className="font-bold text-lg">{part.name}</h3>
                    <p className="py-4">{`${color.name} • ${collectionInventoryPart.quantityFound} of ${collectionInventoryPart.quantity} found`}</p>
                    {inventoryPart.imageUrl && (
                        <figure>
                            <Image
                                src={inventoryPart.imageUrl}
                                alt={part.name}
                                width={300}
                                height={300}
                                className="p-4 object-contain w-full aspect-video mix-blend-multiply"
                                priority={true}
                            />
                        </figure>
                    )}
                    <div className="max-w-full flex flex-col gap-2">
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
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Button color="primary" onClick={() => setIsModalOpen(false)}>
                            close
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollectionInventoryPartCard;
