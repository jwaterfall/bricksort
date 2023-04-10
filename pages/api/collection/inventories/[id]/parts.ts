import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { PipelineStage, Types } from 'mongoose';

import connectToDatabase from '../../../../../middleware/connectToDatabase';
import CollectionInventoryPartModel from '../../../../../models/CollectionInventoryPart';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = (await getSession(req, res)) as Session;

    switch (req.method) {
        case 'GET':
            try {
                const collectionInventoryId = req.query.id as string;

                const type = req.query.type as string;

                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 100;
                const skip = (page - 1) * limit;

                const baseQuery: PipelineStage[] = [
                    {
                        $lookup: {
                            from: 'inventory_parts',
                            localField: 'inventoryPart',
                            foreignField: '_id',
                            as: 'inventoryPart',
                        },
                    },
                    {
                        $unwind: '$inventoryPart',
                    },
                    {
                        $match: {
                            user: user.sub,
                            collectionInventory: new Types.ObjectId(collectionInventoryId),
                        },
                    },
                ];

                switch (type) {
                    case 'missing':
                        baseQuery.push({
                            $match: {
                                $expr: { $lt: ['$quantityFound', '$quantity'] },
                            },
                        });
                        break;
                    case 'found':
                        baseQuery.push({
                            $match: {
                                $expr: { $gte: ['$quantityFound', '$quantity'] },
                            },
                        });
                        break;
                }

                const collectionInventoryParts = await CollectionInventoryPartModel.aggregate([
                    ...baseQuery,
                    {
                        $lookup: {
                            from: 'parts',
                            localField: 'inventoryPart.part',
                            foreignField: '_id',
                            as: 'inventoryPart.part',
                        },
                    },
                    {
                        $unwind: '$inventoryPart.part',
                    },
                    {
                        $lookup: {
                            from: 'colors',
                            localField: 'inventoryPart.color',
                            foreignField: '_id',
                            as: 'inventoryPart.color',
                        },
                    },
                    {
                        $unwind: '$inventoryPart.color',
                    },
                    {
                        $sort: {
                            'inventoryPart.color.name': 1,
                            'inventoryPart.part.name': 1,
                        },
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                    {
                        $lookup: {
                            from: 'collection_inventories',
                            localField: 'collectionInventory',
                            foreignField: '_id',
                            as: 'collectionInventory',
                        },
                    },
                    {
                        $unwind: '$collectionInventory',
                    },
                ]);

                const countResult = await CollectionInventoryPartModel.aggregate([
                    ...baseQuery,
                    {
                        $count: 'count',
                    },
                ]);

                const pageCount = countResult.length > 0 ? Math.ceil(countResult[0].count / limit) : 0;

                res.status(200).json({
                    collectionInventoryParts,
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
