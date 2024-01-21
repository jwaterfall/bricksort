import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/utils';
import CollectionInventoryModel from '@/models/CollectionInventory';

export const GET = withApiAuthRequired(async (request: NextRequest) => {
  await connectToDatabase();

  const { user } = (await getSession()) as Session;

  const searchParams = request.nextUrl.searchParams;

  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '32');
  const skip = (page - 1) * limit;

  const query = { user: user.sub };

  const collectionInventories = await CollectionInventoryModel.find(query)
    .limit(limit)
    .skip(skip)
    .populate({
      path: 'inventory',
      populate: {
        path: 'set',
        populate: {
          path: 'theme',
        },
      },
    })
    .exec();

  const pageCount = Math.ceil((await CollectionInventoryModel.countDocuments(query)) / limit);

  return NextResponse.json({
    collectionInventories,
    pageCount,
  });
});
