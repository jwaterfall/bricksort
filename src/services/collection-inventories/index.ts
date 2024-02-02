import { connectToDatabase } from '$lib/database.js';
import CollectionInventoryModel from '$models/CollectionInventory';
import type { GetCollectionInventoriesParams } from './validation';

export * from './validation';

export async function getCollectionInventories({
	userId,
	pages,
	limit
}: GetCollectionInventoriesParams) {
	await connectToDatabase();

	const query = { user: userId };

	const items = await CollectionInventoryModel.find(query)
		.limit(limit * pages)
		.populate({
			path: 'inventory',
			populate: {
				path: 'set',
				populate: {
					path: 'theme'
				}
			}
		})
		.exec();

	const count = await CollectionInventoryModel.countDocuments(query);
	const pageCount = Math.ceil(count / limit);

	return { items, limit, pages, pageCount };
}
