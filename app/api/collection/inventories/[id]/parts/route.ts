import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import { PipelineStage, Types } from 'mongoose';

import { connectToDatabase } from '@/lib/utils';
import CollectionInventoryPartModel from '@/models/CollectionInventoryPart';

export const GET = withApiAuthRequired(async (request: NextRequest, { params }) => {
  await connectToDatabase();

  const { user } = (await getSession()) as Session;

  const searchParams = request.nextUrl.searchParams;

  const type = searchParams.get('type');
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '32');
  const skip = (page - 1) * limit;

  const baseQuery: PipelineStage[] = [
    {
      $lookup: {
        from: 'inventory_parts',
        localField: 'inventoryPartId',
        foreignField: '_id',
        as: 'inventoryPart',
      },
    },
    {
      $unwind: '$inventoryPart',
    },
    {
      $match: {
        user: user.sub,
        collectionInventoryId: new Types.ObjectId(params!.id as string),
        'inventoryPart.isSpare': false,
      },
    },
  ];

  switch (type) {
    case 'missing':
      baseQuery.push({
        $match: {
          $expr: { $lt: ['$quantityFound', '$quantity'] },
        },
      });
      break;
    case 'found':
      baseQuery.push({
        $match: {
          $expr: { $gte: ['$quantityFound', '$quantity'] },
        },
      });
      break;
  }

  const collectionInventoryParts = await CollectionInventoryPartModel.aggregate([
    ...baseQuery,
    {
      $lookup: {
        from: 'parts',
        localField: 'inventoryPart.partId',
        foreignField: '_id',
        as: 'inventoryPart.part',
      },
    },
    {
      $unwind: '$inventoryPart.part',
    },
    {
      $lookup: {
        from: 'colors',
        localField: 'inventoryPart.colorId',
        foreignField: '_id',
        as: 'inventoryPart.color',
      },
    },
    {
      $unwind: '$inventoryPart.color',
    },
    {
      $sort: {
        'inventoryPart.color.name': 1,
        'inventoryPart.part.name': 1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'collection_inventories',
        localField: 'collectionInventoryId',
        foreignField: '_id',
        as: 'collectionInventory',
      },
    },
    {
      $unwind: '$collectionInventory',
    },
  ]);

  const countResult = await CollectionInventoryPartModel.aggregate([
    ...baseQuery,
    {
      $count: 'count',
    },
  ]);

  const pageCount = countResult.length > 0 ? Math.ceil(countResult[0].count / limit) : 0;

  return NextResponse.json({
    collectionInventoryParts,
    pageCount,
  });
});
