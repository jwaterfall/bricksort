import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import axios from 'axios';
import { invalidateAll } from '$app/navigation';

import type { CollectionInventoryPart } from '$models/CollectionInventoryPart';

async function addCollectionInventoryPart(id: string, quantity: number) {
	const { origin } = window.location;
	const response = await axios.post<CollectionInventoryPart>(
		`${origin}/api/collection/inventories/parts/${id}`,
		undefined,
		{
			params: {
				quantity
			}
		}
	);

	return response.data;
}

export default (id: string) =>
	createMutation({
		mutationFn: (quantity: number) => addCollectionInventoryPart(id, quantity),
		onSuccess: (newPart, quantity) => {
			invalidateAll();
			toast(quantity > 0 ? 'Added parts to inventory' : 'Removed parts from inventory', {
				description: `You now have ${newPart.quantityFound} of this part in your inventory`
			});
		},
		onError: () => {
			toast('Error adding to inventory', {
				description: 'There was an error adding parts to your inventory'
			});
		}
	});
