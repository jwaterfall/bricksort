import { FC } from 'react';
import Image from 'next/image';
import { Plus, ToyBrick } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardFigure, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Set } from '../models/Set';
import useCreateCollectionInventory from '../mutations/useCreateCollectionInventory';

interface SetCardProps {
  set: Set;
}

const SetCard: FC<SetCardProps> = ({ set }) => {
  const { mutate: createCollectionInventory, isLoading: isCreating } = useCreateCollectionInventory();
  const displayId = set._id.endsWith('-1') ? set._id.slice(0, -2) : set._id;

  return (
    <Card>
      {set.imageUrl && (
        <CardFigure>
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
      <CardFooter>
        <Tooltip>
          <TooltipTrigger>
            <Badge>
              <ToyBrick size={14} className="mr-1" />
              {set.partCount}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            {set.partCount} {set.partCount === 1 ? 'Part' : 'Parts'}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="icon" disabled={isCreating} onClick={() => createCollectionInventory(set._id)}>
              <Plus size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add to collection</TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default SetCard;
