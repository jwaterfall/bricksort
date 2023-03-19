import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession, Session } from "@auth0/nextjs-auth0";

import connectToDatabase from "../../../../../middleware/connectToDatabase";
import InventoryModel from "../../../../../models/Inventory";
import InventoryPartModel, { InventoryPart } from "../../../../../models/InventoryPart";
import InventoryMinifigModel from "../../../../../models/InventoryMinifig";
import CollectionInventoryModel from "../../../../../models/CollectionInventory";
import CollectionInventoryPartModel from "../../../../../models/CollectionInventoryPart";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = (await getSession(req, res)) as Session;

    switch (req.method) {
        case "POST":
            try {
                const setId = req.query.id;

                const inventory = await InventoryModel.findOne({ set: setId });

                if (!inventory) {
                    res.status(404).end(`Inventory for set ${setId} not found`);
                    return;
                }

                const inventoryParts = await InventoryPartModel.find({ inventory: inventory._id });
                const inventoryMinifigs = await InventoryMinifigModel.find({ inventory: inventory._id });
                const allMinifigInventories = await InventoryModel.find({
                    set: { $in: inventoryMinifigs.map((inventoryMinifig) => inventoryMinifig.minifig) },
                });
                const allMinifigInventoryParts = await InventoryPartModel.find({
                    inventory: { $in: allMinifigInventories.map((minifigInventory) => minifigInventory._id) },
                });

                inventoryMinifigs.forEach((inventoryMinifig) => {
                    const minifigInventory = allMinifigInventories.find((minifigInventory) => minifigInventory.set === inventoryMinifig.minifig);

                    if (!minifigInventory) return;

                    const minifigInventoryParts = allMinifigInventoryParts.filter(
                        (minifigInventoryPart) => minifigInventoryPart.inventory === minifigInventory._id
                    );

                    minifigInventoryParts.forEach((minifigInventoryPart) => {
                        minifigInventoryPart.quantity *= inventoryMinifig.quantity;
                        inventoryParts.push(minifigInventoryPart);
                    });
                });

                const collectionInventory = new CollectionInventoryModel({
                    user: user.sub,
                    inventory: inventory._id,
                });

                const deduplicatedInventoryParts = new Map<string, any>();

                inventoryParts.forEach((inventoryPart) => {
                    const key = `${inventoryPart.part}-${inventoryPart.color}`;

                    if (deduplicatedInventoryParts.has(key)) {
                        deduplicatedInventoryParts.get(key).quantity += inventoryPart.quantity;
                    } else {
                        deduplicatedInventoryParts.set(key, inventoryPart);
                    }
                });

                const collectionInventoryParts = Array.from(deduplicatedInventoryParts.values()).map((inventoryPart) => ({
                    user: user.sub,
                    collectionInventory: collectionInventory._id,
                    inventoryPart: inventoryPart._id,
                    quantity: inventoryPart.quantity,
                    quantityFound: 0,
                }));

                await CollectionInventoryPartModel.insertMany(collectionInventoryParts);
                await collectionInventory.save();

                res.status(200).json(collectionInventory);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: (error as Error).message });
            }

            break;
        case "DELETE":
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
            res.setHeader("Allow", ["POST", "DELETE"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));
