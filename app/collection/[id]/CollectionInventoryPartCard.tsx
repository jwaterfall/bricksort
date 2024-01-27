'use client';

import { FormEvent } from 'react';
import Image from 'next/image';
import { ToyBrick } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CollectionInventoryPart } from '@/models/CollectionInventoryPart';
import useAddCollectionInventoryPart from '@/mutations/useAddCollectionInventoryPart';

interface CollectionInventoryPartCardProps {
  collectionInventoryPart: CollectionInventoryPart;
}

function CollectionInventoryPartCard({
  collectionInventoryPart,
}: CollectionInventoryPartCardProps) {
  const { mutate: addCollectionInventoryPart, isLoading } =
    useAddCollectionInventoryPart(collectionInventoryPart);
  const { inventoryPart } = collectionInventoryPart;
  const { part } = inventoryPart;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    console.log('onSubmit');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const count = parseInt(formData.get('quantity') as string, 10);
    addCollectionInventoryPart(count);
  }

  return (
    <Card className="flex flex-col">
      {inventoryPart.imageUrl && (
        <Image
          src={inventoryPart.imageUrl}
          alt={part.name}
          width={320}
          height={180}
          className="aspect-video object-contain p-4 w-full"
        />
      )}
      <CardHeader className="flex-1">
        <CardDescription className="flex items-center gap-1">
          <div
            style={{ background: inventoryPart.color.hex }}
            className="w-4 h-4 rounded-md"
          />
          {inventoryPart.color.name} • {inventoryPart.quantity}
        </CardDescription>
        <CardTitle className="line-clamp-2">{part.name}</CardTitle>
      </CardHeader>
      <CardFooter className="gap-2 items-end justify-between">
        <Tooltip>
          <TooltipTrigger className="mr-auto">
            <Badge>
              <ToyBrick size={14} strokeWidth={2} className="mr-0.5" />
              {collectionInventoryPart.quantityFound} of{' '}
              {collectionInventoryPart.quantity}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {collectionInventoryPart.quantityFound} parts found out of{' '}
              {collectionInventoryPart.quantity}
            </p>
          </TooltipContent>
        </Tooltip>
        <Dialog>
          <DialogTrigger>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon">
                  <ToyBrick size={24} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add or remove parts</p>
              </TooltipContent>
            </Tooltip>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={onSubmit} className='grid gap-4'>
              <DialogHeader>
                <DialogTitle>Add or remove parts</DialogTitle>
                <DialogDescription>
                  {collectionInventoryPart.quantityFound} parts found out of{' '}
                  {collectionInventoryPart.quantity}
                </DialogDescription>
              </DialogHeader>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                name="quantity"
                min={0 - collectionInventoryPart.quantityFound}
                max={
                  collectionInventoryPart.quantity -
                  collectionInventoryPart.quantityFound
                }
                defaultValue={collectionInventoryPart.quantity}
              />
              <DialogFooter>
                <Button variant="secondary" onClick={() => addCollectionInventoryPart(collectionInventoryPart.quantity - collectionInventoryPart.quantityFound)} disabled={isLoading}>
                  Found all
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export { CollectionInventoryPartCard };
