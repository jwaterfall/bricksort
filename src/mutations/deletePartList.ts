import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import axios from 'axios';
import { invalidateAll } from '$app/navigation';
import { type PartList } from '$services/part-list';

async function deletePartList(id: string) {
	const { origin } = window.location;
	const response = await axios.delete<PartList>(`${origin}/api/part-lists/${id}`);

	return response.data;
}

export default () =>
	createMutation({
		mutationFn: deletePartList,
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
