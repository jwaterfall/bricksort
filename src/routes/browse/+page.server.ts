import { getSets, getSetsParams } from '$services/set';
import type { PageServerLoad } from './$types';

export const load = (async ({ url: { searchParams } }) => {
	const params = await getSetsParams.validate(Object.fromEntries(searchParams));
	const response = await getSets(params);

	return { ...response, items: JSON.parse(JSON.stringify(response.items)) };
}) satisfies PageServerLoad;
