'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardFigure, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { CollectionInventory } from '../models/CollectionInventory';
import useDeleteCollectionInventory from '../mutations/useDeleteCollectionInventory';
import QuantityFoundTag from './QuantityFoundTag';

interface CollectionInventoryCardProps {
  collectionInventory: CollectionInventory;
}

const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectionInventory }) => {
  const { mutate: deleteCollectionInventory, isLoading: isDeleting } = useDeleteCollectionInventory();

  const set = collectionInventory.inventory.set;
  const displayId = set._id.endsWith('-1') ? set._id.slice(0, -2) : set._id;

  return (
    <Card>
      <Link href={`/collection/${collectionInventory._id}`}>
        {set.imageUrl && (
          <CardFigure className="bg-white">
            <Image
              src={set.imageUrl}
              alt={set.name}
              width={300}
              height={300}
              className="object-contain w-full aspect-video mix-blend-multiply"
              priority={true}
            />
          </CardFigure>
        )}
        <CardHeader>
          <CardTitle>{set.name}</CardTitle>
          <CardDescription>{`#${displayId} • ${set.year}`}</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter>
        <QuantityFoundTag quantity={collectionInventory.partQuantity} quantityFound={collectionInventory.partQuantityFound} showPercentage />
        <AlertDialog>
          <AlertDialogTrigger asChild disabled={isDeleting}>
            <Button variant="outline" size="icon">
              <Trash size={18} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete the inventory for this set.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteCollectionInventory(collectionInventory._id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default CollectionInventoryCard;
