import { connectToDatabase } from '$lib/database.js';
import CollectionInventoryModel from '$models/CollectionInventory';
import type { PageServerLoad } from './$types';
import { withPageAuthRequired } from '$lib/auth';

export const load = withPageAuthRequired(async ({ url, locals }) => {
	const pages = parseInt(url.searchParams.get('pages') ?? '1');
	const limit = parseInt(url.searchParams.get('limit') ?? '24');

	await connectToDatabase();

	const query = { user: locals.user.id };

	const items = await CollectionInventoryModel.find(query)
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

	const count = await CollectionInventoryModel.countDocuments(query);
	const pageCount = Math.ceil(count / limit);

	return { items: JSON.parse(JSON.stringify(items)), pageCount };
}) satisfies PageServerLoad;
