import axios from 'axios';
import { toast } from 'svelte-sonner';
import { createMutation } from '@tanstack/svelte-query';
import { type PartList } from '$services/part-list';

async function addPartList(setId: string) {
	const { origin } = window.location;
	const response = await axios.post<PartList>(`${origin}/api/part-lists/${setId}`);

	return response.data;
}

export default () =>
	createMutation({
		mutationFn: addPartList,
		onSuccess: () => {
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
