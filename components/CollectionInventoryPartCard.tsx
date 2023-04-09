import { FC, useState } from 'react';

import { ExtendedCollectionInventoryPart } from '../models/CollectionInventoryPart';
import useAddCollectionInventoryPart from '../mutations/useAddCollectionInventoryPart';
import Card, { CardBody, CardFooter, CardImage, CardTitle } from './Card';
import Badge from './Badge';

interface CollectionInventoryPartCardProps {
    collectionInventoryPart: ExtendedCollectionInventoryPart;
}

const CollectionInventoryPartCard: FC<CollectionInventoryPartCardProps> = ({ collectionInventoryPart }) => {
    const { mutate: addCollectionInventoryPart, isLoading } = useAddCollectionInventoryPart(collectionInventoryPart);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const inventoryPart = collectionInventoryPart.inventoryPart;
    const part = inventoryPart.part;
    const color = inventoryPart.color;

    const getBadgeVariant = () => {
        if (collectionInventoryPart.quantityFound === collectionInventoryPart.quantity) {
            return 'success';
        } else if (collectionInventoryPart.quantityFound === 0) {
            return 'error';
        } else {
            return 'warning';
        }
    };

    return (
        <>
            <Card onClick={() => setIsModalOpen(true)}>
                {inventoryPart.imageUrl && <CardImage src={inventoryPart.imageUrl} alt={part.name} />}
                <CardTitle>{part.name}</CardTitle>
                <CardBody>{color.name}</CardBody>
                <CardFooter>
                    <Badge
                        variant={getBadgeVariant()}
                    >{`${collectionInventoryPart.quantityFound} of ${collectionInventoryPart.quantity} Found`}</Badge>
                </CardFooter>
            </Card>
            {/* <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{part.name}</h3>
                    <p className="py-4">{`${color.name} • ${collectionInventoryPart.quantityFound} of ${collectionInventoryPart.quantity} found`}</p>
                    {inventoryPart.imageUrl && (
                        <figure>
                            <Image
                                src={inventoryPart.imageUrl}
                                alt={part.name}
                                width={300}
                                height={300}
                                className="p-4 object-contain w-full aspect-video mix-blend-multiply"
                                priority={true}
                            />
                        </figure>
                    )}
                    <div className="max-w-full flex flex-col gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity to add or remove</span>
                            </label>
                            <input
                                className="input input-bordered"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                className="btn"
                                disabled={collectionInventoryPart.quantityFound + quantity > collectionInventoryPart.quantity}
                                onClick={() => {
                                    addCollectionInventoryPart(quantity);
                                    setQuantity(1);
                                    setIsModalOpen(false);
                                }}
                            >
                                add
                            </button>
                            <button
                                className="btn"
                                disabled={collectionInventoryPart.quantityFound <= 0}
                                onClick={() => {
                                    addCollectionInventoryPart(-quantity);
                                    setQuantity(1);
                                    setIsModalOpen(false);
                                }}
                            >
                                remove
                            </button>
                        </div>
                        <button
                            className="btn"
                            disabled={collectionInventoryPart.quantityFound >= collectionInventoryPart.quantity}
                            onClick={() => addCollectionInventoryPart(collectionInventoryPart.quantity - collectionInventoryPart.quantityFound)}
                        >
                            found all
                        </button>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>
                            close
                        </button>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default CollectionInventoryPartCard;
