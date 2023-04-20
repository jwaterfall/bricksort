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

                const inventory = await InventoryModel.findOne({ setId });

                if (!inventory) {
                    res.status(404).end(`Inventory for set ${setId} not found`);
                    return;
                }

                const inventoryParts = await InventoryPartModel.find({ inventoryId: inventory._id, isSpare: false });

                const inventoryMinifigs = await InventoryMinifigModel.find({ inventoryId: inventory._id });
                const minifigInventories = await InventoryModel.find({
                    setId: { $in: inventoryMinifigs.map((inventoryMinifig) => inventoryMinifig.minifigId) },
                });
                const minifigInventoryParts = await InventoryPartModel.find({
                    inventoryId: { $in: minifigInventories.map((minifigInventory) => minifigInventory._id) },
                });

                inventoryMinifigs.forEach((inventoryMinifig) => {
                    const minifigInventory = minifigInventories.find((minifigInventory) => minifigInventory.setId === inventoryMinifig.minifigId);

                    if (!minifigInventory) return;

                    const currentMinifigInventoryParts = minifigInventoryParts.filter(
                        (minifigInventoryPart) => minifigInventoryPart.inventoryId === minifigInventory._id
                    );

                    currentMinifigInventoryParts.forEach((minifigInventoryPart) => {
                        minifigInventoryPart.quantity *= inventoryMinifig.quantity;
                    });

                    inventoryParts.push(...currentMinifigInventoryParts);
                });

                const deduplicatedInventoryParts = new Map<string, any>();

                inventoryParts.forEach((inventoryPart) => {
                    const key = `${inventoryPart.partId}-${inventoryPart.colorId}`;

                    if (deduplicatedInventoryParts.has(key)) {
                        deduplicatedInventoryParts.get(key).quantity += inventoryPart.quantity;
                    } else {
                        deduplicatedInventoryParts.set(key, inventoryPart);
                    }
                });

                const collectionInventoryId = new Types.ObjectId();

                const collectionInventoryParts = Array.from(deduplicatedInventoryParts.values()).map((inventoryPart) => ({
                    user: user.sub,
                    quantity: inventoryPart.quantity,
                    collectionInventoryId,
                    inventoryPartId: inventoryPart._id,
                }));

                const totalPartQuantity = collectionInventoryParts.reduce((total, collectionInventoryPart) => {
                    return total + collectionInventoryPart.quantity;
                }, 0);

                const collectionInventory = new CollectionInventoryModel({
                    _id: collectionInventoryId,
                    user: user.sub,
                    inventoryId: inventory._id,
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
                const collectionInventory = await CollectionInventoryModel.findOneAndDelete({
                    _id: req.query.id,
                    user: user.sub,
                });

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
