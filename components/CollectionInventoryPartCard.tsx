import { FC, useState } from 'react';

import { ExtendedCollectionInventoryPart } from '../models/CollectionInventoryPart';
import useAddCollectionInventoryPart from '../mutations/useAddCollectionInventoryPart';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import Button from './actions/Button';
import Input from './Input';
import QuantityFoundBadge from './QuantityFoundBadge';
import Modal, { ModalBody, ModalFooter, ModalTitle } from './actions/Modal';
import Image from 'next/image';

interface CollectionInventoryPartCardProps {
    collectionInventoryPart: ExtendedCollectionInventoryPart;
}

const CollectionInventoryPartCard: FC<CollectionInventoryPartCardProps> = ({ collectionInventoryPart }) => {
    const { mutate: addCollectionInventoryPart, isLoading } = useAddCollectionInventoryPart(collectionInventoryPart);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                {inventoryPart.imageUrl && (
                    <figure className="mb-4 p-4 mx-auto">
                        <Image
                            src={inventoryPart.imageUrl}
                            alt={part.name}
                            width={300}
                            height={300}
                            className="object-contain w-full h-24 mix-blend-multiply"
                            priority={true}
                        />
                    </figure>
                )}
                <ModalTitle>{part.name}</ModalTitle>
                <ModalBody>{color.name}</ModalBody>
                <QuantityFoundBadge quantityFound={collectionInventoryPart.quantityFound} quantity={collectionInventoryPart.quantity} />
                <Input label="Quantity to add or remove" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />

                <div className="grid grid-cols-2 gap-2 mt-4">
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

                <ModalFooter>
                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default CollectionInventoryPartCard;
