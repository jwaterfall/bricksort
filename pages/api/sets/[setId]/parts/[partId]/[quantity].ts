import { Session, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '@/middleware/connectToDatabase';
import PartsModel from '@/models/Part';
import SetModel from '@/models/Set';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = getSession(req, res) as Session;
  const { partId, quantity } = req.query;

  switch (req.method) {
    case 'PATCH':
      try {
        const part = await PartsModel.findOneAndUpdate(
          { _id: partId, author: user.sub },
          { $inc: { quantityFound: quantity } },
          { new: true },
        ).populate('parent');

        if (!part) {
          res.status(404).json({ error: 'Part not found' });
          return;
        }

        await SetModel.findOneAndUpdate(
          { _id: part.parent, author: user.sub },
          { $inc: { partQuantityFound: quantity } },
          { new: true },
        );

        res.json(part);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
      break;
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withApiAuthRequired(connectToDatabase(handler));
