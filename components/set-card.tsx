import { FC } from 'react';
import Image from 'next/image';
import { Plus, ToyBrick } from 'lucide-react';
import { type Set } from '@/models/set';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface SetCardProps {
  set: Set;
}

export const SetCard: FC<SetCardProps> = ({ set }) => (
  <Card>
    <Image
      src={set.imageUrl}
      alt={set.name}
      width={500}
      height={500}
      className="p-4 w-full aspect-video object-contain"
    />
    <CardHeader>
      <CardTitle>{set.name}</CardTitle>
      <CardDescription>
        {set.theme.name} • {set.year}
      </CardDescription>
    </CardHeader>
    <CardFooter className="items-end justify-between">
      <Badge className="items-center gap-1" variant="secondary">
        <ToyBrick size={16} />
        {set.partCount} parts
      </Badge>
      <Drawer>
        <DrawerTrigger>
          <Button size="icon">
            <Plus size={20} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add to your collection</DrawerTitle>
            <DrawerDescription>
              Do you want to add this set to your collection?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Yes</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </CardFooter>
  </Card>
);
