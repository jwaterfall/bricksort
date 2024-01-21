import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/utils';
import CollectionInventoryPartModel from '@/models/CollectionInventoryPart';

export const POST = withApiAuthRequired(async (request: NextRequest, { params }) => {
  await connectToDatabase();

  const { user } = (await getSession()) as Session;

  const collectionInventoryPart = await CollectionInventoryPartModel.findOne({
    user: user.sub,
    _id: params!.id as string,
  });

  if (!collectionInventoryPart) {
    return NextResponse.json(
      {
        message: 'CollectionInventoryPart not found',
      },
      { status: 404 }
    );
  }

  const quantityAdded = await collectionInventoryPart.addQuantityFound(parseInt(params!.count as string));

  return NextResponse.json(quantityAdded);
});
