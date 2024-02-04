import { ThemeModel } from './model';

export * from './model';

export async function getThemes() {
	const themes = await ThemeModel.find({ parentId: null })
		.sort({
			name: 1
		})
		.exec();

	return themes;
}
