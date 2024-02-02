import { connectToDatabase } from '$lib/database.js';
import SetModel from '$models/Set';
import type { GetSetsParams } from './validation';

export * from './validation';

const EXCLUDED_THEMES = [
	'501', // Gear
	'739', // Stationery and Office Supplies
	'736', // Posters and Art Prints
	'408', // LEGO Brand Store
	'497', // Books
	'688', // DOTS
	'737', // Role Play Toys and Costumes
	'503', // Key Chain
	'740', // Storage
	'733', // Houseware
	'741', // Tabletop Games and Puzzles
	'398', // FIRST LEGO League
	'598', // Promotional
	'746' // Database Sets
];

export async function getSets({ pages, limit }: GetSetsParams) {
	await connectToDatabase();

	const query = {
		theme: { $nin: EXCLUDED_THEMES }
	};

	const items = await SetModel.find(query)
		.sort({
			year: -1,
			themeId: 1,
			name: 1
		})
		.limit(limit * pages)
		.populate('theme')
		.exec();

	const count = await SetModel.countDocuments(query);
	const pageCount = Math.ceil(count / limit);

	return { items, limit, pages, pageCount };
}
