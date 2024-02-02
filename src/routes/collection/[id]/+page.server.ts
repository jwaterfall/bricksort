import { withPageAuthRequired } from '$lib/auth';
import {
	getCollectionInventoryParts,
	getCollectionInventoryPartsParams
} from '$services/collection-inventory-parts';
import type { PageServerLoad } from './$types';

export const load = withPageAuthRequired(async ({ url: { searchParams }, locals, params: { id } }) => {
	const params = await getCollectionInventoryPartsParams.validate({
		...Object.fromEntries(searchParams),
		userId: locals.user.id,
		collectionInventoryId: id
	});

	const response = await getCollectionInventoryParts(params);

	return { ...response, items: JSON.parse(JSON.stringify(response.items)) };
}) satisfies PageServerLoad;
