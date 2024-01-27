'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Blocks, BookmarkPlus, ToyBrick } from 'lucide-react';
import { toast } from 'sonner';

import {
  Card,
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
import { Set } from '@/models/Set';
import useCreateCollectionInventory from '@/mutations/useCreateCollectionInventory';

interface SetCardProps {
  set: Set;
}

function SetCard({ set }: SetCardProps) {
  const { mutate: createCollectionInventory } = useCreateCollectionInventory();

  return (
    <Card className="flex flex-col">
      <Link href={`/sets/${set._id}`}>
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
        <Link href={`/sets/${set._id}`}>
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
              {set.partCount}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{set.partCount} pieces</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => createCollectionInventory(set._id)}
            >
              <Blocks size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to collection</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                toast('Added to wishlist', {
                  description: 'You can view your wishlist in your profile',
                })
              }
            >
              <BookmarkPlus size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to wishlist</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}

export { SetCard };
