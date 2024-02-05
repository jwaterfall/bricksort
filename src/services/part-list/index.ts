import type { PipelineStage } from 'mongoose';
import { PartListModel } from './model';
import type { GetpartListsParams } from './validation';

export * from './model';
export * from './validation';
export * from './components';

export async function getpartLists({ userId, pages, limit }: GetpartListsParams) {
	const baseQuery: PipelineStage[] = [
		{ $match: { userId } },
		{
			$lookup: {
				from: 'inventories',
				localField: 'inventoryId',
				foreignField: '_id',
				as: 'inventory'
			}
		},
		{ $unwind: '$inventory' },
		{
			$lookup: {
				from: 'sets',
				localField: 'inventory.setId',
				foreignField: '_id',
				as: 'inventory.set'
			}
		},
		{ $unwind: '$inventory.set' },
		{
			$lookup: {
				from: 'themes',
				localField: 'inventory.set.themeId',
				foreignField: '_id',
				as: 'inventory.set.theme'
			}
		},
		{ $unwind: '$inventory.set.theme' },
		{ $sort: { updatedAt: -1 } }
	];

	const items = await PartListModel.aggregate([
		...baseQuery, 
		{ $limit: limit * pages },
		{
			$lookup: {
				from: 'part_list_parts',
				localField: '_id',
				foreignField: 'partListId',
				as: 'partListParts'
			}
		},
		{
			$lookup: {
				from: 'inventory_parts',
				localField: 'inventoryId',
				foreignField: 'inventoryId',
				as: 'inventoryParts'
			}
		},
		{
			$addFields: {
				partQuantityFound: {
					$sum: '$partListParts.quantity'
				},
				partQuantity: {
					$sum: '$inventoryParts.quantity'
				}
			}
		},
		{ $skip: limit * (pages - 1) }
	]);

	const countResult = await PartListModel.aggregate([...baseQuery, { $count: 'count' }]);
	const count = countResult[0]?.count ?? 0;
	const pageCount = Math.ceil(count / limit);

	return { items, limit, pages, pageCount };
}
