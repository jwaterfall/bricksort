import { type InventoryPart } from '$services/inventory-part';
import { type PartListPart } from '$services/part-list-part';

export interface PartListInventoryPart extends InventoryPart {
	partListPart: PartListPart;
}
