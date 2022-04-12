import { Session, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '@/middleware/connectToDatabase';
import PartModel from '@/models/Part';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = getSession(req, res) as Session;

  switch (req.method) {
    case 'GET':
      try {
        const page = parseInt(req.query.page as string);
        const limit = parseInt(req.query.limit as string);
        const skipIndex = (page - 1) * limit;

        const parts = await PartModel.find({
          author: user.sub,
          isSpare: false,
          $expr: { $lt: ['$quantityFound', '$quantityTotal'] },
        })
          .populate('parent')
          .sort({ color: 1, parent: 1, name: 1 })
          .limit(limit)
          .skip(skipIndex);

        const count = await PartModel.countDocuments({
          isSpare: false,
          $expr: { $lt: ['$quantityFound', '$quantityTotal'] },
        });

        res.json({
          parts,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
        });
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withApiAuthRequired(connectToDatabase(handler));
