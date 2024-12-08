'use server';

import { FilterQuery } from 'mongoose';
import { type Set, SetModel } from '@/models/set';
import { connectToDatabase } from '@/lib/utils';

export async function getSets({ theme }: any) {
  await connectToDatabase();

  const query: FilterQuery<Set> = { partCount: { $gte: 250 } };

  if (theme) {
    query.themeId = theme;
  }

  const sets = await SetModel.find(query)
    .sort({ year: -1 })
    .populate('theme')
    .limit(20);

  return sets.map((set) => set.toJSON());
}
