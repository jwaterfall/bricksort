import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

import connectToDatabase from "../../middleware/connectToDatabase";
import SetModel from "../../models/Set";
import ThemeModel from "../../models/Theme";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                const page = parseInt(req.query.page as string) || 1;
                const limit = parseInt(req.query.limit as string) || 100;
                const skip = (page - 1) * limit;

                const minYear = parseInt(req.query.minYear as string) || undefined;
                const maxYear = parseInt(req.query.maxYear as string) || undefined;
                const themes = (req.query["themes[]"] as string[]) || undefined;
                const search = (req.query.search as string) || undefined;

                const excludedThemes = ["501", "739", "736", "408", "497", "688", "737", "503", "740", "733", "741", "398"];
                const query = {
                    theme: themes ? { $in: themes } : { $nin: excludedThemes },
                    ...(minYear && { year: { $gte: minYear } }),
                    ...(maxYear && { year: { $lte: maxYear } }),
                    ...(search && { $or: [{ _id: { $regex: search, $options: "i" } }, { name: { $regex: search, $options: "i" } }] }),
                };

                const sets = await SetModel.find(query).sort({ year: -1 }).limit(limit).skip(skip).populate("theme", undefined, ThemeModel).exec();
                const totalPageCount = Math.ceil((await SetModel.countDocuments(query).exec()) / limit);

                res.json({
                    sets,
                    totalPageCount,
                });
            } catch (err) {
                res.status(500).json({ error: (err as Error).message });
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));
