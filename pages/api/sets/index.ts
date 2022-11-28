import { Session, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import connectToDatabase from '@/middleware/connectToDatabase';
import PartModel from '@/models/Part';
import SetModel from '@/models/Set';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = getSession(req, res) as Session;
  
  switch (req.method) {
    case 'GET':
      try {
        const sets = await SetModel.find({ author: user.sub }).sort({ createdAt: -1 });

        res.json(sets);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
      break;
    case 'POST':
      try {
        const setResult = await axios.get(`https://rebrickable.com/api/v3/lego/sets/${req.body.setId}`, {
          params: {
            key: '1415deaec2cbe2bccb9b079c13f31a8d',
          },
        });
        const setData = setResult.data;

        const set = new SetModel({
          author: user.sub,
          number: setData.set_num,
          name: setData.name,
          image: setData.set_img_url,
        });
        await set.save(async (err: any, set: any) => {
          const partResult = await axios.get(`https://rebrickable.com/api/v3/lego/sets/${req.body.setId}/parts`, {
            params: {
              key: '1415deaec2cbe2bccb9b079c13f31a8d',
              page_size: 2000,
              inc_minifig_parts: 1,
            },
          });
          const partsData = partResult.data;
          const parts = partsData.results;

          const partDocuments = parts.map((part: any) => ({
            author: user.sub,
            parent: set._id,
            number: part.part.part_num,
            name: part.part.name,
            quantityTotal: part.quantity,
            quantityFound: 0,
            color: part.color.name,
            image: part.part.part_img_url,
            isSpare: part.is_spare,
            rebrickableId: part.id,
          }));

          await PartModel.insertMany(partDocuments);
        });

        res.json(set);
      } catch (err) {
        res.status(500).json({ error: (err as Error).message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withApiAuthRequired(connectToDatabase(handler));
