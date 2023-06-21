'use client';

import { FC } from 'react';
import Image from 'next/image';
import { MdHandyman } from 'react-icons/md';

import { ExtendedSet } from '@/utils/data/sets';
import { Card, CardBody } from '@/components/display/Card';
import { IconButton } from '@/components/actions/IconButton';
import { Tooltip } from '@/components/display/Tooltip';
import { List } from '@/components/display/List';

interface SetCardProps {
    set: ExtendedSet;
}

export const SetCard: FC<SetCardProps> = ({ set }) => (
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
                    <Tooltip text="Add to collection">
                        <IconButton variant="tonal" icon={MdHandyman} />
                    </Tooltip>
                }
            />
        </CardBody>
    </Card>
);
