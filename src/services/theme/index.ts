import { connectToDatabase } from '$lib/database.js';
import ThemeModel from '$models/Theme';

export async function getThemes() {
	await connectToDatabase();

	const themes = await ThemeModel.find({ parentId: null })
		.sort({
			name: 1
		})
		.exec();

	return themes;
}
