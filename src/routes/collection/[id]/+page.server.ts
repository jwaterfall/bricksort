import { type PipelineStage, Types } from 'mongoose';
import { connectToDatabase } from '$lib/database.js';
import CollectionInventoryPartModel from '$models/CollectionInventoryPart';
import type { PageServerLoad } from './$types';
import { handlePageAuth } from '$lib/auth';

export const load = (async ({ url, locals, params }) => {
	const user = await handlePageAuth(locals);

	const pages = parseInt(url.searchParams.get('pages') ?? '1');
	const limit = parseInt(url.searchParams.get('limit') ?? '24');
	const missingPartsOnly = url.searchParams.get('missingPartsOnly') === 'true';

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
				user: user.id,
				collectionInventoryId: new Types.ObjectId(params.id as string),
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

	return { items: JSON.parse(JSON.stringify(items)), pageCount };
}) satisfies PageServerLoad;
