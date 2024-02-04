import { Types, type PipelineStage } from 'mongoose';
import { PartListModel } from '$services/part-list';
import { InventoryPartModel } from '$services/inventory-part';
import { type GetPartListInventoryPartsParams } from './validation';

export * from './model';
export * from './validation';

export async function getPartListInventoryParts({
	userId,
	partListId,
	missingPartsOnly,
	color,
	pages,
	limit
}: GetPartListInventoryPartsParams) {
	const partList = await PartListModel.findOne({
		_id: partListId,
		userId
	});

	if (!partList) {
		throw new Error('Part list not found');
	}

	const baseQuery: PipelineStage[] = [
		{
			$match: { inventoryId: partList.inventoryId, isSpare: false }
		},
		{
			$lookup: {
				from: 'part_list_parts',
				let: { colorId: '$colorId', partId: '$partId' },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$partListId', new Types.ObjectId(partListId)] },
									{ $eq: ['$userId', userId] },
									{ $eq: ['$colorId', '$$colorId'] },
									{ $eq: ['$partId', '$$partId'] }
								]
							}
						}
					}
				],
				as: 'partListPart'
			}
		},
		{
			$unwind: {
				path: '$partListPart',
				preserveNullAndEmptyArrays: true
			}
		}
	];

	if (color.length) {
		baseQuery.push({
			$match: {
				colorId: { $in: color }
			}
		});
	}

	if (missingPartsOnly) {
		baseQuery.push({
			$match: {
				$or: [
					{ partListPart: { $exists: false } },
					{ $expr: { $lt: ['$quantity', '$partListPart.quantity'] } }
				]
			}
		});
	}

	const items = await InventoryPartModel.aggregate([
		...baseQuery,
		{
			$limit: limit * pages
		},
		{
			$sort: { colorId: 1 }
		},
		{
			$lookup: {
				from: 'colors',
				localField: 'colorId',
				foreignField: '_id',
				as: 'color'
			}
		},
		{
			$unwind: {
				path: '$color'
			}
		},
		{
			$lookup: {
				from: 'parts',
				localField: 'partId',
				foreignField: '_id',
				as: 'part'
			}
		},
		{
			$unwind: {
				path: '$part'
			}
		},
		{
			$lookup: {
				from: 'part_categories',
				localField: 'part.categoryId',
				foreignField: '_id',
				as: 'part.category'
			}
		},
		{
			$unwind: {
				path: '$part.category'
			}
		}
	]);

	const countResult = await InventoryPartModel.aggregate([
		...baseQuery,
		{
			$count: 'count'
		}
	]);

	const count = countResult[0]?.count ?? 0;
	const pageCount = Math.ceil(count / limit);

	return {
		pageCount,
		items
	};
}
