import { FC, useState } from 'react';

import { CollectionInventoryPart } from '../models/CollectionInventoryPart';
import useAddCollectionInventoryPart from '../mutations/useAddCollectionInventoryPart';
import Card, { CardBody, CardFooter, CardImage } from './display/Card';
import Button from './actions/Button';
import Input from './Input';
import QuantityFoundBadge from './QuantityFoundBadge';
import Modal, { ModalBody, ModalContent, ModalFooter, ModalTitle, ModalTrigger } from './actions/Modal';

interface CollectionInventoryPartCardProps {
  collectionInventoryPart: CollectionInventoryPart;
}

const CollectionInventoryPartCard: FC<CollectionInventoryPartCardProps> = ({ collectionInventoryPart }) => {
  const { mutate: addCollectionInventoryPart, isLoading } = useAddCollectionInventoryPart(collectionInventoryPart);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inventoryPart = collectionInventoryPart.inventoryPart;
  const part = inventoryPart.part;
  const color = inventoryPart.color;

  return (
    <Modal open={isModalOpen} onOpenChange={(isOpen) => setIsModalOpen(isOpen)}>
      <ModalTrigger>
        <Card>
          {inventoryPart.imageUrl && <CardImage src={inventoryPart.imageUrl} alt={part.name} />}
          <CardBody>
            <div className="flex items-center gap-1 text-sm font-medium ">
              <div className="w-5 h-5 rounded-sm border border-zinc-300" style={{ backgroundColor: color.hex }} />
              {color.name}
            </div>
          </CardBody>
          <CardFooter>
            <QuantityFoundBadge quantityFound={collectionInventoryPart.quantityFound} quantity={collectionInventoryPart.quantity} />
          </CardFooter>
        </Card>
      </ModalTrigger>
      <ModalContent>
        {inventoryPart.imageUrl && <CardImage src={inventoryPart.imageUrl} alt={part.name} />}
        <ModalTitle>{part.name}</ModalTitle>
        <ModalBody>{color.name}</ModalBody>
        <div className="flex flex-col gap-2">
          <QuantityFoundBadge quantityFound={collectionInventoryPart.quantityFound} quantity={collectionInventoryPart.quantity} />
          <Input label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        </div>
        <div className="flex flex-col gap-2">
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
        </div>
        <ModalFooter>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CollectionInventoryPartCard;
