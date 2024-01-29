import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import axios from 'axios';

import type { CollectionInventory } from '$models/CollectionInventory';

async function addCollectionInventory(setId: string) {
	const { origin } = window.location;
	const response = await axios.post<CollectionInventory>(`${origin}/api/collection/inventories`, {
		setId
	});

	return response.data;
}

export default () => createMutation({
	mutationFn: addCollectionInventory,
	onSuccess: () => {
		// queryClient.invalidateQueries(['collectionInventories']);
		toast('Added to collection', {
			description: 'Head over to your collection to start adding parts'
		});
	},
	onError: () => {
		toast('Error adding to collection', {
			description: 'There was an error adding this set to your collection'
		});
	}
});
