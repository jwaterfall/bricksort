import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { Types } from 'mongoose';

import connectToDatabase from '../../../../../middleware/connectToDatabase';
import InventoryModel from '../../../../../models/Inventory';
import InventoryPartModel from '../../../../../models/InventoryPart';
import InventoryMinifigModel from '../../../../../models/InventoryMinifig';
import CollectionInventoryModel from '../../../../../models/CollectionInventory';
import CollectionInventoryPartModel from '../../../../../models/CollectionInventoryPart';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = (await getSession(req, res)) as Session;

    switch (req.method) {
        case 'POST':
            try {
                const setId = req.query.id;

                const inventory = await InventoryModel.findOne({ set: setId });

                if (!inventory) {
                    res.status(404).end(`Inventory for set ${setId} not found`);
                    return;
                }

                const inventoryParts = await InventoryPartModel.find({ inventory: inventory._id, isSpare: false });
                const inventoryMinifigs = await InventoryMinifigModel.find({ inventory: inventory._id });
                const minifigInventories = await InventoryModel.find({
                    set: { $in: inventoryMinifigs.map((inventoryMinifig) => inventoryMinifig.minifig) },
                });
                const minifigInventoryParts = await InventoryPartModel.find({
                    inventory: { $in: minifigInventories.map((minifigInventory) => minifigInventory._id) },
                });

                const deduplicatedMinifigInventoryParts = new Map<string, any>();

                inventoryMinifigs.forEach((inventoryMinifig) => {
                    const minifigInventory = minifigInventories.find((minifigInventory) => minifigInventory.set === inventoryMinifig.minifig);

                    if (!minifigInventory) return;

                    const currentMinifigInventoryParts = minifigInventoryParts.filter(
                        (minifigInventoryPart) => minifigInventoryPart.inventory === minifigInventory._id
                    );

                    currentMinifigInventoryParts.forEach((minifigInventoryPart) => {
                        minifigInventoryPart.quantity *= inventoryMinifig.quantity;

                        const key = `${minifigInventoryPart.part}-${minifigInventoryPart.color}`;

                        if (deduplicatedMinifigInventoryParts.has(key)) {
                            deduplicatedMinifigInventoryParts.get(key).quantity += minifigInventoryPart.quantity;
                        } else {
                            deduplicatedMinifigInventoryParts.set(key, minifigInventoryPart);
                        }
                    });
                });

                const collectionInventoryId = new Types.ObjectId();

                const collectionInventoryParts = inventoryParts.map((inventoryPart) => ({
                    user: user.sub,
                    collectionInventory: collectionInventoryId,
                    inventoryPart: inventoryPart._id,
                    quantity: inventoryPart.quantity,
                }));

                collectionInventoryParts.push(
                    ...Array.from(deduplicatedMinifigInventoryParts.values()).map((minifigInventoryPart) => ({
                        user: user.sub,
                        collectionInventory: collectionInventoryId,
                        inventoryPart: minifigInventoryPart._id,
                        quantity: minifigInventoryPart.quantity,
                    }))
                );

                const totalPartQuantity = collectionInventoryParts.reduce((total, collectionInventoryPart) => {
                    return total + collectionInventoryPart.quantity;
                }, 0);

                const collectionInventory = new CollectionInventoryModel({
                    _id: collectionInventoryId,
                    user: user.sub,
                    inventory: inventory._id,
                    totalPartQuantity,
                });

                await CollectionInventoryPartModel.insertMany(collectionInventoryParts);
                await collectionInventory.save();

                res.status(200).json(collectionInventory);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: (error as Error).message });
            }

            break;
        case 'DELETE':
            try {
                const collectionInventoryId = req.query.id;

                await CollectionInventoryPartModel.deleteMany({ collectionInventory: collectionInventoryId });
                const collectionInventory = await CollectionInventoryModel.findByIdAndDelete(collectionInventoryId);

                res.status(200).json(collectionInventory);
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }

            break;
        default:
            res.setHeader('Allow', ['POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));
