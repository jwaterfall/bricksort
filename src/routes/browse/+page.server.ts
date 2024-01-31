import { connectToDatabase } from '$lib/database.js';
import SetModel from '$models/Set';
import type { PageServerLoad } from './$types';

const EXCLUDED_THEMES = [
	'501',
	'739',
	'736',
	'408',
	'497',
	'688',
	'737',
	'503',
	'740',
	'733',
	'741',
	'398',
	'598',
	'746'
];

export const load = (async ({ url }) => {
  const pages = parseInt(url.searchParams.get('pages') ?? '1');
  const limit = parseInt(url.searchParams.get('limit') ?? '24');

	await connectToDatabase();

	const items = await SetModel.find({
		theme: { $nin: EXCLUDED_THEMES }
	})
		.sort({
			year: -1,
			themeId: 1,
			name: 1
		})
		.limit(limit * pages)
		.populate('theme')
		.exec();

	return { items: JSON.parse(JSON.stringify(items)) };
}) satisfies PageServerLoad;
