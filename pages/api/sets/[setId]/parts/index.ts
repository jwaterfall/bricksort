import { Session, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import SetModel from '@/models/Set';

import connectToDatabase from '../../../../../middleware/connectToDatabase';
import PartsModel from '../../../../../models/Part';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { setId } = req.query;
  const { user } = getSession(req, res) as Session;

  const set = await SetModel.findById(setId);

  if (!set) {
    res.status(404).json({ error: 'Set not found' });
    return;
  }

  if (set.author !== user.sub) {
    res.status(403).json({ error: 'Set does not belong to user' });
    return;
  }

  switch (req.method) {
    case 'GET':
      try {
        const query: any = {
          author: user.sub,
          parent: setId,
          isSpare: false,
        };

        const parts = await PartsModel.find(query).populate('parent').sort({
          color: 1,
          name: 1,
        });
        res.json(parts);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message, body: { parent: setId } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withApiAuthRequired(connectToDatabase(handler));
