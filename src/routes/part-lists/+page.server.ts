import { withPageAuthRequired } from '$lib/auth';
import { getpartLists, getpartListsParams } from '$services/part-list';
import { connectToDatabase } from '$lib/database.js';
import type { PageServerLoad } from './$types';

export const load = withPageAuthRequired(async ({ url: { searchParams }, locals }) => {
	await connectToDatabase();
	
	const params = await getpartListsParams.validate({
		...Object.fromEntries(searchParams),
		userId: locals.user.id
	});

	const response = await getpartLists(params);

	return { ...response, items: JSON.parse(JSON.stringify(response.items)) };
}) satisfies PageServerLoad;
