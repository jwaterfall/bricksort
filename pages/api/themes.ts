import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

import connectToDatabase from "../../middleware/connectToDatabase";
import ThemeModel from "../../models/Theme";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                const themes = await ThemeModel.find();

                res.json(themes);
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
