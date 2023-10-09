import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/utils';
import ThemeModel from '@/models/Theme';

export const GET = withApiAuthRequired(async () => {
  await connectToDatabase();

  const themes = await ThemeModel.find().sort({ name: 1 }).exec();
  return NextResponse.json(themes);
});
