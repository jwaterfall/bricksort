import { withPageAuthRequired } from '$lib/auth';
import CollectionInventoryPartModel from '$models/CollectionInventoryPart';
import ColorModel from '$models/Color';
import {
	getCollectionInventoryParts,
	getCollectionInventoryPartsParams
} from '$services/collection-inventory-parts';
import type { PageServerLoad } from './$types';

export const load = withPageAuthRequired(async ({ url: { searchParams }, locals, params: { id } }) => {
	const params = await getCollectionInventoryPartsParams.validate({
		...Object.fromEntries(searchParams),
		color: searchParams.getAll('color'),
		userId: locals.user.id,
		collectionInventoryId: id
	});

	const response = await getCollectionInventoryParts(params);

	const collectionInventoryParts = await CollectionInventoryPartModel.find({ collectionInventoryId: id, user: locals.user.id }).populate('inventoryPart');
	const colorsIds = collectionInventoryParts.map((colorPart) => colorPart.inventoryPart.colorId);
	const colors = await ColorModel.find({ _id: { $in: colorsIds } });

	return { ...response, items: JSON.parse(JSON.stringify(response.items)), colors: JSON.parse(JSON.stringify(colors)) };
}) satisfies PageServerLoad;
