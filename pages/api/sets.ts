import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import connectToDatabase from '@/middleware/connectToDatabase';
import SetModel from '@/models/Set';
import ThemeModel from '@/models/Theme';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const minYear = parseInt(req.query.minYear as string) ?? 1950;
                const maxYear = parseInt(req.query.maxYear as string) ?? new Date().getFullYear();
                const search = req.query.search as string | undefined;
                const page = parseInt(req.query.page as string) ?? 1;
                const limit = parseInt(req.query.limit as string) ?? 100;

                const themesIds = req.query['themes[]']
                    ? Array.isArray(req.query['themes[]'])
                        ? req.query['themes[]']
                        : [req.query['themes[]']]
                    : [];

                const skip = (page - 1) * limit;

                const excludedThemes = ['501', '739', '736', '408', '497', '688', '737', '503', '740', '733', '741', '398', '598', '746'];
                const query = {
                    themeId: themesIds.length ? { $in: themesIds } : { $nin: excludedThemes },
                    ...(minYear && { year: { $gte: minYear } }),
                    ...(maxYear && { year: { $lte: maxYear } }),
                    ...(search && { $or: [{ _id: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] }),
                };

                const sets = await SetModel.find(query).sort({ year: -1 }).limit(limit).skip(skip).populate('theme').exec();
                const pageCount = Math.ceil((await SetModel.countDocuments(query)) / limit);

                res.json({
                    sets,
                    pageCount,
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: (error as Error).message });
            }

            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default withApiAuthRequired(connectToDatabase(handler));
