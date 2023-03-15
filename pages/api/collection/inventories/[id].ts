import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession, Session } from "@auth0/nextjs-auth0";

import connectToDatabase from "../../../../middleware/connectToDatabase";
import InventoryModel from "../../../../models/Inventory";
import InventoryPartModel from "../../../../models/InventoryPart";
import InventoryMinifigModel from "../../../../models/InventoryMinifig";
import InventorySetModel from "../../../../models/InventorySet";
import CollectionInventoryModel from "../../../../models/CollectionInventory";
import CollectionInventoryPartModel from "../../../../models/CollectionInventoryPart";
import CollectionInventoryMinifigModel from "../../../../models/CollectionInventoryMinifig";
import CollectionInventorySetModel from "../../../../models/CollectionInventorySet";

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
                const inventorySets = await InventorySetModel.find({ inventory: inventory._id });

                const collectionInventory = new CollectionInventoryModel({
                    user: user.sub,
                    inventory: inventory._id,
                });

                const collectionInventoryParts = inventoryParts.map((inventoryPart) => ({
                    user: user.sub,
                    collectionInventory: collectionInventory._id,
                    inventoryPart: inventoryPart._id,
                    quantityFound: 0,
                }));

                const collectionInventoryMinifigs = inventoryMinifigs.map((inventoryMinifig) => ({
                    user: user.sub,
                    collectionInventory: collectionInventory._id,
                    inventoryMinifig: inventoryMinifig._id,
                    quantityFound: 0,
                }));

                const collectionInventorySets = inventorySets.map((inventorySet) => ({
                    user: user.sub,
                    collectionInventory: collectionInventory._id,
                    inventorySet: inventorySet._id,
                    quantityFound: 0,
                }));

                await CollectionInventoryPartModel.insertMany(collectionInventoryParts);
                await CollectionInventoryMinifigModel.insertMany(collectionInventoryMinifigs);
                await CollectionInventorySetModel.insertMany(collectionInventorySets);
                await collectionInventory.save();

                res.status(200).json(collectionInventory);
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }

            break;
        case "DELETE":
            try {
                const collectionInventoryId = req.query.id;

                await CollectionInventoryPartModel.deleteMany({ collectionInventory: collectionInventoryId });
                await CollectionInventoryMinifigModel.deleteMany({ collectionInventory: collectionInventoryId });
                await CollectionInventorySetModel.deleteMany({ collectionInventory: collectionInventoryId });
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
