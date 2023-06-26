import { PaginationOptions, UserOptions, PaginatedResult, getSkipCount, getPageCount, getNextPage } from '@/utils/pagination';
import { connectToDatabase } from '@/utils/database';
import CollectionInventoryModel, { CollectionInventory } from '@/models/CollectionInventory';

export interface GetCollectionInventoriesOptions extends PaginationOptions, UserOptions {}

export async function getCollectionInventories(options: GetCollectionInventoriesOptions): Promise<PaginatedResult<CollectionInventory>> {
    await connectToDatabase();

    const { page = 1, limit = 48, user } = options ?? {};

    const skip = getSkipCount(page, limit);

    const query = { user };

    const collectionInventories = await CollectionInventoryModel.find(query)
        .sort({ year: -1, name: 1 })
        .limit(limit)
        .skip(skip)
        .populate({
            path: 'inventory',
            populate: {
                path: 'set',
                populate: 'theme',
            },
        })
        .exec();

    const items = collectionInventories.map((collectionInventory) => collectionInventory.toObject({ virtuals: true }));
    const pageCount = getPageCount(await CollectionInventoryModel.countDocuments(query), limit);
    const nextPage = getNextPage(page, pageCount);

    return { items, currentPage: page, pageCount, nextPage };
}
