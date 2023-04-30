import { FC } from 'react';
import { FaHammer } from 'react-icons/fa';

import { Set } from '../models/Set';
import useCreateCollectionInventory from '../mutations/useCreateCollectionInventory';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import Badge from './display/Badge';
import Button from './actions/Button';

interface SetCardProps {
    set: Set;
}

const SetCard: FC<SetCardProps> = ({ set }) => {
    const { mutate: createCollectionInventory, isLoading: isCreating } = useCreateCollectionInventory();
    const displayId = set._id.endsWith('-1') ? set._id.slice(0, -2) : set._id;

    return (
        <Card>
            {set.imageUrl && <CardImage src={set.imageUrl} alt={set.name} />}
            <CardBody>
                {displayId} • {set.year}
            </CardBody>
            <CardTitle>{set.name}</CardTitle>
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
