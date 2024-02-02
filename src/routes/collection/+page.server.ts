import { withPageAuthRequired } from '$lib/auth';
import {
	getCollectionInventories,
	getCollectionInventoriesParams
} from '$services/collection-inventories';
import type { PageServerLoad } from './$types';

export const load = withPageAuthRequired(async ({ url: { searchParams }, locals }) => {
	const params = await getCollectionInventoriesParams.validate({
		...Object.fromEntries(searchParams),
		userId: locals.user.id
	});
	
	const response = await getCollectionInventories(params);

	return { ...response, items: JSON.parse(JSON.stringify(response.items)) };
}) satisfies PageServerLoad;
