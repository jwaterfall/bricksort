import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { Types } from 'mongoose';

import connectToDatabase from '../../../../../middleware/connectToDatabase';
import InventoryModel from '../../../../../models/Inventory';
import InventoryPartModel, { InventoryPart } from '../../../../../models/InventoryPart';
import InventoryMinifigModel from '../../../../../models/InventoryMinifig';
import CollectionInventoryModel from '../../../../../models/CollectionInventory';
import CollectionInventoryPartModel from '../../../../../models/CollectionInventoryPart';

async function getInventoryMinifigInventoryParts(inventoryId: string) {
    const inventoryMinifigs = await InventoryMinifigModel.find({ inventoryId });

    const inventories = await InventoryModel.find({
        setId: { $in: inventoryMinifigs.map((inventoryMinifig) => inventoryMinifig.minifigId) },
    });

    const inventoryParts = await InventoryPartModel.find({
        inventoryId: { $in: inventories.map((inventory) => inventory._id) },
    });

    return inventoryMinifigs.flatMap((inventoryMinifig) => {
        const inventory = inventories.find((inventory) => inventory.setId === inventoryMinifig.minifigId);

        if (!inventory) return [];

        const currentInventoryParts = inventoryParts.filter((inventoryPart) => inventoryPart.inventoryId === inventory._id);

        currentInventoryParts.forEach((inventoryPart) => {
            inventoryPart.quantity *= inventoryMinifig.quantity;
        });

        return currentInventoryParts;
    });
}

function deduplicateInventoryParts(inventoryParts: InventoryPart[]) {
    const deduplicatedInventoryParts = new Map<string, InventoryPart>();

    inventoryParts.forEach((inventoryPart) => {
        const key = inventoryPart.partId + inventoryPart.colorId + inventoryPart.isSpare;

        if (deduplicatedInventoryParts.has(key)) {
            deduplicatedInventoryParts.get(key)!.quantity += inventoryPart.quantity;
        } else {
            deduplicatedInventoryParts.set(key, inventoryPart);
        }
    });

    return Array.from(deduplicatedInventoryParts.values());
}

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

                const inventoryParts = await InventoryPartModel.find({ inventoryId: inventory._id });
                const minifigInventoryParts = await getInventoryMinifigInventoryParts(inventory._id);

                const deduplicatedInventoryParts = deduplicateInventoryParts([...inventoryParts, ...minifigInventoryParts]);

                const collectionInventoryId = new Types.ObjectId();

                const partQuantity = deduplicatedInventoryParts.reduce((total, inventoryPart) => {
                    if (inventoryPart.isSpare) return total;
                    return total + inventoryPart.quantity;
                }, 0);

                const sparePartQuantity = deduplicatedInventoryParts.reduce((total, inventoryPart) => {
                    if (!inventoryPart.isSpare) return total;
                    return total + inventoryPart.quantity;
                }, 0);

                const collectionInventoryParts = deduplicatedInventoryParts.map((inventoryPart) => ({
                    user: user.sub,
                    collectionInventoryId,
                    inventoryPartId: inventoryPart._id,
                    quantity: inventoryPart.quantity,
                }));

                const collectionInventory = new CollectionInventoryModel({
                    _id: collectionInventoryId,
                    user: user.sub,
                    inventoryId: inventory._id,
                    partQuantity,
                    sparePartQuantity,
                });

                await collectionInventory.save();
                await CollectionInventoryPartModel.insertMany(collectionInventoryParts);

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
                console.error(error);
                res.status(500).json({ error: (error as Error).message });
            }

            break;
        default:
            res.setHeader('Allow', ['POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));