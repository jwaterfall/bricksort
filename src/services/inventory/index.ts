import { ColorModel } from '$services/color';
import { InventoryPartModel } from '$services/inventory-part';
import { InventoryModel } from './model';

export * from './model';

export async function getColors(inventoryId: string) {
	const inventory = await InventoryModel.findById(inventoryId);
	if (!inventory) throw new Error('Inventory not found');

	const inventoryParts = await InventoryPartModel.find({ inventoryId }).populate('element');

	return await ColorModel.find({ _id: { $in: inventoryParts.map((part) => part.element.colorId) } });
}
