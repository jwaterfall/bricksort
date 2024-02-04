import { json, type RequestHandler } from '@sveltejs/kit';
import {InventoryModel} from '$services/inventory';
import {PartListModel} from '$services/part-list';
import {PartListPartModel} from '$services/part-list-part';
import { connectToDatabase } from '$lib/database';
import { withRouteAuthRequired } from '$lib/auth';

export const POST: RequestHandler = withRouteAuthRequired(async ({ params, locals }) => {
	await connectToDatabase();

	const setId = params.id;

	const inventory = await InventoryModel.findOne({ setId });

	if (!inventory) {
		return json(
			{
				message: `Inventory for set ${setId} not found`
			},
			{ status: 404 }
		);
	}

	const partList = new PartListModel({
		userId: locals.user.id,
		inventoryId: inventory._id
	});

	await partList.save();

	return json(partList);
});

export const DELETE: RequestHandler = withRouteAuthRequired(async ({ params, locals }) => {
	await connectToDatabase();

	await PartListPartModel.deleteMany({
		partListId: params.id,
		userId: locals.user.id
	});

	const partList = await PartListModel.findOneAndDelete({
		_id: params.id,
		userId: locals.user.id
	});

	return json(partList);
});
