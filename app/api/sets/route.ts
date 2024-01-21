import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

import SetModel from '@/models/Set';
import ThemeModel from '@/models/Theme';
import { connectToDatabase } from '@/lib/utils';

export const GET = withApiAuthRequired(async (request: NextRequest) => {
  await connectToDatabase();

  const searchParams = request.nextUrl.searchParams;

  const minYear = parseInt(searchParams.get('minYear') as string) ?? 1950;
  const maxYear = parseInt(searchParams.get('maxYear') as string) ?? new Date().getFullYear();
  const search = searchParams.get('search') as string | undefined;
  const theme = searchParams.get('theme') as string | undefined;
  const page = parseInt(searchParams.get('page') as string) ?? 1;
  const limit = parseInt(searchParams.get('limit') as string) ?? 100;

  const skip = (page - 1) * limit;

  const excludedThemes = ['501', '739', '736', '408', '497', '688', '737', '503', '740', '733', '741', '398', '598', '746'];
  const themeIds = theme ? [...(await ThemeModel.getChildThemes(theme)), theme] : [];

  const query = {
    themeId: themeIds.length ? { $in: themeIds } : { $nin: excludedThemes },
    partCount: { $gt: 0 },
    ...(minYear && { year: { $gte: minYear } }),
    ...(maxYear && { year: { $lte: maxYear } }),
    ...(search && { $or: [{ _id: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] }),
  };

  const sets = await SetModel.find(query).sort({ year: -1, themeId: 1, name: 1 }).limit(limit).skip(skip).populate('theme').exec();
  const pageCount = Math.ceil((await SetModel.countDocuments(query)) / limit);

  return NextResponse.json({
    sets,
    pageCount,
  });
});
