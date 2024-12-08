'use server';

import { ThemeModel } from '@/models/theme';
import { connectToDatabase } from '@/lib/utils';

export async function getThemes() {
  await connectToDatabase();
  const themes = await ThemeModel.find({ parentId: null }).sort({ name: 1 });
  return themes.map((theme) => theme.toJSON());
}
