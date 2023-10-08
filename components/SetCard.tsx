import { FC } from 'react';
import Image from 'next/image';
import { HiOutlinePlus } from 'react-icons/hi';

import { Button } from '@/components/ui/button';
import { Card, CardFigure, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      <CardFooter>
        <Badge>{`${set.partCount > 1 ? `${set.partCount} Pieces` : '1 Piece'}`}</Badge>
        <Button variant="outline" size="icon" disabled={isCreating} onClick={() => createCollectionInventory(set._id)}>
          <HiOutlinePlus size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SetCard;
