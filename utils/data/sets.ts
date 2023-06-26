import { PaginationOptions, PaginatedResult, getSkipCount, getPageCount, getNextPage } from '@/utils/pagination';
import { connectToDatabase } from '@/utils/database';
import SetModel, { Set } from '@/models/Set';

export interface GetSetsOptions extends PaginationOptions {
    minYear?: number;
    maxYear?: number;
    search?: string;
    themes?: string[];
}

export async function getSets(options: GetSetsOptions): Promise<PaginatedResult<Set>> {
    await connectToDatabase();

    const { page = 1, limit = 48, minYear, maxYear, search, themes } = options ?? {};

    const skip = getSkipCount(page, limit);

    const excludedThemes = ['501', '739', '736', '408', '497', '688', '737', '503', '740', '733', '741', '398', '598', '746'];

    const query = {
        partCount: { $gt: 1 },
        themeId: themes?.length ? { $in: themes } : { $nin: excludedThemes },
        ...(minYear && { year: { $gte: minYear } }),
        ...(maxYear && { year: { $lte: maxYear } }),
        ...(search && { $or: [{ _id: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] }),
    };

    const sets = await SetModel.find(query).sort({ year: -1, name: 1 }).limit(limit).skip(skip).populate('theme').exec();

    const items = sets.map((set) => set.toObject({ virtuals: true }));
    const pageCount = getPageCount(await SetModel.countDocuments(query), limit);
    const nextPage = getNextPage(page, pageCount);

    return { items, currentPage: page, pageCount, nextPage };
}
