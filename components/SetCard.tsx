import { FC } from 'react';
import { FaHammer } from 'react-icons/fa';

import useCreateCollectionInventory from '../mutations/useCreateCollectionInventory';
import { ExtendedSet } from '../models/Set';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import Badge from './Badge';
import Button from './Button';

interface SetCardProps {
    set: ExtendedSet;
}

const SetCard: FC<SetCardProps> = ({ set }) => {
    const { mutate: createCollectionInventory, isLoading: isCreating } = useCreateCollectionInventory();
    const displayId = set._id.endsWith('-1') ? set._id.slice(0, -2) : set._id;

    return (
        <Card>
            {set.imageUrl && <CardImage src={set.imageUrl} alt={set.name} />}
            <CardTitle>{set.name}</CardTitle>
            <CardBody>{`${set.theme.name} • ${set.year} • ${displayId}`}</CardBody>

            <CardFooter>
                <div className="flex gap-2 items-end justify-between">
                    <Badge>{`${set.partCount > 1 ? `${set.partCount} Pieces` : '1 Piece'}`}</Badge>
                    <Button shape="circle" color="primary" Icon={FaHammer} disabled={isCreating} onClick={() => createCollectionInventory(set._id)} />
                </div>
            </CardFooter>
        </Card>
    );
};

export default SetCard;
