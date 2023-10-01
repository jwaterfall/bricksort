import { FC } from 'react';
import Image from 'next/image';
import { MdHandyman } from 'react-icons/md';

import { Card, CardBody } from '@/components/containment/Card';
import { IconButton } from '@/components/actions/IconButton';
import { Tooltip } from '@/components/containment/Tooltip';
import { List } from '@/components/containment/List';
import { Set } from '@/models/Set';
import { createCollectionInventory } from './actions';

interface SetCardProps {
  set: Set;
}

export const SetCard: FC<SetCardProps> = ({ set }) => (
  <Card className="w-full">
    <figure className="w-full aspect-video bg-zinc-50 overflow-hidden p-4">
      <Image src={set.imageUrl} alt={set.name} width={200} height={200} className="h-full w-full object-contain mix-blend-multiply" />
    </figure>
    <CardBody>
      <List
        title={set.name}
        body={`#${set.id.replace(/-\d*/g, '')} • ${set.theme.name}`}
        className="p-0"
        rightElement={
          <Tooltip text="Add to collection">
            <form action={() => createCollectionInventory({ setId: set._id, user: 'google-oauth2|116727138907129554811' })}>
              <IconButton variant="tonal" icon={MdHandyman} />
            </form>
          </Tooltip>
        }
      />
    </CardBody>
  </Card>
);
