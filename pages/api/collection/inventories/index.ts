import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';

import connectToDatabase from '../../../../middleware/connectToDatabase';
import CollectionInventoryModel from '../../../../models/CollectionInventory';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = (await getSession(req, res)) as Session;

    switch (req.method) {
        case 'GET':
            try {
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 100;
                const skip = (page - 1) * limit;

                const query = { user: user.sub };

                const collectionInventories = await CollectionInventoryModel.find(query)
                    .limit(limit)
                    .skip(skip)
                    .populate({
                        path: 'inventory',
                        populate: {
                            path: 'set',
                            populate: {
                                path: 'theme',
                            },
                        },
                    })
                    .exec();

                const pageCount = Math.ceil((await CollectionInventoryModel.countDocuments(query)) / limit);

                res.status(200).json({
                    collectionInventories,
                    pageCount,
                });
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }

            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));
