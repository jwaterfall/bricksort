'use client';

import { FC } from 'react';
import Image from 'next/image';
import { MdHandyman } from 'react-icons/md';

import { Card, CardBody, CardFooter, CardTitle } from '@/components/display/Card';
import { IconButton } from '@/components/actions/IconButton';
import { Tooltip } from '@/components/display/Tooltip';
import { ExtendedSet } from '@/data/getSets';

interface SetCardProps {
  set: ExtendedSet;
}

export const SetCard: FC<SetCardProps> = ({ set }) => (
  <Card width="w-full">
    <figure className="w-full aspect-video bg-zinc-50 overflow-hidden p-4">
      <Image src={set.imageUrl} alt={set.name} width={400} height={400} className="h-full w-full object-contain mix-blend-multiply" />
    </figure>
    <CardBody>
      <CardTitle truncate>{set.name}</CardTitle>
      {set.theme.name}
    </CardBody>
    <CardFooter>
      <Tooltip text="Add to collection">
        <IconButton variant="tonal" icon={MdHandyman} />
      </Tooltip>
    </CardFooter>
  </Card>
);
