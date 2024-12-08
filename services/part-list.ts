'use server';

import { FilterQuery } from 'mongoose';
import { type PartList, PartListModel } from '@/models/part-list';
import { connectToDatabase } from '@/lib/utils';

export async function getPartLists() {
  await connectToDatabase();

  const query: FilterQuery<PartList> = {};

  const sets = await PartListModel.find(query)
    .populate({
      path: 'inventory',
      populate: {
        path: 'set',
        populate: 'theme',
      },
    })
    .limit(20);

  return sets.map((set) => set.toJSON());
}
