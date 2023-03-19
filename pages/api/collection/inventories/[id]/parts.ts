import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession, Session } from "@auth0/nextjs-auth0";

import connectToDatabase from "../../../../../middleware/connectToDatabase";
import InventoryPartModel from "../../../../../models/InventoryPart";
import CollectionInventoryPartModel from "../../../../../models/CollectionInventoryPart";
import PartModel from "../../../../../models/Part";
import ColorModel from "../../../../../models/Color";
import { Types } from "mongoose";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = (await getSession(req, res)) as Session;

    switch (req.method) {
        case "GET":
            try {
                const collectionInventoryId = req.query.id as string;

                const isSpare = (req.query.isSpare as string) === "true";

                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 100;
                const skip = (page - 1) * limit;

                const baseQuery = [
                    {
                        $lookup: {
                            from: "inventory_parts",
                            localField: "inventoryPart",
                            foreignField: "_id",
                            as: "inventoryPart",
                        },
                    },
                    {
                        $unwind: "$inventoryPart",
                    },
                    {
                        $match: {
                            user: user.sub,
                            collectionInventory: new Types.ObjectId(collectionInventoryId),
                            "inventoryPart.isSpare": isSpare,
                        },
                    },
                ];

                const collectionInventoryParts = await CollectionInventoryPartModel.aggregate([
                    ...baseQuery,
                    {
                        $lookup: {
                            from: "parts",
                            localField: "inventoryPart.part",
                            foreignField: "_id",
                            as: "inventoryPart.part",
                        },
                    },
                    {
                        $unwind: "$inventoryPart.part",
                    },
                    {
                        $lookup: {
                            from: "colors",
                            localField: "inventoryPart.color",
                            foreignField: "_id",
                            as: "inventoryPart.color",
                        },
                    },
                    {
                        $unwind: "$inventoryPart.color",
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                ]);

                const countResult = await CollectionInventoryPartModel.aggregate([
                    ...baseQuery,
                    {
                        $count: "count",
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
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));
