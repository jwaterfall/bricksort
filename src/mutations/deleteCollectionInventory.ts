import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import axios from 'axios';
import { invalidateAll } from '$app/navigation';

import type { CollectionInventory } from '$models/CollectionInventory';

async function deleteCollectionInventory(id: string) {
	const { origin } = window.location;
	const response = await axios.delete<CollectionInventory>(`${origin}/api/collection/inventories/${id}`);

	return response.data;
}

export default () => createMutation({
	mutationFn: deleteCollectionInventory,
	onSuccess: () => {
		invalidateAll();
		toast('Removed from collection', {
			description: 'You can no longer add parts to this set'
		});
	},
	onError: () => {
		toast('Error removing from collection', {
			description: 'There was an error removing this set from your collection'
		});
	}
});
