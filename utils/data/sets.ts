import { PaginatedOptions, PaginatedResult, getSkipCount, getPageCount } from '@/utils/pagination';
import { connectToDatabase } from '@/utils/database';
import SetModel, { Set } from '@/models/Set';
import { Theme } from '@/models/Theme';

export interface GetSetsOptions extends PaginatedOptions {
    minYear?: number;
    maxYear?: number;
    search?: string;
    themesIds?: string[];
}

export interface SetWithTheme extends Omit<Set, 'theme'> {
    theme: Theme;
}

export async function getSets(options?: GetSetsOptions): Promise<PaginatedResult<SetWithTheme>> {
    await connectToDatabase();

    const { page = 1, limit = 48, minYear, maxYear, search, themesIds } = options ?? {};

    const skip = getSkipCount(page, limit);

    const excludedThemes = ['501', '739', '736', '408', '497', '688', '737', '503', '740', '733', '741', '398', '598', '746'];

    const query = {
        partCount: { $gt: 1 },
        themeId: themesIds?.length ? { $in: themesIds } : { $nin: excludedThemes },
        ...(minYear && { year: { $gte: minYear } }),
        ...(maxYear && { year: { $lte: maxYear } }),
        ...(search && { $or: [{ _id: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }] }),
    };

    const sets = await SetModel.find(query).sort({ year: -1, name: 1 }).limit(limit).skip(skip).populate('theme').exec();

    const items = sets.map((set) => set.toObject({ virtuals: true }));
    const pageCount = getPageCount(await SetModel.countDocuments(query), limit);

    return { items, page, pageCount };
}
