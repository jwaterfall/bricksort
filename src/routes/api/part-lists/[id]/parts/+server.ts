import { Types } from 'mongoose';
import { json, type RequestHandler } from '@sveltejs/kit';
import { PartListPartModel } from '$services/part-list-part';
import { connectToDatabase } from '$lib/database';
import { withRouteAuthRequired } from '$lib/auth';

export const POST: RequestHandler = withRouteAuthRequired(async ({ url, params, locals }) => {
	await connectToDatabase();

	const quantity = parseInt(url.searchParams.get('quantity') ?? '1');
	const elementId = url.searchParams.get('elementId');

	const partListId = new Types.ObjectId(params.id);

	const partListPart = await PartListPartModel.findOne({
		userId: locals.user.id,
		partListId,
		elementId
	});

	if (!partListPart && quantity < 1) return json(null);

	if (!partListPart) {
		const partListPart = await PartListPartModel.create({
			userId: locals.user.id,
			partListId,
			elementId,
			quantity
		});

		return json(partListPart);
	}

	partListPart.quantity += quantity;

	if (partListPart.quantity <= 0) {
		await PartListPartModel.deleteOne({ _id: partListPart._id });
		return json(null);
	}

	await partListPart.save();
	return json(partListPart);
});
