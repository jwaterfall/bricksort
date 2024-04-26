'use server';

import { SetModel } from '@/models/set';
import { connectToDatabase } from '@/lib/utils';

export async function getSets() {
  await connectToDatabase();
  const sets = await SetModel.find({ partCount: { $gte: 250 } })
    .sort({ year: -1 })
    .populate('theme')
    .limit(20);
  return sets.map((set) => set.toJSON());
}
