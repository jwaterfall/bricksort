import { createMutation } from '@tanstack/svelte-query';
import { toast } from 'svelte-sonner';
import axios from 'axios';
import { invalidateAll } from '$app/navigation';
import { type PartListPart } from '$services/part-list-part';

async function addPartListPart(
	partListId: string,
	elementId: string,
	quantity: number
) {
	const { origin } = window.location;
	const response = await axios.post<PartListPart | null>(
		`${origin}/api/part-lists/${partListId}/parts`,
		undefined,
		{
			params: {
				quantity,
				elementId
			}
		}
	);

	return response.data;
}

export default (partListId: string, elementId: string) =>
	createMutation({
		mutationFn: (quantity: number) => addPartListPart(partListId, elementId, quantity),
		onSuccess: (newPart, quantity) => {
			invalidateAll();
			toast(quantity > 0 ? 'Added parts to list' : 'Removed parts from list', {
				description: `You now have ${newPart?.quantity ?? 0} of this part in your list`
			});
		},
		onError: () => {
			toast('Error adding to list', {
				description: 'There was an error adding parts to your list'
			});
		}
	});
