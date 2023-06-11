import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

import { CollectionInventory } from '../models/CollectionInventory';
import Card, { CardBody, CardFooter, CardTitle } from './display/Card';
import QuantityFoundBadge from './QuantityFoundBadge';
import Button from './actions/Button';

interface CollectionInventoryCardProps {
  collectionInventory: CollectionInventory;
}

const CollectionInventoryCard: FC<CollectionInventoryCardProps> = ({ collectionInventory }) => {
  const set = collectionInventory.inventory.set;

  return (
    <Link href={`/collection/${collectionInventory._id}`}>
      <Card hoverable>
        {set.imageUrl && (
          <figure className="bg-slate-50">
            <Image src={set.imageUrl} alt={set.name} width={320} height={180} className="aspect-video object-contain mix-blend-multiply" />
          </figure>
        )}
        <CardBody>
          <CardTitle>{set.name}</CardTitle>
          {`${set.theme.name} • ${set.year}`}
          <CardFooter>
            <QuantityFoundBadge quantity={collectionInventory.partQuantity} quantityFound={collectionInventory.partQuantityFound} showPercentage />
            <Button shape="square" color="secondary" Icon={FaTrash} />
          </CardFooter>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CollectionInventoryCard;
