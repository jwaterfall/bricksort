import { Session, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '@/middleware/connectToDatabase';
import { RebrickableSetsResponse } from '@/types/rebrickable';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const search = req.query.search as string;

        const response = await axios.get<RebrickableSetsResponse>(`${process.env.REBRICKABLE_API_URL}/lego/sets`, {
          params: {
            key: process.env.REBRICKABLE_API_KEY,
            search,
          },
        });

        res.json(response.data.results);
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
