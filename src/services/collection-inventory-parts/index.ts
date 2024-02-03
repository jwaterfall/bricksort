import { type PipelineStage, Types } from 'mongoose';
import { connectToDatabase } from '$lib/database.js';
import CollectionInventoryPartModel from '$models/CollectionInventoryPart';
import type { GetCollectionInventoryPartsParams } from './validation';

export * from './validation';

export async function getCollectionInventoryParts({
	userId,
	collectionInventoryId,
	missingPartsOnly,
	color,
	pages,
	limit
}: GetCollectionInventoryPartsParams) {
	await connectToDatabase();

	const baseQuery: PipelineStage[] = [
		{
			$lookup: {
				from: 'inventory_parts',
				localField: 'inventoryPartId',
				foreignField: '_id',
				as: 'inventoryPart'
			}
		},
		{
			$unwind: '$inventoryPart'
		},
		{
			$match: {
				user: userId,
				collectionInventoryId: new Types.ObjectId(collectionInventoryId),
				'inventoryPart.isSpare': false
			}
		}
	];

	if (missingPartsOnly) {
		baseQuery.push({
			$match: {
				$expr: { $lt: ['$quantityFound', '$quantity'] }
			}
		});
	}

	if (color.length > 0) {
		baseQuery.push({
			$match: {
				'inventoryPart.colorId': { $in: color }
			}
		});
	}

	const items = await CollectionInventoryPartModel.aggregate([
		...baseQuery,
		{
			$lookup: {
				from: 'parts',
				localField: 'inventoryPart.partId',
				foreignField: '_id',
				as: 'inventoryPart.part'
			}
		},
		{
			$unwind: '$inventoryPart.part'
		},
		{
			$lookup: {
				from: 'part_categories',
				localField: 'inventoryPart.part.categoryId',
				foreignField: '_id',
				as: 'inventoryPart.part.category'
			}
		},
		{
			$unwind: '$inventoryPart.part.category'
		},
		{
			$lookup: {
				from: 'colors',
				localField: 'inventoryPart.colorId',
				foreignField: '_id',
				as: 'inventoryPart.color'
			}
		},
		{
			$unwind: '$inventoryPart.color'
		},
		{
			$sort: {
				'inventoryPart.color.name': 1,
				'inventoryPart.part.name': 1
			}
		},
		{
			$limit: limit * pages
		},
		{
			$lookup: {
				from: 'collection_inventories',
				localField: 'collectionInventoryId',
				foreignField: '_id',
				as: 'collectionInventory'
			}
		},
		{
			$unwind: '$collectionInventory'
		}
	]);

	const countResult = await CollectionInventoryPartModel.aggregate([
		...baseQuery,
		{
			$count: 'count'
		}
	]);

	const pageCount = countResult.length > 0 ? Math.ceil(countResult[0].count / limit) : 0;

	return { items, limit, pages, pageCount };
}
