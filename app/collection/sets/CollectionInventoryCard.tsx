'use client';

import { FC } from 'react';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';

import { Card, CardBody } from '@/components/display/Card';
import { IconButton } from '@/components/actions/IconButton';
import { Tooltip } from '@/components/display/Tooltip';
import { List } from '@/components/display/List';
import { CollectionInventory } from '@/models/CollectionInventory';

interface CollectionInventoryCardProps {
    collectioninventory: CollectionInventory;
}

export const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectioninventory }) => {
    const set = collectioninventory.inventory.set;

    return (
        <Card width="w-full">
            <figure className="w-full aspect-video bg-zinc-50 overflow-hidden p-4">
                <Image src={set.imageUrl} alt={set.name} width={200} height={200} className="h-full w-full object-contain mix-blend-multiply" />
            </figure>
            <CardBody>
                <List
                    title={set.name}
                    subtitle={set.theme.name}
                    body={`#${set.id.replace(/-\d*/g, '')}`}
                    padding="p-0"
                    rightElement={
                        <Tooltip text="Remove from collection">
                            <IconButton variant="tonal" icon={MdDelete} />
                        </Tooltip>
                    }
                />
            </CardBody>
        </Card>
    );
};
