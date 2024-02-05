import { type InventoryPart } from '../inventory-part/model.js';
import { type PartListPart } from '../part-list-part/model.js';

export interface PartListInventoryPart extends InventoryPart {
	partListPart: PartListPart;
}
