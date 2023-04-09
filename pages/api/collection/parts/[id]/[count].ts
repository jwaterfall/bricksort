import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';

import connectToDatabase from '../../../../../middleware/connectToDatabase';
import CollectionInventoryModel from '../../../../../models/CollectionInventory';
import CollectionInventoryPartModel from '../../../../../models/CollectionInventoryPart';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = (await getSession(req, res)) as Session;

    switch (req.method) {
        case 'POST':
            try {
                const id = req.query.id;
                const count = parseInt(req.query.count as string);

                const collectionInventoryPart = await CollectionInventoryPartModel.findOne({
                    user: user.sub,
                    _id: id,
                });

                if (!collectionInventoryPart) {
                    res.status(404).end(`Collection inventory part ${id} not found`);
                    return;
                }

                const collectionInventory = await CollectionInventoryModel.findOne({
                    user: user.sub,
                    _id: collectionInventoryPart.collectionInventory,
                });

                if (!collectionInventory) {
                    res.status(404).end(`Collection inventory ${collectionInventoryPart.collectionInventory} not found`);
                    return;
                }

                const clampedCount = Math.max(
                    -collectionInventoryPart.quantityFound,
                    Math.min(count, collectionInventoryPart.quantity - collectionInventoryPart.quantityFound)
                );

                collectionInventoryPart.quantityFound += clampedCount;
                await collectionInventoryPart.save();

                collectionInventory.totalPartQuantityFound += clampedCount;
                await collectionInventory.save();

                res.status(200).json(collectionInventoryPart);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: (error as Error).message });
            }

            break;

            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));
