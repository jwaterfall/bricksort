import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export const MONGODB_URI = process.env.MONGODB_URI as string;

const connectToDatabase = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (!mongoose.connections[0].readyState) mongoose.connect(MONGODB_URI);
        return handler(req, res);
    };
};

export default connectToDatabase;
