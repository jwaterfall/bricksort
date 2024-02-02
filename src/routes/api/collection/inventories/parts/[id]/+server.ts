import { json, type RequestHandler } from '@sveltejs/kit';

import CollectionInventoryPartModel from '$models/CollectionInventoryPart';
import { connectToDatabase } from '$lib/database';
import { withRouteAuthRequired } from '$lib/auth';

export const POST: RequestHandler = withRouteAuthRequired(async ({ url, params, locals }) => {
	await connectToDatabase();

	const collectionInventoryPart = await CollectionInventoryPartModel.findOne({
		user: locals.user.id,
		_id: params.id
	});

	if (!collectionInventoryPart) {
		return json(
			{
				message: 'CollectionInventoryPart not found'
			},
			{ status: 404 }
		);
	}

	const quantity = parseInt(url.searchParams.get('quantity') ?? '1');

	await collectionInventoryPart.addQuantityFound(quantity);

	return json(collectionInventoryPart);
});
