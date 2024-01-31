import { connectToDatabase } from '$lib/database.js';
import CollectionInventoryModel from '$models/CollectionInventory';
import type { PageServerLoad } from './$types';
import { handlePageAuth } from '$lib/auth';

export const load = (async ({ url, locals }) => {
	const user = await handlePageAuth(locals);

	const pages = parseInt(url.searchParams.get('pages') ?? '1');
	const limit = parseInt(url.searchParams.get('limit') ?? '24');

	await connectToDatabase();

	const items = await CollectionInventoryModel.find({ user: user.id })
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

	return { items: JSON.parse(JSON.stringify(items)) };
}) satisfies PageServerLoad;
