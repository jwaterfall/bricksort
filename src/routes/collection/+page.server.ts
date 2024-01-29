import { redirect } from '@sveltejs/kit';

import { connectToDatabase } from '$lib/database.js';
import CollectionInventory from '$models/CollectionInventory';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) throw redirect(303, '/auth/signin/auth0');

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
