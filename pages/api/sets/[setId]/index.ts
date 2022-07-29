import { Session, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '@/middleware/connectToDatabase';
import PartModel from '@/models/Part';
import SetModel from '@/models/Set';

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
        res.json(set);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
      break;
    case 'DELETE':
      try {
        await set.deleteOne();
        const partCount = await PartModel.countDocuments({ parent: setId });
        await PartModel.deleteMany({ parent: setId });

        res.json({ partCount });
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withApiAuthRequired(connectToDatabase(handler));
