import { connectToDatabase } from '$lib/database.js';
import CollectionInventory from '$models/CollectionInventory';
import type { PageServerLoad } from './$types';
import { handlePageAuth } from '$lib/auth';

export const load = (async ({ url, locals }) => {
	handlePageAuth(locals);

	const pages = parseInt(url.searchParams.get('pages') ?? '1');
	const limit = parseInt(url.searchParams.get('limit') ?? '24');

	await connectToDatabase();

	const items = await CollectionInventory.find()
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
