import { FC, useState } from 'react';
import Image from 'next/image';

import { Card, CardFigure, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { CollectionInventoryPart } from '../models/CollectionInventoryPart';
import useAddCollectionInventoryPart from '../mutations/useAddCollectionInventoryPart';
import Input from './Input';
import QuantityFoundTag from './QuantityFoundTag';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

interface CollectionInventoryPartCardProps {
  collectionInventoryPart: CollectionInventoryPart;
}

const CollectionInventoryPartCard: FC<CollectionInventoryPartCardProps> = ({ collectionInventoryPart }) => {
  const { mutate: addCollectionInventoryPart, isLoading } = useAddCollectionInventoryPart(collectionInventoryPart);
  const [quantity, setQuantity] = useState(1);

  const inventoryPart = collectionInventoryPart.inventoryPart;
  const part = inventoryPart.part;
  const color = inventoryPart.color;

  return (
    <Dialog>
      <DialogTrigger>
        <Card>
          {inventoryPart.imageUrl && (
            <CardFigure className="bg-white">
              <Image
                src={inventoryPart.imageUrl}
                alt={part.name}
                width={300}
                height={300}
                className="object-contain w-full aspect-video mix-blend-multiply"
                priority={true}
              />
            </CardFigure>
          )}
          <CardHeader>
            <CardTitle>{part.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-sm border border-zinc-300" style={{ backgroundColor: color.hex }} />
              {color.name}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <QuantityFoundTag quantityFound={collectionInventoryPart.quantityFound} quantity={collectionInventoryPart.quantity} />
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent>
        {/* {inventoryPart.imageUrl && <CardImage src={inventoryPart.imageUrl} alt={part.name} />} */}
        <DialogHeader>
          <DialogTitle>{part.name}</DialogTitle>
          <DialogDescription>{color.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <QuantityFoundTag quantityFound={collectionInventoryPart.quantityFound} quantity={collectionInventoryPart.quantity} />
          <Input label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              disabled={collectionInventoryPart.quantityFound + quantity > collectionInventoryPart.quantity || isLoading}
              onClick={() => {
                addCollectionInventoryPart(quantity);
                setQuantity(1);
              }}
            >
              Add
            </Button>
            <Button
              disabled={collectionInventoryPart.quantityFound <= 0}
              onClick={() => {
                addCollectionInventoryPart(-quantity);
                setQuantity(1);
              }}
            >
              Remove
            </Button>
          </div>
          <Button
            disabled={collectionInventoryPart.quantityFound >= collectionInventoryPart.quantity || isLoading}
            onClick={() => addCollectionInventoryPart(collectionInventoryPart.quantity - collectionInventoryPart.quantityFound)}
          >
            Found All
          </Button>
        </div>
        {/* <DialogFooter>
          <Button>Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default CollectionInventoryPartCard;
