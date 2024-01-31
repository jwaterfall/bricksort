import { json, type RequestHandler } from '@sveltejs/kit';

import CollectionInventoryPartModel from '$models/CollectionInventoryPart';
import { connectToDatabase } from '$lib/database';
import { handlePageAuth } from '$lib/auth';

export const POST: RequestHandler = async ({ url, params, locals }) => {
	const user = await handlePageAuth(locals);

	await connectToDatabase();

	const collectionInventoryPart = await CollectionInventoryPartModel.findOne({
		user: user.id,
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
};
