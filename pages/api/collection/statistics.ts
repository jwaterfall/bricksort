import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';

import connectToDatabase from '../../../middleware/connectToDatabase';
import CollectionInventoryModel from '../../../models/CollectionInventory';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = (await getSession(req, res)) as Session;

  switch (req.method) {
    case 'GET':
      try {
        const setCount = await CollectionInventoryModel.countDocuments({ user: user.sub });

        const partQuantity = await CollectionInventoryModel.aggregate([
          {
            $match: {
              user: user.sub,
            },
          },
          {
            $group: {
              _id: null,
              quantity: {
                $sum: '$partQuantity',
              },
              quantityFound: {
                $sum: '$partQuantityFound',
              },
              spareQuantity: {
                $sum: '$sparePartQuantity',
              },
              spareQuantityFound: {
                $sum: '$sparePartQuantityFound',
              },
            },
          },
        ]);

        res.status(200).json({
          setCount,
          partQuantity: partQuantity[0]?.quantity ?? 0,
          partQuantityFound: partQuantity[0]?.quantityFound ?? 0,
          sparePartQuantity: partQuantity[0]?.spareQuantity ?? 0,
          sparePartQuantityFound: partQuantity[0]?.spareQuantityFound ?? 0,
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
