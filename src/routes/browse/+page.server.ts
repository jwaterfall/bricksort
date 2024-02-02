import { getSets, getSetsParams } from '$services/set';
import { getThemes } from '$services/theme';
import type { PageServerLoad } from './$types';

export const load = (async ({ url: { searchParams } }) => {
	const params = await getSetsParams.validate({
		...Object.fromEntries(searchParams),
		theme: searchParams.getAll('theme')
	});

	const [response, themes] = await Promise.all([getSets(params), getThemes()]);

	return {
		...response,
		items: JSON.parse(JSON.stringify(response.items)),
		themes: themes.map((theme) => theme.toJSON())
	};
}) satisfies PageServerLoad;
