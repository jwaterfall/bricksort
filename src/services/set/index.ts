import { SetModel } from './model';
import type { GetSetsParams } from './validation';

export * from './model';
export * from './validation';
export * from './components';

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

export async function getSets({ search, theme, pages, limit }: GetSetsParams) {
	const query = {
		themeId: theme.length ? { $in: theme } : { $nin: EXCLUDED_THEMES },
		partCount: { $gt: 1 },
		...(search && {
			$or: [{ _id: { $regex: search, $options: 'i' } }, { name: { $regex: search, $options: 'i' } }]
		})
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
