import { Types, type PipelineStage } from 'mongoose';
import { PartListModel } from '$services/part-list';
import { InventoryPartModel } from '$services/inventory-part';
import { type GetPartListInventoryPartsParams } from './validation';

export * from './model';
export * from './validation';
export * from './components';

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
				let: { elementId: '$elementId' },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$partListId', new Types.ObjectId(partListId)] },
									{ $eq: ['$userId', userId] },
									{ $eq: ['$elementId', '$$elementId'] }
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
		},
		{
			$lookup: {
				from: 'elements',
				localField: 'elementId',
				foreignField: '_id',
				as: 'element'
			}
		},
		{
			$unwind: {
				path: '$element'
			}
		}
	];

	if (color.length) {
		baseQuery.push({
			$match: {
				'element.colorId': { $in: color }
			}
		});
	}

	if (missingPartsOnly) {
		baseQuery.push({
			$match: {
				$or: [
					{ partListPart: { $exists: false } },
					{ $expr: { $lt: ['$partListPart.quantity', '$quantity'] } }
				]
			}
		});
	}

	const items = await InventoryPartModel.aggregate([
		...baseQuery,
		{
			$lookup: {
				from: 'colors',
				localField: 'element.colorId',
				foreignField: '_id',
				as: 'element.color'
			}
		},
		{
			$unwind: {
				path: '$element.color'
			}
		},
		{
			$lookup: {
				from: 'parts',
				localField: 'element.partId',
				foreignField: '_id',
				as: 'element.part'
			}
		},
		{
			$unwind: {
				path: '$element.part'
			}
		},
		{
			$sort: { 'element.colorId': 1, 'element.part.categoryId': 1, 'element.part.name': 1 }
		},
		{
			$limit: limit * pages
		},
		{
			$lookup: {
				from: 'part_categories',
				localField: 'element.part.categoryId',
				foreignField: '_id',
				as: 'element.part.category'
			}
		},
		{
			$unwind: {
				path: '$element.part.category'
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
