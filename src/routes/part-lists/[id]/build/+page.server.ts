import { withPageAuthRequired } from '$lib/auth';
import {
	getPartListInventoryParts,
	getPartListInventoryPartsParams
} from '$services/part-list-inventory-part';
import { getColors } from '$services/inventory';
import type { PageServerLoad } from '../$types';
import { PartListModel } from '$services/part-list';

export const load = withPageAuthRequired(
	async ({ url: { searchParams }, locals, params: { id } }) => {
		const params = await getPartListInventoryPartsParams.validate({
			...Object.fromEntries(searchParams),
			color: searchParams.getAll('color'),
			userId: locals.user.id,
			partListId: id
		});

		const partList = await PartListModel.findById(params.partListId);
		if (!partList) throw new Error('Part list not found');
		if (!partList.inventoryId) throw new Error('Part list does not have an inventory');

		const [result, colors] = await Promise.all([getPartListInventoryParts(params), getColors(partList.inventoryId)]);

		return {
			...result,
			items: JSON.parse(JSON.stringify(result.items)),
			partListId: params.partListId,
			colors: JSON.parse(JSON.stringify(colors))
		};
	}
) satisfies PageServerLoad;
