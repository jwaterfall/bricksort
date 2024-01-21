'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash, ToyBrick } from 'lucide-react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { CollectionInventory } from '@/models/CollectionInventory';
import useDeleteCollectionInventory from '@/mutations/useDeleteCollectionInventory';

interface CollectionInventoryCardProps {
  collectionInventory: CollectionInventory;
}

function CollectionInventoryCard({
  collectionInventory,
}: CollectionInventoryCardProps) {
  const { mutate: deleteCollectionInventory } = useDeleteCollectionInventory();
  const set = collectionInventory.inventory.set;

  return (
    <Card className="flex flex-col">
      <Link href={`/collection/${collectionInventory._id}`}>
        <Image
          src={set.imageUrl}
          alt={set.name}
          width={320}
          height={180}
          className="aspect-video object-contain p-4 w-full"
        />
      </Link>
      <CardHeader className="flex-1">
        <CardDescription>
          #{set._id.split('-')[0]} • {set.theme.name} • {set.year}
        </CardDescription>
        <Link href={`/collection/${collectionInventory._id}`}>
          <CardTitle className="line-clamp-2 hover:underline">
            {set.name}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardFooter className="gap-2 items-end">
        <Tooltip>
          <TooltipTrigger className="mr-auto">
            <Badge>
              <ToyBrick size={14} strokeWidth={2} className="mr-0.5" />
              {collectionInventory.partQuantityFound} /{' '}
              {collectionInventory.partQuantity}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {collectionInventory.partQuantityFound} parts found out of{' '}
              {collectionInventory.partQuantity}
            </p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                toast('Are you sure?', {
                  description: 'This will remove the set from your collection.',
                  action: {
                    label: 'Yes',
                    onClick: () =>
                      deleteCollectionInventory(collectionInventory._id),
                  },
                })
              }
            >
              <Trash size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove from collection</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export { CollectionInventoryCard };
